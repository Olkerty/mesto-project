import { openPopUp, popUpPicture } from "./modal";

const template = document.querySelector('#template');
const photoGrid = document.querySelector('.photo-grid');

function deletePhotoGridElement() {
	this.closest('.photo-grid__item').remove();
}

function switchLikeIcon() {
	this.classList.toggle('photo-grid__like_liked');
}

function insertParameters(popUp, card) {
	openPopUp(popUp);
	let tempVariable = popUpPicture.querySelector('img[name="popupform__image"]');
	tempVariable.src = card.link;
	tempVariable.alt = card.name;
	tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
	tempVariable.textContent = card.ame;
}

function createCard(card) {
	const clone = template.content.cloneNode(true);
	const pictureOnCard = clone.querySelector('.photo-grid__picture');
	pictureOnCard.src = card.link;
	pictureOnCard.alt = card.name;
	//pictureOnCard.addEventListener('click', () => openPopUp(popUpPicture));
	pictureOnCard.addEventListener('click', () => insertParameters(popUpPicture, card));
	const textOnCard = clone.querySelector('.photo-grid__text');
	textOnCard.textContent = card.name;
	const likeButton = clone.querySelector(".photo-grid__like");
	likeButton.addEventListener('click', switchLikeIcon);
	const deleteButton = clone.querySelector('.photo-grid__delete');
	deleteButton.addEventListener('click', deletePhotoGridElement);
	return clone;
}

export function addCard(card) {
	photoGrid.prepend(createCard(card));
}
