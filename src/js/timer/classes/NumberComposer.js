export class NumberComposer {

    numberElements;
    numberCount;
    value;

    /**
     *
     * @param numberElements {Array} The Number Elements in correct order from left to right
     */
    constructor(numberElements) {
        this.numberElements = numberElements;
        this.numberCount = numberElements.length;

        this.value = 0;
    }

    setTo(value) {
        if(value) {
            const valueLength = value.toString().length;

            if(valueLength === this.numberCount) {
                const valueArray = [...value.toString()]
                this.numberElements.forEach((element, index) => {
                    element.setTo(parseInt(valueArray[index], 10));
                });
            } else if(valueLength > 0) {
                const valueArray = [...value.toString()].reverse()
                const reversedArrayOfElements = this.numberElements.slice().reverse();

                reversedArrayOfElements.forEach((element, index) => {
                    element.setTo(parseInt(valueArray[index] ?? 0, 10));
                });
            }
        } else {
            this.numberElements.forEach((element) => {
                element.setTo(0);
            });
        }
    }
}