import './index.css';
import Card from '../js/components/Card.js';
import Section from '../js/components/Section.js';
import FormValidator from '../js/components/FormValidator.js';
import popupWithImage from '../js/components/PopupWithImage.js';
import PopupWithForm from '../js/components/PopupWithForm.js';
import UserInfo from '../js/components/UserInfo.js';
import Api from '../js/components/Api.js';
import {
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
    profileAvatar,
    profileEditAvatarButton,
    formAvatar,
    formCardRemove,
    avatarLinkInput,
    token,
    cohortId,
} from '../js/utils/constants.js';

/*============== ниже функция чистки ошибок ======================*/
const cleanErrors = (element) => {
    const inputList = Array.from(element.querySelectorAll('.popup__input'));
    const errorList = Array.from(element.querySelectorAll(`.popup__input-error`));
    const submitButton = element.querySelector('.popup__save');

    inputList.forEach((input) => {
        if (!input.value) {           /*данная конструкция деактивирует кнопку при открытии формы formCard и активирует ее для form-profile*/
            submitButton.classList.add('popup__save_disabled');
            submitButton.setAttribute('disabled', 'true');
        } else {
            submitButton.classList.remove('popup__save_disabled');
            submitButton.removeAttribute('disabled');
        }
        input.classList.remove('popup__input_type_error');
    });
    errorList.forEach((error) => {
        error.classList.remove('popup__error_visible');
        error.textContent = '';
    });
}

/*========== ниже функции для статуса загрузок и ошибок при отправке/получении данных ===========*/
const renderLoading = (isLoading, form, defaultButtonText, loadingMessage) => {  /*не знаю как кпростить эту функцию, делал как в тренажере*/
    const currentButton = form.querySelector('.popup__save');

    if(isLoading) {
        currentButton.textContent = loadingMessage;
    } else {
        currentButton.textContent = defaultButtonText;
    }
  }

