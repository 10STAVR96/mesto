/*Ниже переменные для кнопок из блоков: profile, popup*/
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const profileAuthor = profile.querySelector('.profile__author');
const profileStatus = profile.querySelector('.profile__status');
const popupArray = Array.from(document.querySelectorAll('.popup'));
const formProfile = document.querySelector('#form-profile');
const closeButton = formProfile.querySelector('.popup__close');
const formElement = formProfile.querySelector('.popup__container');
const authorInput = formElement.querySelector('#form-author');
const statusInput = formElement.querySelector('#form-status');
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
const profileAddButton = profile.querySelector('.profile__add');
const elements = document.querySelector('.elements');
const formCard = document.querySelector('#form-card');
const cardElement = formCard.querySelector('.popup__container');
const formCardClose = formCard.querySelector('.popup__close');
const elementsTemplate = document.querySelector('.elements-template').content;
const formCardName = formCard.querySelector('#card-name');
const formCardUrl = formCard.querySelector('#card-url');
/*ниже переменные для popup (element-image) самой карточки из блока elements*/
const elementImage = document.querySelector('#element-image');
const elementImageClose = elementImage.querySelector('.popup__close');
const imageValue = elementImage.querySelector('.popup__image');
const imageNameValue = elementImage.querySelector('.popup__image-name');
/*ниже переменная для функции createBlock*/
const prepend = 'prepend';
/*ниже переменная для clearErrors*/
const inputsArray = Array.from(document.querySelectorAll('.popup__input'));

/* =============================================
   ниже функция очистки ошибок при закрытии попапов
   =============================================
*/

const clearErrors = function (errorArray, formObject) {
    errorArray.forEach((inputElement) => {
        hideInputError(inputElement.parentElement, inputElement, formObject);
    });
}

/* ================================================
   ниже функция открытия/закрытия всех popup блоков
   ================================================
*/

const togglePopup = function (popupName) {        /*открытие/закрытие popup*/
    popupName.classList.toggle('popup_opened');
}

/*=========================================================
  ниже функция открытия/закрытия попапа добавления карточки
  =========================================================
*/

const openCloseFormCardHandler = function () {
    formCardName.value = '';
    formCardUrl.value = '';

    clearErrors(inputsArray, formElements);
    togglePopup(formCard);
    enableValidation(formElements);
}

/* ===========================================================
   ниже функции открытия изображения (блок id="element-image")
   ===========================================================
*/

const openImagePopupHandler = function (evt) {     /*открытие image-open по клику на изображение*/
    const photo = evt.target;

    imageValue.src = photo.src;
    imageValue.alt = photo.alt;
    imageNameValue.textContent = photo.alt;

    togglePopup(elementImage);
}

/* ==========================================
   ниже функция добавления новых блоков в DOM
   ==========================================
*/

const createBlock = function (container, item, position = '') {  /*добавление новых блоков в DOM*/

    if (position==='prepend') {
        container.prepend(item);
    } else {
        container.append(item);
    }
}

/* =============================================
   ниже функции создания и управления карточками
   =============================================
*/

const likeActivateHandler = function (evt) {   /*активация лайков*/
    evt.target.classList.toggle('elements__like_active');
}

const removeCardsHandler = function (evt) {  /*удаление карточки*/
    const card = evt.target.parentElement;
    const elementImage = card.querySelector('.elements__image');
    const elementLike = card.querySelector('.elements__like');
    const elementRemove = card.querySelector('.elements__remove');

    elementLike.removeEventListener('click', likeActivateHandler);
    elementImage.removeEventListener('click', openImagePopupHandler);
    elementRemove.removeEventListener('click', removeCardsHandler);
    card.remove();
}

const setCards = function (nameValue, urlValue) {                       /*разметка карточки*/
    const cardElements = elementsTemplate.cloneNode(true);
    const elementsImage = cardElements.querySelector('.elements__image');
    const elementsRemove = cardElements.querySelector('.elements__remove');
    const elementsLike = cardElements.querySelector('.elements__like');
    const elementsName = cardElements.querySelector('.elements__name');

    elementsImage.src = urlValue;
    elementsImage.alt = nameValue;
    elementsName.textContent = nameValue;

    elementsLike.addEventListener('click', likeActivateHandler);
    elementsImage.addEventListener('click', openImagePopupHandler);
    elementsRemove.addEventListener('click', removeCardsHandler);

    return cardElements;
}

const createCard = function (nameValue, urlValue, container) {    /*добавление карточки в DOM*/
    const item = setCards(nameValue, urlValue);
    createBlock(container, item, prepend);
}


const submitFormCardHandler = function (evt) {  /*кнопка создать карточку*/
    evt.preventDefault();

    createCard(formCardName.value, formCardUrl.value, elements);
    togglePopup(formCard);
}

/* ====================================
   ниже функции редактирования профиля
   ====================================
*/

const profileEditHandler = function () {       /*открытие/закрытие formProfile*/
    togglePopup(formProfile);
    authorInput.value = profileAuthor.textContent;
    statusInput.value = profileStatus.textContent;
    clearErrors(inputsArray, formElements);
}

const submitProfileEditHandler = function (evt) {         /*кнопка сохранить изменения в редактировании профиля*/
    evt.preventDefault();

    profileAuthor.textContent = authorInput.value;
    profileStatus.textContent = statusInput.value;
    togglePopup(formProfile);
}

const closePopupClickEscHandler = function (evt) {          /*закрытие попапа при нажатии на esc*/
    const popupOpened = document.querySelector('.popup_opened');
    
    if (evt.keyCode === 27) {
        if (popupOpened) {
            clearErrors(inputsArray, formElements);
            togglePopup(popupOpened);
        }
    }
}

const closePopupClickOverlayHandler = function (item) {        /*закрытие попапа по клику на оверлей*/
    item.addEventListener('click', function (evt) {
        const popupOpened = document.querySelector('.popup_opened');

        if (evt.target.classList.contains('popup_opened')) {
            clearErrors(inputsArray, formElements);
            togglePopup(popupOpened);
        }
    });
}

editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
closeButton.addEventListener('click', profileEditHandler); /*закрытие редактирования профиля*/
formElement.addEventListener('submit', submitProfileEditHandler); /*сохранить изменения в редактировании профиля*/
profileAddButton.addEventListener('click', openCloseFormCardHandler);       /*открытие формы добавления новой карточки*/
formCardClose.addEventListener('click', openCloseFormCardHandler);   /*закрытие формы добавления новой карточки*/
cardElement.addEventListener('submit', submitFormCardHandler); /*добавление новой карточки в DOM*/
elementImageClose.addEventListener('click', () => togglePopup(elementImage)); /*закрытие изображения*/
popupArray.forEach((form) => closePopupClickOverlayHandler(form));          /*закрытие попапа по клику на оверлей*/
document.addEventListener('keydown', closePopupClickEscHandler);   /*закрытие попапа при нажатии на esc*/


initialCards.forEach((item) => {          /*добавление начальных карточек в DOM*/
    createCard(item.name, item.link, elements);
});