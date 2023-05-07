/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
// Import jQuery if it's not globally available


/**
 * Main function to initialize the Traficom blocks on the page.
 */
document.addEventListener('DOMContentLoaded', function () {
  // Find all Traficom blocks on the page
  const traficomBlocks = document.querySelectorAll('.traficom-block');
  traficomBlocks.forEach(block => {
    const checkedYearInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block.querySelector('.traficom-block-checked-year')).select2();
    const modelInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block.querySelector('.traficom-block-model')).select2();
    const table = block.querySelector('.traficom-data-table');
    let requestData = {};

    // Update requestData and fetch data on input changes
    jquery__WEBPACK_IMPORTED_MODULE_0___default()(checkedYearInput).add(modelInput).on('change', e => {
      const yearValue = checkedYearInput.val();
      const modelValue = encodeURIComponent(modelInput.val());
      if (yearValue && modelValue) {
        requestData = {
          year_key: yearValue,
          model_key: modelValue
        };
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
  const dataTable = jquery__WEBPACK_IMPORTED_MODULE_0___default()(table).DataTable();

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
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(table).DataTable({
    ajax: {
      url: `/wp-json/traficom-api/v1/disqualified-cars/`,
      type: 'GET',
      dataSrc: 'data',
      data: function () {
        return {
          year: requestData.year_key,
          model: requestData.model_key
        };
      }
    },
    language: {
      url: `//cdn.datatables.net/plug-ins/1.13.4/i18n/${locale}.json`
    },
    data: [],
    // Empty data
    columns: [{
      data: 'model'
    }, {
      data: 'first_year'
    }, {
      data: 'amount'
    }, {
      data: 'average'
    }, {
      data: 'median'
    }, {
      data: 'rejection_percent'
    }, {
      data: 'approved'
    }, {
      data: 'rejected'
    }],
    dom: 'Bfrtip',
    buttons: [{
      extend: 'columnsToggle',
      columns: '.toggle'
    }],
    responsive: true
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
    } else {
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
  jquery__WEBPACK_IMPORTED_MODULE_0___default().ajax({
    url: `/wp-json/traficom-api/v1/dropdown-values/`,
    dataType: 'json',
    type: 'GET',
    success: data => {
      const checkedYearInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block.querySelector('.traficom-block-checked-year'));
      const modelInput = jquery__WEBPACK_IMPORTED_MODULE_0___default()(block.querySelector('.traficom-block-model'));
      const table = block.querySelector('.traficom-data-table');
      const locale = jquery__WEBPACK_IMPORTED_MODULE_0___default()('html').attr('lang');

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
    }
  });
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api.js */ "./src/api.js");






/**
 * Registers a new block type: traficom-block/traficom-data
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)('traficom-block/traficom-data', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Traficom Data', 'traficom-block'),
  icon: 'list-view',
  category: 'widgets',
  /**
   * Block edit function
   *
   * @returns {JSX.Element} The block editor markup.
   */
  edit() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "traficom-block-editor"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tämä lohko mahdollistaa katsastusdatan hakemisen vuoden ja autonmallin perusteella.', 'traficom-block')));
  },
  /**
   * Block save function
   *
   * @returns {JSX.Element} The block frontend markup.
   */
  save() {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "traficom-block"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "traficom-block-checked-year-label traficom-block-label traficom-block-half-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Katsastusvuosi:', 'traficom-block'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "traficom-block-checked-year traficom-select2"
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", {
      className: "traficom-block-model-label traficom-block-label traficom-block-full-label"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Automalli:', 'traficom-block'), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("select", {
      className: "traficom-block-model traficom-select2",
      multiple: true
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("table", {
      className: "traficom-data-table",
      width: "100%"
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("thead", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("tr", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Automalli', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Käyttöönottovuosi', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Katsastusmäärä', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "toggle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('KA. ajokilometrit', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "toggle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Mediaani ajokilometrit', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "toggle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hylkäysprosentti', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "toggle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hyväksytty', 'traficom-block')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("th", {
      className: "toggle"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Hylätty', 'traficom-block'))))));
  }
});

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ (function(module) {

module.exports = window["jQuery"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"./style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktraficom_data_block"] = self["webpackChunktraficom_data_block"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["./style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map