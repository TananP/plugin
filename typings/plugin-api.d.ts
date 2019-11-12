import { INSEventEmitter } from "./general";
import { PluginConfiguration } from "./config";

import * as THREE from "./three";

/**
 * Listener method for the "language-change" event of the PluginAPI.
 */
export interface LanguageChangeListener {
    (newLanguage: string): void;
}

/**
 * The PluginAPI provides access to language settings and all modules. 
 */
export class PluginAPI implements INSEventEmitter<PluginAPIEvent>{
    /**
     * Set the current app language. Language strings consist of a 2 letter part for the primary language and a 2 letter part for the region / country 
     * separated with a minus (-). The region / country specific part is uppercase;
     * e.g. en-US, de-AT, de-DE.
     */
    setLanguage(language: string): void;
    /**
     * Get the current app language. Language strings consist of a 2 letter part for the primary language and a 2 letter part for the region / country 
     * separated with a minus (-). The region / country specific part is uppercase;
     * e.g. en-US, de-AT, de-DE.
     */
    getLanguage(): string;
    /**
     * Get a module by its name.
     * @param moduleName Following modules are available: scene, navigation, building, map.
     * @return The module, if available, null otherwise.
     */
    getModule(moduleName: string): any | null;

    /**
     * Behaves like addEventListener() on an HTML element. 
     * Takes an event handler method and registers it for the given event name. The handler will be called as soon as the event occurs
     * @param event  The event name for which the listener is added.
     * @param listener  The listener which will be called when the event occurs.
     */
    addEventListener: (event: PluginAPIEvent, listener: LanguageChangeListener) => void;
    /**
     * Behaves like removeEventListener() on an HTML element. 
     * Takes an event handler method and removes it from the list of registered handlers for the given event name.
     * @param event  The event name for which the listener is removed.
     * @param listener  The listener method which is removed.
     */
    removeEventListener: (event: PluginAPIEvent, listener: LanguageChangeListener) => void;
}

/**
 * Each PluginElement implements this interface. Though, the object passed to the Polymer() function does not exactly implement it, 
 * the element created by the Polymer() function does. Some of the properties will also be injected during the element creation. 
 * Each PluginElement is also a Polymer element, and further a HTMLElement (after passing it to the Polymer() function), inheriting all Polymer specific 
 * callbacks and functions.
 * 
 * Following, an example call to the Polymer() function, with a minimal PluginElement object. 
 
 ```javascript
 Polymer({
     
     is: '--plugin-element-id--',
     
     api: null,        // The PluginAPI, injected during creation of the element.
     world: null,      // Elements container for 3D objects, injected during creation of the element. see: https://threejs.org/docs/#api/core/Object3D
     config: null,     // The config.json content as object, injected during creation of the element. 
     
     properties: {
         // Custom parameter, defined in config.json
         myParameter: {
             observer: "onMyParameterChanged",
             type: String,
            },
        },
        
        onLoad() {
            return new Promise(function (resolve, reject) {
                // .. complete initialization
                resolve();
            });
        },
        
        // Observer function, called as soon as changes to "myParameter" occur.
        // Only use observer functions to alter your elements config parameter dependent state
        onMyParameterChanged(myParameter) {
            ...
        },
    });
    ```
    
    * A detailed explanation of all methods and properties and further information can be found 
    * in the samples and in the [documentation](../#plugins). 
    */
export interface PluginElement {
    /**
     * The world scene object. Add all your 3D-objects to this object. Gets injected into your plugin at creation time.
     */
    world?: THREE.Object3D;
    /**
     * The [[PluginAPI]] object, providing access to language settings and all modules.
     * Gets injected into your plugin at creation time.
     */
    api?: PluginAPI;
    /**
     * A copy of the plugins config.json file as object.
     * Gets injected into your plugin at creation time.
     */
    config?: PluginConfiguration;
    /**
     * Called on element creation. Use this method as a constructor to initialize the element state,
     * load mesh data, resources and so on.
     * Is called after the polymer-callback ready() and before attached().
     * You can find some more information in the [documentation](../#callbacks)
     * @return The PluginElement will not be visible to the user or attached to the DOM 
     * until the promise is fulfilled.
     */
    onLoad(): Promise<void>;
    /**
     * Only called in development mode, directly after onLoad(), to setup a preview 
     * environment for this PluginElement. Can be used, for example, to create mock data for debugging.
     * You can find some more information in the [documentation](../#callbacks)
     * @return The PluginElement will not be visible to the user or attached to the DOM 
     * until the promise is fulfilled.
     */
    onPreview?(): Promise<void>;
    /**
     * Called regularly, less often than onRender(), but at least once a second.
     * Perform your update operations here which do not need to be calculated every frame.
     * You can find some more information in the [documentation](../#callbacks)
     */
    onUpdate?(): void;
    /**
     * Called before every frame update, place your render-related code here, like animations.
     * You can find some more information in the [documentation](../#callbacks)
     */
    onRender?(): void;
    /**
     * Called before the element instance is disposed. In this method you should remove all listeners, 
     * stop all loops and free all resources taken by the element. It can be assumed, that after this method is 
     * called, the element will not get visible anymore. 
     * You can find some more information in the [documentation](../#callbacks)
     */
    onDestroy?(): void;
}

/**
 * <table>
 * <tr><td><b>'language-change'</b></td><td>The current app language changes. Listener method for this event is the [[LanguageChangeListener]]</td></tr>
 * </table>
 */
export declare type PluginAPIEvent = "language-change";
