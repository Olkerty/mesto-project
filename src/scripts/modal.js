import { Card } from "./cards";

import { profileAvatar, profileAvatarPopUp, config } from "./script";

import { api } from "./api";

import { Section } from "./Section";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image_name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileAvatarInput = document.querySelector('input[name="popup__avatar-redact-link"]');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);
const template = document.querySelector('#template');

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
		})
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
		});
	}
}


function changeText(text, container) {
	const submitButton = container.querySelector('.popupform__save-button');
	submitButton.textContent = '';
	submitButton.textContent = text;
}

export function openAddPopUp(popup) {
	profileFormName.value = profileTitle.textContent;
	profileFormProfession.value = profileSubTitle.textContent;
	openPopUp(popup);
}

function closePopUpEscape(event) {
	if (event.key == 'Escape') {
		closePopUp(document.querySelector('.popupform_opened'));
	}
}

export function openPopUp(popup) {
	popup.classList.add("popupform_opened");
	document.addEventListener('keydown', closePopUpEscape);
}

export function closePopUp(popup) {
	popup.classList.remove('popupform_opened');
	document.removeEventListener('keydown', closePopUpEscape);
}

export function openAvatarPopUp(popup) {
	profileFormName.value = profileTitle.textContent;
	profileFormProfession.value = profileSubTitle.textContent;
	openPopUp(popup);
}

export const editProfileForm = new PopUpWithForm('div[name="popupform__edit-profile"]', ({ profile__name, profile__profession }) => {
	api.submitEditFormToServer(profile__name, profile__profession)
		.then((response) => {
			profileTitle.textContent = response.name;
			profileSubTitle.textContent = response.about;
			editProfileForm.close();
		})
		.catch((err) => {
			console.log(err);
		})
});

export function submitEditProfileForm(evt, popup) {
	evt.preventDefault();
	changeText('Сохранение...', popup);
	api.submitEditFormToServer(profileFormName.value, profileFormProfession.value)
		.then((response) => {
			profileTitle.textContent = response.name;
			profileSubTitle.textContent = response.about;
			closePopUp(popup);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => changeText('Сохранить', popup));
}

export function submitAddForm(evt, popup, inactiveButtonClass) {
	evt.preventDefault();
	changeText('Создание...', popup);
	api.submitAddFormToServer(addFormName.value, addFormLink.value)
		.then((ret) => {
			const initialCardSection = new Section({
				items: [],
				renderer: function (item) {
					const card = new Card(item, false, true);
					card.addCard(template);
				}
			}, '.photo-grid')
			initialCardSection.addItem(ret);
			popUpAddForm.reset();
			const submitButton = popup.querySelector('.popupform__save-button');
			submitButton.classList.add(inactiveButtonClass);
			submitButton.disabled = true;
			closePopUp(popup);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => changeText('Создать', popup));
}

export function submitEditAvatarForm(evt, popup) {
	evt.preventDefault();
	changeText('Сохранение...', popup);
	api.submitAvatarToServer(profileAvatarInput.value)
		.then((response) => {
			profileAvatar.src = response.avatar;
			profileAvatarPopUp.reset();
			closePopUp(popup);
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => changeText('Создать', popup));
}
