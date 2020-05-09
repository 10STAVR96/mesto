/*ниже переменные для валидации форм*/
const formElements = {                        /*переменная с информацией всех форм*/
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };

/*   ================================
     ниже функции для валидации форм
     ================================
*/

function enableValidation (formObject) {           /*запуск валидации*/
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, formObject);
    });
}

function setEventListeners (formElement, formObject) {   /*отслеживание ввода данных*/
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const buttonSubmit = formElement.querySelector(formObject.submitButtonSelector);

    toggleButtonState(inputList, buttonSubmit, formObject);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, formObject);
            toggleButtonState(inputList, buttonSubmit, formObject);
        });
    });
}

function checkInputValidity (formElement, inputElement, formObject) {    /*проверка валидации формы*/
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
    } else {
        hideInputError(formElement, inputElement, formObject);
    }
}

function showInputError (formElement, inputElement, errorMessage, formObject) {  /*показ ошибки валидации*/
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(formObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(formObject.errorClass);
}

function hideInputError (formElement, inputElement, formObject) {   /*скрытие ошибки валидации*/
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(formObject.inputErrorClass);
    errorElement.classList.remove(formObject.errorClass);
    errorElement.textContent = '';
}

function toggleButtonState (inputList, buttonSubmit, formObject) {  /*активация/деактивация кнопки submit*/
    if (hasInvalidInput(inputList)) {
        buttonSubmit.classList.add(formObject.inactiveButtonClass);
        buttonSubmit.setAttribute('disabled', 'true');
    } else {
        buttonSubmit.classList.remove(formObject.inactiveButtonClass);
        buttonSubmit.removeAttribute('disabled');
    }
}

function hasInvalidInput (inputList) {   /*проверка на неправильную валидацию*/
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

enableValidation(formElements);