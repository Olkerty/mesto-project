import { addCard } from "./cards";

import { profileAvatar, profileAvatarPopUp, config } from "./script";

import { submitEditFormToServer, submitAddFormToServer, submitAvatarToServer } from "./api";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileAvatarInput = document.querySelector('input[name="popup__avatar-redact-link"]');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);


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
	profileTitle.textContent = profileFormName.value;
	profileSubTitle.textContent = profileFormProfession.value;
	submitEditFormToServer(config.URLme, config.contentHeaders, profileFormName.value, profileFormProfession.value)
	/*
	fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
		method: 'PATCH',
		headers: {
			authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: profileFormName.value,
			about: profileFormProfession.value
		})
	})
		.catch((err) => {
			console.log(err);
		});
		*/
	closePopUp(popup);
	changeText('Сохранить', popup);
}

export function submitAddForm(evt, popup, inactiveButtonClass) {
	evt.preventDefault();
	changeText('Создание...', popup);
	submitAddFormToServer(config.URLcards, config.contentHeaders, addFormName.value, addFormLink.value);
	/*
	fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
		method: 'POST',
		headers: {
			authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: addFormName.value,
			link: addFormLink.value
		})
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}

			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((ret) => {
			console.log(ret);
			addCard(ret, false, true);
		})
		.catch((err) => {
			console.log(err);
		});
		*/
	popUpAddForm.reset();
	const submitButton = popup.querySelector('.popupform__save-button');
	submitButton.classList.add(inactiveButtonClass);
	submitButton.disabled = true;
	closePopUp(popup);
	changeText('Создать', popup);
}

export function submitEditAvatarForm(evt, popup) {
	evt.preventDefault();
	changeText('Сохранение...', popup);
	submitAvatarToServer(config.URLmyAvatar, config.contentHeaders, profileAvatarInput.value);
	/*
	fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar', {
		method: 'PATCH',
		headers: {
			authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			avatar: profileAvatarInput.value,
		})
	})
		.catch((err) => {
			console.log(err);
		});
		*/
	profileAvatar.src = profileAvatarInput.value;
	profileAvatarPopUp.reset();
	closePopUp(popup);
	changeText('Сохранить', popup);
	closePopUp(popup);
}
