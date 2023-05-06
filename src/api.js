// Import jQuery if it's not globally available
import $ from 'jquery';

document.addEventListener('DOMContentLoaded', function() {
	// Find all Traficom blocks on the page
	const traficomBlocks = document.querySelectorAll('.traficom-block');
	const locale = $('html').attr('lang');
	/**
	 * Handles setting up the Traficom blocks and populating dropdowns with data.
	 */
	traficomBlocks.forEach((block) => {
		const checkedYearInput = $(block.querySelector('.traficom-block-checked-year')).select2();
		const modelInput = $(block.querySelector('.traficom-block-model')).select2();
		const table = block.querySelector('.traficom-data-table');

		/**
		 * Fetch data from the server and refresh the DataTable.
		 */
		function fetchData() {
			// Get the existing DataTable instance
			const dataTable = $(table).DataTable();

			// Update the ajax URL and parameters
			dataTable.ajax.reload();
		}

		let requestData = {};

		// Update requestData and fetch data on input changes
		$(checkedYearInput).add(modelInput).on('change', (e) => {
			const yearValue = checkedYearInput.val();
			const modelValue = encodeURIComponent(modelInput.val());

			if (yearValue && modelValue) {
				requestData = {
					year: yearValue,
					model: modelValue
				};

				fetchData();
			}
		});

		/**
		 * Initialize the DataTable with the given configuration.
		 */
		function initializeDataTable() {
			$(table).DataTable({
				ajax: {
					url: `/wp-json/traficom-api/v1/disqualified-cars/`,
					type: 'GET',
					dataSrc: 'data',
					data: function() {
						return {
							year: requestData.year_key,
							model: requestData.model_key
						};
					},
				},
				language: {
					url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/'+locale+'.json',
				},
				data: [], // Empty data
				columns: [
					{data: 'model'},
					{data: 'first_year'},
					{data: 'amount'},
					{data: 'average'},
					{data: 'median'},
					{data: 'rejection_percent'},
					{data: 'approved'},
					{data: 'rejected'},
				],
				responsive: true,
			});
		}

		/**
		 * Append option elements to the given input element with the provided data.
		 *
		 * @param {object} input - The input element to append options to.
		 * @param {Array} data - An array of option values to append.
		 */
		function appendOptions(input, data,key) {
			// Populate input with options
			data.forEach((option, index) => {
				if (index === 0) {
					input.append(new Option(option, key[index], true, true));
				}
				else {
					input.append(new Option(option, key[index]));
				}
			});
		}

		/**
		 * Fetch dropdown data and populate the dropdowns.
		 */
		function populateDropdowns() {
			$.ajax({
				url: `/wp-json/traficom-api/v1/dropdown-values/`,
				dataType: 'json',
				type: 'GET',
				success: (data) => {
					traficomBlocks.forEach((block) => {
						const checkedYearInput = $(block.querySelector('.traficom-block-checked-year'));
						const modelInput = $(block.querySelector('.traficom-block-model'));
						// Set initial requestData values
						requestData = {
							year: data.checkedYears[0],
							year_key: data.checkedYearsKeys[0],
							model: data.models[0],
							model_key: data.modelsKeys[0]
						};

						// Populate the input elements with options
						appendOptions(checkedYearInput, data.checkedYears, data.checkedYearsKeys);
						appendOptions(modelInput, data.models, data.modelsKeys);

					});

					// Initialize the DataTable after populating dropdowns
					initializeDataTable();
				},
			});
		}

		// Start populating dropdowns
		populateDropdowns();
	});
});
