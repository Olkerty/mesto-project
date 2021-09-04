const profileTitle = document.querySelector('.profile__title');
const profileSubTitle = document.querySelector('.profile__subtitle');
let myId = '571dcf6f2cfcc0fecc4eba60';

import { profileAvatar } from "./script";

import { addCard } from "./cards";

export function loadAvatar(url, headers) {
	return fetch(url, {
		headers: headers
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}

			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((result) => {
			//console.log(result);
			//myId = result._id;
			profileTitle.textContent = result.name;
			profileSubTitle.textContent = result.about;
			profileAvatar.src = result.avatar;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function loadCards(url, headers) {
	return fetch(url, {
		headers: headers
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}

			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((result) => {
			let isLiked = false;
			let cardIsMine = false;
			for (let i = result.length - 1; i >= 0; i--) {
				isLiked = false;
				cardIsMine = false;
				//console.log(result[i].likes);
				//console.log('etewt');
				//console.log(result[i].owner._id);
				result[i].likes.forEach(function (item) {
					//console.log(item._id);
					//console.log(result[i].owner._id);
					if (item._id == myId) {
						isLiked = true;
					}
				});
				if (result[i].owner._id == myId) {
					cardIsMine = true;
				}
				//console.log(result[i].likes[0]);
				//console.log((result[i].likes).includes(result[i].owner));
				//console.log(isLiked);
				addCard(result[i], isLiked, cardIsMine);
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

export function submitEditFormToServer(url, headers, name, about) {
	return fetch(url, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
	})
		.catch((err) => {
			console.log(err);
		});
}

export function submitAddFormToServer(url, headers, name, link) {
	return fetch(url, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			name: name,
			link: link
		})
	})
		.then(res => {
			if (res.ok) {
				return res.json();
			}

			// если ошибка, отклоняем промис
			return Promise.reject(`Ошибка: ${res.status}`);
		})
		.then((ret) => {
			console.log(ret);
			addCard(ret, false, true);
		})
		.catch((err) => {
			console.log(err);
		});
}

export function submitAvatarToServer(url, headers, avatar) {
	return fetch(url, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({
			avatar: avatar,
		})
	})
		.catch((err) => {
			console.log(err);
		});
}

export function toggleLikeAtServer(method, headers, cardId) {
	return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
		method: method,
		headers: headers
	})
		.catch((err) => {
			console.log(err);
		});
}

export function deletePhotoGridElementFromServer(method, headers, cardId) {
	fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${cardId}`, {
		method: method,
		headers: headers
	});
}