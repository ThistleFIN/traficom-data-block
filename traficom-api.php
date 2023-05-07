<?php

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;

/**
 * Class TraficomApi
 *
 * @since 0.1.0
 */
class TraficomApi
{
	/**
	 * TraficomApi constructor.
	 *
	 * @since 0.1.0
	 */
	public function __construct()
	{
		add_action('rest_api_init', array($this, 'register_traficom_api_routes'));
	}

	/**
	 * Register Traficom API routes.
	 *
	 * @return void
	 * @since 0.1.0
	 *
	 */
	public function register_traficom_api_routes(): void
	{
		register_rest_route('traficom-api/v1', '/disqualified-cars/', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_disqualified_cars'),
			'permission_callback' => '__return_true',
			'args' => array(
				'year' => array(
					'required' => true,
					'type' => 'integer',
					'validate_callback' => function ($param) {
						return is_numeric($param) && $param >= 1900 && $param <= date('Y');
					},
				),
				'model' => array(
					'required' => true,
					'type' => 'string',
				),
			),
		));

		register_rest_route('traficom-api/v1', '/dropdown-values/', array(
			'methods' => 'GET',
			'callback' => array($this, 'get_dropdown_values'),
			'permission_callback' => '__return_true',
		));
	}

	/**
	 * Get disqualified cars data.
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return array|WP_Error
	 * @since 0.1.0
	 *
	 */
	public function get_disqualified_cars(WP_REST_Request $request): array
	{
		$year = $request->get_param('year');
		$models = explode(',', urldecode($request->get_param('model')));
		foreach ($models as $index => $model) {
			if ($model == __('All models', 'traficom-block')) {
				$models[$index] = 'Merkit yhteensä - Mallit yhteensä';
			}
		}
		$query_params = array(
			array(
				'code' => urlencode('Katsastusvuosi'),
				'selection' => array(
					'filter' => 'item',
					'values' => array($year),
				),
			),
			array(
				'code' => 'Merkki ja mallisarja',
				'selection' => array(
					'filter' => 'item',
					'values' => $models,
				),
			),
		);

		try {
			$data = $this->request_from_traficom_api('POST', $query_params);
		} catch (RequestException $e) {
			return new WP_Error('request_failed', 'Unable to fetch data from Traficom API', array('status' => 500));
		}
		$model_array = array();
		foreach ($data['data'] as $item) {
			$row_model = $item['key'][1];
			$row_year = $item['key'][2];
			$array_key = $row_model . '_' . $row_year;

			if ($row_model == 'Merkit yhteensä - Mallit yhteensä') {
				$row_model = __('Kaikki automallit', 'traficom-block');
			}
			if (!isset($model_array[$array_key])) {
				$model_array[$array_key] = array(
					'model' => $row_model,
					'first_year' => $row_year,
					'amount' => 0,
					'average' => 0,
					'median' => 0,
					'rejection_percent' => 0,
					'approved' => 0,
					'rejected' => 0,
				);
			}

			switch ($item['key'][3]) {
				case 'Lkm':
					$model_array[$array_key]['amount'] = $item['values'][0];
					break;
				case 'Ka':
					$model_array[$array_key]['average'] = $item['values'][0];
					break;
				case 'Mediaani':
					$model_array[$array_key]['median'] = $item['values'][0];
					break;
				case 'Hyvaksytyt':
					$model_array[$array_key]['approved'] = $item['values'][0];
					break;
				case 'Hylatyt':
					$model_array[$array_key]['rejected'] = $item['values'][0];
					break;
			}

		}

		$model_array = array_values($model_array);

		foreach ($model_array as $key => $value) {
			if((int) $value['amount'] && (int) $value['rejected']) {
				$model_array[$key]['rejection_percent'] = number_format( (int)$value['rejected'] / (int)$value['amount'] * 100, 2);
			}
		}

		return array('data' => $model_array);
	}

	/**
	 * Send request to Traficom API.
	 *
	 * @param string $method
	 * @param ?array $params
	 *
	 * @return array
	 * @throws RequestException
	 * @since 0.1.0
	 *
	 */
	function request_from_traficom_api(string $method, ?array $params = array()): array
	{
		$client = new Client(['verify' => false]);
		$headers = [
			'Content-Type' => 'application/json',
		];

		if (get_locale() == 'fi') {
			$traficom_api_url = 'https://trafi2.stat.fi/PXWeb/api/v1/fi/TraFi/Katsastuksen_vikatilastot/010_kats_tau_101.px';
		} else {
			$traficom_api_url = 'https://trafi2.stat.fi/PXWeb/api/v1/en/TraFi/Katsastuksen_vikatilastot/010_kats_tau_101.px';
		}

		$body = json_encode(array(
			'query' => $params ?? array(),
			'response' => array(
				'format' => 'json',
			),
		));

		$request = new Request($method, $traficom_api_url, $headers, $body);

		$res = $client->sendAsync($request)->wait();

		return json_decode($res->getBody()->getContents(), true);
	}

	/**
	 * Get dropdown values for the filters.
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return array|WP_Error
	 * @since 0.1.0
	 *
	 */
	public function get_dropdown_values(WP_REST_Request $request)
	{
		try {
			$response = $this->request_from_traficom_api('GET');
		} catch (RequestException $e) {
			return new WP_Error('request_failed', 'Unable to fetch data from Traficom API', array('status' => 500));
		}

		if (!isset($response['variables']) || !is_array($response['variables'])) {
			return new WP_Error('invalid_data', 'Invalid data received from Traficom API', array('status' => 500));
		}

		$data = array();
		foreach ($response['variables'] as $variable) {
			switch ($variable['code']) {
				case 'Katsastusvuosi':
					$data['checkedYearsKeys'] = $variable['values'];
					$data['checkedYears'] = $variable['valueTexts'];
					break;
				case 'Merkki ja mallisarja':
					$data['modelsKeys'] = $variable['values'];
					$data['models'] = $variable['valueTexts'];
					break;
				case 'Käyttöönottovuosi':
					$data['firstYearsKeys'] = $variable['values'];
					$data['firstYears'] = $variable['valueTexts'];
					break;
				case 'Tiedot':
					$data['detailsKeys'] = $variable['values'];
					$data['details'] = $variable['valueTexts'];
					break;
			}
		}

		return $data;
	}
}

/** @noinspection PhpExpressionResultUnusedInspection */
new TraficomApi();
