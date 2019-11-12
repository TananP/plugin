import * as threejs from "./three";

declare global {
    /**
     * Resolves relative file paths and maps them to the path of the INS runtime. Use this function whenever accessing local 
     * ressources of your plugin from your script code.
     * Attention: INSPath is not actually a function. During upload, it will be replaced by a string, through a regex pattern. 
     * Be careful not to pass it as an argument to a method expecting a real function or similar.
     * It is possible to point to the plugin root folder with "/". 
     * ```typescript
     *  import * as INSTypings from "path-to-your-typings-folder";
     *  // INSPath will be available once you imported the INSTypings, since it is declared globally
     *  const myImageUrl = INSPath("./my-image.png");
     * ```
     * @param relativePath The relative path, which will be mapped to the runtime path. 
     */
    const INSPath: (relativePath: string) => string;
}

/**
 * Represents a 2-dimensional point.
 */
export interface Point2 {
    x: number;
    y: number;
}

/**
 * Represents a 3-dimensional point.
 */
export interface Point3 extends Point2 {
    z: number;
}

/**
 * Similar to DOM event system, event listeners can be registered on classes
 * implementing this interface.
 * The available events are defined by the implementing classes.
 * @param AvailableEvents A type describing all available events. 
 */
export interface INSEventEmitter<AvailableEvents> {
    addEventListener: (event: AvailableEvents, listener: Function) => void;
    removeEventListener: (event: AvailableEvents, listener: Function) => void;
}

/**
 * Represents a 2-dimensional polygon.
 */
export interface Polygon {
    vertices: Point2[];
}

/**
 * Represents a destination (constructed of polygons) in the building which can be navigated to.
 */
export interface Destination {
    /**
     * Use the 'id' to identify your instances, for example: after the language has changed, fetch instances again (for translated names) and replace old ones. 
     */
    id: string;
    /**
     * The translated name. Needs to be fetched again, after the language has changed. 
     */
    name: string;
    /**
     * Polygons defining the regions of the destination.
     * A destination can have more than one region configured, e.g. if it spans over multiple floors.
     */
    regions: Polygon[];
}

/**
 * Destination groups are structuring destinations into groups.
 * A destination group can be the destination of a navigation, where the nearest
 * [[Destination]] will be chosen to be navigated to. 
 */
export interface DestinationGroup {
    /**
     * Use the 'id' to identify your instances, for example: after the language has changed, fetch instances again (for translated names) and replace old ones. 
     */
    id: string;
    /**
     * The translated name. Needs to be fetched again, after the language has changed. 
     */
    name: string;
    /**
     * List of destinations belonging to this destination group
     */
    destinations: Destination[];
}