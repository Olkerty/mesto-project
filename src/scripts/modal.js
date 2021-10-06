import {api} from "./script.js";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);


export class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this.close = this.close.bind(this);
		this._closePopUpEscape = this._closePopUpEscape.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
	}
	open() {
		this._popup.classList.add("popupform_opened");
		this.setEventListeners();
	}
	close() {
		this._popup.classList.remove('popupform_opened');
		this.removeEventListeners();
	}
	_closePopUpEscape(event) {
		if (event.key == 'Escape') {
			this.close(document.querySelector('.popupform_opened'));
		}
	}
	setEventListeners() {
		this._popup.querySelector('.popup-close-icon').addEventListener('click', this.close);
		document.addEventListener('mouseup', this.closeOverlay);
		document.addEventListener('keydown', this._closePopUpEscape);
	}
	removeEventListeners() {
		this._popup.querySelector('.popup-close-icon').removeEventListener('click', this.close);
		document.removeEventListener('click', this.closeOverlay);
		document.removeEventListener('keydown', this._closePopUpEscape);
	}
	closeOverlay(event) {
		const container = this._popup.querySelector('.popupform__container');
		if (event.target != container && !container.contains(event.target)) {
			this.close();
		}
	}
}

export class PopUpWithImage extends Popup {
	open(name, link) {
		this._popup.querySelector(".popupform__image").src = link;
		this._popup.querySelector(".popupform__image").alt = name;
		this._popup.querySelector('.popupform__text').textContent = name;
		super.open();
	}
}

export class PopUpWithForm extends Popup {
	constructor(selector, callBack) {
		super(selector);
		this._callBack = callBack;
	}
	_getInputValues() {
		const inputs = Array.from(this._popup.querySelectorAll('input'));
		const result = {};
		inputs.forEach((item) => {
			result[item.name] = item.value;
		});
		return result;
	}
	changeText(text) {
		const submitButton = this._popup.querySelector('.popupform__save-button');
		submitButton.textContent = '';
		submitButton.textContent = text;
	}
	setEventListeners() {
		super.setEventListeners();
		this._popup.addEventListener('submit', (event) => {
			event.preventDefault();
			//	this.changeText(text);
			this._callBack(this._getInputValues());
		}, {once: true});
	}
}



export class DeletePopup extends Popup {
	constructor(selector, callBack) {
		super(selector);
		this._callBack = callBack;
	}

	open(id, deleteButton) {
		this._popup.classList.add("popupform_opened");
		this.setEventListeners(id, deleteButton);
	}

	setEventListeners(id, deleteButton) {
		this._popup.addEventListener('submit', (event) => {
			event.preventDefault();
			this._callBack(id, deleteButton);
		}, {once: true});
	}
}

export const deletePopup = new DeletePopup(`div[name="popupform__affirm"]`, (id, deleteButton) => {
	api.deletePhotoGridElementFromServer(id)
		.then(() => {
			deleteButton.closest('.photo-grid__item').remove();
			deletePopup.close();
		})
		.catch((err) => {
			console.log(err);
		});
});
