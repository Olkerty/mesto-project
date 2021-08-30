// JavaScript source code
import '../pages/index.css';

import { enableValidation } from './validate';

import { addCard, cards } from './cards';

import { openPopUp, closePopUp, fillPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm } from './modal';


const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileAvatar = document.querySelector('.profile__avatar');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('.popupform');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const popUpRedProfileAvatar = document.querySelector('div[name = "popupform__avatar-redact"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
const closeIcon = document.querySelector('.popupform__img-close-icon');

let cardss = [];
let isLiked = false;

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
profileAvatar.addEventListener('click', openPopUp.bind(popUpRedProfileAvatar));

enableValidation({
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
});

fetch('https://nomoreparties.co/v1/plus-cohort-1/users/me', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
  }
})
  .then(res => res.json())
  .then((result) => {
    // console.log(result);
    profileTitle.textContent = result.name;
    profileSubTitle.textContent = result.about;
    profileAvatar.src = result.avatar;
  });

fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
  }
})
  .then((res) => {
    return res.json();
  })
  .then((result) => {
    //cardss = result;
    for (let i = 0; i < result.length; i++) {
      isLiked = false;
      //console.log(result[i]);
      //console.log('etewt');
      //cardss.push(result[i]._id);
      //console.log(result[i].owner._id);
      result[i].likes.forEach(function (item) {
        if (item._id == result[i].owner._id) {
          isLiked = true;
        }
      });
      console.log(result[i].likes[0]);
      //console.log((result[i].likes).includes(result[i].owner));
      addCard(result[i].name, result[i].link, result[i].likes.length, isLiked, result[i]._id);
    }
  });