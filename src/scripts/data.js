// Script data
export const profileTitle = document.querySelector('.profile__title');
export const profileSubTitle = document.querySelector('.profile__subtitle');
export const profileHoverMask = document.querySelector('.profile__hover-mask');
export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');
export const profileFormName = document.querySelector(`input[name='profile__name']`);
export const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
export const profileAvatar = document.querySelector('.profile__avatar');
export const profileAvatarPopUp = document.querySelector('form[name= "popup__avatar-redact-form-itself"]');
export const template = document.querySelector('#template');
const config = {
    url: 'https://nomoreparties.co/v1/plus-cohort-1',
    contentHeader: {
        authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
        'Content-Type': 'application/json'
    },
    tokenHeaders: {
        authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c'
    },
};

const validationParameters = {
    submitButtonSelector: 'popupform__save-button',
    inactiveButtonClass: 'popupform__save-button_inactive',
    inputErrorClass: 'popupform__input-type_error',
    errorClass: 'popupform__input-error_active'
};


export { config, validationParameters }
