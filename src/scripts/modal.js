import { Card } from "./cards";

import { profileAvatar, profileAvatarPopUp, config } from "./script";

import { api } from "./api";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileAvatarInput = document.querySelector('input[name="popup__avatar-redact-link"]');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);
const template = document.querySelector('#template');


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
			const card = new Card(ret, false, true);
			card.addCard(template);
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
