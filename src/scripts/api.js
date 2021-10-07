export class Api {
	constructor({urlMe, urlAvatar, urlCards, contentHeader, tokenHeaders}) {
		this._urlMe = urlMe;
		this._urlAvatar = urlAvatar;
		this._urlCards = urlCards;
		this._contentHeader = contentHeader;
		this._tokenHeaders = tokenHeaders;
	}

	getResponseData(data) {
		if (data.ok) {
			return data.json();
		}
		return Promise.reject(`Ошибка: ${data.status}`);
	}

	loadAvatar() {
		return fetch(this._urlMe, {
			headers: this._tokenHeaders
		})
			.then(this.getResponseData);
	}

	loadCards() {
		return fetch(this._urlCards, {
			headers: this._tokenHeaders
		})
			.then(this.getResponseData);
	}

	submitEditFormToServer(name, about) {
		return fetch(this._urlMe, {
			method: 'PATCH',
			headers: this._contentHeader,
			body: JSON.stringify({
				name: name,
				about: about
			})
		})
			.then(this.getResponseData);
	}

	submitAddFormToServer(name, link) {
		return fetch(this._urlCards, {
			method: 'POST',
			headers: this._contentHeader,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
			.then(this.getResponseData);
	}

	submitAvatarToServer(avatar) {
		return fetch(this._urlAvatar, {
			method: 'PATCH',
			headers: this._contentHeader,
			body: JSON.stringify({
				avatar: avatar,
			})
		})
			.then(this.getResponseData);
	}

	toggleLikeAtServer(method, cardId) {
		return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
			method: method,
			headers: this._contentHeader
		})
			.then(this.getResponseData);
	}

	deletePhotoGridElementFromServer(cardId) {
		return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._contentHeader
		})
			.then(this.getResponseData);
	}
}
