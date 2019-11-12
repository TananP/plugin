import { PolymerBaseClass } from "../typings/polymer/polymer";
import { Destination } from "../typings";

// declare these two variables like in the index.ts
declare const Polymer: Function;
const PolymerClass: PolymerBaseClass = function () { } as any;

export interface DestinationChooserStartClickEvent extends CustomEvent {
    detail: Destination;
}

/** In opposite to the NavigationUIPlugin, we extend only the PolymerClass here, since this is no PluginElement, but only a Polymer class. */
export class DestinationChooser extends PolymerClass {
    // needed for registering to the polymer function
    is: string;
    properties: any;

    // polymer properties of this class
    destinations: Destination[];
    successLabel: string;
    cancelLabel: string;
    chooseDestinationLabel: string;

    /** normal member */
    private selectedDestination: Destination;

    onDestinationRowClick(e: MouseEvent): void {
        this.removeSelectedStyleFromDestinationRows();
        (e.target as HTMLDivElement).classList.add("destination-row-selected");
        // get the destination object from the clicked row. We set it to the attribute "item" in destination-chooser.html, and Polymer
        // takes care that it is available here
        this.selectedDestination = (e.target as any).item as Destination;
        if (this.selectedDestination) {
            const startButton = this.querySelector("#startNavigationButton") as HTMLButtonElement;
            startButton.disabled = false;
        }
    }

    private removeSelectedStyleFromDestinationRows(): void {
        const selectedRows = this.querySelectorAll(".destination-row-selected");
        for (let i = 0; i < selectedRows.length; i++) {
            (selectedRows[i] as HTMLDivElement).classList.remove("destination-row-selected");
        }
    }

    sortDestination(destination1: Destination, destination2: Destination): number {
        return destination1.name < destination2.name ? -1 : 1;
    }

    /** Distpatch a custom html event in this method, which will be consumed by the NavigationUIPlugin -> see index.html for more. */
    onStartClicked(e: MouseEvent): void {
        const event = new CustomEvent("destination-chooser-start-click", {detail: this.selectedDestination});
        this.dispatchEvent(event);
    }

    /** Distpatch a custom html event in this method, which will be consumed by the NavigationUIPlugin -> see index.html for more. */
    onCancelClicked(e: MouseEvent): void {
        const event = new Event("destination-chooser-cancel-click");
        this.dispatchEvent(event);
    }
};

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