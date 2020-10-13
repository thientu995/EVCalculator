(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["styles"],{

/***/ 2:
/*!******************************!*\
  !*** multi ./src/styles.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\NGUYEN THIEN TU\VSCode-win32-x64-1.30.1\W3Blog\EVCalculator\src\styles.css */"OmL/");


/***/ }),

/***/ "JPst":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "LboF":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "OmL/":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "LboF");
            var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--12-1!../node_modules/postcss-loader/src??embedded!./styles.css */ "W9N5");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);



module.exports = content.locals || {};

/***/ }),

/***/ "W9N5":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--12-1!./node_modules/postcss-loader/src??embedded!./src/styles.css ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "JPst");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(true);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "/* W3.CSS 4.13 June 2019 by Jan Egil and Borge Refsnes */\n\n* {\n    padding: 0;\n    margin: 0;\n}\n\nhtml {\n    box-sizing: border-box\n}\n\n*, *:before, *:after {\n    box-sizing: inherit\n}\n\n/* Extract from normalize.css by Nicolas Gallagher and Jonathan Neal git.io/normalize */\n\nhtml {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%\n}\n\nbody {\n    margin: 0\n}\n\narticle, aside, details, figcaption, figure, footer, header, main, menu, nav, section {\n    display: block\n}\n\nsummary {\n    display: list-item\n}\n\naudio, canvas, progress, video {\n    display: inline-block\n}\n\nprogress {\n    vertical-align: baseline\n}\n\naudio:not([controls]) {\n    display: none;\n    height: 0\n}\n\n[hidden], template {\n    display: none\n}\n\na {\n    background-color: transparent\n}\n\na:active, a:hover {\n    outline-width: 0\n}\n\nabbr[title] {\n    border-bottom: none;\n    text-decoration: underline;\n    -webkit-text-decoration: underline dotted;\n            text-decoration: underline dotted\n}\n\nb, strong {\n    font-weight: bolder\n}\n\ndfn {\n    font-style: italic\n}\n\nmark {\n    background: #ff0;\n    color: #000\n}\n\nsmall {\n    font-size: 80%\n}\n\nsub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline\n}\n\nsub {\n    bottom: -0.25em\n}\n\nsup {\n    top: -0.5em\n}\n\nfigure {\n    margin: 1em 40px\n}\n\nimg {\n    border-style: none\n}\n\ncode, kbd, pre, samp {\n    font-family: monospace, monospace;\n    font-size: 1em\n}\n\nhr {\n    box-sizing: content-box;\n    height: 0;\n    overflow: visible\n}\n\nbutton, input, select, textarea, optgroup {\n    font: inherit;\n    margin: 0\n}\n\noptgroup {\n    font-weight: bold\n}\n\nbutton, input {\n    overflow: visible\n}\n\nbutton, select {\n    text-transform: none\n}\n\nbutton, [type=button], [type=reset], [type=submit] {\n    -webkit-appearance: button\n}\n\nbutton::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0\n}\n\nbutton:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText\n}\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: .35em .625em .75em\n}\n\nlegend {\n    color: inherit;\n    display: table;\n    max-width: 100%;\n    padding: 0;\n    white-space: normal\n}\n\ntextarea {\n    overflow: auto\n}\n\n[type=checkbox], [type=radio] {\n    padding: 0\n}\n\n[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {\n    height: auto\n}\n\n[type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px\n}\n\n[type=search]::-webkit-search-decoration {\n    -webkit-appearance: none\n}\n\n::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit\n}\n\n/* End extract */\n\nhtml, body {\n    font-family: Verdana, sans-serif;\n    font-size: 15px;\n    line-height: 1.5\n}\n\nhtml {\n    overflow-x: hidden\n}\n\nh1 {\n    font-size: 36px\n}\n\nh2 {\n    font-size: 30px\n}\n\nh3 {\n    font-size: 24px\n}\n\nh4 {\n    font-size: 20px\n}\n\nh5 {\n    font-size: 18px\n}\n\nh6 {\n    font-size: 16px\n}\n\n.w3-serif {\n    font-family: serif\n}\n\nh1, h2, h3, h4, h5, h6 {\n    font-family: \"Segoe UI\", Arial, sans-serif;\n    font-weight: 400;\n    margin: 10px 0\n}\n\n.w3-wide {\n    letter-spacing: 4px\n}\n\nhr {\n    border: 0;\n    border-top: 1px solid #eee;\n    margin: 20px 0\n}\n\n.w3-image {\n    max-width: 100%;\n    height: auto\n}\n\nimg {\n    vertical-align: middle\n}\n\na {\n    color: inherit\n}\n\n.w3-table, .w3-table-all {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    display: table\n}\n\n.w3-table-all {\n    border: 1px solid #ccc\n}\n\n.w3-bordered tr, .w3-table-all tr {\n    border-bottom: 1px solid #ddd\n}\n\n.w3-striped tbody tr:nth-child(even) {\n    background-color: #f1f1f1\n}\n\n.w3-table-all tr:nth-child(odd) {\n    background-color: #fff\n}\n\n.w3-table-all tr:nth-child(even) {\n    background-color: #f1f1f1\n}\n\n.w3-hoverable tbody tr:hover, .w3-ul.w3-hoverable li:hover {\n    background-color: #ccc\n}\n\n.w3-centered tr th, .w3-centered tr td {\n    text-align: center\n}\n\n.w3-table td, .w3-table th, .w3-table-all td, .w3-table-all th {\n    padding: 8px 8px;\n    display: table-cell;\n    text-align: left;\n    vertical-align: top\n}\n\n.w3-table th:first-child, .w3-table td:first-child, .w3-table-all th:first-child, .w3-table-all td:first-child {\n    padding-left: 16px\n}\n\n.w3-btn, .w3-button {\n    border: none;\n    display: inline-block;\n    padding: 8px 16px;\n    vertical-align: middle;\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    background-color: inherit;\n    text-align: center;\n    cursor: pointer;\n    white-space: nowrap\n}\n\n.w3-btn:hover {\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)\n}\n\n.w3-btn, .w3-button {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    user-select: none\n}\n\n.w3-disabled, .w3-btn:disabled, .w3-button:disabled {\n    cursor: not-allowed;\n    opacity: 0.3\n}\n\n.w3-disabled *, :disabled * {\n    pointer-events: none\n}\n\n.w3-btn.w3-disabled:hover, .w3-btn:disabled:hover {\n    box-shadow: none\n}\n\n.w3-badge, .w3-tag {\n    background-color: #000;\n    color: #fff;\n    display: inline-block;\n    padding-left: 8px;\n    padding-right: 8px;\n    text-align: center\n}\n\n.w3-badge {\n    border-radius: 50%\n}\n\n.w3-ul {\n    list-style-type: none;\n    padding: 0;\n    margin: 0\n}\n\n.w3-ul li {\n    padding: 8px 16px;\n    border-bottom: 1px solid #ddd\n}\n\n.w3-ul li:last-child {\n    border-bottom: none\n}\n\n.w3-tooltip, .w3-display-container {\n    position: relative\n}\n\n.w3-tooltip .w3-text {\n    display: none\n}\n\n.w3-tooltip:hover .w3-text {\n    display: inline-block\n}\n\n.w3-ripple:active {\n    opacity: 0.5\n}\n\n.w3-ripple {\n    transition: opacity 0s\n}\n\n.w3-input {\n    padding: 8px;\n    display: block;\n    border: none;\n    border-bottom: 1px solid #ccc;\n    width: 100%\n}\n\n.w3-select {\n    padding: 9px 0;\n    width: 100%;\n    border: none;\n    border-bottom: 1px solid #ccc\n}\n\n.w3-dropdown-click, .w3-dropdown-hover {\n    position: relative;\n    display: inline-block;\n    cursor: pointer\n}\n\n.w3-dropdown-hover:hover .w3-dropdown-content {\n    display: block\n}\n\n.w3-dropdown-hover:first-child, .w3-dropdown-click:hover {\n    background-color: #ccc;\n    color: #000\n}\n\n.w3-dropdown-hover:hover>.w3-button:first-child, .w3-dropdown-click:hover>.w3-button:first-child {\n    background-color: #ccc;\n    color: #000\n}\n\n.w3-dropdown-content {\n    cursor: auto;\n    color: #000;\n    background-color: #fff;\n    display: none;\n    position: absolute;\n    min-width: 160px;\n    margin: 0;\n    padding: 0;\n    z-index: 1\n}\n\n.w3-check, .w3-radio {\n    width: 24px;\n    height: 24px;\n    position: relative;\n    top: 6px\n}\n\n.w3-sidebar {\n    height: 100%;\n    width: 200px;\n    background-color: #fff;\n    position: fixed!important;\n    z-index: 1;\n    overflow: auto\n}\n\n.w3-bar-block .w3-dropdown-hover, .w3-bar-block .w3-dropdown-click {\n    width: 100%\n}\n\n.w3-bar-block .w3-dropdown-hover .w3-dropdown-content, .w3-bar-block .w3-dropdown-click .w3-dropdown-content {\n    min-width: 100%\n}\n\n.w3-bar-block .w3-dropdown-hover .w3-button, .w3-bar-block .w3-dropdown-click .w3-button {\n    width: 100%;\n    text-align: left;\n    padding: 8px 16px\n}\n\n.w3-main, #main {\n    transition: margin-left .4s\n}\n\n.w3-modal {\n    z-index: 3;\n    display: none;\n    padding-top: 100px;\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgb(0, 0, 0);\n    background-color: rgba(0, 0, 0, 0.4)\n}\n\n.w3-modal-content {\n    margin: auto;\n    background-color: #fff;\n    position: relative;\n    padding: 0;\n    outline: 0;\n    width: 600px\n}\n\n.w3-bar {\n    width: 100%;\n    overflow: hidden\n}\n\n.w3-center .w3-bar {\n    display: inline-block;\n    width: auto\n}\n\n.w3-bar .w3-bar-item {\n    padding: 8px 16px;\n    float: left;\n    width: auto;\n    border: none;\n    display: block;\n    outline: 0\n}\n\n.w3-bar .w3-dropdown-hover, .w3-bar .w3-dropdown-click {\n    position: static;\n    float: left\n}\n\n.w3-bar .w3-button {\n    white-space: normal\n}\n\n.w3-bar-block .w3-bar-item {\n    width: 100%;\n    display: block;\n    padding: 8px 16px;\n    text-align: left;\n    border: none;\n    white-space: normal;\n    float: none;\n    outline: 0\n}\n\n.w3-bar-block.w3-center .w3-bar-item {\n    text-align: center\n}\n\n.w3-block {\n    display: block;\n    width: 100%\n}\n\n.w3-responsive {\n    display: block;\n    overflow-x: auto\n}\n\n.w3-container:after, .w3-container:before, .w3-panel:after, .w3-panel:before, .w3-row:after, .w3-row:before, .w3-row-padding:after, .w3-row-padding:before, .w3-cell-row:before, .w3-cell-row:after, .w3-clear:after, .w3-clear:before, .w3-bar:before, .w3-bar:after {\n    content: \"\";\n    display: table;\n    clear: both\n}\n\n.w3-col, .w3-half, .w3-third, .w3-twothird, .w3-threequarter, .w3-quarter {\n    float: left;\n    width: 100%\n}\n\n.w3-col.s1 {\n    width: 8.33333%\n}\n\n.w3-col.s2 {\n    width: 16.66666%\n}\n\n.w3-col.s3 {\n    width: 24.99999%\n}\n\n.w3-col.s4 {\n    width: 33.33333%\n}\n\n.w3-col.s5 {\n    width: 41.66666%\n}\n\n.w3-col.s6 {\n    width: 49.99999%\n}\n\n.w3-col.s7 {\n    width: 58.33333%\n}\n\n.w3-col.s8 {\n    width: 66.66666%\n}\n\n.w3-col.s9 {\n    width: 74.99999%\n}\n\n.w3-col.s10 {\n    width: 83.33333%\n}\n\n.w3-col.s11 {\n    width: 91.66666%\n}\n\n.w3-col.s12 {\n    width: 99.99999%\n}\n\n@media (min-width:601px) {\n    .w3-col.m1 {\n        width: 8.33333%\n    }\n    .w3-col.m2 {\n        width: 16.66666%\n    }\n    .w3-col.m3, .w3-quarter {\n        width: 24.99999%\n    }\n    .w3-col.m4, .w3-third {\n        width: 33.33333%\n    }\n    .w3-col.m5 {\n        width: 41.66666%\n    }\n    .w3-col.m6, .w3-half {\n        width: 49.99999%\n    }\n    .w3-col.m7 {\n        width: 58.33333%\n    }\n    .w3-col.m8, .w3-twothird {\n        width: 66.66666%\n    }\n    .w3-col.m9, .w3-threequarter {\n        width: 74.99999%\n    }\n    .w3-col.m10 {\n        width: 83.33333%\n    }\n    .w3-col.m11 {\n        width: 91.66666%\n    }\n    .w3-col.m12 {\n        width: 99.99999%\n    }\n}\n\n@media (min-width:993px) {\n    .w3-col.l1 {\n        width: 8.33333%\n    }\n    .w3-col.l2 {\n        width: 16.66666%\n    }\n    .w3-col.l3 {\n        width: 24.99999%\n    }\n    .w3-col.l4 {\n        width: 33.33333%\n    }\n    .w3-col.l5 {\n        width: 41.66666%\n    }\n    .w3-col.l6 {\n        width: 49.99999%\n    }\n    .w3-col.l7 {\n        width: 58.33333%\n    }\n    .w3-col.l8 {\n        width: 66.66666%\n    }\n    .w3-col.l9 {\n        width: 74.99999%\n    }\n    .w3-col.l10 {\n        width: 83.33333%\n    }\n    .w3-col.l11 {\n        width: 91.66666%\n    }\n    .w3-col.l12 {\n        width: 99.99999%\n    }\n}\n\n.w3-rest {\n    overflow: hidden\n}\n\n.w3-stretch {\n    margin-left: -16px;\n    margin-right: -16px\n}\n\n.w3-content, .w3-auto {\n    margin-left: auto;\n    margin-right: auto\n}\n\n.w3-content {\n    max-width: 980px\n}\n\n.w3-auto {\n    max-width: 1140px\n}\n\n.w3-cell-row {\n    display: table;\n    width: 100%\n}\n\n.w3-cell {\n    display: table-cell\n}\n\n.w3-cell-top {\n    vertical-align: top\n}\n\n.w3-cell-middle {\n    vertical-align: middle\n}\n\n.w3-cell-bottom {\n    vertical-align: bottom\n}\n\n.w3-hide {\n    display: none!important\n}\n\n.w3-show-block, .w3-show {\n    display: block!important\n}\n\n.w3-show-inline-block {\n    display: inline-block!important\n}\n\n@media (max-width:1205px) {\n    .w3-auto {\n        max-width: 95%\n    }\n}\n\n@media (max-width:600px) {\n    .w3-modal-content {\n        margin: 0 10px;\n        width: auto!important\n    }\n    .w3-modal {\n        padding-top: 30px\n    }\n    .w3-dropdown-hover.w3-mobile .w3-dropdown-content, .w3-dropdown-click.w3-mobile .w3-dropdown-content {\n        position: relative\n    }\n    .w3-hide-small {\n        display: none!important\n    }\n    .w3-mobile {\n        display: block;\n        width: 100%!important\n    }\n    .w3-bar-item.w3-mobile, .w3-dropdown-hover.w3-mobile, .w3-dropdown-click.w3-mobile {\n        text-align: center\n    }\n    .w3-dropdown-hover.w3-mobile, .w3-dropdown-hover.w3-mobile .w3-btn, .w3-dropdown-hover.w3-mobile .w3-button, .w3-dropdown-click.w3-mobile, .w3-dropdown-click.w3-mobile .w3-btn, .w3-dropdown-click.w3-mobile .w3-button {\n        width: 100%\n    }\n}\n\n@media (max-width:768px) {\n    .w3-modal-content {\n        width: 500px\n    }\n    .w3-modal {\n        padding-top: 50px\n    }\n}\n\n@media (min-width:993px) {\n    .w3-modal-content {\n        width: 900px\n    }\n    .w3-hide-large {\n        display: none!important\n    }\n    .w3-sidebar.w3-collapse {\n        display: block!important\n    }\n}\n\n@media (max-width:992px) and (min-width:601px) {\n    .w3-hide-medium {\n        display: none!important\n    }\n}\n\n@media (max-width:992px) {\n    .w3-sidebar.w3-collapse {\n        display: none\n    }\n    .w3-main {\n        margin-left: 0!important;\n        margin-right: 0!important\n    }\n    .w3-auto {\n        max-width: 100%\n    }\n}\n\n.w3-top, .w3-bottom {\n    position: fixed;\n    width: 100%;\n    z-index: 1\n}\n\n.w3-top {\n    top: 0\n}\n\n.w3-bottom {\n    bottom: 0\n}\n\n.w3-overlay {\n    position: fixed;\n    display: none;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 2\n}\n\n.w3-display-topleft {\n    position: absolute;\n    left: 0;\n    top: 0\n}\n\n.w3-display-topright {\n    position: absolute;\n    right: 0;\n    top: 0\n}\n\n.w3-display-bottomleft {\n    position: absolute;\n    left: 0;\n    bottom: 0\n}\n\n.w3-display-bottomright {\n    position: absolute;\n    right: 0;\n    bottom: 0\n}\n\n.w3-display-middle {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%)\n}\n\n.w3-display-left {\n    position: absolute;\n    top: 50%;\n    left: 0%;\n    transform: translate(0%, -50%);\n    -ms-transform: translate(-0%, -50%)\n}\n\n.w3-display-right {\n    position: absolute;\n    top: 50%;\n    right: 0%;\n    transform: translate(0%, -50%);\n    -ms-transform: translate(0%, -50%)\n}\n\n.w3-display-topmiddle {\n    position: absolute;\n    left: 50%;\n    top: 0;\n    transform: translate(-50%, 0%);\n    -ms-transform: translate(-50%, 0%)\n}\n\n.w3-display-bottommiddle {\n    position: absolute;\n    left: 50%;\n    bottom: 0;\n    transform: translate(-50%, 0%);\n    -ms-transform: translate(-50%, 0%)\n}\n\n.w3-display-container:hover .w3-display-hover {\n    display: block\n}\n\n.w3-display-container:hover span.w3-display-hover {\n    display: inline-block\n}\n\n.w3-display-hover {\n    display: none\n}\n\n.w3-display-position {\n    position: absolute\n}\n\n.w3-circle {\n    border-radius: 50%\n}\n\n.w3-round-small {\n    border-radius: 2px\n}\n\n.w3-round, .w3-round-medium {\n    border-radius: 4px\n}\n\n.w3-round-large {\n    border-radius: 8px\n}\n\n.w3-round-xlarge {\n    border-radius: 16px\n}\n\n.w3-round-xxlarge {\n    border-radius: 32px\n}\n\n.w3-row-padding, .w3-row-padding>.w3-half, .w3-row-padding>.w3-third, .w3-row-padding>.w3-twothird, .w3-row-padding>.w3-threequarter, .w3-row-padding>.w3-quarter, .w3-row-padding>.w3-col {\n    padding: 0 8px\n}\n\n.w3-container, .w3-panel {\n    padding: 0.01em 16px\n}\n\n.w3-panel {\n    margin-top: 16px;\n    margin-bottom: 16px\n}\n\n.w3-code, .w3-codespan {\n    font-family: Consolas, \"courier new\";\n    font-size: 16px\n}\n\n.w3-code {\n    width: auto;\n    background-color: #fff;\n    padding: 8px 12px;\n    border-left: 4px solid #4CAF50;\n    word-wrap: break-word\n}\n\n.w3-codespan {\n    color: crimson;\n    background-color: #f1f1f1;\n    padding-left: 4px;\n    padding-right: 4px;\n    font-size: 110%\n}\n\n.w3-card, .w3-card-2 {\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)\n}\n\n.w3-card-4, .w3-hover-shadow:hover {\n    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)\n}\n\n.w3-spin {\n    animation: w3-spin 2s infinite linear\n}\n\n@keyframes w3-spin {\n    0% {\n        transform: rotate(0deg)\n    }\n    100% {\n        transform: rotate(359deg)\n    }\n}\n\n.w3-animate-fading {\n    animation: fading 10s infinite\n}\n\n@keyframes fading {\n    0% {\n        opacity: 0\n    }\n    50% {\n        opacity: 1\n    }\n    100% {\n        opacity: 0\n    }\n}\n\n.w3-animate-opacity {\n    animation: opac 0.8s\n}\n\n@keyframes opac {\n    from {\n        opacity: 0\n    }\n    to {\n        opacity: 1\n    }\n}\n\n.w3-animate-top {\n    position: relative;\n    animation: animatetop 0.4s\n}\n\n@keyframes animatetop {\n    from {\n        top: -300px;\n        opacity: 0\n    }\n    to {\n        top: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-left {\n    position: relative;\n    animation: animateleft 0.4s\n}\n\n@keyframes animateleft {\n    from {\n        left: -300px;\n        opacity: 0\n    }\n    to {\n        left: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-right {\n    position: relative;\n    animation: animateright 0.4s\n}\n\n@keyframes animateright {\n    from {\n        right: -300px;\n        opacity: 0\n    }\n    to {\n        right: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-bottom {\n    position: relative;\n    animation: animatebottom 0.4s\n}\n\n@keyframes animatebottom {\n    from {\n        bottom: -300px;\n        opacity: 0\n    }\n    to {\n        bottom: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-zoom {\n    animation: animatezoom 0.6s\n}\n\n@keyframes animatezoom {\n    from {\n        transform: scale(0)\n    }\n    to {\n        transform: scale(1)\n    }\n}\n\n.w3-animate-input {\n    transition: width 0.4s ease-in-out\n}\n\n.w3-animate-input:focus {\n    width: 100%!important\n}\n\n.w3-opacity, .w3-hover-opacity:hover {\n    opacity: 0.60\n}\n\n.w3-opacity-off, .w3-hover-opacity-off:hover {\n    opacity: 1\n}\n\n.w3-opacity-max {\n    opacity: 0.25\n}\n\n.w3-opacity-min {\n    opacity: 0.75\n}\n\n.w3-greyscale-max, .w3-grayscale-max, .w3-hover-greyscale:hover, .w3-hover-grayscale:hover {\n    filter: grayscale(100%)\n}\n\n.w3-greyscale, .w3-grayscale {\n    filter: grayscale(75%)\n}\n\n.w3-greyscale-min, .w3-grayscale-min {\n    filter: grayscale(50%)\n}\n\n.w3-sepia {\n    filter: sepia(75%)\n}\n\n.w3-sepia-max, .w3-hover-sepia:hover {\n    filter: sepia(100%)\n}\n\n.w3-sepia-min {\n    filter: sepia(50%)\n}\n\n.w3-tiny {\n    font-size: 10px!important\n}\n\n.w3-small {\n    font-size: 12px!important\n}\n\n.w3-medium {\n    font-size: 15px!important\n}\n\n.w3-large {\n    font-size: 18px!important\n}\n\n.w3-xlarge {\n    font-size: 24px!important\n}\n\n.w3-xxlarge {\n    font-size: 36px!important\n}\n\n.w3-xxxlarge {\n    font-size: 48px!important\n}\n\n.w3-jumbo {\n    font-size: 64px!important\n}\n\n.w3-left-align {\n    text-align: left!important\n}\n\n.w3-right-align {\n    text-align: right!important\n}\n\n.w3-justify {\n    text-align: justify!important\n}\n\n.w3-center {\n    text-align: center!important\n}\n\n.w3-border-0 {\n    border: 0!important\n}\n\n.w3-border {\n    border: 1px solid #ccc!important\n}\n\n.w3-border-top {\n    border-top: 1px solid #ccc!important\n}\n\n.w3-border-bottom {\n    border-bottom: 1px solid #ccc!important\n}\n\n.w3-border-left {\n    border-left: 1px solid #ccc!important\n}\n\n.w3-border-right {\n    border-right: 1px solid #ccc!important\n}\n\n.w3-topbar {\n    border-top: 6px solid #ccc!important\n}\n\n.w3-bottombar {\n    border-bottom: 6px solid #ccc!important\n}\n\n.w3-leftbar {\n    border-left: 6px solid #ccc!important\n}\n\n.w3-rightbar {\n    border-right: 6px solid #ccc!important\n}\n\n.w3-section, .w3-code {\n    margin-top: 16px!important;\n    margin-bottom: 16px!important\n}\n\n.w3-margin {\n    margin: 16px!important\n}\n\n.w3-margin-top {\n    margin-top: 16px!important\n}\n\n.w3-margin-bottom {\n    margin-bottom: 16px!important\n}\n\n.w3-margin-left {\n    margin-left: 16px!important\n}\n\n.w3-margin-right {\n    margin-right: 16px!important\n}\n\n.w3-padding-small {\n    padding: 4px 8px!important\n}\n\n.w3-padding {\n    padding: 8px 16px!important\n}\n\n.w3-padding-large {\n    padding: 12px 24px!important\n}\n\n.w3-padding-16 {\n    padding-top: 16px!important;\n    padding-bottom: 16px!important\n}\n\n.w3-padding-24 {\n    padding-top: 24px!important;\n    padding-bottom: 24px!important\n}\n\n.w3-padding-32 {\n    padding-top: 32px!important;\n    padding-bottom: 32px!important\n}\n\n.w3-padding-48 {\n    padding-top: 48px!important;\n    padding-bottom: 48px!important\n}\n\n.w3-padding-64 {\n    padding-top: 64px!important;\n    padding-bottom: 64px!important\n}\n\n.w3-left {\n    float: left!important\n}\n\n.w3-right {\n    float: right!important\n}\n\n.w3-button:hover {\n    color: #000!important;\n    background-color: #ccc!important\n}\n\n.w3-transparent, .w3-hover-none:hover {\n    background-color: transparent!important\n}\n\n.w3-hover-none:hover {\n    box-shadow: none!important\n}\n\n/* Colors */\n\n.w3-amber, .w3-hover-amber:hover {\n    color: #000!important;\n    background-color: #ffc107!important\n}\n\n.w3-aqua, .w3-hover-aqua:hover {\n    color: #000!important;\n    background-color: #00ffff!important\n}\n\n.w3-blue, .w3-hover-blue:hover {\n    color: #fff!important;\n    background-color: #2196F3!important\n}\n\n.w3-light-blue, .w3-hover-light-blue:hover {\n    color: #000!important;\n    background-color: #87CEEB!important\n}\n\n.w3-brown, .w3-hover-brown:hover {\n    color: #fff!important;\n    background-color: #795548!important\n}\n\n.w3-cyan, .w3-hover-cyan:hover {\n    color: #000!important;\n    background-color: #00bcd4!important\n}\n\n.w3-blue-grey, .w3-hover-blue-grey:hover, .w3-blue-gray, .w3-hover-blue-gray:hover {\n    color: #fff!important;\n    background-color: #607d8b!important\n}\n\n.w3-green, .w3-hover-green:hover {\n    color: #fff!important;\n    background-color: #4CAF50!important\n}\n\n.w3-light-green, .w3-hover-light-green:hover {\n    color: #000!important;\n    background-color: #8bc34a!important\n}\n\n.w3-indigo, .w3-hover-indigo:hover {\n    color: #fff!important;\n    background-color: #3f51b5!important\n}\n\n.w3-khaki, .w3-hover-khaki:hover {\n    color: #000!important;\n    background-color: #f0e68c!important\n}\n\n.w3-lime, .w3-hover-lime:hover {\n    color: #000!important;\n    background-color: #cddc39!important\n}\n\n.w3-orange, .w3-hover-orange:hover {\n    color: #000!important;\n    background-color: #ff9800!important\n}\n\n.w3-deep-orange, .w3-hover-deep-orange:hover {\n    color: #fff!important;\n    background-color: #ff5722!important\n}\n\n.w3-pink, .w3-hover-pink:hover {\n    color: #fff!important;\n    background-color: #e91e63!important\n}\n\n.w3-purple, .w3-hover-purple:hover {\n    color: #fff!important;\n    background-color: #9c27b0!important\n}\n\n.w3-deep-purple, .w3-hover-deep-purple:hover {\n    color: #fff!important;\n    background-color: #673ab7!important\n}\n\n.w3-red, .w3-hover-red:hover {\n    color: #fff!important;\n    background-color: #f44336!important\n}\n\n.w3-sand, .w3-hover-sand:hover {\n    color: #000!important;\n    background-color: #fdf5e6!important\n}\n\n.w3-teal, .w3-hover-teal:hover {\n    color: #fff!important;\n    background-color: #009688!important\n}\n\n.w3-yellow, .w3-hover-yellow:hover {\n    color: #000!important;\n    background-color: #ffeb3b!important\n}\n\n.w3-white, .w3-hover-white:hover {\n    color: #000!important;\n    background-color: #fff!important\n}\n\n.w3-black, .w3-hover-black:hover {\n    color: #fff!important;\n    background-color: #000!important\n}\n\n.w3-grey, .w3-hover-grey:hover, .w3-gray, .w3-hover-gray:hover {\n    color: #000!important;\n    background-color: #9e9e9e!important\n}\n\n.w3-light-grey, .w3-hover-light-grey:hover, .w3-light-gray, .w3-hover-light-gray:hover {\n    color: #000!important;\n    background-color: #f1f1f1!important\n}\n\n.w3-dark-grey, .w3-hover-dark-grey:hover, .w3-dark-gray, .w3-hover-dark-gray:hover {\n    color: #fff!important;\n    background-color: #616161!important\n}\n\n.w3-pale-red, .w3-hover-pale-red:hover {\n    color: #000!important;\n    background-color: #ffdddd!important\n}\n\n.w3-pale-green, .w3-hover-pale-green:hover {\n    color: #000!important;\n    background-color: #ddffdd!important\n}\n\n.w3-pale-yellow, .w3-hover-pale-yellow:hover {\n    color: #000!important;\n    background-color: #ffffcc!important\n}\n\n.w3-pale-blue, .w3-hover-pale-blue:hover {\n    color: #000!important;\n    background-color: #ddffff!important\n}\n\n.w3-text-amber, .w3-hover-text-amber:hover {\n    color: #ffc107!important\n}\n\n.w3-text-aqua, .w3-hover-text-aqua:hover {\n    color: #00ffff!important\n}\n\n.w3-text-blue, .w3-hover-text-blue:hover {\n    color: #2196F3!important\n}\n\n.w3-text-light-blue, .w3-hover-text-light-blue:hover {\n    color: #87CEEB!important\n}\n\n.w3-text-brown, .w3-hover-text-brown:hover {\n    color: #795548!important\n}\n\n.w3-text-cyan, .w3-hover-text-cyan:hover {\n    color: #00bcd4!important\n}\n\n.w3-text-blue-grey, .w3-hover-text-blue-grey:hover, .w3-text-blue-gray, .w3-hover-text-blue-gray:hover {\n    color: #607d8b!important\n}\n\n.w3-text-green, .w3-hover-text-green:hover {\n    color: #4CAF50!important\n}\n\n.w3-text-light-green, .w3-hover-text-light-green:hover {\n    color: #8bc34a!important\n}\n\n.w3-text-indigo, .w3-hover-text-indigo:hover {\n    color: #3f51b5!important\n}\n\n.w3-text-khaki, .w3-hover-text-khaki:hover {\n    color: #b4aa50!important\n}\n\n.w3-text-lime, .w3-hover-text-lime:hover {\n    color: #cddc39!important\n}\n\n.w3-text-orange, .w3-hover-text-orange:hover {\n    color: #ff9800!important\n}\n\n.w3-text-deep-orange, .w3-hover-text-deep-orange:hover {\n    color: #ff5722!important\n}\n\n.w3-text-pink, .w3-hover-text-pink:hover {\n    color: #e91e63!important\n}\n\n.w3-text-purple, .w3-hover-text-purple:hover {\n    color: #9c27b0!important\n}\n\n.w3-text-deep-purple, .w3-hover-text-deep-purple:hover {\n    color: #673ab7!important\n}\n\n.w3-text-red, .w3-hover-text-red:hover {\n    color: #f44336!important\n}\n\n.w3-text-sand, .w3-hover-text-sand:hover {\n    color: #fdf5e6!important\n}\n\n.w3-text-teal, .w3-hover-text-teal:hover {\n    color: #009688!important\n}\n\n.w3-text-yellow, .w3-hover-text-yellow:hover {\n    color: #d2be0e!important\n}\n\n.w3-text-white, .w3-hover-text-white:hover {\n    color: #fff!important\n}\n\n.w3-text-black, .w3-hover-text-black:hover {\n    color: #000!important\n}\n\n.w3-text-grey, .w3-hover-text-grey:hover, .w3-text-gray, .w3-hover-text-gray:hover {\n    color: #757575!important\n}\n\n.w3-text-light-grey, .w3-hover-text-light-grey:hover, .w3-text-light-gray, .w3-hover-text-light-gray:hover {\n    color: #f1f1f1!important\n}\n\n.w3-text-dark-grey, .w3-hover-text-dark-grey:hover, .w3-text-dark-gray, .w3-hover-text-dark-gray:hover {\n    color: #3a3a3a!important\n}\n\n.w3-border-amber, .w3-hover-border-amber:hover {\n    border-color: #ffc107!important\n}\n\n.w3-border-aqua, .w3-hover-border-aqua:hover {\n    border-color: #00ffff!important\n}\n\n.w3-border-blue, .w3-hover-border-blue:hover {\n    border-color: #2196F3!important\n}\n\n.w3-border-light-blue, .w3-hover-border-light-blue:hover {\n    border-color: #87CEEB!important\n}\n\n.w3-border-brown, .w3-hover-border-brown:hover {\n    border-color: #795548!important\n}\n\n.w3-border-cyan, .w3-hover-border-cyan:hover {\n    border-color: #00bcd4!important\n}\n\n.w3-border-blue-grey, .w3-hover-border-blue-grey:hover, .w3-border-blue-gray, .w3-hover-border-blue-gray:hover {\n    border-color: #607d8b!important\n}\n\n.w3-border-green, .w3-hover-border-green:hover {\n    border-color: #4CAF50!important\n}\n\n.w3-border-light-green, .w3-hover-border-light-green:hover {\n    border-color: #8bc34a!important\n}\n\n.w3-border-indigo, .w3-hover-border-indigo:hover {\n    border-color: #3f51b5!important\n}\n\n.w3-border-khaki, .w3-hover-border-khaki:hover {\n    border-color: #f0e68c!important\n}\n\n.w3-border-lime, .w3-hover-border-lime:hover {\n    border-color: #cddc39!important\n}\n\n.w3-border-orange, .w3-hover-border-orange:hover {\n    border-color: #ff9800!important\n}\n\n.w3-border-deep-orange, .w3-hover-border-deep-orange:hover {\n    border-color: #ff5722!important\n}\n\n.w3-border-pink, .w3-hover-border-pink:hover {\n    border-color: #e91e63!important\n}\n\n.w3-border-purple, .w3-hover-border-purple:hover {\n    border-color: #9c27b0!important\n}\n\n.w3-border-deep-purple, .w3-hover-border-deep-purple:hover {\n    border-color: #673ab7!important\n}\n\n.w3-border-red, .w3-hover-border-red:hover {\n    border-color: #f44336!important\n}\n\n.w3-border-sand, .w3-hover-border-sand:hover {\n    border-color: #fdf5e6!important\n}\n\n.w3-border-teal, .w3-hover-border-teal:hover {\n    border-color: #009688!important\n}\n\n.w3-border-yellow, .w3-hover-border-yellow:hover {\n    border-color: #ffeb3b!important\n}\n\n.w3-border-white, .w3-hover-border-white:hover {\n    border-color: #fff!important\n}\n\n.w3-border-black, .w3-hover-border-black:hover {\n    border-color: #000!important\n}\n\n.w3-border-grey, .w3-hover-border-grey:hover, .w3-border-gray, .w3-hover-border-gray:hover {\n    border-color: #9e9e9e!important\n}\n\n.w3-border-light-grey, .w3-hover-border-light-grey:hover, .w3-border-light-gray, .w3-hover-border-light-gray:hover {\n    border-color: #f1f1f1!important\n}\n\n.w3-border-dark-grey, .w3-hover-border-dark-grey:hover, .w3-border-dark-gray, .w3-hover-border-dark-gray:hover {\n    border-color: #616161!important\n}\n\n.w3-border-pale-red, .w3-hover-border-pale-red:hover {\n    border-color: #ffe7e7!important\n}\n\n.w3-border-pale-green, .w3-hover-border-pale-green:hover {\n    border-color: #e7ffe7!important\n}\n\n.w3-border-pale-yellow, .w3-hover-border-pale-yellow:hover {\n    border-color: #ffffcc!important\n}\n\n.w3-border-pale-blue, .w3-hover-border-pale-blue:hover {\n    border-color: #e7ffff!important\n}", "",{"version":3,"sources":["webpack://src/styles.css"],"names":[],"mappings":"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AqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI,qBAAqB;IACrB;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ;;AAEA;IACI;AACJ","sourcesContent":["/* W3.CSS 4.13 June 2019 by Jan Egil and Borge Refsnes */\n\n* {\n    padding: 0;\n    margin: 0;\n}\n\nhtml {\n    box-sizing: border-box\n}\n\n*, *:before, *:after {\n    box-sizing: inherit\n}\n\n/* Extract from normalize.css by Nicolas Gallagher and Jonathan Neal git.io/normalize */\n\nhtml {\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%\n}\n\nbody {\n    margin: 0\n}\n\narticle, aside, details, figcaption, figure, footer, header, main, menu, nav, section {\n    display: block\n}\n\nsummary {\n    display: list-item\n}\n\naudio, canvas, progress, video {\n    display: inline-block\n}\n\nprogress {\n    vertical-align: baseline\n}\n\naudio:not([controls]) {\n    display: none;\n    height: 0\n}\n\n[hidden], template {\n    display: none\n}\n\na {\n    background-color: transparent\n}\n\na:active, a:hover {\n    outline-width: 0\n}\n\nabbr[title] {\n    border-bottom: none;\n    text-decoration: underline;\n    text-decoration: underline dotted\n}\n\nb, strong {\n    font-weight: bolder\n}\n\ndfn {\n    font-style: italic\n}\n\nmark {\n    background: #ff0;\n    color: #000\n}\n\nsmall {\n    font-size: 80%\n}\n\nsub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline\n}\n\nsub {\n    bottom: -0.25em\n}\n\nsup {\n    top: -0.5em\n}\n\nfigure {\n    margin: 1em 40px\n}\n\nimg {\n    border-style: none\n}\n\ncode, kbd, pre, samp {\n    font-family: monospace, monospace;\n    font-size: 1em\n}\n\nhr {\n    box-sizing: content-box;\n    height: 0;\n    overflow: visible\n}\n\nbutton, input, select, textarea, optgroup {\n    font: inherit;\n    margin: 0\n}\n\noptgroup {\n    font-weight: bold\n}\n\nbutton, input {\n    overflow: visible\n}\n\nbutton, select {\n    text-transform: none\n}\n\nbutton, [type=button], [type=reset], [type=submit] {\n    -webkit-appearance: button\n}\n\nbutton::-moz-focus-inner, [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner {\n    border-style: none;\n    padding: 0\n}\n\nbutton:-moz-focusring, [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring {\n    outline: 1px dotted ButtonText\n}\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: .35em .625em .75em\n}\n\nlegend {\n    color: inherit;\n    display: table;\n    max-width: 100%;\n    padding: 0;\n    white-space: normal\n}\n\ntextarea {\n    overflow: auto\n}\n\n[type=checkbox], [type=radio] {\n    padding: 0\n}\n\n[type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {\n    height: auto\n}\n\n[type=search] {\n    -webkit-appearance: textfield;\n    outline-offset: -2px\n}\n\n[type=search]::-webkit-search-decoration {\n    -webkit-appearance: none\n}\n\n::-webkit-file-upload-button {\n    -webkit-appearance: button;\n    font: inherit\n}\n\n/* End extract */\n\nhtml, body {\n    font-family: Verdana, sans-serif;\n    font-size: 15px;\n    line-height: 1.5\n}\n\nhtml {\n    overflow-x: hidden\n}\n\nh1 {\n    font-size: 36px\n}\n\nh2 {\n    font-size: 30px\n}\n\nh3 {\n    font-size: 24px\n}\n\nh4 {\n    font-size: 20px\n}\n\nh5 {\n    font-size: 18px\n}\n\nh6 {\n    font-size: 16px\n}\n\n.w3-serif {\n    font-family: serif\n}\n\nh1, h2, h3, h4, h5, h6 {\n    font-family: \"Segoe UI\", Arial, sans-serif;\n    font-weight: 400;\n    margin: 10px 0\n}\n\n.w3-wide {\n    letter-spacing: 4px\n}\n\nhr {\n    border: 0;\n    border-top: 1px solid #eee;\n    margin: 20px 0\n}\n\n.w3-image {\n    max-width: 100%;\n    height: auto\n}\n\nimg {\n    vertical-align: middle\n}\n\na {\n    color: inherit\n}\n\n.w3-table, .w3-table-all {\n    border-collapse: collapse;\n    border-spacing: 0;\n    width: 100%;\n    display: table\n}\n\n.w3-table-all {\n    border: 1px solid #ccc\n}\n\n.w3-bordered tr, .w3-table-all tr {\n    border-bottom: 1px solid #ddd\n}\n\n.w3-striped tbody tr:nth-child(even) {\n    background-color: #f1f1f1\n}\n\n.w3-table-all tr:nth-child(odd) {\n    background-color: #fff\n}\n\n.w3-table-all tr:nth-child(even) {\n    background-color: #f1f1f1\n}\n\n.w3-hoverable tbody tr:hover, .w3-ul.w3-hoverable li:hover {\n    background-color: #ccc\n}\n\n.w3-centered tr th, .w3-centered tr td {\n    text-align: center\n}\n\n.w3-table td, .w3-table th, .w3-table-all td, .w3-table-all th {\n    padding: 8px 8px;\n    display: table-cell;\n    text-align: left;\n    vertical-align: top\n}\n\n.w3-table th:first-child, .w3-table td:first-child, .w3-table-all th:first-child, .w3-table-all td:first-child {\n    padding-left: 16px\n}\n\n.w3-btn, .w3-button {\n    border: none;\n    display: inline-block;\n    padding: 8px 16px;\n    vertical-align: middle;\n    overflow: hidden;\n    text-decoration: none;\n    color: inherit;\n    background-color: inherit;\n    text-align: center;\n    cursor: pointer;\n    white-space: nowrap\n}\n\n.w3-btn:hover {\n    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)\n}\n\n.w3-btn, .w3-button {\n    -webkit-touch-callout: none;\n    -webkit-user-select: none;\n    -khtml-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none\n}\n\n.w3-disabled, .w3-btn:disabled, .w3-button:disabled {\n    cursor: not-allowed;\n    opacity: 0.3\n}\n\n.w3-disabled *, :disabled * {\n    pointer-events: none\n}\n\n.w3-btn.w3-disabled:hover, .w3-btn:disabled:hover {\n    box-shadow: none\n}\n\n.w3-badge, .w3-tag {\n    background-color: #000;\n    color: #fff;\n    display: inline-block;\n    padding-left: 8px;\n    padding-right: 8px;\n    text-align: center\n}\n\n.w3-badge {\n    border-radius: 50%\n}\n\n.w3-ul {\n    list-style-type: none;\n    padding: 0;\n    margin: 0\n}\n\n.w3-ul li {\n    padding: 8px 16px;\n    border-bottom: 1px solid #ddd\n}\n\n.w3-ul li:last-child {\n    border-bottom: none\n}\n\n.w3-tooltip, .w3-display-container {\n    position: relative\n}\n\n.w3-tooltip .w3-text {\n    display: none\n}\n\n.w3-tooltip:hover .w3-text {\n    display: inline-block\n}\n\n.w3-ripple:active {\n    opacity: 0.5\n}\n\n.w3-ripple {\n    transition: opacity 0s\n}\n\n.w3-input {\n    padding: 8px;\n    display: block;\n    border: none;\n    border-bottom: 1px solid #ccc;\n    width: 100%\n}\n\n.w3-select {\n    padding: 9px 0;\n    width: 100%;\n    border: none;\n    border-bottom: 1px solid #ccc\n}\n\n.w3-dropdown-click, .w3-dropdown-hover {\n    position: relative;\n    display: inline-block;\n    cursor: pointer\n}\n\n.w3-dropdown-hover:hover .w3-dropdown-content {\n    display: block\n}\n\n.w3-dropdown-hover:first-child, .w3-dropdown-click:hover {\n    background-color: #ccc;\n    color: #000\n}\n\n.w3-dropdown-hover:hover>.w3-button:first-child, .w3-dropdown-click:hover>.w3-button:first-child {\n    background-color: #ccc;\n    color: #000\n}\n\n.w3-dropdown-content {\n    cursor: auto;\n    color: #000;\n    background-color: #fff;\n    display: none;\n    position: absolute;\n    min-width: 160px;\n    margin: 0;\n    padding: 0;\n    z-index: 1\n}\n\n.w3-check, .w3-radio {\n    width: 24px;\n    height: 24px;\n    position: relative;\n    top: 6px\n}\n\n.w3-sidebar {\n    height: 100%;\n    width: 200px;\n    background-color: #fff;\n    position: fixed!important;\n    z-index: 1;\n    overflow: auto\n}\n\n.w3-bar-block .w3-dropdown-hover, .w3-bar-block .w3-dropdown-click {\n    width: 100%\n}\n\n.w3-bar-block .w3-dropdown-hover .w3-dropdown-content, .w3-bar-block .w3-dropdown-click .w3-dropdown-content {\n    min-width: 100%\n}\n\n.w3-bar-block .w3-dropdown-hover .w3-button, .w3-bar-block .w3-dropdown-click .w3-button {\n    width: 100%;\n    text-align: left;\n    padding: 8px 16px\n}\n\n.w3-main, #main {\n    transition: margin-left .4s\n}\n\n.w3-modal {\n    z-index: 3;\n    display: none;\n    padding-top: 100px;\n    position: fixed;\n    left: 0;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    overflow: auto;\n    background-color: rgb(0, 0, 0);\n    background-color: rgba(0, 0, 0, 0.4)\n}\n\n.w3-modal-content {\n    margin: auto;\n    background-color: #fff;\n    position: relative;\n    padding: 0;\n    outline: 0;\n    width: 600px\n}\n\n.w3-bar {\n    width: 100%;\n    overflow: hidden\n}\n\n.w3-center .w3-bar {\n    display: inline-block;\n    width: auto\n}\n\n.w3-bar .w3-bar-item {\n    padding: 8px 16px;\n    float: left;\n    width: auto;\n    border: none;\n    display: block;\n    outline: 0\n}\n\n.w3-bar .w3-dropdown-hover, .w3-bar .w3-dropdown-click {\n    position: static;\n    float: left\n}\n\n.w3-bar .w3-button {\n    white-space: normal\n}\n\n.w3-bar-block .w3-bar-item {\n    width: 100%;\n    display: block;\n    padding: 8px 16px;\n    text-align: left;\n    border: none;\n    white-space: normal;\n    float: none;\n    outline: 0\n}\n\n.w3-bar-block.w3-center .w3-bar-item {\n    text-align: center\n}\n\n.w3-block {\n    display: block;\n    width: 100%\n}\n\n.w3-responsive {\n    display: block;\n    overflow-x: auto\n}\n\n.w3-container:after, .w3-container:before, .w3-panel:after, .w3-panel:before, .w3-row:after, .w3-row:before, .w3-row-padding:after, .w3-row-padding:before, .w3-cell-row:before, .w3-cell-row:after, .w3-clear:after, .w3-clear:before, .w3-bar:before, .w3-bar:after {\n    content: \"\";\n    display: table;\n    clear: both\n}\n\n.w3-col, .w3-half, .w3-third, .w3-twothird, .w3-threequarter, .w3-quarter {\n    float: left;\n    width: 100%\n}\n\n.w3-col.s1 {\n    width: 8.33333%\n}\n\n.w3-col.s2 {\n    width: 16.66666%\n}\n\n.w3-col.s3 {\n    width: 24.99999%\n}\n\n.w3-col.s4 {\n    width: 33.33333%\n}\n\n.w3-col.s5 {\n    width: 41.66666%\n}\n\n.w3-col.s6 {\n    width: 49.99999%\n}\n\n.w3-col.s7 {\n    width: 58.33333%\n}\n\n.w3-col.s8 {\n    width: 66.66666%\n}\n\n.w3-col.s9 {\n    width: 74.99999%\n}\n\n.w3-col.s10 {\n    width: 83.33333%\n}\n\n.w3-col.s11 {\n    width: 91.66666%\n}\n\n.w3-col.s12 {\n    width: 99.99999%\n}\n\n@media (min-width:601px) {\n    .w3-col.m1 {\n        width: 8.33333%\n    }\n    .w3-col.m2 {\n        width: 16.66666%\n    }\n    .w3-col.m3, .w3-quarter {\n        width: 24.99999%\n    }\n    .w3-col.m4, .w3-third {\n        width: 33.33333%\n    }\n    .w3-col.m5 {\n        width: 41.66666%\n    }\n    .w3-col.m6, .w3-half {\n        width: 49.99999%\n    }\n    .w3-col.m7 {\n        width: 58.33333%\n    }\n    .w3-col.m8, .w3-twothird {\n        width: 66.66666%\n    }\n    .w3-col.m9, .w3-threequarter {\n        width: 74.99999%\n    }\n    .w3-col.m10 {\n        width: 83.33333%\n    }\n    .w3-col.m11 {\n        width: 91.66666%\n    }\n    .w3-col.m12 {\n        width: 99.99999%\n    }\n}\n\n@media (min-width:993px) {\n    .w3-col.l1 {\n        width: 8.33333%\n    }\n    .w3-col.l2 {\n        width: 16.66666%\n    }\n    .w3-col.l3 {\n        width: 24.99999%\n    }\n    .w3-col.l4 {\n        width: 33.33333%\n    }\n    .w3-col.l5 {\n        width: 41.66666%\n    }\n    .w3-col.l6 {\n        width: 49.99999%\n    }\n    .w3-col.l7 {\n        width: 58.33333%\n    }\n    .w3-col.l8 {\n        width: 66.66666%\n    }\n    .w3-col.l9 {\n        width: 74.99999%\n    }\n    .w3-col.l10 {\n        width: 83.33333%\n    }\n    .w3-col.l11 {\n        width: 91.66666%\n    }\n    .w3-col.l12 {\n        width: 99.99999%\n    }\n}\n\n.w3-rest {\n    overflow: hidden\n}\n\n.w3-stretch {\n    margin-left: -16px;\n    margin-right: -16px\n}\n\n.w3-content, .w3-auto {\n    margin-left: auto;\n    margin-right: auto\n}\n\n.w3-content {\n    max-width: 980px\n}\n\n.w3-auto {\n    max-width: 1140px\n}\n\n.w3-cell-row {\n    display: table;\n    width: 100%\n}\n\n.w3-cell {\n    display: table-cell\n}\n\n.w3-cell-top {\n    vertical-align: top\n}\n\n.w3-cell-middle {\n    vertical-align: middle\n}\n\n.w3-cell-bottom {\n    vertical-align: bottom\n}\n\n.w3-hide {\n    display: none!important\n}\n\n.w3-show-block, .w3-show {\n    display: block!important\n}\n\n.w3-show-inline-block {\n    display: inline-block!important\n}\n\n@media (max-width:1205px) {\n    .w3-auto {\n        max-width: 95%\n    }\n}\n\n@media (max-width:600px) {\n    .w3-modal-content {\n        margin: 0 10px;\n        width: auto!important\n    }\n    .w3-modal {\n        padding-top: 30px\n    }\n    .w3-dropdown-hover.w3-mobile .w3-dropdown-content, .w3-dropdown-click.w3-mobile .w3-dropdown-content {\n        position: relative\n    }\n    .w3-hide-small {\n        display: none!important\n    }\n    .w3-mobile {\n        display: block;\n        width: 100%!important\n    }\n    .w3-bar-item.w3-mobile, .w3-dropdown-hover.w3-mobile, .w3-dropdown-click.w3-mobile {\n        text-align: center\n    }\n    .w3-dropdown-hover.w3-mobile, .w3-dropdown-hover.w3-mobile .w3-btn, .w3-dropdown-hover.w3-mobile .w3-button, .w3-dropdown-click.w3-mobile, .w3-dropdown-click.w3-mobile .w3-btn, .w3-dropdown-click.w3-mobile .w3-button {\n        width: 100%\n    }\n}\n\n@media (max-width:768px) {\n    .w3-modal-content {\n        width: 500px\n    }\n    .w3-modal {\n        padding-top: 50px\n    }\n}\n\n@media (min-width:993px) {\n    .w3-modal-content {\n        width: 900px\n    }\n    .w3-hide-large {\n        display: none!important\n    }\n    .w3-sidebar.w3-collapse {\n        display: block!important\n    }\n}\n\n@media (max-width:992px) and (min-width:601px) {\n    .w3-hide-medium {\n        display: none!important\n    }\n}\n\n@media (max-width:992px) {\n    .w3-sidebar.w3-collapse {\n        display: none\n    }\n    .w3-main {\n        margin-left: 0!important;\n        margin-right: 0!important\n    }\n    .w3-auto {\n        max-width: 100%\n    }\n}\n\n.w3-top, .w3-bottom {\n    position: fixed;\n    width: 100%;\n    z-index: 1\n}\n\n.w3-top {\n    top: 0\n}\n\n.w3-bottom {\n    bottom: 0\n}\n\n.w3-overlay {\n    position: fixed;\n    display: none;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background-color: rgba(0, 0, 0, 0.5);\n    z-index: 2\n}\n\n.w3-display-topleft {\n    position: absolute;\n    left: 0;\n    top: 0\n}\n\n.w3-display-topright {\n    position: absolute;\n    right: 0;\n    top: 0\n}\n\n.w3-display-bottomleft {\n    position: absolute;\n    left: 0;\n    bottom: 0\n}\n\n.w3-display-bottomright {\n    position: absolute;\n    right: 0;\n    bottom: 0\n}\n\n.w3-display-middle {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    -ms-transform: translate(-50%, -50%)\n}\n\n.w3-display-left {\n    position: absolute;\n    top: 50%;\n    left: 0%;\n    transform: translate(0%, -50%);\n    -ms-transform: translate(-0%, -50%)\n}\n\n.w3-display-right {\n    position: absolute;\n    top: 50%;\n    right: 0%;\n    transform: translate(0%, -50%);\n    -ms-transform: translate(0%, -50%)\n}\n\n.w3-display-topmiddle {\n    position: absolute;\n    left: 50%;\n    top: 0;\n    transform: translate(-50%, 0%);\n    -ms-transform: translate(-50%, 0%)\n}\n\n.w3-display-bottommiddle {\n    position: absolute;\n    left: 50%;\n    bottom: 0;\n    transform: translate(-50%, 0%);\n    -ms-transform: translate(-50%, 0%)\n}\n\n.w3-display-container:hover .w3-display-hover {\n    display: block\n}\n\n.w3-display-container:hover span.w3-display-hover {\n    display: inline-block\n}\n\n.w3-display-hover {\n    display: none\n}\n\n.w3-display-position {\n    position: absolute\n}\n\n.w3-circle {\n    border-radius: 50%\n}\n\n.w3-round-small {\n    border-radius: 2px\n}\n\n.w3-round, .w3-round-medium {\n    border-radius: 4px\n}\n\n.w3-round-large {\n    border-radius: 8px\n}\n\n.w3-round-xlarge {\n    border-radius: 16px\n}\n\n.w3-round-xxlarge {\n    border-radius: 32px\n}\n\n.w3-row-padding, .w3-row-padding>.w3-half, .w3-row-padding>.w3-third, .w3-row-padding>.w3-twothird, .w3-row-padding>.w3-threequarter, .w3-row-padding>.w3-quarter, .w3-row-padding>.w3-col {\n    padding: 0 8px\n}\n\n.w3-container, .w3-panel {\n    padding: 0.01em 16px\n}\n\n.w3-panel {\n    margin-top: 16px;\n    margin-bottom: 16px\n}\n\n.w3-code, .w3-codespan {\n    font-family: Consolas, \"courier new\";\n    font-size: 16px\n}\n\n.w3-code {\n    width: auto;\n    background-color: #fff;\n    padding: 8px 12px;\n    border-left: 4px solid #4CAF50;\n    word-wrap: break-word\n}\n\n.w3-codespan {\n    color: crimson;\n    background-color: #f1f1f1;\n    padding-left: 4px;\n    padding-right: 4px;\n    font-size: 110%\n}\n\n.w3-card, .w3-card-2 {\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)\n}\n\n.w3-card-4, .w3-hover-shadow:hover {\n    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.2), 0 4px 20px 0 rgba(0, 0, 0, 0.19)\n}\n\n.w3-spin {\n    animation: w3-spin 2s infinite linear\n}\n\n@keyframes w3-spin {\n    0% {\n        transform: rotate(0deg)\n    }\n    100% {\n        transform: rotate(359deg)\n    }\n}\n\n.w3-animate-fading {\n    animation: fading 10s infinite\n}\n\n@keyframes fading {\n    0% {\n        opacity: 0\n    }\n    50% {\n        opacity: 1\n    }\n    100% {\n        opacity: 0\n    }\n}\n\n.w3-animate-opacity {\n    animation: opac 0.8s\n}\n\n@keyframes opac {\n    from {\n        opacity: 0\n    }\n    to {\n        opacity: 1\n    }\n}\n\n.w3-animate-top {\n    position: relative;\n    animation: animatetop 0.4s\n}\n\n@keyframes animatetop {\n    from {\n        top: -300px;\n        opacity: 0\n    }\n    to {\n        top: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-left {\n    position: relative;\n    animation: animateleft 0.4s\n}\n\n@keyframes animateleft {\n    from {\n        left: -300px;\n        opacity: 0\n    }\n    to {\n        left: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-right {\n    position: relative;\n    animation: animateright 0.4s\n}\n\n@keyframes animateright {\n    from {\n        right: -300px;\n        opacity: 0\n    }\n    to {\n        right: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-bottom {\n    position: relative;\n    animation: animatebottom 0.4s\n}\n\n@keyframes animatebottom {\n    from {\n        bottom: -300px;\n        opacity: 0\n    }\n    to {\n        bottom: 0;\n        opacity: 1\n    }\n}\n\n.w3-animate-zoom {\n    animation: animatezoom 0.6s\n}\n\n@keyframes animatezoom {\n    from {\n        transform: scale(0)\n    }\n    to {\n        transform: scale(1)\n    }\n}\n\n.w3-animate-input {\n    transition: width 0.4s ease-in-out\n}\n\n.w3-animate-input:focus {\n    width: 100%!important\n}\n\n.w3-opacity, .w3-hover-opacity:hover {\n    opacity: 0.60\n}\n\n.w3-opacity-off, .w3-hover-opacity-off:hover {\n    opacity: 1\n}\n\n.w3-opacity-max {\n    opacity: 0.25\n}\n\n.w3-opacity-min {\n    opacity: 0.75\n}\n\n.w3-greyscale-max, .w3-grayscale-max, .w3-hover-greyscale:hover, .w3-hover-grayscale:hover {\n    filter: grayscale(100%)\n}\n\n.w3-greyscale, .w3-grayscale {\n    filter: grayscale(75%)\n}\n\n.w3-greyscale-min, .w3-grayscale-min {\n    filter: grayscale(50%)\n}\n\n.w3-sepia {\n    filter: sepia(75%)\n}\n\n.w3-sepia-max, .w3-hover-sepia:hover {\n    filter: sepia(100%)\n}\n\n.w3-sepia-min {\n    filter: sepia(50%)\n}\n\n.w3-tiny {\n    font-size: 10px!important\n}\n\n.w3-small {\n    font-size: 12px!important\n}\n\n.w3-medium {\n    font-size: 15px!important\n}\n\n.w3-large {\n    font-size: 18px!important\n}\n\n.w3-xlarge {\n    font-size: 24px!important\n}\n\n.w3-xxlarge {\n    font-size: 36px!important\n}\n\n.w3-xxxlarge {\n    font-size: 48px!important\n}\n\n.w3-jumbo {\n    font-size: 64px!important\n}\n\n.w3-left-align {\n    text-align: left!important\n}\n\n.w3-right-align {\n    text-align: right!important\n}\n\n.w3-justify {\n    text-align: justify!important\n}\n\n.w3-center {\n    text-align: center!important\n}\n\n.w3-border-0 {\n    border: 0!important\n}\n\n.w3-border {\n    border: 1px solid #ccc!important\n}\n\n.w3-border-top {\n    border-top: 1px solid #ccc!important\n}\n\n.w3-border-bottom {\n    border-bottom: 1px solid #ccc!important\n}\n\n.w3-border-left {\n    border-left: 1px solid #ccc!important\n}\n\n.w3-border-right {\n    border-right: 1px solid #ccc!important\n}\n\n.w3-topbar {\n    border-top: 6px solid #ccc!important\n}\n\n.w3-bottombar {\n    border-bottom: 6px solid #ccc!important\n}\n\n.w3-leftbar {\n    border-left: 6px solid #ccc!important\n}\n\n.w3-rightbar {\n    border-right: 6px solid #ccc!important\n}\n\n.w3-section, .w3-code {\n    margin-top: 16px!important;\n    margin-bottom: 16px!important\n}\n\n.w3-margin {\n    margin: 16px!important\n}\n\n.w3-margin-top {\n    margin-top: 16px!important\n}\n\n.w3-margin-bottom {\n    margin-bottom: 16px!important\n}\n\n.w3-margin-left {\n    margin-left: 16px!important\n}\n\n.w3-margin-right {\n    margin-right: 16px!important\n}\n\n.w3-padding-small {\n    padding: 4px 8px!important\n}\n\n.w3-padding {\n    padding: 8px 16px!important\n}\n\n.w3-padding-large {\n    padding: 12px 24px!important\n}\n\n.w3-padding-16 {\n    padding-top: 16px!important;\n    padding-bottom: 16px!important\n}\n\n.w3-padding-24 {\n    padding-top: 24px!important;\n    padding-bottom: 24px!important\n}\n\n.w3-padding-32 {\n    padding-top: 32px!important;\n    padding-bottom: 32px!important\n}\n\n.w3-padding-48 {\n    padding-top: 48px!important;\n    padding-bottom: 48px!important\n}\n\n.w3-padding-64 {\n    padding-top: 64px!important;\n    padding-bottom: 64px!important\n}\n\n.w3-left {\n    float: left!important\n}\n\n.w3-right {\n    float: right!important\n}\n\n.w3-button:hover {\n    color: #000!important;\n    background-color: #ccc!important\n}\n\n.w3-transparent, .w3-hover-none:hover {\n    background-color: transparent!important\n}\n\n.w3-hover-none:hover {\n    box-shadow: none!important\n}\n\n/* Colors */\n\n.w3-amber, .w3-hover-amber:hover {\n    color: #000!important;\n    background-color: #ffc107!important\n}\n\n.w3-aqua, .w3-hover-aqua:hover {\n    color: #000!important;\n    background-color: #00ffff!important\n}\n\n.w3-blue, .w3-hover-blue:hover {\n    color: #fff!important;\n    background-color: #2196F3!important\n}\n\n.w3-light-blue, .w3-hover-light-blue:hover {\n    color: #000!important;\n    background-color: #87CEEB!important\n}\n\n.w3-brown, .w3-hover-brown:hover {\n    color: #fff!important;\n    background-color: #795548!important\n}\n\n.w3-cyan, .w3-hover-cyan:hover {\n    color: #000!important;\n    background-color: #00bcd4!important\n}\n\n.w3-blue-grey, .w3-hover-blue-grey:hover, .w3-blue-gray, .w3-hover-blue-gray:hover {\n    color: #fff!important;\n    background-color: #607d8b!important\n}\n\n.w3-green, .w3-hover-green:hover {\n    color: #fff!important;\n    background-color: #4CAF50!important\n}\n\n.w3-light-green, .w3-hover-light-green:hover {\n    color: #000!important;\n    background-color: #8bc34a!important\n}\n\n.w3-indigo, .w3-hover-indigo:hover {\n    color: #fff!important;\n    background-color: #3f51b5!important\n}\n\n.w3-khaki, .w3-hover-khaki:hover {\n    color: #000!important;\n    background-color: #f0e68c!important\n}\n\n.w3-lime, .w3-hover-lime:hover {\n    color: #000!important;\n    background-color: #cddc39!important\n}\n\n.w3-orange, .w3-hover-orange:hover {\n    color: #000!important;\n    background-color: #ff9800!important\n}\n\n.w3-deep-orange, .w3-hover-deep-orange:hover {\n    color: #fff!important;\n    background-color: #ff5722!important\n}\n\n.w3-pink, .w3-hover-pink:hover {\n    color: #fff!important;\n    background-color: #e91e63!important\n}\n\n.w3-purple, .w3-hover-purple:hover {\n    color: #fff!important;\n    background-color: #9c27b0!important\n}\n\n.w3-deep-purple, .w3-hover-deep-purple:hover {\n    color: #fff!important;\n    background-color: #673ab7!important\n}\n\n.w3-red, .w3-hover-red:hover {\n    color: #fff!important;\n    background-color: #f44336!important\n}\n\n.w3-sand, .w3-hover-sand:hover {\n    color: #000!important;\n    background-color: #fdf5e6!important\n}\n\n.w3-teal, .w3-hover-teal:hover {\n    color: #fff!important;\n    background-color: #009688!important\n}\n\n.w3-yellow, .w3-hover-yellow:hover {\n    color: #000!important;\n    background-color: #ffeb3b!important\n}\n\n.w3-white, .w3-hover-white:hover {\n    color: #000!important;\n    background-color: #fff!important\n}\n\n.w3-black, .w3-hover-black:hover {\n    color: #fff!important;\n    background-color: #000!important\n}\n\n.w3-grey, .w3-hover-grey:hover, .w3-gray, .w3-hover-gray:hover {\n    color: #000!important;\n    background-color: #9e9e9e!important\n}\n\n.w3-light-grey, .w3-hover-light-grey:hover, .w3-light-gray, .w3-hover-light-gray:hover {\n    color: #000!important;\n    background-color: #f1f1f1!important\n}\n\n.w3-dark-grey, .w3-hover-dark-grey:hover, .w3-dark-gray, .w3-hover-dark-gray:hover {\n    color: #fff!important;\n    background-color: #616161!important\n}\n\n.w3-pale-red, .w3-hover-pale-red:hover {\n    color: #000!important;\n    background-color: #ffdddd!important\n}\n\n.w3-pale-green, .w3-hover-pale-green:hover {\n    color: #000!important;\n    background-color: #ddffdd!important\n}\n\n.w3-pale-yellow, .w3-hover-pale-yellow:hover {\n    color: #000!important;\n    background-color: #ffffcc!important\n}\n\n.w3-pale-blue, .w3-hover-pale-blue:hover {\n    color: #000!important;\n    background-color: #ddffff!important\n}\n\n.w3-text-amber, .w3-hover-text-amber:hover {\n    color: #ffc107!important\n}\n\n.w3-text-aqua, .w3-hover-text-aqua:hover {\n    color: #00ffff!important\n}\n\n.w3-text-blue, .w3-hover-text-blue:hover {\n    color: #2196F3!important\n}\n\n.w3-text-light-blue, .w3-hover-text-light-blue:hover {\n    color: #87CEEB!important\n}\n\n.w3-text-brown, .w3-hover-text-brown:hover {\n    color: #795548!important\n}\n\n.w3-text-cyan, .w3-hover-text-cyan:hover {\n    color: #00bcd4!important\n}\n\n.w3-text-blue-grey, .w3-hover-text-blue-grey:hover, .w3-text-blue-gray, .w3-hover-text-blue-gray:hover {\n    color: #607d8b!important\n}\n\n.w3-text-green, .w3-hover-text-green:hover {\n    color: #4CAF50!important\n}\n\n.w3-text-light-green, .w3-hover-text-light-green:hover {\n    color: #8bc34a!important\n}\n\n.w3-text-indigo, .w3-hover-text-indigo:hover {\n    color: #3f51b5!important\n}\n\n.w3-text-khaki, .w3-hover-text-khaki:hover {\n    color: #b4aa50!important\n}\n\n.w3-text-lime, .w3-hover-text-lime:hover {\n    color: #cddc39!important\n}\n\n.w3-text-orange, .w3-hover-text-orange:hover {\n    color: #ff9800!important\n}\n\n.w3-text-deep-orange, .w3-hover-text-deep-orange:hover {\n    color: #ff5722!important\n}\n\n.w3-text-pink, .w3-hover-text-pink:hover {\n    color: #e91e63!important\n}\n\n.w3-text-purple, .w3-hover-text-purple:hover {\n    color: #9c27b0!important\n}\n\n.w3-text-deep-purple, .w3-hover-text-deep-purple:hover {\n    color: #673ab7!important\n}\n\n.w3-text-red, .w3-hover-text-red:hover {\n    color: #f44336!important\n}\n\n.w3-text-sand, .w3-hover-text-sand:hover {\n    color: #fdf5e6!important\n}\n\n.w3-text-teal, .w3-hover-text-teal:hover {\n    color: #009688!important\n}\n\n.w3-text-yellow, .w3-hover-text-yellow:hover {\n    color: #d2be0e!important\n}\n\n.w3-text-white, .w3-hover-text-white:hover {\n    color: #fff!important\n}\n\n.w3-text-black, .w3-hover-text-black:hover {\n    color: #000!important\n}\n\n.w3-text-grey, .w3-hover-text-grey:hover, .w3-text-gray, .w3-hover-text-gray:hover {\n    color: #757575!important\n}\n\n.w3-text-light-grey, .w3-hover-text-light-grey:hover, .w3-text-light-gray, .w3-hover-text-light-gray:hover {\n    color: #f1f1f1!important\n}\n\n.w3-text-dark-grey, .w3-hover-text-dark-grey:hover, .w3-text-dark-gray, .w3-hover-text-dark-gray:hover {\n    color: #3a3a3a!important\n}\n\n.w3-border-amber, .w3-hover-border-amber:hover {\n    border-color: #ffc107!important\n}\n\n.w3-border-aqua, .w3-hover-border-aqua:hover {\n    border-color: #00ffff!important\n}\n\n.w3-border-blue, .w3-hover-border-blue:hover {\n    border-color: #2196F3!important\n}\n\n.w3-border-light-blue, .w3-hover-border-light-blue:hover {\n    border-color: #87CEEB!important\n}\n\n.w3-border-brown, .w3-hover-border-brown:hover {\n    border-color: #795548!important\n}\n\n.w3-border-cyan, .w3-hover-border-cyan:hover {\n    border-color: #00bcd4!important\n}\n\n.w3-border-blue-grey, .w3-hover-border-blue-grey:hover, .w3-border-blue-gray, .w3-hover-border-blue-gray:hover {\n    border-color: #607d8b!important\n}\n\n.w3-border-green, .w3-hover-border-green:hover {\n    border-color: #4CAF50!important\n}\n\n.w3-border-light-green, .w3-hover-border-light-green:hover {\n    border-color: #8bc34a!important\n}\n\n.w3-border-indigo, .w3-hover-border-indigo:hover {\n    border-color: #3f51b5!important\n}\n\n.w3-border-khaki, .w3-hover-border-khaki:hover {\n    border-color: #f0e68c!important\n}\n\n.w3-border-lime, .w3-hover-border-lime:hover {\n    border-color: #cddc39!important\n}\n\n.w3-border-orange, .w3-hover-border-orange:hover {\n    border-color: #ff9800!important\n}\n\n.w3-border-deep-orange, .w3-hover-border-deep-orange:hover {\n    border-color: #ff5722!important\n}\n\n.w3-border-pink, .w3-hover-border-pink:hover {\n    border-color: #e91e63!important\n}\n\n.w3-border-purple, .w3-hover-border-purple:hover {\n    border-color: #9c27b0!important\n}\n\n.w3-border-deep-purple, .w3-hover-border-deep-purple:hover {\n    border-color: #673ab7!important\n}\n\n.w3-border-red, .w3-hover-border-red:hover {\n    border-color: #f44336!important\n}\n\n.w3-border-sand, .w3-hover-border-sand:hover {\n    border-color: #fdf5e6!important\n}\n\n.w3-border-teal, .w3-hover-border-teal:hover {\n    border-color: #009688!important\n}\n\n.w3-border-yellow, .w3-hover-border-yellow:hover {\n    border-color: #ffeb3b!important\n}\n\n.w3-border-white, .w3-hover-border-white:hover {\n    border-color: #fff!important\n}\n\n.w3-border-black, .w3-hover-border-black:hover {\n    border-color: #000!important\n}\n\n.w3-border-grey, .w3-hover-border-grey:hover, .w3-border-gray, .w3-hover-border-gray:hover {\n    border-color: #9e9e9e!important\n}\n\n.w3-border-light-grey, .w3-hover-border-light-grey:hover, .w3-border-light-gray, .w3-hover-border-light-gray:hover {\n    border-color: #f1f1f1!important\n}\n\n.w3-border-dark-grey, .w3-hover-border-dark-grey:hover, .w3-border-dark-gray, .w3-hover-border-dark-gray:hover {\n    border-color: #616161!important\n}\n\n.w3-border-pale-red, .w3-hover-border-pale-red:hover {\n    border-color: #ffe7e7!important\n}\n\n.w3-border-pale-green, .w3-hover-border-pale-green:hover {\n    border-color: #e7ffe7!important\n}\n\n.w3-border-pale-yellow, .w3-hover-border-pale-yellow:hover {\n    border-color: #ffffcc!important\n}\n\n.w3-border-pale-blue, .w3-hover-border-pale-blue:hover {\n    border-color: #e7ffff!important\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=styles.js.map