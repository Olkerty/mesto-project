export class Validation {
	constructor({submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}, form) {
		this._submitButtonSelector = submitButtonSelector;
		this._inactiveButtonClass = inactiveButtonClass;
		this._inputErrorClass = inputErrorClass;
		this._errorClass = errorClass;
		this._form = form;
	}

	enableValidation() {
		this._form.addEventListener('submit', function (evt) {
			evt.preventDefault();
		});
		this._setEventListeners();
	}

	_setEventListeners() {
		const inputList = Array.from(this._form.getElementsByTagName('input'));
		const submitButton = this._form.querySelector(`.${this._submitButtonSelector}`);
		this._toggleButtonState(inputList, submitButton);
		inputList.forEach((item) => {
			item.addEventListener('input', () => {
				this._checkInputValidity(item);
				this._toggleButtonState(inputList, submitButton);
			});
		});
	}

	_toggleButtonState(inputList, button) {
		if (this._hasInvalidInput(inputList)) {
			button.classList.add(this._inactiveButtonClass);
			button.disabled = true;
		} else {
			button.disabled = false;
			button.classList.remove(this._inactiveButtonClass);
			button.disabled = false;
		}
	}

	_checkInputValidity(input) {
		if (!input.validity.valid) {
			this._showErrorMessage(input, input.validationMessage);
		} else {
			this._hideErrorMessage(input);
		}
	}

	_hasInvalidInput(inputList) {
		return inputList.some(function (item) {
			return !item.validity.valid;
		});
	}

	_hideErrorMessage(input) {
		const errorElement = this._form.querySelector(`.${input.id}-error`);
		input.classList.remove(this._inputErrorClass);
		errorElement.textContent = '';
		errorElement.classList.remove(this._errorClass);
	}

	_showErrorMessage(input, errorMessage) {
		const errorElement = this._form.querySelector(`.${input.id}-error`);
		input.classList.add(this._inputErrorClass);
		errorElement.textContent = errorMessage;
		errorElement.classList.add(this._errorClass);
	}
}
