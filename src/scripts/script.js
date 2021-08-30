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
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
const closeIcon = document.querySelector('.popupform__img-close-icon');


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
let cardss = [];
fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
  }
})
  .then((res) => {
    res.json();
    console.log(1);
  })
  .then((result) => {
    console.log(result.length);
    //cardss = result;
    for (let i = 0; i < result.length; i++) {
      //console.log(result[i].likes);
      //cardss.push(result[i]._id);
      console.log(result);
      console.log(result[i].likes.includes(result[i].owner));
      addCard(result[i].name, result[i].link, result[i].likes.length, result[i].likes.includes(result[i].owner), result[i]._id);
    }
    console.log(cardss);
  });
fetch('https://nomoreparties.co/v1/plus-cohort-1/cards', {
  headers: {
    authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
  }
})
  .then((res) => {
    res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((res) => {
    console.log(res);
  })
  ;
console.log(123123);
/*
for (let i = 0; i < cardss.length; i++) {
  addCard(cardss[i].name, cardss[i].link);
}
*/