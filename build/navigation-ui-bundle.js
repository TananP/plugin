/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* eslint-env browser */

class RegisterHtmlTemplate {
  /**
   * Create a `<template>` element to hold `<dom-module>` content.
   * This bit of code will execute in the context of the main document,
   * calling `importNode` on the `<template>`, which in turn triggers
   * the lifecycle of the `<dom-module>` and allows it to insert its
   * content into Polymer's global module map. When a Polymer element
   * boots up it will fetch its template from this module map.
   * https://github.com/Polymer/polymer/blob/master/lib/mixins/element-mixin.html#L501-L538
   * @param {string} val A `<dom-module>` as an HTML string
   */
  static register(val) {
    let content;
    const template = document.createElement('template');
    template.innerHTML = val;
    if (template.content) {
      content = template.content; // eslint-disable-line prefer-destructuring
    } else {
      content = document.createDocumentFragment();
      while (template.firstChild) {
        content.appendChild(template.firstChild);
      }
    }
    document.importNode(content, true);
  }
  /**
   * Content that will be injected into the main document. This is primarily
   * for things like `<iron-iconset>` and `<custom-style>` which do not have
   * templates but rely on HTML Imports ability to apply content to the main
   * document.
   * @param {string} val An HTML string
   */
  static toBody(val) {
    const trimmedVal = val.trim();
    if (trimmedVal) {
      const div = document.createElement('div');
      div.innerHTML = trimmedVal;
      if (div.firstChild) {
        if (document.body) {
          document.body.appendChild(div.firstChild);
        } else {
          document.addEventListener('DOMContentLoaded', () => {
            document.body.appendChild(div.firstChild);
          });
        }
      }
    }
  }
}

