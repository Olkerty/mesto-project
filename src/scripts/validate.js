function showErrorMessage(form, input, errorMessage, inputErrorClass, errorClass) {
	const errorElement = form.querySelector(`.${input.id}-error`);
	input.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
}

function hideErrorMessage(form, input, inputErrorClass, errorClass) {
	const errorElement = form.querySelector(`.${input.id}-error`);
	input.classList.remove(inputErrorClass);
	errorElement.textContent = '';
	errorElement.classList.remove(errorClass);
}

function checkInputValidity(form, input, inputErrorClass, errorClass) {
	if (!input.validity.valid) {
		showErrorMessage(form, input, input.validationMessage, inputErrorClass, errorClass);
	} else {
		hideErrorMessage(form, input, inputErrorClass, errorClass);
	}
}

function hasInvalidInput(inputList) {
	return inputList.some(function (item) {
		return !item.validity.valid;
	});
}

function toggleButtonState(inputList, button, inactiveButtonClass) {
	if (hasInvalidInput(inputList)) {
		button.classList.add(inactiveButtonClass);
	} else {
		button.classList.remove(inactiveButtonClass);
	}
}

function setEventListeners(form, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
	let inputList = Array.from(form.getElementsByTagName('input'));
	let submitButton = form.querySelector(`.${submitButtonSelector}`);
	toggleButtonState(inputList, submitButton, inactiveButtonClass);
	inputList.forEach(function (item) {
		item.addEventListener('input', function () {
			checkInputValidity(form, item, inputErrorClass, errorClass);
			toggleButtonState(inputList, submitButton, inactiveButtonClass);
		});
	});
}

export function enableValidation(parameters) {
	let formList = Array.from(document.forms);
	formList.forEach(function (form) {
		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		setEventListeners(form, parameters.submitButtonSelector, parameters.inactiveButtonClass, parameters.inputErrorClass, parameters.errorClass);
	});
}
