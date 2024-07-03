export class Number extends HTMLElement {

    template;
    value;
    constructor() {
        super();
        this.value = 0;
        this.template = document.querySelector('#tmp-number').content;
        this.appendChild(this.template.cloneNode(true));
    }

    /**
     *
     * @returns {NodeList} all polygons of a number
     */
    getAllElements() {
        return this.querySelectorAll('polygon');
    }

    /**
     * Deactivates all segments
     */
    disableAll() {
        this.getAllElements().forEach((polygon) => {
            polygon.classList.remove('js-timer-on');
            polygon.classList.add('js-timer-off');
        });
    }

    /**
     * Activates all segments
     */
    activateAll() {
        this.getAllElements().forEach((polygon) => {
            polygon.classList.remove('js-timer-off');
            polygon.classList.add('js-timer-on');
        });
    }

    /**
     * Activates single segment
     * @param segment segment that is to be activated
     */
    activateSingle(segment) {
        const partElement = this.querySelector(('#' + segment));
        partElement.classList.remove('js-timer-off')
        partElement.classList.add('js-timer-on')
    }

    /**
     * activates the passed parameters
     * @param {Array} toActivate
     */
    activate(toActivate) {
        toActivate.forEach((segment) => {
            this.activateSingle(segment);
        });
    }

    /**
     * activates all except the passed parameters
     * @param {Array} notToActivate
     */
    activateExcept(notToActivate) {
        this.getAllElements().forEach((segment) => {
            if(!notToActivate.includes(segment.id)) {
                segment.classList.add('js-timer-on');
                segment.classList.remove('js-timer-off');
            }
        });
    }

    /**
     * Sets the digit to the passed integer value
     * @param {int} digit the digits desired value - needs to be greater than 0, lower than 9
     */
    setTo(digit) {
        if(digit <= 9 && digit >= 0) {
            this.disableAll();
            switch(digit) {
                case 0:
                    this.activateExcept(['centerMid']);
                    break;
                case 1:
                    this.activate(['rightTop', 'rightBottom']);
                    break;
                case 2:
                    this.activate(['centerTop', 'rightTop', 'centerMid', 'leftBottom', 'centerBottom']);
                    break;
                case 3:
                    this.activate(['centerTop', 'rightTop', 'centerMid', 'rightBottom', 'centerBottom']);
                    break;
                case 4:
                    this.activate(['rightTop', 'centerMid', 'rightBottom', 'leftTop']);
                    break;
                case 5:
                    this.activate(['centerTop', 'leftTop', 'centerMid', 'rightBottom', 'centerBottom']);
                    break;
                case 6:
                    this.activateExcept(['rightTop']);
                    break;
                case 7:
                    this.activate(['rightTop', 'rightBottom', 'centerTop']);
                    break;
                case 8:
                    this.activateAll();
                    break;
                case 9:
                    this.activateExcept(['leftBottom']);
                    break;
            }

        } else {
            console.error('Value can be greater than 9 or smaller than zero!');
        }
    }
}

