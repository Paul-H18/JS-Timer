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
        console.log('App-Name:', this.appName, 'Div: ', this.appElement);
    }
}