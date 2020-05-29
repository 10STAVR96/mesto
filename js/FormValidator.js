/*   =========================
     ниже класс валидации форм
     =========================
*/
export default class FormValidator {
    constructor(formObject, formName) {
        this._formName = formName;
        this._formSelector = formObject.formSelector;
        this._inputSelector = formObject.inputSelector;
        this._submitButtonSelector = formObject.submitButtonSelector;
        this._inactiveButtonClass = formObject.inactiveButtonClass;
        this._inputErrorClass = formObject.inputErrorClass;
        this._errorClass = formObject.errorClass;
    }
    _showInputError(inputElement, errorMessage) {  /*показ ошибки валидации*/
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }
    hideInputError(inputElement) {   /*скрытие ошибки валидации*/
        const errorElement = this._formName.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    showButtonError(buttonSubmit) {
        buttonSubmit.classList.add(this._inactiveButtonClass);
        buttonSubmit.setAttribute('disabled', true);
    }
    hideButtonError(buttonSubmit) {
        buttonSubmit.classList.remove(this._inactiveButtonClass);
        buttonSubmit.removeAttribute('disabled');
    }
    _checkInputValidity(inputElement) {  /*проверка валидации формы*/
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this.hideInputError(inputElement);
        }
    }
    _hasInvalidInput(inputList) {   /*проверка на неправильную валидацию*/
        return inputList.every((inputElement) => inputElement.validity.valid);
    }
    _toggleButtonState(inputList, buttonSubmit) {  /*активация/деактивация кнопки submit*/
        if (this._hasInvalidInput(inputList)) {
            this.hideButtonError(buttonSubmit);
        } else {
            this.showButtonError(buttonSubmit);
        }
    }
    enableValidation() {       /*запуск валидации*/
        const inputList = Array.from(this._formName.querySelectorAll(this._inputSelector));
        const buttonSubmit = this._formName.querySelector(this._submitButtonSelector);
        const currentObject = this;
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                currentObject._checkInputValidity(inputElement);
                currentObject._toggleButtonState(inputList, buttonSubmit);
            });
        });
    }
}