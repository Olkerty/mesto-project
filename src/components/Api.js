export class Api {
	constructor({ url, contentHeader, tokenHeaders }) {
		this._url = url;
		this._contentHeader = contentHeader;
		this._tokenHeaders = tokenHeaders;
	}

	_getResponseData(data) {
		if (data.ok) {
			return data.json();
		}
		return Promise.reject(`Ошибка: ${data.status}`);
	}

	loadAvatar() {
		return fetch(`${this._url}/users/me`, {
			headers: this._tokenHeaders
		})
			.then(this._getResponseData);
	}

	loadCards() {
		return fetch(`${this._url}/cards`, {
			headers: this._tokenHeaders
		})
			.then(this._getResponseData);
	}

	submitEditFormToServer(name, about) {
		return fetch(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: this._contentHeader,
			body: JSON.stringify({
				name: name,
				about: about
			})
		})
			.then(this._getResponseData);
	}

	submitAddFormToServer(name, link) {
		return fetch(`${this._url}/cards`, {
			method: 'POST',
			headers: this._contentHeader,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
			.then(this._getResponseData);
	}

	submitAvatarToServer(avatar) {
		return fetch(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._contentHeader,
			body: JSON.stringify({
				avatar: avatar,
			})
		})
			.then(this._getResponseData);
	}

	toggleLikeAtServer(method, cardId) {
		return fetch(`${this._url}/cards/likes/${cardId}`, {
			method: method,
			headers: this._contentHeader
		})
			.then(this._getResponseData);
	}

	deletePhotoGridElementFromServer(cardId) {
		return fetch(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._contentHeader
		})
			.then(this._getResponseData);
	}
}
