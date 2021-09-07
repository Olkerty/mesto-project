// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard } from './cards';


import { openPopUp, closePopUp, openAvatarPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm, submitEditAvatarForm } from './modal';

import { loadAvatar, loadCards } from './api';

//import { cards } from './initial-cards';

export const profileAvatar = document.querySelector('.profile__avatar');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileHoverMask = document.querySelector('.profile__hover-mask');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('div[name="popupform__edit-profile"]');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const popUpRedProfileAvatar = document.querySelector('div[name = "popupform__avatar-redact"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
export const profileAvatarPopUp = document.querySelector('form[name= "popup__avatar-redact-form-itself"]');
export let myId;
export const config = {
  URLme: 'https://nomoreparties.co/v1/plus-cohort-1/users/me',
  URLmyAvatar: 'https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar',
  URLcards: 'https://nomoreparties.co/v1/plus-cohort-1/cards',
  contentHeaders: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
    'Content-Type': 'application/json'
  },
  tokenHeaders: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
  },
}

const imagePopUpCloseIcon = document.querySelector('.popupform__img-close-icon');

const validationParameters = {
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
}

Array.from(document.querySelectorAll('.popupform__container')).forEach(function (container) {
  document.addEventListener('mouseup', function (event) {
    if (event.target != container && !container.contains(event.target)) {
      closePopUp(container.closest('.popupform'));
    }
  });
});
profileAvatar.addEventListener('mouseover', function (event) {
  document.querySelector('.profile__hover-mask').classList.add('profile__hover-mask_visible');
});
profileHoverMask.addEventListener('mouseout', function (event) {
  document.querySelector('.profile__hover-mask').classList.remove('profile__hover-mask_visible');
});

editProfileFormItSelf.addEventListener('submit', () => submitEditProfileForm(event, popUpEditProfileForm));
closeEditFormButton.addEventListener('click', () => closePopUp(popUpEditProfileForm));
closeAddFormButton.addEventListener('click', () => closePopUp(popUpAdd));
profileHoverMask.addEventListener('click', () => openPopUp(popUpRedProfileAvatar));
profileAvatarPopUp.addEventListener('submit', () => submitEditAvatarForm(event, popUpRedProfileAvatar));

Promise.all([
  loadAvatar(config.URLme, config.tokenHeaders),
  loadCards(config.URLcards, config.tokenHeaders)
])
  .then((values) => {
    profileTitle.textContent = values[0].name;
    profileSubTitle.textContent = values[0].about;
    profileAvatar.src = values[0].avatar;
    myId = values[0]._id;
    let isLiked = false;
    let cardIsMine = false;
    for (let i = values[1].length - 1; i >= 0; i--) {
      isLiked = false;
      cardIsMine = false;
      values[1][i].likes.forEach(function (item) {
        if (item._id == myId) {
          isLiked = true;
        }
      });
      if (values[1][i].owner._id == myId) {
        cardIsMine = true;
      }
      addCard(values[1][i], isLiked, cardIsMine);
    }
  })
  .catch((err) => {
    console.log(err);
  });
imagePopUpCloseIcon.addEventListener('click', () => closePopUp(popUpPicture));

enableValidation(validationParameters);
editButton.addEventListener('click', () => openAvatarPopUp(popUpEditProfileForm), false);
addButton.addEventListener('click', () => openPopUp(popUpAdd));
closeAddFormButton.addEventListener('click', () => closePopUp(popUpAdd));
popUpAddForm.addEventListener('submit', () => submitAddForm(event, popUpAdd, validationParameters.inactiveButtonClass));