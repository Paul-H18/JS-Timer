import { NumberComposer } from "./NumberComposer.js";

export class Timer extends HTMLElement {
    buttonElements;

    composers;
    numberElements;

    sliderElements;
    resetSliderButtonElements;

    time;
    defaultTime;

    timerInterval;

    ringTone;

    dialog;

    constructor() {
        super();

        this.ringTone = new Audio('../../../../assets/bell.mp3');

        this.dialog = this.getElementsByTagName('dialog');

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
            'dialogButton': this.querySelector('#js-timer-dialog-button'),
            'stopButton': this.querySelector('#js-timer-stop-button'),
        }

        this.setUpButtons();


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

    /**
     * Toggles the button
     */
    toggleOnOffButton() {
        this.buttonElements.startButton.classList.toggle('js-timer-timer-hidden');
        this.buttonElements.dialogButton.classList.toggle('js-timer-timer-hidden');
    }

    /**
     * Toggles the timer
     */
    toggleTimer() {
        this.toggleOnOffButton();
        this.timer();
    }

    /**
     * Sets the time from the sliders
     */
    setTime() {
        if(!this.timerInterval) {
            this.time.minutes = this.sliderElements.minuteSlider.value;
            this.time.seconds = this.sliderElements.secondsSlider.value;

            this.refreshDigitalClock();
        } else {
            console.error('New Value cant be set while timer is running!');

            this.sliderElements.minuteSlider.value = this.time.minutes;
            this.sliderElements.secondsSlider.value = this.time.seconds;
        }
    }

    /**
     * Refreshes the values of the clock
     */
    refreshDigitalClock() {
        this.composers.minutes.setTo(this.time.minutes);
        this.composers.seconds.setTo(this.time.seconds);
    }

    /**
     * Timer function, starts the countdown or ends it if cooldown has already been started
     */
    timer() {
        if(!this.timerInterval) {
            this.timerInterval = setInterval(() => {
                if(this.time.seconds > 0) {
                    this.time.seconds--;
                } else if(this.time.minutes > 0) {
                    this.time.minutes--;
                    this.time.seconds = 59;
                }

                if((this.time.minutes === 0 || this.time.minutes === '0') && (this.time.seconds === 0 || this.time.seconds === '0')) {
                    this.ring();
                    this.toggleTimer();
                    this.stopInterval();
                }

                this.refreshDigitalClock();
            }, 1000);
        } else {
            this.stopInterval();
        }
    }

    /**
     * Clears the interval
     */
    stopInterval() {
        this.timerInterval = clearInterval(this.timerInterval);
        this.setTime();
    }

    /**
     * Plays ringtone sound, if is found
     */
    ring() {
        if(this.ringTone) {
            this.ringTone.play();
        }
    }

    setUpButtons() {
        const toggle = () => this.toggleTimer();
        this.buttonElements.startButton.addEventListener('click', toggle);
        this.buttonElements.stopButton.addEventListener('click', () => {
            this.toggleTimer()
            this.dialog[0].close();
        });

        this.buttonElements.dialogButton.addEventListener('click', () => {
            this.openModal();
        });
    }

    openModal() {
        this.dialog[0].showModal();
    }

}