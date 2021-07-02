// JavaScript source code
let pageSelector = document.querySelector('.page');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popUpForm = document.querySelector('.popupform');
let popUpAdd = document.querySelector('section[name = "popupadd"]');
let closeAddFormButton = document.querySelector('button[name = "popupadd__close-icon"]');
let closeEditFormButton = document.querySelector('.popupform__close-icon');
let profileTitle = document.querySelector('.profile__title');
let profileSubTitle = document.querySelector('.profile__subtitle');
let profileFormName = document.querySelector(`input[name='profile__name']`);
let profileFormProfession = document.querySelector('input[name = "profile__profession"]');
let addFormName = document.querySelector(`input[name="popupadd__image-name"]`);
let addFormLink = document.querySelector('input[name = "popupadd__link"]');
let formItSelf = document.querySelector('.popupform__form-itself');
let popUpAddForm = document.querySelector(`form[name="popupadd__form-itself"]`);
let photoGrid = document.querySelector('.photo-grid');
let popUpPicture = document.querySelector(`section[name="popupform__picture"]`);
let closeIcon = document.querySelector('.popupform__img-close-icon');

let popUpImg;
let tempVariable;
function openPopUp() {
    popUpForm.classList.add("popupform_opened");
    profileFormName.value = profileTitle.textContent;
    profileFormProfession.value = profileSubTitle.textContent;
}

function closePopUp() {
    popUpForm.classList.remove('popupform_opened');
}

function popUpAddOpen() {
    popUpAdd.classList.add('popupform_opened');
}

function popUpAddClose() {
    popUpAdd.classList.remove('popupform_opened');
}

closeEditFormButton.addEventListener('click', closePopUp);
editButton.addEventListener("click", openPopUp);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = profileFormName.value;
    profileSubTitle.textContent = profileFormProfession.value;
    closePopUp();
}

function deletePhotoGridElement() {
    this.parentElement.remove();
}

function hidePopUpImg() {
    popUpPicture.classList.remove('popupform_opened');
}

function submitAddForm(evt) {
    evt.preventDefault();
    addCard(addFormName.value, addFormLink.value);
    popUpAddClose();
}

formItSelf.addEventListener('submit', formSubmitHandler);

let Cards = [
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

function toLike() {
    if (this.classList[1] === `photo-grid__like_liked`) {
        this.classList.remove('photo-grid__like_liked');
    } else
    {
        this.classList.add('photo-grid__like_liked');
    }
}

function createPopUpImg(link, name) {
    photoGrid.insertAdjacentHTML('afterbegin', `
    <section class="popupimg">
      <div class="popupimg__container">
        <button type="button" class="popupimg__close-icon"></button>
        <img src="${link}" class="popupimg__image">
        <p class="popupimg__text">${name}</p>
      </div>
    </section>
`);
    let closeIcon = document.querySelector('.popupimg__close-icon');
    closeIcon.addEventListener('click', hidePopUpImg);
}

function openPopUpImg() {
    popUpPicture.classList.add('popupform_opened');
    tempVariable = document.querySelector('img[name="popupform__image"]');
    tempVariable.src = this.src;
    tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
    tempVariable.textContent = this.nextElementSibling.firstElementChild.textContent;

    //alert(this.parentElement);
    //console.log(this.parentElement.previousElementSibling);
}
let template = document.querySelector('#template');

function addCard(name, link) {

    let clone = template.content.cloneNode(true);
    tempVariable = clone.querySelector('.photo-grid__picture');
    tempVariable.src = link;
    tempVariable.alt = name;
    tempVariable = clone.querySelector('.photo-grid__text');
    tempVariable.textContent = name;
    photoGrid.prepend(clone);
    /*
    photoGrid.insertAdjacentHTML('afterbegin',
        `<div class="photo-grid__item">
<button type="button" aria-label="Close" class="photo-grid__delete"> </button>
            <img src=${link} class="photo-grid__picture" alt="${name}">
                <div class="photo-grid__text-area">
                    <h2 class="photo-grid__text">${name}</h2>
                    <button type="button" aria-label="Close" class="photo-grid__like"> </button>
                </div>
        </div>`);
        */
    
    tempVariable = document.querySelector('.photo-grid__picture');
    tempVariable.addEventListener('click', openPopUpImg);
    tempVariable = document.querySelector(".photo-grid__like");
    tempVariable.addEventListener('click', toLike);
    tempVariable = document.querySelector('.photo-grid__delete');
    tempVariable.addEventListener('click', deletePhotoGridElement);
}


for (let i = 0; i < Cards.length; i++) {

    let clone = template.content.cloneNode(true);
    tempVariable = clone.querySelector('.photo-grid__picture');
    tempVariable.src = Cards[i].link;
    tempVariable.alt = Cards[i].name;
    tempVariable = clone.querySelector('.photo-grid__text');
    tempVariable.textContent = Cards[i].name;
    photoGrid.prepend(clone);
    /*
    photoGrid.insertAdjacentHTML('afterbegin',
        `<div class="photo-grid__item">
<button type="button" aria-label="Close" class="photo-grid__delete"> </button>
            <img src=${Cards[i].link} class="photo-grid__picture" alt="${Cards[i].name}">
                <div class="photo-grid__text-area">
                    <h2 class="photo-grid__text">${Cards[i].name}</h2>
                    <button type="button" aria-label="Close" class="photo-grid__like"> </button>
                </div>
        </div>`);
        */
    tempVariable = document.querySelector('.photo-grid__picture');
    tempVariable.addEventListener('click', openPopUpImg);
    tempVariable = document.querySelector(".photo-grid__like");
    tempVariable.addEventListener('click', toLike);
    tempVariable = document.querySelector('.photo-grid__delete');
    tempVariable.addEventListener('click', deletePhotoGridElement);
    
}

addButton.addEventListener('click', popUpAddOpen);
closeAddFormButton.addEventListener('click', popUpAddClose);
popUpAddForm.addEventListener('submit', submitAddForm);
closeIcon.addEventListener('click', hidePopUpImg);
