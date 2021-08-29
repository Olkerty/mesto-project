// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard, cards } from './cards';

import { openPopUp, closePopUp, fillPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm } from './modal';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('.popupform');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
const closeIcon = document.querySelector('.popupform__img-close-icon');


for (let i = 0; i < cards.length; i++) {
  addCard(cards[i].name, cards[i].link);
}

Array.from(document.querySelectorAll('.popupform__container')).forEach(function (container) {
  document.addEventListener('mouseup', function (event) {
    if (event.target != container && !container.contains(event.target)) {
      container.parentElement.classList.remove('popupform_opened');
    }
  });
});

editProfileFormItSelf.addEventListener('submit', submitEditProfileForm.bind(popUpEditProfileForm));
closeEditFormButton.addEventListener('click', closePopUp.bind(popUpEditProfileForm));
editButton.addEventListener('click', openPopUp.bind(popUpEditProfileForm), false);
editButton.addEventListener('click', fillPopUp);
addButton.addEventListener('click', openPopUp.bind(popUpAdd));
closeAddFormButton.addEventListener('click', closePopUp.bind(popUpAdd));
popUpAddForm.addEventListener('submit', submitAddForm.bind(popUpAdd));
closeIcon.addEventListener('click', closePopUp.bind(popUpPicture));

enableValidation({
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
});