"use strict";
exports.__esModule = true;
var TranslationLoader = (function () {
    function TranslationLoader() {
    }
    TranslationLoader.loadTranslation = function () {
        return {
            en: {
                selectionEmpty: "There are no elements to select",
                startNavigation: "Start Navigation",
                cancelNavigation: "Cancel Navigation",
                chooseDestination: "Choose Destination",
                confirm: "Confirm",
                distanceToDestination_pre: "",
                distanceToDestination_post: "meter left to destination",
                openNavigationMenu: "Open Navigation Menu",
                currentDestinationLabel_pre: "Destination reached: ",
                destinationReached: "Destination reached",
                destinationError: "Cannot navigate to destination",
                langEN: "English",
                langDE: "German"
            },
            de: {
                selectionEmpty: "Keine Elemente zur Auswahl",
                startNavigation: "Navigation Starten",
                cancelNavigation: "Navigation Abbrechen",
                chooseDestination: "Ziel auswählen",
                confirm: "Bestätigen",
                distanceToDestination_pre: "Noch",
                distanceToDestination_post: "Meter bis zum Ziel",
                openNavigationMenu: "Navigationsmenü Öffnen",
                currentDestinationLabel_pre: "Ziel erreicht: ",
                destinationReached: "Ziel erreicht",
                destinationError: "Ziel kann nicht annavigiert werden",
                langEN: "Englisch",
                langDE: "Deutsch"
            }
        };
    };
    return TranslationLoader;
}());
exports["default"] = TranslationLoader;
