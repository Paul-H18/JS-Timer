export class Seperator extends HTMLElement {

    template;
    constructor() {
        super();

        this.template = document.querySelector('#tmp-seperator').content;
        this.appendChild(this.template.cloneNode(true));
    }

}