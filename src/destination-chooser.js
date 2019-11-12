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
var PolymerClass = function () { };
/** In opposite to the NavigationUIPlugin, we extend only the PolymerClass here, since this is no PluginElement, but only a Polymer class. */
var DestinationChooser = (function (_super) {
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
// define the polymer properties
DestinationChooser.prototype.properties = {
    destinations: Array,
    successLabel: String,
    cancelLabel: String,
    chooseDestinationLabel: String
};
// assign the 'is' property --> has to be the same as in the dom-module id attribute of destination-chooser.html
// again, we use the mainElementName (see config.json) as postfix here
DestinationChooser.prototype.is = 'destination-chooser_--navigation-ui--';
// pass the element to polymer
Polymer(DestinationChooser.prototype);
