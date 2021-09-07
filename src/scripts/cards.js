import { closePopUp, openPopUp, popUpPicture } from "./modal";

import { config } from "./script.js";

import { toggleLikeAtServer, deletePhotoGridElementFromServer } from "./api";

const template = document.querySelector('#template');
const photoGrid = document.querySelector('.photo-grid');
const deletePopUp = document.querySelector('div[name="popupform__affirm"]');

function switchLikeIcon(button, cardId) {
	button.classList.toggle('photo-grid__like_liked');
	const countElement = button.parentElement.querySelector('.photo-grid__like-count');
	if (Array.from(button.classList).includes('photo-grid__like_liked')) {
		toggleLikeAtServer('PUT', config.contentHeaders, cardId)
			.catch((err) => {
				console.log(err);
			});
		countElement.textContent = +countElement.textContent + 1;
	} else {
		toggleLikeAtServer('DELETE', config.contentHeaders, cardId)
			.catch((err) => {
				console.log(err);
			});
		countElement.textContent = +countElement.textContent - 1;
	}
}

function insertParameters(popup, card) {
	openPopUp(popup);
	let tempVariable = popUpPicture.querySelector('img[name="popupform__image"]');
	tempVariable.src = card.link;
	tempVariable.alt = card.name;
	tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
	tempVariable.textContent = card.name;
}

function createCard(card, isLiked, cardIsMine) {
	const clone = template.content.cloneNode(true);
	const pictureOnCard = clone.querySelector('.photo-grid__picture');
	pictureOnCard.src = card.link;
	pictureOnCard.alt = card.name;
	pictureOnCard.addEventListener('click', () => insertParameters(popUpPicture, card));
	const textOnCard = clone.querySelector('.photo-grid__text');
	textOnCard.textContent = card.name;
	const likeButton = clone.querySelector(".photo-grid__like");
	likeButton.addEventListener('click', () => switchLikeIcon(event.target, card._id));
	if (isLiked) {
		likeButton.classList.add('photo-grid__like_liked');
	}
	const likesAmount = clone.querySelector('.photo-grid__like-count');
	likesAmount.textContent = card.likes.length;
	if (cardIsMine) {
		const deleteButton = clone.querySelector('.photo-grid__delete');
		deleteButton.style.display = 'block';
		deleteButton.addEventListener('click', () => showDeletePopUp(card._id, event.target));
	}
	return clone;
}

function showDeletePopUp(cardId, eventTarget) {
	openPopUp(deletePopUp);
	const affirmButton = deletePopUp.querySelector('.popupform__save-button');
	affirmButton.addEventListener('click', () => deletePhotoGridElement(cardId, eventTarget, affirmButton));
}

function deletePhotoGridElement(cardId, deleteButton, affirmButton) {
	deletePhotoGridElementFromServer('DELETE', config.contentHeaders, cardId);
	affirmButton.removeEventListener('click', () => deletePhotoGridElement(cardId, eventTarget, affirmButton));
	deleteButton.closest('.photo-grid__item').remove();
	closePopUp(deletePopUp);
}

export function addCard(card, isLiked, cardIsMine) {
	photoGrid.append(createCard(card, isLiked, cardIsMine));
}
