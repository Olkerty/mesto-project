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
		button.disabled = true;
	} else {
		button.disabled = false;
		button.classList.remove(inactiveButtonClass);
		button.disabled = false;
	}
}

function setEventListeners(form, parameters) {
	const inputList = Array.from(form.getElementsByTagName('input'));
	const submitButton = form.querySelector(`.${parameters.submitButtonSelector}`);
	toggleButtonState(inputList, submitButton, parameters.inactiveButtonClass);
	inputList.forEach(function (item) {
		item.addEventListener('input', function () {
			checkInputValidity(form, item, parameters.inputErrorClass, parameters.errorClass);
			toggleButtonState(inputList, submitButton, parameters.inactiveButtonClass);
		});
	});
}

export function enableValidation(parameters) {
	const formList = Array.from(document.forms);
	formList.forEach(function (form) {
		form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		setEventListeners(form, parameters);
	});
}
