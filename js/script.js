/*Ниже переменные для кнопок из блоков: profile, popup*/
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
const profileAuthor = profile.querySelector('.profile__author');
const profileStatus = profile.querySelector('.profile__status');
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

/* =============================================
   ниже функции создания и управления карточками
   =============================================
*/

function addCards (nameValue, urlValue) {                       /*разметка карточки в DOM*/
    const cardElements = elementsTemplate.cloneNode(true);
    const elementsImage = cardElements.querySelector('.elements__image');

    elementsImage.src = urlValue;
    elementsImage.alt = nameValue;
    cardElements.querySelector('.elements__name').textContent = nameValue;

    cardElements.querySelector('.elements__like').addEventListener('click', likeActivateHandler);
    cardElements.querySelector('.elements__image').addEventListener('click', () => openImagePopupHandler(nameValue, urlValue));
    cardElements.querySelector('.elements__remove').addEventListener('click', removeCardsHandler);

    createBlock(elements, cardElements);
}

function likeActivateHandler (evt) {   /*активация лайков*/
    evt.target.classList.toggle('elements__like_active');
}

function removeCardsHandler (evt) {  /*удаление карточки*/
    evt.target.parentElement.remove();
}

function submitFormCardHandler (evt) {  /*кнопка создать карточку*/
    evt.preventDefault();

    addCards(formCardName.value, formCardUrl.value);
    togglePopup(formCard);
}

/* ==========================================
   ниже функция добавления новых блоков в DOM
   ==========================================
*/

function createBlock (container, item, position='prepend') {  /*добавление новых блоков в DOM*/
    if (position='prepend') {
        container.prepend(item);
    } else {
        container.append(item);
    }
}

/* ===========================================================
   ниже функции открытия изображения (блок id="element-image")
   ===========================================================
*/

function openImagePopupHandler (imageName, imageLink) {     /*открытие image-open по клику на изображение*/
    imageValue.src = imageLink;
    imageValue.alt = imageName;
    imageNameValue.textContent = imageName;

    togglePopup(elementImage);
}

/* ====================================
   ниже функции редактирования профиля
   ====================================
*/

function profileEditHandler () {       /*заполнение formProfile данными при открытии*/
    togglePopup(formProfile);
    authorInput.value = profileAuthor.textContent;
    statusInput.value = profileStatus.textContent;
}

function submitProfileEditHandler (evt) {         /*кнопка сохранить изменения в редактировании профиля*/
    evt.preventDefault();

    profileAuthor.textContent = authorInput.value;
    profileStatus.textContent = statusInput.value;
    togglePopup(formProfile);
}

/* ================================================
   ниже функция открытия/закрытия всех popup блоков
   ================================================
*/

function togglePopup (popupName) {        /*открытие/закрытие popup*/
    popupName.classList.toggle('popup_opened');
}



editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
closeButton.addEventListener('click', () => togglePopup(formProfile)); /*закрытие редактирования профиля*/
formElement.addEventListener('submit', submitProfileEditHandler); /*сохранить изменения в редактировании профиля*/
profileAddButton.addEventListener('click', () => togglePopup(formCard)); /*открытие формы добавления новой карточки*/
formCardClose.addEventListener('click', () => togglePopup(formCard)); /*закрытие формы добавления новой карточки*/
cardElement.addEventListener('submit', submitFormCardHandler); /*добавление новой карточки в DOM*/
elementImageClose.addEventListener('click', () => togglePopup(elementImage)); /*закрытие изображения*/

initialCards.forEach((item) => {
    addCards(item.name, item.link);
});