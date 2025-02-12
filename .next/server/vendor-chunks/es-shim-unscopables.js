"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/es-shim-unscopables";
exports.ids = ["vendor-chunks/es-shim-unscopables"];
exports.modules = {

/***/ "(rsc)/./node_modules/es-shim-unscopables/index.js":
/*!***************************************************!*\
  !*** ./node_modules/es-shim-unscopables/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar hasOwn = __webpack_require__(/*! hasown */ \"(rsc)/./node_modules/hasown/index.js\");\n\nvar hasUnscopables = typeof Symbol === 'function' && typeof Symbol.unscopables === 'symbol';\n\nvar map = hasUnscopables && Array.prototype[Symbol.unscopables];\n\nvar $TypeError = TypeError;\n\nmodule.exports = function shimUnscopables(method) {\n\tif (typeof method !== 'string' || !method) {\n\t\tthrow new $TypeError('method must be a non-empty string');\n\t}\n\tif (!hasOwn(Array.prototype, method)) {\n\t\tthrow new $TypeError('method must be on Array.prototype');\n\t}\n\tif (hasUnscopables) {\n\t\tmap[method] = true;\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZXMtc2hpbS11bnNjb3BhYmxlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsb0RBQVE7O0FBRTdCOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcZGFyc2hcXE9uZURyaXZlXFxEZXNrdG9wXFxDb2RlXFxNRVJOIFdlYiBEZXZcXEdyYXBoaVxcbm9kZV9tb2R1bGVzXFxlcy1zaGltLXVuc2NvcGFibGVzXFxpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBoYXNPd24gPSByZXF1aXJlKCdoYXNvd24nKTtcblxudmFyIGhhc1Vuc2NvcGFibGVzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLnVuc2NvcGFibGVzID09PSAnc3ltYm9sJztcblxudmFyIG1hcCA9IGhhc1Vuc2NvcGFibGVzICYmIEFycmF5LnByb3RvdHlwZVtTeW1ib2wudW5zY29wYWJsZXNdO1xuXG52YXIgJFR5cGVFcnJvciA9IFR5cGVFcnJvcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzaGltVW5zY29wYWJsZXMobWV0aG9kKSB7XG5cdGlmICh0eXBlb2YgbWV0aG9kICE9PSAnc3RyaW5nJyB8fCAhbWV0aG9kKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ21ldGhvZCBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmICghaGFzT3duKEFycmF5LnByb3RvdHlwZSwgbWV0aG9kKSkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdtZXRob2QgbXVzdCBiZSBvbiBBcnJheS5wcm90b3R5cGUnKTtcblx0fVxuXHRpZiAoaGFzVW5zY29wYWJsZXMpIHtcblx0XHRtYXBbbWV0aG9kXSA9IHRydWU7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/es-shim-unscopables/index.js\n");

/***/ })

};
;