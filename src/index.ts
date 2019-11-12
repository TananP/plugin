import { PolymerBaseClass } from "../typings/polymer";  // TODO: 
import * as THREE from "../typings/three"
import MockDataLoader from "./mock-data-loader";
import TranslationLoader from "./translation-loader";
import { Destination, BuildingModule, NavigationModule, PluginConfiguration, PluginElement, PluginAPI } from "../typings";
import { DestinationChooser, DestinationChooserStartClickEvent } from "./destination-chooser";
import "./destination-chooser.html";
import "./test.html";


// declare the Polymer function here - it will be available at runtime
declare const Polymer: Function;
// this is a workaround, in order to be able to extend from the polymer base class (tricking the typescript compiler). 
// It is only used to enable intillisense for the polymer elements. Polymer 1.0 does not provide a base class to extend from. 
// The Polymer() function takes care of that. 
const PolymerClass: PolymerBaseClass = function () { } as any;

// extend PolymerClass and PluginElement for full intellisense support.
class NavigationUIPlugin extends PolymerClass implements PluginElement {
    // these 3 will get injected before onLoad()
    world: THREE.Object3D;
    api: PluginAPI;
    config: PluginConfiguration;

    // "properties" and "is" -> will be set at the end of the file
    properties: any;
    is: string;

    /** the configurable property from the config file */
    destinationReachedThreshold: number;
    // additional custom polymer properties. Note: the config property as well as all additional polymer properties
    // have to be defined in the "properties", which is done at the end of the file, in order to get updates on changed 
    // values or to be able to register observers on them.
    destinations: Destination[] = [];
    navigating: boolean;
    language: string;
    currentTranslation: any;
    /** 
     * this boolean is used to trigger the translate() method everytime, when the language has changed. Therefore, it's value
     * is changed everytime onLanguageChanged is called. Since the translationTrigger is the first method parameter which is passed
     * to the translate method, changing translationTrigger will trigger calls to translate, allowing the html-elements to react
     * to language changes (take a look at the polymer docs for more https://www.polymer-project.org/1.0/docs/devguide/data-binding#annotated-computed).
     */
    translationTrigger: boolean;

    // custom "normal" members
    popUp: boolean;

    showDestinationChooser: boolean;
    distanceToDestinationLabel: string;
    translation: any;
    private successMessageTimeoutMs: number;

    // The PluginElement.onload method -> used for initialization
    onLoad(): Promise<void> {
        //Test
        this.popUp = false;

        this.navigating = false;
        this.showDestinationChooser = false;
        this.translation = TranslationLoader.loadTranslation();
        this.language = "en";
        this.successMessageTimeoutMs = 7000;
        
        const buildingModule = this.api.getModule("building") as BuildingModule;
        // initialize the destination property. Get the available destinations from the building module
        // and set it to the property. Polymer will automatically trigger an update for all elements hooked to this property
        this.destinations = buildingModule.getDestinations();

        return Promise.resolve();
    }

    // load some mock destination for the preview mode
    onPreview(): Promise<void> {
        this.destinations = MockDataLoader.loadMockAreas();
        // optional: attach it to the window object for easy accessibility when debugging
        window["_ui"] = this;

        return Promise.resolve();
    }

    // will be called periodically, so we do our calculations here and udpate our GUI elements.
    onUpdate(): void {
        if (this.navigating) {
            // get the navigation module from the injected api object to do the distance calculations
            const navigationModule = this.api.getModule("navigation") as NavigationModule;
            const distanceToCurrentDestination = navigationModule.getDistanceToCurrentDestination();
            // when returning -1, the NavigationModule signals us, that the destination cannot be reached. This is 
            // most likely a configuration problem (e.g. your navigation graph is not fully connected) or the destination
            // simply cannot be reached from the current position
            if (distanceToCurrentDestination == -1) {
                navigationModule.cancelNavigation();
                this.navigating = false;
                this.displayDestinationErrorMessage();
                return;
            }
            const distanceToDestination = Math.max(0, distanceToCurrentDestination - this.destinationReachedThreshold);
            this.updateDistanceToDestinationLabel(distanceToDestination);
            if (distanceToDestination <= 0) {
                // we reached the destination, so we can stop navigating
                navigationModule.cancelNavigation();
                this.navigating = false;
                this.displaySuccessMessage();
            }
        }
    }

