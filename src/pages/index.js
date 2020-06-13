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
    formProfileInfo,
} from '../js/utils/constants.js';

/*ниже функция чистки ошибок*/
const cleanErrors = (element) => {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const errorList = Array.from(element.querySelectorAll(`.popup__input-error`));
    const submitButton = element.querySelector('.popup__save');

    inputList.forEach((input) => {
        if (!input.value) {           /*данная конструкция деактивирует кнопку при открытии формы formCard*/
            submitButton.classList.add('popup__save_disabled');
        }
        input.classList.remove('popup__input_type_error');
    });
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible');
        error.textContent = '';
    });
}

const profileEditHandler = () => {                     /*открытие/закрытие formProfile*/
    const userInfo = new UserInfo (formProfileInfo);
    const editFormProfile = new PopupWithForm ({
        submitFormHandler: (evt) => {
            evt.preventDefault();
    
            userInfo.setUserInfo();
            editFormProfile.close();
        }
    }, formProfile);
    editFormProfile.open();
    userInfo.getUserInfo();
    cleanErrors(formProfile);
};

editButton.addEventListener('click', profileEditHandler);


const defaultCardList = new Section({    /*добавление начальных карточек*/
    items: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item, 
            handleCardClick: () => {
                const popupImage = new popupWithImage(item, elementImage);
                popupImage.open();
            }
        }, templateElementsClass);
        const cardElement = card.generateCard();
        defaultCardList.addItem(cardElement);
    }
}, elements);

const OpenAddCardHandler = () => {    /*открытие/закрытие попапа добавления карточки*/
    const formAddCard = new PopupWithForm ({
        submitFormHandler: (evt) => {
            evt.preventDefault();
            const item = formAddCard.getInputValues();
            const card = new Card ({
                data: item,
                handleCardClick: () => {
                    const popupImage = new popupWithImage(item, elementImage);
                    popupImage.open();
                }
            }, templateElementsClass);
            const cardElement = card.generateCard();
            defaultCardList.addItem(cardElement);
            formAddCard.close();
        }
    }, formCard);
    formAddCard.open();
    cleanErrors(formCard);
};

const formProfileValidation = new FormValidator(formElements, formProfile); /*валидация формы профиля*/
const formCardValidation = new FormValidator(formElements, formCard); /*валидация формы добавления карточки*/

profileAddButton.addEventListener('click', OpenAddCardHandler); /*редактирование профиля*/
defaultCardList.renderItems(); /*добавление начальных карточек*/
formProfileValidation.enableValidation(); /*запуск валидация формы профиля*/
formCardValidation.enableValidation(); /*запуск валидация формы добавления карточки*/