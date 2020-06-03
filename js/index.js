import Card from './Card.js';
import FormValidator from './FormValidator.js';

/*ниже переменные для валидации форм*/
const formElements = {                        /*переменная с информацией всех форм*/
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
/*Ниже переменные для кнопкок и формы добавления карточек*/
const profile = document.querySelector('.profile');
const profileAddButton = profile.querySelector('.profile__add');
const formCard = document.querySelector('#form-card');
const formCardName = formCard.querySelector('#card-name');
const formCardUrl = formCard.querySelector('#card-url');
const formCardClose = formCard.querySelector('.popup__close');
const formCardSubmit = formCard.querySelector('.popup__save');
/*ниже переменные для редактирования профиля*/
const editButton = profile.querySelector('.profile__edit');
const profileAuthor = profile.querySelector('.profile__author');
const profileStatus = profile.querySelector('.profile__status');
const formProfile = document.querySelector('#form-profile');
const closeButton = formProfile.querySelector('.popup__close');
const authorInput = formProfile.querySelector('#form-author');
const statusInput = formProfile.querySelector('#form-status');
/*Ниже переменные для добавления, хранения карточек и для формы добавления карточек*/
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const templateElementsClass = '.elements-template';
const elements = document.querySelector('.elements');
/*ниже переменные для popup (element-image) самой карточки из блока elements*/
const elementImage = document.querySelector('#element-image');
const elementImageClose = elementImage.querySelector('.popup__close');
/*ниже переменная для функции createBlock*/
const prepend = 'prepend';
/*ниже переменная для функции closePopupClickEscHandler*/
const escape = 'Escape';

/*ниже функции добавления и удаления блоков*/
const createBlock = (container, item, position = '') => {  /*добавление новых блоков в DOM*/

    if (position==='prepend') {
        container.prepend(item);
    } else {
        container.append(item);
    }
};

/*ниже функция чистки ошибок*/
const cleanErrors = (element) => {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const errorList = Array.from(element.querySelectorAll(`.popup__input-error`));

    inputList.forEach((input) => {
        input.classList.remove('popup__input_type_error');
    });
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible');
        error.textContent = '';
    });
}

/*ниже функция открытия/закрытия всех popup блоков*/
const closePopupClickEscHandler = (evt) => {          /*закрытие попапа при нажатии на esc  ====== данная функция выше togglePopup тк всегда сначала запускается togglePopup а потом уже если if === true данная функция*/
    const popupOpened = document.querySelector('.popup_opened');

    if (evt.key === escape) {
        togglePopup(popupOpened);
    }
};

const closePopupClickOverlayHandler = (evt) => {    /*закрытие попапа по клику на оверлей*/
        const popupOpened = document.querySelector('.popup_opened');

        if (evt.target.classList.contains('popup_opened')) {
            togglePopup(popupOpened);
        }
};

const togglePopup = (popupName) => {        /*открытие/закрытие popup*/
    if (!popupName.classList.contains('popup_opened')) {
        document.addEventListener('keydown', closePopupClickEscHandler);
        document.addEventListener('click', closePopupClickOverlayHandler);
    } else {
        document.removeEventListener('keydown', closePopupClickEscHandler);
        document.removeEventListener('click', closePopupClickOverlayHandler);
    }
    popupName.classList.toggle('popup_opened');
    cleanErrors(popupName);
};

/*ниже функции создания и управления карточками*/
const createCard = (photo) => {        /*добавление карточки в DOM*/
    const card = new Card(photo, templateElementsClass);
    const cardElement = card.generateCard();
    createBlock(elements, cardElement, prepend);
};

const submitFormCardHandler = (evt) => {  /*кнопка создать карточку*/
    evt.preventDefault();

    const newCard = {
        name: formCardName.value,
        link: formCardUrl.value,
    }
    createCard(newCard);
    togglePopup(formCard);
};

/*ниже функция открытия/закрытия попапа добавления карточки*/
const openCloseFormCardHandler = () => {
    formCardName.value = '';
    formCardUrl.value = '';
    formCardSubmit.classList.add('popup__save_disabled');
    formCardSubmit.setAttribute('disabled', true);

    togglePopup(formCard);
};

/*ниже функции редактирования профиля*/
const profileEditHandler = () => {   /*открытие/закрытие formProfile*/
    authorInput.value = profileAuthor.textContent;
    statusInput.value = profileStatus.textContent;
    togglePopup(formProfile);
};

const submitProfileEditHandler = (evt) => {  /*кнопка сохранить изменения в редактировании профиля*/
    evt.preventDefault();

    profileAuthor.textContent = authorInput.value;
    profileStatus.textContent = statusInput.value;
    togglePopup(formProfile);
};

editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
closeButton.addEventListener('click', profileEditHandler); /*закрытие редактирования профиля*/
formProfile.addEventListener('submit', submitProfileEditHandler);  /*сохранить изменения в редактировании профиля*/
profileAddButton.addEventListener('click', openCloseFormCardHandler); /*открытие формы добавления новой карточки*/
formCardClose.addEventListener('click', openCloseFormCardHandler);   /*закрытие формы добавления новой карточки*/
formCard.addEventListener('submit', submitFormCardHandler); /*добавление новой карточки в DOM*/
elementImageClose.addEventListener('click', () => togglePopup(elementImage)); /*закрытие изображения*/

initialCards.forEach((item) => {   /*добавление начальных карточек в DOM*/
    createCard(item);
});

const formProfileValidation = new FormValidator(formElements, formProfile);
formProfileValidation.enableValidation();
const formCardValidation = new FormValidator(formElements, formCard);
formCardValidation.enableValidation();