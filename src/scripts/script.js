// JavaScript source code
import '../pages/index.css';

import { Validation } from './validate';

import { Card } from './cards';


import { openPopUp, closePopUp, openAvatarPopUp, submitAddForm, submitEditProfileForm, popUpPicture, popUpAddForm, submitEditAvatarForm } from './modal';

import { Section } from './Section.js';

import { Popup } from './modal.js';

import { editProfileForm, PopUpWithForm } from './modal.js';

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

const template = document.querySelector('#template');

import { api } from "./api";

const imagePopUpCloseIcon = document.querySelector('.popupform__img-close-icon');

const validationParameters = {
  submitButtonSelector: 'popupform__save-button',
  inactiveButtonClass: 'popupform__save-button_inactive',
  inputErrorClass: 'popupform__input-type_error',
  errorClass: 'popupform__input-error_active'
}

profileAvatar.addEventListener('mouseover', function (event) {
  document.querySelector('.profile__hover-mask').classList.add('profile__hover-mask_visible');
});
profileHoverMask.addEventListener('mouseout', function (event) {
  document.querySelector('.profile__hover-mask').classList.remove('profile__hover-mask_visible');
});

//editProfileFormItSelf.addEventListener('submit', () => submitEditProfileForm(event, popUpEditProfileForm));
closeEditFormButton.addEventListener('click', () => closePopUp(popUpEditProfileForm));
//closeAddFormButton.addEventListener('click', () => closePopUp(popUpAdd));
profileHoverMask.addEventListener('click', () => openPopUp(popUpRedProfileAvatar));
profileAvatarPopUp.addEventListener('submit', () => submitEditAvatarForm(event, popUpRedProfileAvatar));

Promise.all([
  api.loadAvatar(),
  api.loadCards()
])
  .then((values) => {
    profileTitle.textContent = values[0].name;
    profileSubTitle.textContent = values[0].about;
    profileAvatar.src = values[0].avatar;
    myId = values[0]._id;
    const initialCardSection = new Section({
      items: values[1],
      renderer: function (item) {
        let isLiked = false;
        let cardIsMine = false;
        isLiked = false;
        cardIsMine = false;
        item.likes.forEach(function (it) {
          if (it._id == myId) {
            isLiked = true;
          }
        });
        if (item.owner._id == myId) {
          cardIsMine = true;
        }
        const card = new Card(item, isLiked, cardIsMine);
        card.addCard(template);
      }
    }, '.photo-grid')
    initialCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
imagePopUpCloseIcon.addEventListener('click', () => closePopUp(popUpPicture));

const formList = Array.from(document.forms);
formList.forEach((item) => {
  const newValidity = new Validation(validationParameters, item);
  newValidity.enableValidation();
});

//editButton.addEventListener('click', () => openAvatarPopUp(popUpEditProfileForm), false);
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
editButton.addEventListener('click', () => {
  profileFormName.value = profileTitle.textContent;
  profileFormProfession.value = profileSubTitle.textContent;
  editProfileForm.open();
})
const addPopup = new PopUpWithForm('div[name = "popupadd"]', ({ popupadd__image_name, popupadd__link }) => {
  api.submitAddFormToServer(popupadd__image_name, popupadd__link)
    .then((ret) => {
      const initialCardSection = new Section({
        items: [],
        renderer: function (item) {
          const card = new Card(item, false, true);
          card.addCard(template);
        }
      }, '.photo-grid')
      initialCardSection.addItem(ret);
      popUpAddForm.reset();
      /*
      const submitButton = addPopup.querySelector('.popupform__save-button');
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      */
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
  //  .finally(() => changeText('Создать', popup));
});
addButton.addEventListener('click', () => { addPopup.open() });

//addButton.addEventListener('click', () => openPopUp(popUpAdd));
//closeAddFormButton.addEventListener('click', () => closePopUp(popUpAdd));
//popUpAddForm.addEventListener('submit', () => submitAddForm(event, popUpAdd, validationParameters.inactiveButtonClass));