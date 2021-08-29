import { openPopUp, popUpPicture } from "./modal";


export const cards = [
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

const template = document.querySelector('#template');
const photoGrid = document.querySelector('.photo-grid');

let tempVariable;
let clone = template.content.cloneNode(true);
let textOnCard = clone.querySelector('.photo-grid__text');
let likeButton = document.querySelector(".photo-grid__like");
let deleteButton = document.querySelector('.photo-grid__delete');
let pictureOnCard = document.querySelector('.photo-grid__picture');

function deletePhotoGridElement() {
	this.closest('.photo-grid__item').remove();
}

function switchLikeIcon() {
	this.classList.toggle('photo-grid__like_liked');
}

function insertParameters(name, link) {
	tempVariable = popUpPicture.querySelector('img[name="popupform__image"]');
	tempVariable.src = link;
	tempVariable.alt = name;
	tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
	tempVariable.textContent = name;
}

function createCard(name, link) {
	clone = template.content.cloneNode(true);
	pictureOnCard = clone.querySelector('.photo-grid__picture');
	pictureOnCard.src = link;
	pictureOnCard.alt = name;
	pictureOnCard.addEventListener('click', openPopUp.bind(popUpPicture));
	pictureOnCard.addEventListener('click', () => insertParameters(name, link));
	textOnCard = clone.querySelector('.photo-grid__text');
	textOnCard.textContent = name;
	likeButton = clone.querySelector(".photo-grid__like");
	likeButton.addEventListener('click', switchLikeIcon);
	deleteButton = clone.querySelector('.photo-grid__delete');
	deleteButton.addEventListener('click', deletePhotoGridElement);
}

export function addCard(name, link) {
	createCard(name, link);
	photoGrid.prepend(clone);
}