    private displaySuccessMessage(): void {
        const successMessageElement = this.querySelector("#successMessage") as HTMLDivElement;
        successMessageElement.style.opacity = "1";
        setTimeout(() => { successMessageElement.style.opacity = "0"; }, this.successMessageTimeoutMs);
    }

    private displayDestinationErrorMessage(): void {
        const errorMessageElement = this.querySelector("#destinationErrorMessage") as HTMLDivElement;
        errorMessageElement.style.opacity = "1";
        setTimeout(() => { errorMessageElement.style.opacity = "0"; }, this.successMessageTimeoutMs);
    }

    private hideAllToastMessages(): void {
        const toastElements = this.querySelectorAll("div.toastMessage");
        for (let i = 0; i < toastElements.length; i++) {
            (toastElements[i] as HTMLDivElement).style.opacity = "0";
        }
    }

    onOpenNavigationButtonClick(e: MouseEvent): void {
        this.hideAllToastMessages();
        this.showDestinationChooser = true;
    }

    onCancelNavigationButtonClick(e: MouseEvent): void {
        const navigationModule = this.api.getModule("navigation") as NavigationModule;
        navigationModule.cancelNavigation();
        this.navigating = false;
    }

    // react to language changes. this is a property observer, which is triggered by polymer everytime the 
    // language property changes --> take a look at the end of the file, where the properties are attached to polymer
    // to see how this observer is set up.
    // the select box in index.html with the id "languageChooser" is wired to the language property and sets 
    // the result of the user interaction to the property, which will then cause this method to be called. 
    onLanguageChanged(language: String): void {
        if (!this.language) {
            return;
        }
        // set the currentTranslation property -> this will cause all
        // Html-elements which are hooked to the property to update.
        this.currentTranslation = this.translation[this.language];
        // toggle the translation trigger to trigger calls of translate()
        this.translationTrigger = !this.translationTrigger;
    }

    // this callback reacts to the custom html-event "destination-chooser-start-click", fired in DestinationChooser.onStartClicked(). 
    // It is wired to this event by assigning it to the "on-destination-chooser-start-click" property of the destination-chooser_--navigation-ui-- 
    // instance in the index.html.
    onDestinationChooserStartClick(event: DestinationChooserStartClickEvent): void {
        this.showDestinationChooser = false;
        const navigationModule = this.api.getModule("navigation") as NavigationModule;
        navigationModule.navigateToDestination(event.detail);
        this.navigating = true;
    }

    // same as onStartNavigation above, but the event is "destination-chooser-cancel-click".
    onDestinationChooserCancelClick(): void {
        this.showDestinationChooser = false;
    }

    //Test
    onPopUpClick(): void{
        this.popUp = true;
    }
    /** 
     * Used by several html-elements to react to language changes. The first parameter is used to trigger the calls to this method
     * on language changes (see the comment on translationTrigger above) and further can be ignored in the method implementation.
     */
    translate(translationTrigger: boolean, label: string): string {
        if (!this.currentTranslation) {
            return;
        }
        return this.currentTranslation[label];
    }

    private updateDistanceToDestinationLabel(distanceToDestination: number): void {
        this.distanceToDestinationLabel = distanceToDestination == undefined ? " - " : distanceToDestination.toFixed(2);
    }
}

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
}

// the Polymer "id" of your class. This has to be the same as the "is" in the config.json and in your dom-module (see first tag in index.html)
NavigationUIPlugin.prototype.is = '--navigation-ui--';

// pass your class to Polymer
Polymer(NavigationUIPlugin.prototype)