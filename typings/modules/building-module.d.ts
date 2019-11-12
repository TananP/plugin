import * as THREE from "../three";
import { Point3, Destination, DestinationGroup } from "../general";

/**
 * The current precise location of the user (camera) inside the building. This object provides access 
 * to the main data of a [[Camera]] through several methods. 
 * The coordinate system is right handed with the y-coordinate pointing upwards. Units are measured in meters.
 */
export interface Location {
    /**
     * @return The view matrix (position and rotation) of the [[Camera]].
     * The coordinate system is right handed with the y-coordinate pointing upwards. Units are measured in meters.
     */
    getViewMatrix(): THREE.Matrix4;
    /**
     * @return The position of the [[Camera]]. 
     * The coordinate system is right handed with the y-coordinate pointing upwards. Units are measured in meters.
     */
    getPosition(): THREE.Vector3;
    /**
     * @return A vector pointing away from the [[Camera]], in the viewing direction.
     * The coordinate system is right handed with the y-coordinate pointing upwards. Units are measured in meters.
     * It is not guaranteed, that the vector is normalized.
     */
    getViewingDirection(): THREE.Vector3;
    /**
     * @return A vector pointing upwards from the [[Camera]], orthogonal to the viewing direction.
     * The coordinate system is right handed with the y-coordinate pointing upwards. Units are measured in meters.
     * It is not guaranteed, that the vector is normalized.
     */
    getUpVector(): THREE.Vector3;
}

/**
 * A floor can be seen as a physical floor in a building, having a range from its ground to its ceiling in meters. 
 * It is used to separate the path network and destinations, having impact on the route calculation.
 */
export interface Floor {
    /**
     * Use the 'id' to identify your instances, for example: after the language has changed, fetch instances again (for translated names) and replace old ones. 
     */
    id: string;
    /**
     * The translated name. Needs to be fetched again, after the language has changed. 
     */
    name: string;
    /**
     * The height range of the floor in meters. An origin can be chosen arbitrarily. The easiest way is to start 
     * to count with the ground floor of the building at 0 meters. Floors should not overlap. The next floor 
     * should always start exactly with the ceiling of the previous floor, if it lies higher and exactly with 
     * the ground value, if it lies lower. Negative values are possible.
     */
    range: {
        /**
         * The bottom of the floor in meters.
         */
        from: number,
        /**
         * The ceiling of the floor in meters.
         */
        to: number
    }
}

/**
 * The BuildingModule provides access to building related data, as well as 
 * the users current position and orientation in it
 */
export class BuildingModule {
    /**
     * @return All points of interest of the building.
     */
    getDestinations(): Destination[];
    /**
     * @return All destination groups of the building.
     */
    getDestinationGroups(): DestinationGroup[];
    /**
     * @return A [[Location]] object, describing the current precise location of the user inside the building.
     */
    getCurrentLocation(): Location;
    /**
     * @return The floor the user is currently located on or null, if the users location doesn't lie 
     * within the range of a configured floor. Hint: Avoid to configure floors with spaces in between them.
     */
    getCurrentFloor(): Floor | null;
    /**
     * @return A list of all floors of the building.
     */
    getFloors(): Floor[];
}