export class Popup {
	constructor(popupSelector) {
		this.popup = document.querySelector(popupSelector);
		this.close = this.close.bind(this);
		this._closePopUpEscape = this._closePopUpEscape.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	open() {
		this.popup.classList.add("popupform_opened");
		document.addEventListener('keydown', this._closePopUpEscape);
		//this.setEventListeners()
	}

	close() {
		this.popup.classList.remove('popupform_opened');
		document.removeEventListener('keydown', this._closePopUpEscape);
		//this.removeEventListeners();
	}

	_closePopUpEscape(event) {
		if (event.key === 'Escape') {
			this.close(document.querySelector('.popupform_opened'));
		}
	}

	setEventListeners() {
		this.popup.querySelector('.popup-close-icon').addEventListener('click', this.close);
		document.addEventListener('mouseup', this.closeOverlay);
	}

	// removeEventListeners() {
	// 	this._popup.querySelector('.popup-close-icon').removeEventListener('click', this.close);
	// 	document.removeEventListener('click', this.closeOverlay);
	// 	document.removeEventListener('keydown', this._closePopUpEscape);
	// }

	closeOverlay(event) {
		const container = this.popup.querySelector('.popupform__container');
		if (event.target !== container && !container.contains(event.target)) {
			this.close();
		}
	}
}
