import {Popup} from "./Popup";

export class PopUpWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._src = this.popup.querySelector(".popupform__image");
        this._alt = this.popup.querySelector(".popupform__image");
        this._name = this.popup.querySelector('.popupform__text');
    }
    open(name, link) {
        this._src.src = link;
        this._alt.alt = name;
        this._name.textContent = name;
        super.open();
    }
}
