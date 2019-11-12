/**
 * Created by tanan_puengjesada on 30/10/2019 AD.
 */
import { PolymerBaseClass } from "../typings/polymer/polymer";
// import { PluginAPI } from "../typings";

// declare these two variables like in the index.ts
declare const Polymer: Function;
const PolymerClass: PolymerBaseClass = function () { } as any;

console.log("Data1 ===== " + localStorage.getItem("key"));

/** In opposite to the NavigationUIPlugin, we extend only the PolymerClass here, since this is no PluginElement, but only a Polymer class. */
export class Test extends PolymerClass {
    // needed for registering to the polymer function

    Test(): void {
        localStorage.setItem("key", "qqqq22");
        console.log("Data2 ===== " + localStorage.getItem("key"));
        document.getElementById("test").innerHTML = `<div>555555</div>`;
    }

}

// define the polymer properties

// Test.prototype.properties = {
//     popUp:string
// };

// assign the 'is' property --> has to be the same as in the dom-module id attribute of destination-chooser.html
// again, we use the mainElementName (see config.json) as postfix here
Test.prototype.is = 'test-test';

// pass the element to polymer
Polymer(Test.prototype);