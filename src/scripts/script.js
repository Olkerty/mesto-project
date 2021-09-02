// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard } from './cards';

import { cards } from './initial-cards';

import { openPopUp, closePopUp, openAvatarPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm } from './modal';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('.popupform');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
const imagePopUpCloseIcon = document.querySelector('.popupform__img-close-icon');

const validationParameters = {
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
}


cards.forEach(function (item) {
  addCard(item)
});

Array.from(document.querySelectorAll('.popupform__container')).forEach(function (container) {
  document.addEventListener('mouseup', function (event) {
    if (event.target != container && !container.contains(event.target)) {
      closePopUp(container.closest('.popupform'));
    }
  });
});

editProfileFormItSelf.addEventListener('submit', () => submitEditProfileForm(event, popUpEditProfileForm));
closeEditFormButton.addEventListener('click', () => closePopUp(popUpEditProfileForm));
editButton.addEventListener('click', () => openAvatarPopUp(popUpEditProfileForm), false);
addButton.addEventListener('click', () => openPopUp(popUpAdd));
closeAddFormButton.addEventListener('click', () => closePopUp(popUpAdd));
popUpAddForm.addEventListener('submit', () => submitAddForm(event, popUpAdd, validationParameters.inactiveButtonClass));
imagePopUpCloseIcon.addEventListener('click', () => closePopUp(popUpPicture));

enableValidation(validationParameters);