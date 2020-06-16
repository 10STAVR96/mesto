import './index.css';
import Card from '../js/components/Card.js';
import Section from '../js/components/Section.js';
import FormValidator from '../js/components/FormValidator.js';
import popupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import {
    initialCards,
    templateElementsClass,
    elements,
    formElements,
    profileAddButton,
    formCard,
    editButton,
    formProfile,
    elementImage,
    authorInput,
    statusInput,
    formProfileInfo,
} from '../js/utils/constants.js';

/*ниже функция чистки ошибок*/
const cleanErrors = (element) => {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const errorList = Array.from(element.querySelectorAll(`.popup__input-error`));
    const submitButton = element.querySelector('.popup__save');

    inputList.forEach((input) => {
        if (!input.value) {           /*данная конструкция деактивирует кнопку при открытии формы formCard и активирует ее для form-profile*/
            submitButton.classList.add('popup__save_disabled');
        } else {
            submitButton.classList.remove('popup__save_disabled');
        }
        input.classList.remove('popup__input_type_error');
    });
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible');
        error.textContent = '';
    });
}

/*ниже классы и функции для редактирования профиля*/
const userInfo = new UserInfo (formProfileInfo); /*информация о пользователе*/

const editFormProfile = new PopupWithForm ({  /*класс формы редактирования профиля*/
    submitFormHandler: (item) => {
        userInfo.setUserInfo(item);
    }
}, formProfile);

const profileEditHandler = () => {          /*открытие/закрытие профиля*/
    const infoUser = userInfo.getUserInfo();
    authorInput.value = infoUser.author;
    statusInput.value = infoUser.status;
    editFormProfile.open();
    cleanErrors(formProfile);
};

/*ниже классы и функции для добавления карточек (в том числе начальных)*/
const popupImage = new popupWithImage(elementImage);

const defaultCardList = new Section({    /*добавление начальных карточек*/
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item, 
            handleCardClick: () => {
                popupImage.open(item);
            }
        }, templateElementsClass);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elements);

const formAddCard = new PopupWithForm ({   /*класс открытия/закрытия попапа добавления карточки*/
    submitFormHandler: (item) => {
        const card = new Card ({
            data: item,
            handleCardClick: () => {
                popupImage.open(item);
            }
        }, templateElementsClass);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, formCard);

const OpenAddCardHandler = () => {    /*открытие/закрытие попапа добавления карточки*/
    formAddCard.open();
    cleanErrors(formCard);
};

/*ниже классы для валидации форм*/
const formProfileValidation = new FormValidator(formElements, formProfile); /*валидация формы профиля*/
const formCardValidation = new FormValidator(formElements, formCard); /*валидация формы добавления карточки*/

/*ниже события и запуск валидации*/
editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
profileAddButton.addEventListener('click', OpenAddCardHandler); /*добавление новой карточки*/
defaultCardList.renderItems(); /*добавление начальных карточек*/
formProfileValidation.enableValidation(); /*запуск валидация формы профиля*/
formCardValidation.enableValidation(); /*запуск валидация формы добавления карточки*/