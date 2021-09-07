export function getResponseData(data) {
	if (data.ok) {
		return data.json();
	}
	return Promise.reject(`Ошибка: ${data.status}`);
}

export function loadAvatar(url, headers) {
	return fetch(url, {
		headers: headers
	})
		.then(getResponseData);
}

export function loadCards(url, headers) {
	return fetch(url, {
		headers: headers
	})
		.then(getResponseData)
}

export function submitEditFormToServer(url, headers, name, about) {
	return fetch(url, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({
			name: name,
			about: about
		})
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
		.then(getResponseData);
}

export function submitAvatarToServer(url, headers, avatar) {
	return fetch(url, {
		method: 'PATCH',
		headers: headers,
		body: JSON.stringify({
			avatar: avatar,
		})
	});
}

export function toggleLikeAtServer(method, headers, cardId) {
	return fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/likes/${cardId}`, {
		method: method,
		headers: headers
	})
		.then(getResponseData)
}

export function deletePhotoGridElementFromServer(method, headers, cardId) {
	fetch(`https://nomoreparties.co/v1/plus-cohort-1/cards/${cardId}`, {
		method: method,
		headers: headers
	});
}