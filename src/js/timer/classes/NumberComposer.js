export class NumberComposer {

    numberElements;
    numberCount;
    value;

    /**
     *
     * @param numberElements {Array} The Number Elements in correct order from left to right
     * @param value {number} Pre Value
     */
    constructor(numberElements, value= 0) {
        this.numberElements = numberElements;
        this.numberCount = numberElements.length;

        this.value = value;

        this.setTo(this.value);
    }

    /**
     * Sets composition to given value
     * can be smaller than count of numbers but not bigger!
     * e.g. -> 2003 to 2003 or 0002003
     * @param value
     */
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
            } else {
                console.error('Error in setting value to seven segment numbers. maybe the given value is too big!');
            }
        } else {
            this.numberElements.forEach((element) => {
                element.setTo(0);
            });
        }
    }
}