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
let likesAmount = document.querySelector('.photo-grid__like-count');

function deletePhotoGridElement() {
	this.closest('.photo-grid__item').remove();
}

function switchLikeIcon(button, cardId) {
	console.log(button);
	console.log(!Array.from(button.classList).includes('photo-grid__like_liked'));
	button.classList.toggle('photo-grid__like_liked');
	let countElement = button.parentElement.querySelector('.photo-grid__like-count');
	if (Array.from(button.classList).includes('photo-grid__like_liked')) {
		fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
			method: 'PUT',
			headers: {
				authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
				'Content-Type': 'application/json'
			}
		});
		//console.log('NO');
		//console.log(button.nextSibling.textContent);
		countElement.textContent = +countElement.textContent + 1;
	} else {
		fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: {
				authorization: '18ac5fe7-c9dd-44de-b0c4-3e05d66a3a3c',
				'Content-Type': 'application/json'
			}
		});
		//console.log('YES');
		//console.log(button.nextSibling.textContent);
		countElement.textContent = +countElement.textContent - 1;
	}
}

function insertParameters(name, link) {
	tempVariable = popUpPicture.querySelector('img[name="popupform__image"]');
	tempVariable.src = link;
	tempVariable.alt = name;
	tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
	tempVariable.textContent = name;
}

function createCard(name, link, likesCount, isLiked, cardId) {
	clone = template.content.cloneNode(true);
	pictureOnCard = clone.querySelector('.photo-grid__picture');
	pictureOnCard.src = link;
	pictureOnCard.alt = name;
	pictureOnCard.addEventListener('click', openPopUp.bind(popUpPicture));
	pictureOnCard.addEventListener('click', () => insertParameters(name, link));
	textOnCard = clone.querySelector('.photo-grid__text');
	textOnCard.textContent = name;
	likeButton = clone.querySelector(".photo-grid__like");
	likeButton.addEventListener('click', () => switchLikeIcon(event.target, cardId));
	if (isLiked) {
		likeButton.classList.add('photo-grid__like_liked');
	}
	likesAmount = clone.querySelector('.photo-grid__like-count');
	likesAmount.textContent = likesCount;
	deleteButton = clone.querySelector('.photo-grid__delete');
	deleteButton.addEventListener('click', deletePhotoGridElement);
}

export function addCard(name, link, likesAmount, isLiked, cardId) {
	createCard(name, link, likesAmount, isLiked, cardId);
	photoGrid.prepend(clone);
}
