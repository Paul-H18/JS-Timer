import {NumberComposer} from "./NumberComposer.js";

export class Timer extends HTMLElement {
    buttonElements;

    composers;
    numberElements;

    sliderElements;
    resetSliderButtonElements;

    time;
    defaultTime;

    constructor() {
        super();

        this.defaultTime = {
            'minuteSlider': 15,
            'secondsSlider': 0,
        }

        this.time = {
            'minutes': this.defaultTime.minuteSlider,
            'seconds': this.defaultTime.secondsSlider,
        }

        this.template = document.querySelector('#tmp-timer').content;
        this.appendChild(this.template.cloneNode(true));

        this.numberElements = {
            'minuteNumbers': Array.from(this.querySelectorAll('#js-timer-timer-remaining-minutes js-timer-number')),
            'secondsNumbers': Array.from(this.querySelectorAll('#js-timer-timer-remaining-seconds js-timer-number')),
        }



        this.composers = {
            'minutes': new NumberComposer(this.numberElements.minuteNumbers, this.time.minutes),
            'seconds': new NumberComposer(this.numberElements.secondsNumbers, this.time.seconds),
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


        this.sliderElements = {
            'minuteSlider': this.querySelector('#js-timer-timer-minutes'),
            'secondsSlider': this.querySelector('#js-timer-timer-seconds'),
        }

        Object.keys(this.sliderElements).forEach((key) => {
            this.sliderElements[key].addEventListener('input', () => {
                this.setTime();
            });
        });

        this.resetSliderButtonElements = {
            'minuteSlider': this.querySelector('#js-timer-timer-slider-minute-reset-button'),
            'secondsSlider': this.querySelector('#js-timer-timer-slider-second-reset-button'),
        };

        Object.keys(this.resetSliderButtonElements).forEach((key) => {
            this.resetSliderButtonElements[key].addEventListener('click', () => {
                this.sliderElements[key].value = this.defaultTime[key];
                this.setTime();
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

    setTime() {
        this.time.minutes = this.sliderElements.minuteSlider.value;
        this.time.seconds = this.sliderElements.secondsSlider.value;

        this.refreshDigitalClock();
    }

    refreshDigitalClock() {
        this.composers.minutes.setTo(this.time.minutes);
        this.composers.seconds.setTo(this.time.seconds);
    }

}