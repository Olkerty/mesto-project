// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard } from './cards';


import { openPopUp, closePopUp, openAvatarPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm, submitEditAvatarForm } from './modal';

//import { cards } from './initial-cards';

const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
const profileHoverMask = document.querySelector('.profile__hover-mask');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('.popupform');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const popUpRedProfileAvatar = document.querySelector('div[name = "popupform__avatar-redact"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
export const profileAvatarPopUp = document.querySelector('form[name= "popup__avatar-redact-form-itself"]');


let myId = '571dcf6f2cfcc0fecc4eba60';
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

fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
  headers: {
    authorization: "18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c"
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    //console.log(result);
    //myId = result._id;
    profileTitle.textContent = result.name;
    profileSubTitle.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then((result) => {
    let isLiked = false;
    let cardIsMine = false;
    for (let i = result.length - 1; i >= 0; i--) {
      isLiked = false;
      cardIsMine = false;
      //console.log(result[i].likes);
      //console.log('etewt');
      //console.log(result[i].owner._id);
      result[i].likes.forEach(function (item) {
        //console.log(item._id);
        //console.log(result[i].owner._id);
        if (item._id == myId) {
          isLiked = true;
        }
      });
      if (result[i].owner._id == myId) {
        cardIsMine = true;
      }
      //console.log(result[i].likes[0]);
      //console.log((result[i].likes).includes(result[i].owner));
      //console.log(isLiked);
      addCard(result[i], isLiked, cardIsMine);
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

