import { Point3, Destination, DestinationGroup } from "../general";

/**
 * An object holding the rendering style, which is used to render the current route in the map view. Routes will only
 * be rendered if a navigation is active. Only the calculated route of the current navigation will be rendered.
 */
export interface RouteStyleOptions {
    /**
     * See the 
     * <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/#layout-line-line-cap" target="_blank">mapbox documentation</a>
     * for more.
     */
    lineCap: string;
    /**
     * See the 
     * <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/#layout-line-line-join" target="_blank">mapbox documentation</a>
     * for more.
     */
    lineJoin: string;
    /**
     * See the 
     * <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/#paint-line-line-color" target="_blank">mapbox documentation</a>
     * for more.
     */
    lineColor: string;
    /**
     * See the 
     * <a href="https://www.mapbox.com/mapbox-gl-js/style-spec/#paint-line-line-width" target="_blank">mapbox documentation</a>
     * for more.
     */
    lineWidth: number;
}

/**
 * The MapModule provides methods to work with the 2d map.
 */
export class MapModule {
    /**
     * Sets the style for the rendering of the routes of the active navigation on the map view.
     */
    setRouteStyle(style: RouteStyleOptions): void;
    /**
     * @returns True, if the map view is visible on the screen, false otherwise.
     */
    isVisible(): boolean;
    /**
     * Set visibility of the map view.
     */
    setVisible(isVisible: boolean);
}