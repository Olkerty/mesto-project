// JavaScript source code
const pageSelector = document.querySelector('.page');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popUpEditProfileForm = document.querySelector('.popupform');
const popUpAdd = document.querySelector('div[name = "popupadd"]');
const closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
const closeEditFormButton = document.querySelector('.popupform__close-icon');
const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
const profileFormName = document.querySelector(`input[name='profile__name']`);
const profileFormProfession = document.querySelector('input[name = "profile__profession"]');
const addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
const addFormLink = document.querySelector('input[name = "popupadd__link"]');
const editProfileFormItSelf = document.querySelector('.popupform__form-itself');
const popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);
const photoGrid = document.querySelector('.photo-grid');
const popUpPicture = document.querySelector(`div[name="popupform__picture"]`);
const closeIcon = document.querySelector('.popupform__img-close-icon');
const template = document.querySelector('#template');
let likeButton = document.querySelector(".photo-grid__like");
let deleteButton = document.querySelector('.photo-grid__delete');
let pictureOnCard = document.querySelector('.photo-grid__picture');
let clone = template.content.cloneNode(true);
let textOnCard = clone.querySelector('.photo-grid__text');

let tempVariable;

const cards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
function openPopUp() {
    this.classList.add("popupform_opened");
}

function fillPopUp() {
    profileFormName.value = profileTitle.textContent;
    profileFormProfession.value = profileSubTitle.textContent;
}

function closePopUp() {
    this.classList.remove('popupform_opened');
}

function submitEditProfileForm(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileFormName.value;
    profileSubTitle.textContent = profileFormProfession.value;
    closePopUp.bind(this)();
}

function deletePhotoGridElement() {
    this.closest('.photo-grid__item').remove();
}

function submitAddForm(evt) {
    evt.preventDefault();
    addCard(addFormName.value, addFormLink.value);
    popUpAddForm.reset();
    closePopUp.bind(this)();
}

function switchLikeIcon() {
    this.classList.toggle('photo-grid__like_liked');
}

function insertParameters(name,link) {
    tempVariable = document.querySelector('img[name="popupform__image"]');
    tempVariable.src = link;
    tempVariable.alt = name;
    tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
    tempVariable.textContent = name;
}

function createCard(name,link) {
    clone = template.content.cloneNode(true);
    pictureOnCard = clone.querySelector('.photo-grid__picture');
    pictureOnCard.src = link;
    pictureOnCard.alt = name;
    pictureOnCard.addEventListener('click', openPopUp.bind(popUpPicture));
    pictureOnCard.addEventListener('click', insertParameters(name,link));
    textOnCard = clone.querySelector('.photo-grid__text');
    textOnCard.textContent = name;
    likeButton = clone.querySelector(".photo-grid__like");
    likeButton.addEventListener('click', switchLikeIcon);
    deleteButton = clone.querySelector('.photo-grid__delete');
    deleteButton.addEventListener('click', deletePhotoGridElement);
}

function addCard(name, link) {
    createCard(name, link);
    photoGrid.prepend(clone);
}


for (let i = 0; i < cards.length; i++) {
    addCard(cards[i].name, cards[i].link);
}

editProfileFormItSelf.addEventListener('submit', submitEditProfileForm.bind(popUpEditProfileForm));
closeEditFormButton.addEventListener('click', closePopUp.bind(popUpEditProfileForm));
editButton.addEventListener('click', openPopUp.bind(popUpEditProfileForm), false);
editButton.addEventListener('click', fillPopUp);
addButton.addEventListener('click', openPopUp.bind(popUpAdd));
closeAddFormButton.addEventListener('click', closePopUp.bind(popUpAdd));
popUpAddForm.addEventListener('submit', submitAddForm.bind(popUpAdd));
closeIcon.addEventListener('click', closePopUp.bind(popUpPicture));
