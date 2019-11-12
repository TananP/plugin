import * as THREE from "../three";
import { Point2, Point3, INSEventEmitter } from "../general";

/**
 * Fired on a mouse click or a tap on the 3d-scene. Used to find intersections between the tap and 3d-objects.
 */
export interface SceneModuleClickEvent {
    /** 
     * Mouse position on the screen in pixel, origin is the top left corner of the canvas.
     **/
    mousePosition: Point2;
    /**
     * Can be used to check 3d-objects for intersection with mousePosition.
     * ```javascript
     *   var intersects = raycaster.intersectObject(this.world);
     *   if(intersects.length > 0) {
     *     // Object was clicked
     *   }
     * ```
     * Please note, that the raycaster will already have mouse position and camera set (setFromCamera() was called). You only need to do the intersection check. 
     * You can read about the raycaster class here: https://threejs.org/docs/#api/core/Raycaster
     */
    raycaster: THREE.Raycaster;
}

/**
 * Listener method for the [[SceneModuleClickEvent]]
 */
export type SceneModuleClickEventListener = (clickEvent: SceneModuleClickEvent) => void;


/**
 * Class for rendering repetitive objects along a route of points, e.g. like arrows of a visualized route.
 * For more information read the constructor documentation.
 */
interface RepeatedObjectRoute {
    /**
     * @param object  The object which should be rendered repeatedly along the route. 
     * Will be rendered in it's real scale (no scaling operations will be applied).
     * @param route  An ordered list of points representing the vertices of the route.
     * @param minDistanceBetweenObjects  The minimum distance between the rendered objects in meters. The distance
     * is calculated between two objects center points.
     */
    new(object: THREE.Object3D, route: Point3[], minDistanceBetweenObjects: number): THREE.Object3D;
}

/**
 * The SceneModule provides access to methods, helper and events concerning the 3d-scene.
 */
export declare class SceneModule implements INSEventEmitter<SceneModuleEvent> {
    /**
     * Class for rendering an object along a route repeatedly.
     */
    RepeatedObjectRoute: RepeatedObjectRoute;
    /**
     * Check whether an object lies within the current field of view.
     * @return True if the object is in field of view, false otherwise.
     */
    isInFieldOfView(object: THREE.Object3D): boolean;
    /**
     * @return True if the AR view is currently active, false otherwise. Internally, there is a counter, increasing for every reason of inactivity. 
     *          Reasons for inactivity could be, that another element is covering the AR view, partly or completely, or the AR view being invisble. 
     *          This is always an indicator, that the user might not be able to see your AR content at the moment. It is also possible, that the onRender()
     *          method on your Plugin will not be called at the moment, as the render loop is stopped. However, onUpdate() will still be called. 
     *          Inactivity is set internally and can not be changed by Plugins.  
     */
    isARViewActive(): boolean;

    /**
     * Behaves like addEventListener() on an HTML element. 
     * Takes an event handler method and registers it for the given event name. The handler will be called as soon as the event occurs
     * @param event  The event name for which the listener is added.
     * @param listener  The listener which will be called when the event occurs.
     */
    addEventListener: (event: SceneModuleEvent, listener: SceneModuleClickEventListener) => void;
    /**
     * Behaves like removeEventListener() on an HTML element. 
     * Takes an event handler method and removes it from the list of registered handlers for the given event name.
     * @param event  The event name for which the listener is removed.
     * @param listener  The listener method which is removed.
     */
    removeEventListener: (event: SceneModuleEvent, listener: SceneModuleClickEventListener) => void;
}

/**
 * All the events which can be subscribed to in the SceneModule.<br>
 * 'click': Fired when the ar-scene is clicked. Listener for this event is the [[SceneModuleClickEventListener]]
 */
export declare type SceneModuleEvent = "click";