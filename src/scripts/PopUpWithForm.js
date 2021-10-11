import {Popup} from "./Popup";

export class PopUpWithForm extends Popup {
    constructor(selector, handleSubmit, { loadingText, oldText }) {
        super(selector);
        this._handleSubmit = handleSubmit;
        this._loadingText = loadingText;
        this.oldText = oldText;
        this.saveButton = this.popup.querySelector('.popupform__save-button');
    }
    _getInputValues() {
        const inputs = Array.from(this.popup.querySelectorAll('input'));
        const result = {};
        inputs.forEach((item) => {
            result[item.name] = item.value;
        });
        return result;
    }

    setEventListeners() {
        super.setEventListeners();
        this.popup.addEventListener('submit', (event) => {
            this.saveButton.textContent = this._loadingText;
            event.preventDefault();
            this._handleSubmit(this._getInputValues());
        });
    }
}
