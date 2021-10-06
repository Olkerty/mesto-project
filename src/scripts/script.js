// JavaScript source code
import '../pages/index.css';

import { Validation } from './validate';
import { Card } from './cards';
import {UserInfo} from "./UserInfo";
import { Section } from './Section.js';
import {Api} from './api.js'
import {config, validationParameters} from "./data";
import { PopUpWithForm } from './modal.js';


const userInfo = new UserInfo('profile__title', 'profile__subtitle');
export const api = new Api(config);

export const profileAvatar = document.querySelector('.profile__avatar');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileHoverMask = document.querySelector('.profile__hover-mask');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
export const profileAvatarPopUp = document.querySelector('form[name= "popup__avatar-redact-form-itself"]');
export let myId;

const template = document.querySelector('#template');

const imagePopUpCloseIcon = document.querySelector('.popupform__img-close-icon');

profileAvatar.addEventListener('mouseover', function (event) {
  document.querySelector('.profile__hover-mask').classList.add('profile__hover-mask_visible');
});
profileHoverMask.addEventListener('mouseout', function (event) {
  document.querySelector('.profile__hover-mask').classList.remove('profile__hover-mask_visible');
});


Promise.all([
  userInfo.getUserInfo(),
  api.loadCards()
])
  .then((values) => {
    profileTitle.textContent = values[0].name;
    profileSubTitle.textContent = values[0].about;
    profileAvatar.src = values[0].avatar;
    myId = values[0]._id;
    const initialCardSection = new Section({
      items: values[1].reverse(),
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
        console.log(values[1])
        const card = new Card(item, isLiked, cardIsMine);
        card.addCard(template);
      }
    }, '.photo-grid');
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

const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');


const addPopup = new PopUpWithForm('div[name = "popupadd"]', ({ popupadd__image_name, popupadd__link }) => {
  api.submitAddFormToServer(popupadd__image_name, popupadd__link)
    .then((ret) => {
      const initialCardSection = new Section({
        items: [],
        renderer: function (item) {
          const card = new Card(item, false, true);
          card.addCard(template);
        }
      }, '.photo-grid');
      initialCardSection.addItem(ret);
        addPopup._popup.querySelector('.popupform__form-itself').reset();
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

const editProfileForm = new PopUpWithForm('div[name="popupform__edit-profile"]', ({ profile__name, profile__profession }) => {
    userInfo.setUserInfo(profile__name, profile__profession)
        .then(() => {
            editProfileForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
});
editButton.addEventListener('click', () => {
    profileFormName.value = profileTitle.textContent;
    profileFormProfession.value = profileSubTitle.textContent;
    editProfileForm.open();
});

const changeAvatarForm = new PopUpWithForm('div[name="popupform__avatar-redact"]', ({popup__avatar_redact_link}) => {
    api.submitAvatarToServer(popup__avatar_redact_link)
        .then((response) => {
            profileAvatar.src = response.avatar;
            profileAvatarPopUp.reset();
            changeAvatarForm.close();
        })
        .catch((err) => {
            console.log(err);
        })
});
profileHoverMask.addEventListener('click', () => {
    changeAvatarForm.open()
});
