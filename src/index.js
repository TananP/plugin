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
exports.__esModule = true;
var mock_data_loader_1 = require("./mock-data-loader");
var translation_loader_1 = require("./translation-loader");
require("./destination-chooser.html");
// this is a workaround, in order to be able to extend from the polymer base class (tricking the typescript compiler). 
// It is only used to enable intillisense for the polymer elements. Polymer 1.0 does not provide a base class to extend from. 
// The Polymer() function takes care of that. 
var PolymerClass = function () { };
// extend PolymerClass and PluginElement for full intellisense support.
var NavigationUIPlugin = (function (_super) {
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
        this.navigating = false;
        this.showDestinationChooser = false;
        this.translation = translation_loader_1["default"].loadTranslation();
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
        this.destinations = mock_data_loader_1["default"].loadMockAreas();
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
        observer: "onLanguageChanged"
    }
};
// the Polymer "id" of your class. This has to be the same as the "is" in the config.json and in your dom-module (see first tag in index.html)
NavigationUIPlugin.prototype.is = '--navigation-ui--';
// pass your class to Polymer
Polymer(NavigationUIPlugin.prototype);
