export class SeperatorSmall extends HTMLElement {

    template;
    constructor() {
        super();

        this.template = document.querySelector('#tmp-seperator-sm').content;
        this.appendChild(this.template.cloneNode(true));
    }

}