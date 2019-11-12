export default class TranslationLoader {
    public static loadTranslation(): {en: object, de: object} {
        return {
            en: {
                selectionEmpty: "There are no elements to select",
                startNavigation: "Start Navigation",
                cancelNavigation: "Cancel Navigation",
                chooseDestination: "Choose Destination",
                confirm: "Confirm",
                distanceToDestination_pre: "",
                distanceToDestination_post: "meter left to destination",
                openNavigationMenu: "2Open Navigation Menu2",
                currentDestinationLabel_pre: "Destination reached: ",
                destinationReached: "Destination reached",
                destinationError: "Cannot navigate to destination",
                langEN: "English"
            }
        }
    }
}