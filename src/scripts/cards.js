import { closePopUp, openPopUp, popUpPicture } from "./modal";

import { api } from "./api";

const photoGrid = document.querySelector('.photo-grid');
const deletePopUp = document.querySelector('div[name="popupform__affirm"]');

export class Card {
	constructor({link, name, likes, _id}, isLiked, cardIsMine) {
		this._link = link;
		this._name = name;
		this._likes = likes;
		this._id = _id;
		this._isLiked = isLiked;
		this._cardIsMine = cardIsMine;
		this.cardItem = this._createCard(template);
	}

	_createCard(template) {
		const clone = template.content.cloneNode(true);
		this.cardNode = clone;
		const pictureOnCard = clone.querySelector('.photo-grid__picture');
		this.pictureOnCard = pictureOnCard;
		pictureOnCard.src = this._link;
		pictureOnCard.alt = this._name;

		const textOnCard = clone.querySelector('.photo-grid__text');
		textOnCard.textContent = this._name;

		const likeButton = clone.querySelector(".photo-grid__like");
		this.likeButton = likeButton;
		if (this._isLiked) {
			likeButton.classList.add('photo-grid__like_liked');
		}
		const likesAmount = clone.querySelector('.photo-grid__like-count');
		likesAmount.textContent = this._likes.length;
		this.setEventListners(clone);
		return clone;
	}

	setEventListners(cardItem) {
		this.pictureOnCard.addEventListener('click', () => this.insertParameters(popUpPicture, this));
		this.likeButton.addEventListener('click', () => this.switchLikeIcon(event.target, this._id));
		if (this._cardIsMine) {
			const deleteButton = cardItem.querySelector('.photo-grid__delete');
			deleteButton.style.display = 'block';
			deleteButton.addEventListener('click', () => this.showDeletePopUp(this._id, event.target));
		}
	}

	switchLikeIcon(button, cardId) {
		button.classList.toggle('photo-grid__like_liked');
		const countElement = button.parentElement.querySelector('.photo-grid__like-count');
		if (Array.from(button.classList).includes('photo-grid__like_liked')) {
			api.toggleLikeAtServer('PUT', cardId)
				.catch((err) => {
					console.log(err);
				});
			countElement.textContent = +countElement.textContent + 1;
		} else {
			api.toggleLikeAtServer('DELETE', cardId)
				.catch((err) => {
					console.log(err);
				});
			countElement.textContent = +countElement.textContent - 1;
		}
	}

	insertParameters(popup, card) {
		openPopUp(popup);
		let tempVariable = popUpPicture.querySelector('img[name="popupform__image"]');
		tempVariable.src = card._link;
		tempVariable.alt = card._name;
		tempVariable = popUpPicture.querySelector('p[name="popupform__text"]');
		tempVariable.textContent = card._name;
	}

	showDeletePopUp(cardId, eventTarget) {
		openPopUp(deletePopUp);
		const affirmButton = deletePopUp.querySelector('.popupform__save-button');
		affirmButton.addEventListener('click', () => this.deletePhotoGridElement(cardId, eventTarget, affirmButton));
	}

	deletePhotoGridElement(cardId, deleteButton, affirmButton) {
		api.deletePhotoGridElementFromServer(cardId)
			.then(() => {
				affirmButton.removeEventListener('click', () => this.deletePhotoGridElement(cardId, eventTarget, affirmButton));
				deleteButton.closest('.photo-grid__item').remove();
				closePopUp(deletePopUp);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	addCard(template) {
		photoGrid.prepend(this._createCard(template));
	}

}
