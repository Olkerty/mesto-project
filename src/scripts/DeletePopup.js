import {Popup} from "./Popup";

export class DeletePopup extends Popup {
    constructor(selector, callBack, { loadingText, oldText }) {
        super(selector);
        this._callBack = callBack;
        this._loadingText = loadingText;
        this.oldText = oldText;
        this.saveButton = this.popup.querySelector('.popupform__save-button');
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    open(id, deleteButton) {
        super.open();
        this._id = id;
        this._deleteButton = deleteButton;
        this.popup.addEventListener('submit', this._handleSubmit);
    }

    close() {
        super.close();
        this.popup.removeEventListener('submit', this._handleSubmit);
    }

    _handleSubmit(event) {
        this.saveButton.textContent = this._loadingText;
        event.preventDefault();
        this._callBack(this._id, this._deleteButton);
    }

    setEventListeners() {
        this.popup.querySelector('.popup-close-icon').addEventListener('click', this.close);
        document.addEventListener('mouseup', this.closeOverlay);
    }
}
