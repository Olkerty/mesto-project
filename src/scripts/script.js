// JavaScript source code
import '../pages/index.css';

import { Validation } from './validate';
import { Card } from './cards';
import { UserInfo } from "./UserInfo";
import { Section } from './Section.js';
import { Api } from './api.js'
import {
  config,
  validationParameters,
  profileTitle,
  profileSubTitle,
  profileHoverMask,
  editButton,
  addButton,
  profileFormName,
  profileFormProfession,
  profileAvatar,
  profileAvatarPopUp,
  template
} from "./data";
import { PopUpWithForm, DeletePopup } from './modal.js';


const deletePopup = new DeletePopup(`div[name="popupform__affirm"]`, (id, deleteButton) => {
  api.deletePhotoGridElementFromServer(id)
    .then(() => {
      deleteButton.closest('.photo-grid__item').remove();
      deletePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      deletePopup.saveButton.textContent = deletePopup.oldText;
    })
}, { loadingText: 'Удаление...', oldText: 'Да' });

const userInfo = new UserInfo('profile__title', 'profile__subtitle');
export const api = new Api(config);
let myId;

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
        item.likes.forEach(function (it) {
          if (it._id == myId) {
            isLiked = true;
          }
        });
        if (item.owner._id == myId) {
          cardIsMine = true;
        }
        const photoGrid = document.querySelector(this.selector);
        const card = new Card(item, isLiked, cardIsMine);
        card.addCard(template, photoGrid, deletePopup);
      }
    }, '.photo-grid');
    initialCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const formList = Array.from(document.forms);
formList.forEach((item) => {
  const newValidity = new Validation(validationParameters, item);
  newValidity.enableValidation();
});


const addPopup = new PopUpWithForm('div[name = "popupadd"]', ({ popupadd__image_name, popupadd__link }) => {
  api.submitAddFormToServer(popupadd__image_name, popupadd__link)
    .then((ret) => {
      const initialCardSection = new Section({
        items: [],
        renderer: function (item) {
          const card = new Card(item, false, true);
          const photoGrid = document.querySelector(this.selector);
          card.addCard(template, photoGrid, deletePopup);
        }
      }, '.photo-grid');
      initialCardSection.addItem(ret);
      addPopup._popup.querySelector('.popupform__form-itself').reset();
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addPopup.saveButton.textContent = addPopup.oldText)
}, { loadingText: 'Создание...', oldText: 'Создать' });
addButton.addEventListener('click', () => {
  addPopup.open()
  addPopup.saveButton.classList.add('popupform__save-button_inactive');
});

const editProfileForm = new PopUpWithForm('div[name="popupform__edit-profile"]', ({ profile__name, profile__profession }) => {
  userInfo.setUserInfo(profile__name, profile__profession)
    .then(() => {
      editProfileForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => editProfileForm.saveButton.textContent = editProfileForm.oldText)
}, { loadingText: 'Сохранение...', oldText: 'Сохранить' });
editButton.addEventListener('click', () => {
  profileFormName.value = profileTitle.textContent;
  profileFormProfession.value = profileSubTitle.textContent;
  editProfileForm.open();
  editProfileForm.saveButton.classList.add('popupform__save-button_inactive');
});

const changeAvatarForm = new PopUpWithForm('div[name="popupform__avatar-redact"]', ({ popup__avatar_redact_link }) => {
  api.submitAvatarToServer(popup__avatar_redact_link)
    .then((response) => {
      profileAvatar.src = response.avatar;
      profileAvatarPopUp.reset();
      changeAvatarForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => changeAvatarForm.saveButton.textContent = changeAvatarForm.oldText)
}, { loadingText: 'Сохранение...', oldText: 'Сохранить' });
profileHoverMask.addEventListener('click', () => {
  changeAvatarForm.open()
  changeAvatarForm.saveButton.classList.add('popupform__save-button_inactive');
});