module.exports = RegisterHtmlTemplate;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mock_data_loader_1 = __webpack_require__(2);
var translation_loader_1 = __webpack_require__(3);
__webpack_require__(4);
__webpack_require__(6);
// this is a workaround, in order to be able to extend from the polymer base class (tricking the typescript compiler). 
// It is only used to enable intillisense for the polymer elements. Polymer 1.0 does not provide a base class to extend from. 
// The Polymer() function takes care of that. 
var PolymerClass = function () { };
// extend PolymerClass and PluginElement for full intellisense support.
var NavigationUIPlugin = /** @class */ (function (_super) {
    __extends(NavigationUIPlugin, _super);
    function NavigationUIPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // additional custom polymer properties. Note: the config property as well as all additional polymer properties
        // have to be defined in the "properties", which is done at the end of the file, in order to get updates on changed 
        // values or to be able to register observers on them.
        _this.destinations = [];
        return _this;
    }
    // The PluginElement.onload method -> used for initialization
    NavigationUIPlugin.prototype.onLoad = function () {
        //Test
        this.popUp = false;
        this.navigating = false;
        this.showDestinationChooser = false;
        this.translation = translation_loader_1.default.loadTranslation();
        this.language = "en";
        this.successMessageTimeoutMs = 7000;
        var buildingModule = this.api.getModule("building");
        // initialize the destination property. Get the available destinations from the building module
        // and set it to the property. Polymer will automatically trigger an update for all elements hooked to this property
        this.destinations = buildingModule.getDestinations();
        return Promise.resolve();
    };
    // load some mock destination for the preview mode
    NavigationUIPlugin.prototype.onPreview = function () {
        this.destinations = mock_data_loader_1.default.loadMockAreas();
        // optional: attach it to the window object for easy accessibility when debugging
        window["_ui"] = this;
        return Promise.resolve();
    };
    // will be called periodically, so we do our calculations here and udpate our GUI elements.
    NavigationUIPlugin.prototype.onUpdate = function () {
        if (this.navigating) {
            // get the navigation module from the injected api object to do the distance calculations
            var navigationModule = this.api.getModule("navigation");
            var distanceToCurrentDestination = navigationModule.getDistanceToCurrentDestination();
            // when returning -1, the NavigationModule signals us, that the destination cannot be reached. This is 
            // most likely a configuration problem (e.g. your navigation graph is not fully connected) or the destination
            // simply cannot be reached from the current position
            if (distanceToCurrentDestination == -1) {
                navigationModule.cancelNavigation();
                this.navigating = false;
                this.displayDestinationErrorMessage();
                return;
            }
            var distanceToDestination = Math.max(0, distanceToCurrentDestination - this.destinationReachedThreshold);
            this.updateDistanceToDestinationLabel(distanceToDestination);
            if (distanceToDestination <= 0) {
                // we reached the destination, so we can stop navigating
                navigationModule.cancelNavigation();
                this.navigating = false;
                this.displaySuccessMessage();
            }
        }
    };
    NavigationUIPlugin.prototype.displaySuccessMessage = function () {
        var successMessageElement = this.querySelector("#successMessage");
        successMessageElement.style.opacity = "1";
        setTimeout(function () { successMessageElement.style.opacity = "0"; }, this.successMessageTimeoutMs);
    };
    NavigationUIPlugin.prototype.displayDestinationErrorMessage = function () {
        var errorMessageElement = this.querySelector("#destinationErrorMessage");
        errorMessageElement.style.opacity = "1";
        setTimeout(function () { errorMessageElement.style.opacity = "0"; }, this.successMessageTimeoutMs);
    };
    NavigationUIPlugin.prototype.hideAllToastMessages = function () {
        var toastElements = this.querySelectorAll("div.toastMessage");
        for (var i = 0; i < toastElements.length; i++) {
            toastElements[i].style.opacity = "0";
        }
    };
    NavigationUIPlugin.prototype.onOpenNavigationButtonClick = function (e) {
        this.hideAllToastMessages();
        this.showDestinationChooser = true;
    };
    NavigationUIPlugin.prototype.onCancelNavigationButtonClick = function (e) {
        var navigationModule = this.api.getModule("navigation");
        navigationModule.cancelNavigation();
        this.navigating = false;
    };
    // react to language changes. this is a property observer, which is triggered by polymer everytime the 
    // language property changes --> take a look at the end of the file, where the properties are attached to polymer
    // to see how this observer is set up.
    // the select box in index.html with the id "languageChooser" is wired to the language property and sets 
    // the result of the user interaction to the property, which will then cause this method to be called. 
    NavigationUIPlugin.prototype.onLanguageChanged = function (language) {
        if (!this.language) {
            return;
        }
        // set the currentTranslation property -> this will cause all
        // Html-elements which are hooked to the property to update.
        this.currentTranslation = this.translation[this.language];
        // toggle the translation trigger to trigger calls of translate()
        this.translationTrigger = !this.translationTrigger;
    };
    // this callback reacts to the custom html-event "destination-chooser-start-click", fired in DestinationChooser.onStartClicked(). 
    // It is wired to this event by assigning it to the "on-destination-chooser-start-click" property of the destination-chooser_--navigation-ui-- 
    // instance in the index.html.
    NavigationUIPlugin.prototype.onDestinationChooserStartClick = function (event) {
        this.showDestinationChooser = false;
        var navigationModule = this.api.getModule("navigation");
        navigationModule.navigateToDestination(event.detail);
        this.navigating = true;
    };
    // same as onStartNavigation above, but the event is "destination-chooser-cancel-click".
    NavigationUIPlugin.prototype.onDestinationChooserCancelClick = function () {
        this.showDestinationChooser = false;
    };
    //Test
    NavigationUIPlugin.prototype.onPopUpClick = function () {
        this.popUp = true;
    };
    /**
     * Used by several html-elements to react to language changes. The first parameter is used to trigger the calls to this method
     * on language changes (see the comment on translationTrigger above) and further can be ignored in the method implementation.
     */
    NavigationUIPlugin.prototype.translate = function (translationTrigger, label) {
        if (!this.currentTranslation) {
            return;
        }
        return this.currentTranslation[label];
    };
    NavigationUIPlugin.prototype.updateDistanceToDestinationLabel = function (distanceToDestination) {
        this.distanceToDestinationLabel = distanceToDestination == undefined ? " - " : distanceToDestination.toFixed(2);
    };
    return NavigationUIPlugin;
}(PolymerClass));
// Populate the "properties" member of your plugin with your polymer properties.
NavigationUIPlugin.prototype.properties = {
    destinationReachedThreshold: Number,
    navigating: Boolean,
    currentTranslation: Object,
    destinations: Array,
    distanceToDestinationLabel: String,
    translationTrigger: Boolean,
    language: {
        type: String,
        observer: "onLanguageChanged",
    },
};
// the Polymer "id" of your class. This has to be the same as the "is" in the config.json and in your dom-module (see first tag in index.html)
NavigationUIPlugin.prototype.is = '--navigation-ui--';
// pass your class to Polymer
Polymer(NavigationUIPlugin.prototype);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MockDataLoader = /** @class */ (function () {
    function MockDataLoader() {
    }
    MockDataLoader.loadMockAreas = function () {
        return [
            {
                id: "1",
                name: "Area 1",
                regions: [
                    {
                        vertices: [
                            {
                                x: 45,
                                y: 45,
                            },
                            {
                                x: 55,
                                y: 45,
                            },
                            {
                                x: 55,
                                y: 55,
                            },
                            {
                                x: 45,
                                y: 55,
                            },
                        ],
                    }
                ]
            },
            {
                id: "2",
                name: "Area 2",
                regions: []
            },
            {
                id: "3",
                name: "Area 3",
                regions: []
            }
        ];
    };
    return MockDataLoader;
}());
exports.default = MockDataLoader;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TranslationLoader = /** @class */ (function () {
    function TranslationLoader() {
    }
    TranslationLoader.loadTranslation = function () {
        return {
            en: {
                selectionEmpty: "There are no elements to select",
                startNavigation: "Start Navigation",
                cancelNavigation: "Cancel Navigation",
                chooseDestination: "Choose Destination",
                confirm: "Confirm",
                distanceToDestination_pre: "",
                distanceToDestination_post: "meter left to destination",
                openNavigationMenu: "2Open Navigation Menu2",
                currentDestinationLabel_pre: "Destination reached: ",
                destinationReached: "Destination reached",
                destinationError: "Cannot navigate to destination",
                langEN: "English"
            }
        };
    };
    return TranslationLoader;
}());
exports.default = TranslationLoader;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


const RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=destination-chooser_--navigation-ui--> <style>:host{padding:15px;pointer-events:all;width:70%;height:20vh;box-sizing:border-box;background:#fff;display:flex;flex-direction:column;font-size:14px}@media (min-device-width:1200px){:host{font-size:20px}}@media (min-device-width:1000px){:host{font-size:18px}}:host button{font-size:1.2em;border-radius:0;background:#000;border:1px solid #afafaf;padding:10px;color:#fff;font-weight:700;pointer-events:all;cursor:pointer;z-index:99}:host button:disabled{border:1px solid #999;background-color:#ccc;color:#666}:host #header{top:0;left:0;width:100%;padding:15px;box-sizing:border-box;text-align:center;font-size:1.6em}:host #destinationsContainer{flex:1;overflow:auto}:host #footer{padding-top:10px;text-align:center}:host .destination-row{padding:10px;border-bottom:1px solid #bfbfbf;cursor:pointer}:host .destination-row:hover{background-color:azure}:host .destination-row-selected{background-color:#85afe7;color:#fff}:host .destination-row-selected:hover{background-color:#85afe7}:host .empty-list-container{margin-top:20px;flex:1;width:100%;text-align:center}</style> <template> <div id=header> {{chooseDestinationLabel}} </div> <div id=destinationsContainer> <template is=dom-repeat items={{destinations}} sort=sortDestination> <div class=destination-row item={{item}} on-click=onDestinationRowClick> {{item.name}} </div> </template> <template is=dom-if if={{!destinations.length}}> <div class=empty-list-container> Nothing to select </div> </template> </div> <div id=footer> <button on-click=onCancelClicked>{{cancelLabel}}</button> <button id=startNavigationButton disabled=true on-click=onStartClicked>{{successLabel}}</button> </div> </template> </dom-module>");

__webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PolymerClass = function () { };
/** In opposite to the NavigationUIPlugin, we extend only the PolymerClass here, since this is no PluginElement, but only a Polymer class. */
var DestinationChooser = /** @class */ (function (_super) {
    __extends(DestinationChooser, _super);
    function DestinationChooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DestinationChooser.prototype.onDestinationRowClick = function (e) {
        this.removeSelectedStyleFromDestinationRows();
        e.target.classList.add("destination-row-selected");
        // get the destination object from the clicked row. We set it to the attribute "item" in destination-chooser.html, and Polymer
        // takes care that it is available here
        this.selectedDestination = e.target.item;
        if (this.selectedDestination) {
            var startButton = this.querySelector("#startNavigationButton");
            startButton.disabled = false;
        }
    };
    DestinationChooser.prototype.removeSelectedStyleFromDestinationRows = function () {
        var selectedRows = this.querySelectorAll(".destination-row-selected");
        for (var i = 0; i < selectedRows.length; i++) {
            selectedRows[i].classList.remove("destination-row-selected");
        }
    };
    DestinationChooser.prototype.sortDestination = function (destination1, destination2) {
        return destination1.name < destination2.name ? -1 : 1;
    };
    /** Distpatch a custom html event in this method, which will be consumed by the NavigationUIPlugin -> see index.html for more. */
    DestinationChooser.prototype.onStartClicked = function (e) {
        var event = new CustomEvent("destination-chooser-start-click", { detail: this.selectedDestination });
        this.dispatchEvent(event);
    };
    /** Distpatch a custom html event in this method, which will be consumed by the NavigationUIPlugin -> see index.html for more. */
    DestinationChooser.prototype.onCancelClicked = function (e) {
        var event = new Event("destination-chooser-cancel-click");
        this.dispatchEvent(event);
    };
    return DestinationChooser;
}(PolymerClass));
exports.DestinationChooser = DestinationChooser;
;
// define the polymer properties
DestinationChooser.prototype.properties = {
    destinations: Array,
    successLabel: String,
    cancelLabel: String,
    chooseDestinationLabel: String
};
// assign the 'is' property --> has to be the same as in the dom-module id attribute of destination-chooser.html
// again, we use the mainElementName (see config.json) as postfix here
// *******
DestinationChooser.prototype.is = 'destination-chooser_--navigation-ui--';
// pass the element to polymer
Polymer(DestinationChooser.prototype);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


const RegisterHtmlTemplate = __webpack_require__(0);

RegisterHtmlTemplate.register("<dom-module id=test-test> <style>:host{padding:15px;pointer-events:all;width:70%;height:20vh;box-sizing:border-box;background:#fff;display:flex;flex-direction:column;font-size:14px}@media (min-device-width:1200px){:host{font-size:20px}}@media (min-device-width:1000px){:host{font-size:18px}}:host button{font-size:1.2em;border-radius:0;background:#000;border:1px solid #afafaf;padding:10px;color:#fff;font-weight:700;pointer-events:all;cursor:pointer;z-index:99}:host button:disabled{border:1px solid #999;background-color:#ccc;color:#666}:host #test{flex:1;overflow:auto}</style> <template> <div id=test> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> <div on-click=Test>Test</div> </div> </template> </dom-module>");

__webpack_require__(7);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PolymerClass = function () { };
console.log("Data1 ===== " + localStorage.getItem("key"));
/** In opposite to the NavigationUIPlugin, we extend only the PolymerClass here, since this is no PluginElement, but only a Polymer class. */
var Test = /** @class */ (function (_super) {
    __extends(Test, _super);
    function Test() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // needed for registering to the polymer function
    Test.prototype.Test = function () {
        localStorage.setItem("key", "qqqq22");
        console.log("Data2 ===== " + localStorage.getItem("key"));
        document.getElementById("test").innerHTML = "<div>555555</div>";
    };
    return Test;
}(PolymerClass));
exports.Test = Test;
// define the polymer properties
// Test.prototype.properties = {
//     popUp:string
// };
// assign the 'is' property --> has to be the same as in the dom-module id attribute of destination-chooser.html
// again, we use the mainElementName (see config.json) as postfix here
Test.prototype.is = 'test-test';
// pass the element to polymer
Polymer(Test.prototype);


/***/ })
/******/ ]);