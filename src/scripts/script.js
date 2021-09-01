// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard, cards } from './cards';

import { openPopUp, closePopUp, fillPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm, submitEditAvatarForm } from './modal';


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
const closeIcon = document.querySelector('.popupform__img-close-icon');
const profileAvatarPopUp = document.querySelector('form[name= "popup__avatar-redact-form-itself"]');

let isLiked = false;
let cardIsMine = false;
let myId = '571dcf6f2cfcc0fecc4eba60';

Array.from(document.querySelectorAll('.popupform__container')).forEach(function (container) {
  document.addEventListener('mouseup', function (event) {
    if (event.target != container && !container.contains(event.target)) {
      container.parentElement.classList.remove('popupform_opened');
    }
  });
});
profileAvatar.addEventListener('mouseover', function (event) {
  document.querySelector('.profile__hover-mask').classList.add('profile__hover-mask_visible');
});
profileHoverMask.addEventListener('mouseout', function (event) {
  document.querySelector('.profile__hover-mask').classList.remove('profile__hover-mask_visible');
});

editProfileFormItSelf.addEventListener('submit', submitEditProfileForm.bind(popUpEditProfileForm));
closeEditFormButton.addEventListener('click', closePopUp.bind(popUpEditProfileForm));
editButton.addEventListener('click', openPopUp.bind(popUpEditProfileForm), false);
editButton.addEventListener('click', fillPopUp);
addButton.addEventListener('click', openPopUp.bind(popUpAdd));
closeAddFormButton.addEventListener('click', closePopUp.bind(popUpAdd));
popUpAddForm.addEventListener('submit', submitAddForm.bind(popUpAdd));
closeIcon.addEventListener('click', closePopUp.bind(popUpPicture));
profileHoverMask.addEventListener('click', openPopUp.bind(popUpRedProfileAvatar));
profileAvatarPopUp.addEventListener('submit', submitEditAvatarForm.bind(popUpRedProfileAvatar));

enableValidation({
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
});

fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
  headers: {
    authorization: "18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c"
  }
})
  .then(res => res.json())
  .then((result) => {
    //console.log(result);
    myId = result._id;
    profileTitle.textContent = result.name;
    profileSubTitle.textContent = result.about;
    profileAvatar.src = result.avatar;
  });

fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
  }
})
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    for (let i = result.length - 1; i >= 0; i--) {
      isLiked = false;
      cardIsMine = false;
      console.log(result);
      //console.log('etewt');
      //console.log(result[i].owner._id);
      result[i].likes.forEach(function (item) {
        if (item._id == result[i].owner._id) {
          isLiked = true;
        }
      });
      if (result[i].owner._id == myId) {
        cardIsMine = true;
      }
      //console.log(result[i].likes[0]);
      //console.log((result[i].likes).includes(result[i].owner));
      addCard(result[i].name, result[i].link, result[i].likes.length, isLiked, cardIsMine, result[i]._id);
    }
  });