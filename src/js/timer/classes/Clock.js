export class Clock {
    dateTime;
    time;
    constructor() {
        this.updateTime();
    }

    /**
     * updates the current time with JS's Date()
     */
    updateTime() {
        this.dateTime = new Date();
        this.time = {
            'hours': this.dateTime.getHours(),
            'minutes': this.dateTime.getMinutes(),
            'seconds': this.dateTime.getSeconds(),
        }
    }

    /**
     *
     * @returns { object } holds the current time
     */
    getCurrentTime() {
        this.updateTime();
        return this.time;
    }
}