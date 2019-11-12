import { INSEventEmitter, Destination, DestinationGroup, Point3 } from "../general";

/**
 * A single node on a route
 * 
 * @param id Unique id for the node
 * @param index Index of the node in an internal node list
 * @param position Position of the node in 3D space
 * @param priorityToNextNode Configured priority of the edge between the current node and the next node along a route. Null if the node is the last one.  
 */
export interface RouteNode {
    id: string;
    index: number;
    position: Point3;
    priorityToNextNode: number | null;
}

/**
 * Listener method for all [[NavigationModuleEvent]]´s
 */
export interface NavigationModuleEventListener {
    (route: Route): void;
}

/**
 * The NavigationModule provides methods and events to alter the apps navigation state or informs about
 * changes. 
 */
export class NavigationModule implements INSEventEmitter<NavigationModuleEvent> {
    /** 
     * @return True, if a navigation is currently in progress, False otherwise. 
    */
    isNavigationActive(): boolean;
    /**
     * @return The current route, null if no navigation is currently in progress. 
     */
    getCurrentRoute(): Route | null;
    /**
     * Returns the length of the whole route in meters, not the remaining distance to the destination 
     * (for this, see getDistanceToCurrentDestination). The route length changes as soon as the route changes. 
     * Either through a navigation to a new destination, a reroute or the cancellation of the current navigation.
     * @return The length of the current route in meters, or -1 if no navigation is in progress.
     */
    getCurrentRouteLength(): number;
    /**
     * Returns the weighted length of the whole route, not the remaining distance to the destination 
     * (for this, see getDistanceToCurrentDestinationWeighted). The route length changes as soon as the route changes. 
     * Either through a navigation to a new destination, a reroute or the cancellation of the current navigation.
     * @return The length of the current route with weight factors applied, or -1 if no navigation is in progress.
     */
    getCurrentRouteLengthWeighted(): number;
    /**
     * Returns the distance from the camera to the current destination along the calculated route in meters.
     * @return The distance to the destination in meters or -1 if no navigation is in progress.
     */
    getDistanceToCurrentDestination(): number
    /**
     * Returns the distance from the camera to the current destination along the calculated route with weight factors applied.
     * @return The weighted distance to the destination or -1 if no navigation is in progress.
     */
    getDistanceToCurrentDestinationWeighted(): number
    /**
     * Start a navigation. If a navigation is currently active, this navigation will be cancelled first.
     */
    navigateToDestination(destination: Destination): void;
    /**
     * Start a navigation to the provided destination group. If a navigation is currently active, this navigation will be cancelled first.
     * @param destinationGroup The destination group to which will be navigated. 
     * The nearest destination, belonging to the destination group, will be selected as destination.
     */
    navigateToDestinationGroup(destinationGroup: DestinationGroup): void;
    /**
     * Cancel the currently running navigation. If no navigation is running, nothing will happen (events are not triggered either). 
     */
    cancelNavigation(): void;

    /**
     * Behaves like addEventListener() on an HTML element. 
     * Takes an event handler method and registers it for the given event name. The handler will be called as soon as the event occurs
     * @param event  The event name for which the listener is added.
     * @param listener  The listener which will be called when the event occurs.
     */
    addEventListener: (event: NavigationModuleEvent, listener: NavigationModuleEventListener) => void;
    /**
     * Behaves like removeEventListener() on an HTML element. 
     * Takes an event handler method and removes it from the list of registered handlers for the given event name.
     * @param event  The event name for which the listener is removed.
     * @param listener  The listener method which is removed.
     */
    removeEventListener: (event: NavigationModuleEvent, listener: NavigationModuleEventListener) => void;
}

/**
 * Holds the result of a navigation calculation, with information about the original request.
 */
export interface Route {
    /**
     * An ordered list of waypoints of the current navigation, from start to goal.
     */
    routeNodes: RouteNode[];
    /**
     * This is the selected destination of the current navigation. It is either a single destination or a set of destinations (represented by a destination group). 
     * It can be the same as 'destination', but does not have to be. 
     */
    requestedDestination: Destination | DestinationGroup;
    /**
     * This is the actual destination, to which the navigation is leading.
     * If the destination is of type [[Destination]], then 'requestedDestination' and 'destination' are
     * the same.
     * If the destination is of type [[DestinationGroup]], then 'destination' is one of the [[Destination]]s belonging to the destination group.
     */
    destination: Destination;
}


/**
 * Listener method for all events is the [[NavigationModuleEventListener]]
 * <table>
 * <tr><td><b>'start'</b></td><td>Fired when a new navigation is started. Provides the new route of the navigation.</td></tr>
 * <tr><td><b>'route-change'</b></td><td>Fired on route changes for any reason (start, cancel, reroute). Provides the current route of the navigation, so for "start" and "reroute", this will be a valid route, for "cancel" it will be null.</td></tr>
 * <tr><td><b>'reroute'</b></td><td>Fired as soon as the current location drifts too far away from the current route. Provides the route after reroute calculations.
 * The <a href="interfaces/route.html#requestedDestination">Route.requestedDestination</a> remains the same, the <a href="interfaces/route.html#destination">Route.destination</a> or the route to the destination might have changed.</td></tr>
 * <tr><td><b>'cancel'</b></td><td>Fired when the navigation is cancelled. The listener is provided with the route that was active until now.</td></tr>
 * </table>
 */
export declare type NavigationModuleEvent = "start" | "route-change" | "reroute" | "cancel";
