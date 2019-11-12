import { Point3 } from "./general";


/**
 * The shape of the plugin configuration json file.
 * Please also take a look at the [plugin](../#plugins) section of this documentation.
 */
export interface PluginConfiguration {
    /**
     * The entry point of the plugin. A html file serving as the root element of the plugins content.
     */
    mainHTML: string;
    /**
     * The name of the root polymer element for this plugin. 
     */
    mainElementName: string;
    /**
     * Distance in meters from the users current location to the plugin elements location, 
     * at which the plugin element is allowed to be loaded (and becoming visible to the user).
     * Meant to increase performance for large buildings with a lot of AR content. 
     */
    loadDistance: number;
    /**
     * List of parameters which can be configured for this plugin
     */
    params: ConfigurationParameter[]
}

/**
 * A list of all possible datatypes for a [[ConfigurationParameter]]
 */
export type ConfigurationParameterType = "Object3D" | "Select" | "File" | "Boolean" | "Color" | "String" | "Number";

/**
 * Base shape of a [[PluginConfiguration]] parameter. Additional attributes are added, depending on the data type.
 */
export interface ConfigurationParameter {
    /**
     * The variable name of the parameter. The parameter will be injected under this name in the [[PluginElement]]
     */
    param: string;
    /**
     * The display name of the parameter in the admin app. 
     */
    label: string;
    /**
     * The data type of the parameter. 
     */
    type: ConfigurationParameterType,
    /**
     * If true, the parameter has to be configured in the admin app (is not optional). 
     */
    required?: boolean;
    /**
     * Default value for the parameter
     */
    value?: any;
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "Object3D".
 * Defines position, rotation and scale of a 3D object.
 */
export interface Object3DParameter extends ConfigurationParameter {
    /**
     * Corresponds to [[THREE.Object3D]] position, rotation and scale. 
     */
    value?: {
        position: Point3,
        rotation: Point3,
        scale: Point3
    }
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "Select".
 * Defines a selection of values, from which can be chosen in the admin app. 
 */
export interface SelectParameter extends ConfigurationParameter {
    /**
     * Possible options to select from. Label is the display label of the option. Value is true if the 
     * option is selected. 
     */
    options: { label: string; value: boolean }[];
    /**
     * Set to ture if multiple selection should be allowed. 
     */
    multiple?: boolean,
    /**
     * The selected option, or a list of selected options, if multiple selection is allowed.
     */
    value?: string | string[];
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "File".
 * Defines a file selection for uploading files to the server.
 */
export interface FileParameter extends ConfigurationParameter {
    /**
     * A comma separated list file types, the file selection dialog should accept.
     * Corresponds to the 'accept' attribute of an html input element. 
     * A list of available file types can be found here: https://www.w3schools.com/tags/att_input_accept.asp
     */
    accept?: string;
    /**
     * A url where the file can be found.
     */
    value?: string;
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "Boolean".
 * Defines a switch where you can choose either true or false.
 */
export interface BooleanParameter extends ConfigurationParameter {
    value?: boolean;
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "Color".
 * Defines a color as string
 */
export interface ColorParameter extends ConfigurationParameter {
    /**
     * Hexadecimal representation of a color as string, starting with # (hastag). (E.g. #ff002a)
     */
    value?: string;
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "String".
 * Defines a simple string value
 */
export interface StringParameter extends ConfigurationParameter {
    value?: string;
}

/**
 * Shape of a [[ConfigurationParameter]] if the [[ConfigurationParameterType]] is "Number".
 * Defines a simple number value. Numbers can be either integers or floats with decimal
 */
export interface NumberParameter extends ConfigurationParameter {
    value?: number;
}