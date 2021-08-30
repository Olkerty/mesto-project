import { addCard } from "./cards";

export const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);

export function openPopUp() {
	this.classList.add("popupform_opened");
	const tempVar = this;
	document.addEventListener('keydown', function closePopUpEscape(event) {
		if (event.key == 'Escape') {
			tempVar.classList.remove('popupform_opened');
		}
	});
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
	closePopUp.bind(this)();
}

export function submitAddForm(evt) {
	evt.preventDefault();
	addCard(addFormName.value, addFormLink.value);
	popUpAddForm.reset();
	closePopUp.bind(this)();
}