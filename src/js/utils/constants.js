/*Ниже переменные для добавления, хранения карточек и для формы добавления карточек*/
export const initialCards = [
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
export const templateElementsClass = '.elements-template';
export const elements = '.elements';
export const elementImage = document.querySelector('#element-image');
/*ниже переменные для валидации форм*/
export const formElements = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
  };
/*Ниже переменные для кнопкок и формы добавления карточек*/
export const profile = document.querySelector('.profile');
export const profileAddButton = profile.querySelector('.profile__add');
export const formCard = document.querySelector('#form-card');
/*ниже переменные для редактирования профиля*/
export const editButton = profile.querySelector('.profile__edit');
export const formProfile = document.querySelector('#form-profile');
export const authorInput = formProfile.querySelector('#form-author');
export const statusInput = formProfile.querySelector('#form-status');
export const formProfileInfo = {
    profileAuthor: profile.querySelector('.profile__author'),
    profileStatus: profile.querySelector('.profile__status'),
};