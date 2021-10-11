// JavaScript source code
import '../pages/index.css';

import { Validation } from './Validation';
import { Card } from './Сard';
import { UserInfo } from "./UserInfo";
import { Section } from './Section.js';
import { Api } from './Api.js'
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
import {DeletePopup} from './DeletePopup';
import {PopUpWithImage} from "./PopUpWithImage";
import {PopUpWithForm} from "./PopUpWithForm";

export const api = new Api(config);
let initialCardSection;

const popUpWithImage = new PopUpWithImage(`div[name="popupform__picture"]`);
popUpWithImage.setEventListeners();

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

deletePopup.setEventListeners();

const userInfo = new UserInfo('profile__title', 'profile__subtitle', api);
let myId;

profileAvatar.addEventListener('mouseover', function (event) {
  document.querySelector('.profile__hover-mask').classList.add('profile__hover-mask_visible');
});
profileHoverMask.addEventListener('mouseout', function (event) {
  document.querySelector('.profile__hover-mask').classList.remove('profile__hover-mask_visible');
});

const renderCard = (item, selector) => {
    let isLiked = false;
    let cardIsMine = false;
    item.likes.forEach(function (it) {
        if (it._id === myId) {
            isLiked = true;
        }
    });
    if (item.owner._id === myId) {
        cardIsMine = true;
    }
    const photoGrid = document.querySelector(selector);
    const card = new Card(item, isLiked, cardIsMine, popUpWithImage, api);
    card.addCard(template, photoGrid, deletePopup);
};


Promise.all([
  userInfo.getUserInfo(),
  api.loadCards()
])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileSubTitle.textContent = profile.about;
    profileAvatar.src = profile.avatar;
    myId = profile._id;
    initialCardSection = new Section({
      items: cards.reverse(),
      renderer: function (item) {
        renderCard(item, this.selector);
      }
    }, '.photo-grid');
    initialCardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const formList = Array.from(document.querySelectorAll('.popupform__form-itself'));

formList.forEach((item) => {
  const newValidity = new Validation(validationParameters, item);
  newValidity.enableValidation();
});


const addPopup = new PopUpWithForm('div[name = "popupadd"]', ({ popupadd__image_name, popupadd__link }) => {
  api.submitAddFormToServer(popupadd__image_name, popupadd__link)
    .then((ret) => {
      initialCardSection.addItem(ret);
      addPopup.popup.querySelector('.popupform__form-itself').reset();
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => addPopup.saveButton.textContent = addPopup.oldText)
}, { loadingText: 'Создание...', oldText: 'Создать' });
addPopup.setEventListeners();

addButton.addEventListener('click', () => {
  addPopup.open();
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
});

editProfileForm.setEventListeners();

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
  changeAvatarForm.open();
  //changeAvatarForm.saveButton.classList.add('popupform__save-button_inactive');
});

changeAvatarForm.setEventListeners();
