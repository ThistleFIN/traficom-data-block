// Import jQuery if it's not globally available
import $ from 'jquery';
let requestData = {};

/**
 * Main function to initialize the Traficom blocks on the page.
 */
document.addEventListener('DOMContentLoaded', function() {
	// Find all Traficom blocks on the page
	const traficomBlocks = document.querySelectorAll('.traficom-block');
	traficomBlocks.forEach((block) => {
		const checkedYearInput = $(block.querySelector('.traficom-block-checked-year')).select2();
		const modelInput = $(block.querySelector('.traficom-block-model')).select2();
		const table = block.querySelector('.traficom-data-table');


		// Update requestData and fetch data on input changes
		$(checkedYearInput).add(modelInput).on('change', (e) => {
			let yearValue = checkedYearInput.val();
			let modelValue = encodeURIComponent(modelInput.val());

			if (yearValue && modelValue) {
				requestData.year_key = yearValue;
				requestData.model_key = modelValue;

				fetchData(table, requestData);
			}
		});

		populateDropdowns(block, requestData);
	});
});

/**
 * Fetch data from the server and refresh the DataTable.
 *
 * @param {HTMLElement} table - The table element for the DataTable.
 * @param {object} requestData - The requestData object containing the current year_key and model_key.
 */
function fetchData(table, requestData) {
	// Get the existing DataTable instance
	const dataTable = $(table).DataTable();

	// Update the ajax URL and parameters
	dataTable.ajax.reload();
}

/**
 * Initialize the DataTable with the given configuration.
 *
 * @param {HTMLElement} table - The table element for the DataTable.
 * @param {object} requestData - The requestData object containing the current year_key and model_key.
 * @param {string} locale - The current language locale.
 */
function initializeDataTable(table, requestData, locale) {
	$(table).DataTable({
		ajax: {
			url: `/wp-json/traficom-api/v1/disqualified-cars/`,
			type: 'GET',
			dataSrc: 'data',
			data: function() {
				return {
					year: requestData.year_key,
					model: requestData.model_key,
				};
			},
		},
		language: {
			url: `//cdn.datatables.net/plug-ins/1.13.4/i18n/${locale}.json`,
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
		dom: 'Bfrtip',
		buttons: [
			{
				extend: 'columnsToggle',
				columns: '.toggle',
			},
		],
		responsive: true,
	});
}

/**
 * Append option elements to the given input element with the provided data.
 *
 * @param {jQuery} input - The input element to append options to.
 * @param {Array} data - An array of option values to append.
 * @param {Array} key - An array of option keys to append.
 */
function appendOptions(input, data, key) {
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
 *
 * @param {HTMLElement} block - The Traficom block element containing the input fields and table.
 * @param {object} requestData - The requestData object containing the current year_key and model_key.
 */
function populateDropdowns(block, requestData) {
	$.ajax({
		url: `/wp-json/traficom-api/v1/dropdown-values/`,
		dataType: 'json',
		type: 'GET',
		success: (data) => {
			const checkedYearInput = $(block.querySelector('.traficom-block-checked-year'));
			const modelInput = $(block.querySelector('.traficom-block-model'));
			const table = block.querySelector('.traficom-data-table');
			const locale = $('html').attr('lang');

			// Set initial requestData values
			requestData.year = data.checkedYears[0];
			requestData.year_key = data.checkedYearsKeys[0];
			requestData.model = data.models[0];
			requestData.model_key = data.modelsKeys[0];

			// Populate the input elements with options
			appendOptions(checkedYearInput, data.checkedYears, data.checkedYearsKeys);
			appendOptions(modelInput, data.models, data.modelsKeys);

			// Initialize the DataTable after populating dropdowns
			initializeDataTable(table, requestData, locale);
		},
	});
}
