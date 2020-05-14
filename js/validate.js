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

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass, ...rest}) => {  /*показ ошибки валидации*/
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass, ...rest}) => {   /*скрытие ошибки валидации*/
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, rest) => {    /*проверка валидации формы*/
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formElement, inputElement, rest);
    }
};

const hasInvalidInput = (inputList) => {   /*проверка на неправильную валидацию*/
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonSubmit, {inactiveButtonClass, ...rest}) => {  /*активация/деактивация кнопки submit*/
    if (hasInvalidInput(inputList)) {
        buttonSubmit.classList.add(inactiveButtonClass);
        buttonSubmit.setAttribute('disabled', 'true');
    } else {
        buttonSubmit.classList.remove(inactiveButtonClass);
        buttonSubmit.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, {inputSelector, submitButtonSelector, ...rest}) => {    /*отслеживание ввода данных*/
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSubmit = formElement.querySelector(submitButtonSelector);

    toggleButtonState(inputList, buttonSubmit, rest);    /*метод вызван для того, чтобы при открытии попапов кнопка submit изначально была неактивной, точно также было в тренажере*/

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, rest);
            toggleButtonState(inputList, buttonSubmit, rest);
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => {                  /*запуск валидации*/
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement, rest);
    });
};

enableValidation(formElements);