/*=========== ниже классы и функции для загрузки данных профиля при загрузке страницы =============*/
const getProfileInfo = new Api({    /*класс для загрузки профиля*/
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/users/me`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    },
    getHandler: (result) => {
        formProfileInfo.profileAuthor.textContent = result.name;
        formProfileInfo.profileStatus.textContent = result.about;
        formProfileInfo.profileAuthor.id = result._id;
        profileAvatar.src = result.avatar;
    }
});

const profileInfoLoader = () => {  /*загрузка данных профиля при загрузке старницы*/
    getProfileInfo.getRequest();
}

/*=============== ниже классы и функции для редактирования профиля ==================*/
const userInfo = new UserInfo (formProfileInfo); /*класс информации о пользователе*/

const editFormProfile = new PopupWithForm ({  /*класс формы редактирования профиля*/
    submitFormHandler: (item) => {
        renderLoading(true, formProfile,'Сохранить', 'Сохранение...');
        userInfo.setUserInfo(item);
        getProfileInfo.editProfileUser(item.author, item.status)
            .finally(() => {
                renderLoading(false, formProfile,'Сохранить', 'Сохранение...');
            });
    }
}, formProfile);

const profileEditHandler = () => {          /*открытие/закрытие формы редактирования профиля*/
    const infoUser = userInfo.getUserInfo();
    authorInput.value = infoUser.author;
    statusInput.value = infoUser.status;
    editFormProfile.open();
    cleanErrors(formProfile);
};

/*============ ниже классы и функции для редактирования аватара профиля ================*/
const apiEditProfileAvatar = new Api ({      /*Api класс для редактирования аватара*/
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/users/me/avatar`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

const changeAvatar = (link) => {     /*изменение аватара*/
    renderLoading(true, formAvatar,'Сохранить', 'Сохранение...');
    apiEditProfileAvatar.editProfileAvatar(link)
        .finally(() => {
            renderLoading(false, formAvatar,'Сохранить', 'Сохранение...');
        });
};

const editProfileAvatar = new PopupWithForm ({  /*класс формы редактирования аватара*/
    submitFormHandler: (item) => {
        profileAvatar.src = item.link;
        changeAvatar(profileAvatar.src);
    }
}, formAvatar);

const profileEditAvatarHandler = () => {   /*открытие формы редактирования аватара профиля*/
    avatarLinkInput.value = profileAvatar.src;
    editProfileAvatar.open();
    cleanErrors(formAvatar);
}

/*============= ниже классы и функции для активации/удаления лайков ================*/
const addDeleteLikes = new Api({     /*класс для удаления лайка*/
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/cards/likes/`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

/*============= ниже классы и функции для удаления карточки ===========*/
let currentCard; /*переменная для хранения значений текущей карточки (нужно для удаления и должна находиться именно в index.js)*/
const apiRemoveCard = new Api({  /*класс для удаления карточки*/
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/cards/`,
    headers: {
        authorization: token
    },
    deleteCardHandler: (className) => {
        className.handleRemove();
    }
});

const deleteCardConfirmation = new PopupWithForm ({  /*класс формы подтверждения удаления карточки*/
    submitFormHandler: () => {
        apiRemoveCard.deleteCard(currentCard.object._id, currentCard.class);  /*удаление карточки*/
    }
}, formCardRemove);

/*======= ниже классы и функции для добавления карточек (в том числе начальных) ==========*/
const popupImage = new popupWithImage(elementImage);  /*класс для открытия формы картинки карточки*/

const apiAddCards = new Api({    /*класс для получения массива карточек*/
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/cards`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    },
    getHandler: (result) => {
        defaultCardList.renderItems(result);
    },
    postCardHandler: (result) => {
        createCard(result);
    }
});

const createCard = (item) => {  /*создание карточки и добавление в разметку*/
    const card = new Card ({
        data: item,
        handleCardClick: (cardObject) => {
            if (cardObject.command==='openImage') {
                popupImage.open(item);
            }
            if (cardObject.command==='likeImage') {
                if(cardObject.like) {
                    addDeleteLikes.deleteLikes(cardObject);
                } else {
                    addDeleteLikes.addLike(cardObject);
                }
            }
            if (cardObject.command==='removeCard') {
                currentCard = {
                    object: item,
                    class: card
                };
                deleteCardConfirmation.open();
            }
        }
    }, templateElementsClass, formProfileInfo);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
};

const formAddCard = new PopupWithForm ({   /*класс открытия/закрытия попапа добавления карточки*/
    submitFormHandler: (item) => {
        renderLoading(true, formCard,'Создать', 'Создание...');
        apiAddCards.addCard(item)     /*добавление карточки на сервер*/
        .finally(() => {
            renderLoading(false, formCard,'Создать', 'Создание...');
        });
    }
}, formCard);

const OpenAddCardHandler = () => {    /*открытие/закрытие попапа добавления карточки*/
    formAddCard.open();
    cleanErrors(formCard);
};

const defaultCardList = new Section({  /*класс для добавления начальных карточек*/
    renderer: (item) => {
        createCard(item);
    }
}, elements);

const defaultCardsLoader = () => {    /*добавление начальных карточек*/
    apiAddCards.getRequest();
};

/*ниже классы для валидации форм*/
const formProfileValidation = new FormValidator(formElements, formProfile); /*валидация формы профиля*/
const formAvatarValidation = new FormValidator(formElements, formAvatar); /*валидация формы изменения аватара*/
const formCardValidation = new FormValidator(formElements, formCard); /*валидация формы добавления карточки*/

/*ниже события и запуск валидации*/
profileEditAvatarButton.addEventListener('click', profileEditAvatarHandler);  /*редактирование аватара профиля*/
editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
profileAddButton.addEventListener('click', OpenAddCardHandler); /*добавление новой карточки*/
defaultCardsLoader();  /*добавление начальных карточек*/
profileInfoLoader();  /*загрузка данных профиля при загрузке старницы*/
formProfileValidation.enableValidation(); /*запуск валидация формы профиля*/
formCardValidation.enableValidation(); /*запуск валидация формы добавления карточки*/
formAvatarValidation.enableValidation(); /*запуск валидации формы изменения аватара*/