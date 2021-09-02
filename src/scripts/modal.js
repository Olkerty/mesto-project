import { addCard } from "./cards";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);

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
	profileTitle.textContent = profileFormName.value;
	profileSubTitle.textContent = profileFormProfession.value;
	closePopUp(popup);
}

export function submitAddForm(evt, popup, inactiveButtonClass) {
	evt.preventDefault();
	const card = {
		name: addFormName.value,
		link: addFormLink.value
	}
	addCard(card);
	popUpAddForm.reset();
	const submitButton = popup.querySelector('.popupform__save-button');
	submitButton.classList.add(inactiveButtonClass);
	submitButton.disabled = true;
	closePopUp(popup);
}