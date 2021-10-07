import { api } from "./script.js";

import { PopUpWithImage } from "./modal";

export class Card {
	constructor({ link, name, likes, _id }, isLiked, cardIsMine) {
		this._link = link;
		this._name = name;
		this._likes = likes;
		this._id = _id;
		this._isLiked = isLiked;
		this._cardIsMine = cardIsMine;
	}

	createCard(template, deletePopup) {
		const clone = template.content.cloneNode(true);
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
		this._setEventListners(clone, deletePopup);
		return clone;
	}

	_setEventListners(cardItem, deletePopup) {
		const pictureOnCard = new PopUpWithImage(`div[name="popupform__picture"]`);
		this.pictureOnCard.addEventListener('click', () => { pictureOnCard.open(this._name, this._link) });
		this.likeButton.addEventListener('click', () => this._switchLikeIcon(event.target, this._id));
		if (this._cardIsMine) {
			const deleteButton = cardItem.querySelector('.photo-grid__delete');
			deleteButton.style.display = 'block';
			deleteButton.addEventListener('click', () => {
				deletePopup.open(this._id, deleteButton);
			});
		}
	}

	_switchLikeIcon(button, cardId) {
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

	addCard(template, photoGrid, deletePopup) {
		photoGrid.prepend(this.createCard(template, deletePopup));
	}
}
