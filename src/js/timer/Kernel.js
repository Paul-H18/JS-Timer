import {Number} from "./classes/Number.js";
import {NumberComposer} from "./classes/NumberComposer.js";
import {Seperator} from "./classes/Seperator.js";
import {Clock} from "./classes/Clock.js";
import {Timer} from "./classes/Timer.js";
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
        console.log('Registering custom elements!')
        this.registerClasses();
        console.log('App-Name:', this.appName, 'Div: ', this.appElement);

        this.initializeNumbers();


    }

    registerClasses() {
        customElements.define("js-timer-number", Number);
        customElements.define("js-timer-seperator", Seperator);

        customElements.define("js-timer-timer", Timer);
    }

    initializeNumbers() {
        const clock = new Clock();
        const numberContainers = this.getNumberContainers();

        setInterval(() => {
            const currentTime = clock.getCurrentTime();

            numberContainers.hours.composer.setTo(currentTime.hours);
            numberContainers.minutes.composer.setTo(currentTime.minutes);
            numberContainers.seconds.composer.setTo(currentTime.seconds);

        }, 250);

        console.log(numberContainers)

    }

    getNumberContainers() {
        const numberContainers = {
            'hours': {
                'rawElement': document.querySelector('#js-timer-hours'),
            },
            'minutes': {
                'rawElement': document.querySelector('#js-timer-minutes'),
            },
            'seconds': {
                'rawElement': document.querySelector('#js-timer-seconds'),
            },
        }

        Object.keys(numberContainers).forEach(key => {
            numberContainers[key]["numberElements"] = Array.from(numberContainers[key]["rawElement"].querySelectorAll('js-timer-number'));
        });

        Object.keys(numberContainers).forEach(key => {
            numberContainers[key]["composer"] = new NumberComposer(numberContainers[key]["numberElements"]);
        });

        return numberContainers;
    }
}