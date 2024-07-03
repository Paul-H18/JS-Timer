import {Number} from "./classes/Number.js";
import {NumberComposer} from "./classes/NumberComposer.js";
export class Kernel {
    appName;
    appId;


    appElement;
    constructor(appName) {
        this.appName = appName;
        this.appId = '#' + appName;

        this.appElement = document.querySelector(this.appId)
    }

    initialize() {
        this.registerClasses();
        console.log('App-Name:', this.appName, 'Div: ', this.appElement);

        const elements = Array.from(document.querySelectorAll('js-timer-number'));
        const composer = new NumberComposer(elements)

        composer.setTo(2003)

    }

    registerClasses() {
        customElements.define("js-timer-number", Number);
    }
}