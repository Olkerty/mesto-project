import { addCard } from "./cards";

import { profileAvatar } from "./script";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileAvatarInput = document.querySelector('input[name="popup__avatar-redact-link"]');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);

function closePopUpEscape(event) {
	if (event.key == 'Escape') {
		this.classList.remove('popupform_opened');
	}
}

export function openPopUp() {
	this.classList.add("popupform_opened");
	document.addEventListener('keydown', closePopUpEscape.bind(this));
}

export function fillPopUp() {
	profileFormName.value = profileTitle.textContent;
	profileFormProfession.value = profileSubTitle.textContent;
}

export function closePopUp() {
	this.classList.remove('popupform_opened');
	document.removeEventListener('keydown', closePopUpEscape);
}

export function submitEditProfileForm(evt) {
	evt.preventDefault();
	profileTitle.textContent = profileFormName.value;
	profileSubTitle.textContent = profileFormProfession.value;
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
	});
	closePopUp.bind(this)();
}

export function submitAddForm(evt) {
	evt.preventDefault();
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
		.then(res => res.json())
		.then((ret) => {
			console.log(ret);
			addCard(ret.name, ret.link, 0, false, true, ret._id);
		});
	popUpAddForm.reset();
	closePopUp.bind(this)();
}

export function submitEditAvatarForm(evt) {
	evt.preventDefault();
	fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar', {
		method: 'PATCH',
		headers: {
			authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			avatar: profileAvatarInput.value,
		})
	});
	profileAvatar.src = profileAvatarInput.value;

	closePopUp.bind(this)();
}