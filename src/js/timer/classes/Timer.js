import {NumberComposer} from "./NumberComposer.js";

export class Timer extends HTMLElement {
    buttonElements;

    composers;
    numberElements;

    constructor() {
        super();

        this.template = document.querySelector('#tmp-timer').content;
        this.appendChild(this.template.cloneNode(true));

        this.numberElements = {
            'minuteNumbers': Array.from(this.querySelectorAll('#js-timer-timer-remaining-minutes js-timer-number')),
            'secondsNumbers': Array.from(this.querySelectorAll('#js-timer-timer-remaining-seconds js-timer-number')),
        }


        this.composers = {
            'minutes': new NumberComposer(this.numberElements.minuteNumbers, 15),
            'seconds': new NumberComposer(this.numberElements.secondsNumbers),
        }

        this.buttonElements = {
            'startButton': this.querySelector('#js-timer-start-button'),
            'stopButton': this.querySelector('#js-timer-stop-button'),
        }

        Object.keys(this.buttonElements).forEach((key) => {
            this.buttonElements[key].addEventListener('click', () => {
                this.toggleTimer();
            });
        });
    }

    toggleOnOffButton() {
        this.buttonElements.startButton.classList.toggle('js-timer-timer-hidden');
        this.buttonElements.stopButton.classList.toggle('js-timer-timer-hidden');
    }

    toggleTimer() {
        this.toggleOnOffButton();
    }

}