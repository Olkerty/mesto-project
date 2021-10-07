const config = {
    urlMe: 'https://nomoreparties.co/v1/plus-cohort-1/users/me',
    urlAvatar: 'https://nomoreparties.co/v1/plus-cohort-1/users/me/avatar',
    urlCards: 'https://nomoreparties.co/v1/plus-cohort-1/cards',
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

export {config, validationParameters}
