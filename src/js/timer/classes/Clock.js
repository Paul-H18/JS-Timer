export class Clock {
    dateTime;
    time;
    constructor() {
        this.updateTime();
    }

    updateTime() {
        this.dateTime = new Date();
        this.time = {
            'hours': this.dateTime.getHours(),
            'minutes': this.dateTime.getMinutes(),
            'seconds': this.dateTime.getSeconds(),
        }
    }

    getCurrentTime() {
        this.updateTime();
        return this.time;
    }
}