/*ниже переменные для api*/
export const token = '5e47c042-6361-4cc1-a7ce-8d80154cfe12';
export const cohortId = 'cohort-12';
/*Ниже переменные для добавления, хранения карточек и для формы добавления карточек*/
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
/*ниже переменные для редактирования аватара профиля*/
export const profileAvatar = profile.querySelector('.profile__avatar');
export const profileEditAvatarButton = profile.querySelector('.profile__edit-avatar');
export const formAvatar = document.querySelector('#form-avatar');
export const avatarLinkInput = formAvatar.querySelector('#avatar-link');
/*ниже переменные для редактирования основной информации профиля*/
export const editButton = profile.querySelector('.profile__edit');
export const formProfile = document.querySelector('#form-profile');
export const authorInput = formProfile.querySelector('#form-author');
export const statusInput = formProfile.querySelector('#form-status');
export const formProfileInfo = {
    profileAuthor: profile.querySelector('.profile__author'),
    profileStatus: profile.querySelector('.profile__status'),
};
/*ниже форма подтверждения удаления карточки*/
export const formCardRemove = document.querySelector('#form-card-remove');
