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
/*ниже переменные для popup (image-open) самой карточки из блока elements*/
const elementImage = document.querySelector('#element-image');
const elementImageClose = elementImage.querySelector('.popup__close');

/* =============================================
   ниже функции создания и управления карточками
   =============================================
*/

function addCards (nameValue, urlValue) {                       /*добавление/удаление карточек в DOM*/
    const elementsTemplate = document.querySelector('.elements-template').content;
    const cardElements = elementsTemplate.cloneNode(true);

    cardElements.querySelector('.elements__name').textContent = nameValue;
    cardElements.querySelector('.elements__image').src = urlValue;
    cardElements.querySelector('.elements__image').alt = nameValue;
    cardElements.querySelector('.elements__like').addEventListener('click', (evt) => {
        evt.target.classList.toggle('elements__like_active');
    });

    cardElements.querySelector('.elements__image').addEventListener('click', () => {
        OpenImagePopup(nameValue, urlValue);
    });
    
    cardElements.querySelector('.elements__remove').addEventListener('click', (evt) => {
        evt.target.parentElement.remove();
      });

    elements.prepend(cardElements);
}

function OpenCloseformCard () {                          /*кнопка для открытия/закрытия окна создания карточек*/
    formCard.classList.toggle('popup_opened');
}

function formSubmitCardAdd (evt) {                /*кнопка создать карточку*/
    const formCardName = formCard.querySelector('#card-name');
    const formCardUrl = formCard.querySelector('#card-url');

    evt.preventDefault();

    addCards(formCardName.value, formCardUrl.value);
    OpenCloseformCard ();
}

/* =============================================
   ниже функции открытия/закрытия изображения 
   =============================================
*/

function OpenImagePopup (imageName, imageLink) {              /*открытие image-open по клику на изображение*/
    const imageValue = elementImage.querySelector('.popup__image');
    const imageNameValue = elementImage.querySelector('.popup__image-name');

    imageValue.src = imageLink;
    imageValue.alt = imageName;
    imageNameValue.textContent = imageName;

    elementImage.classList.add('popup_opened');
}

function CloseImagePopup () {           /*закрытие image-open popup*/
    elementImage.classList.remove('popup_opened');
}

/* ====================================
   ниже функции редактирования профиля
   ====================================
*/

function profileEditOpenClose () {                          /*кнопка редактировать профиль и закрыть окно*/
    if (formProfile.classList.contains('popup_opened')) {
        formProfile.classList.remove('popup_opened');
    } else {
        formProfile.classList.add('popup_opened');
        authorInput.value = profileAuthor.textContent;
        statusInput.value = profileStatus.textContent;
    }
}

function formSubmitProfileEdit (evt) {         /*кнопка сохранить изменения в редактировании профиля*/
    evt.preventDefault();

    profileAuthor.textContent = authorInput.value;
    profileStatus.textContent = statusInput.value;
    formProfile.classList.remove('popup_opened');
}

editButton.addEventListener('click', profileEditOpenClose);
closeButton.addEventListener('click', profileEditOpenClose);
formElement.addEventListener('submit', formSubmitProfileEdit);
profileAddButton.addEventListener('click', OpenCloseformCard);
formCardClose.addEventListener('click', OpenCloseformCard);
cardElement.addEventListener('submit', formSubmitCardAdd);
elementImageClose.addEventListener('click', CloseImagePopup);

initialCards.forEach((item) => {
    addCards(item.name, item.link);
});