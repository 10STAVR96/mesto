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
    prepend,
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

/*==== ниже класс Api для связи с сервером =====*/
const api = new Api({
    baseUrl: `https://mesto.nomoreparties.co/v1/${cohortId}/`,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

/*========== ниже функции для статуса загрузок и ошибок при отправке/получении данных ===========*/
const renderLoading = (isLoading, form, defaultButtonText, loadingMessage) => {  /*не знаю как упростить эту функцию, делал как в тренажере*/
    const currentButton = form.querySelector('.popup__save');

    if(isLoading) {
        currentButton.textContent = loadingMessage;
    } else {
        currentButton.textContent = defaultButtonText;
    }
  }

/*=========== ниже классы и функции для загрузки данных профиля при загрузке страницы =============*/

const profileInfoLoader = () => {  /*загрузка данных профиля при загрузке старницы*/
    api.getProfileInfo()
        .then((result) => {
            formProfileInfo.profileAuthor.textContent = result.name;
            formProfileInfo.profileStatus.textContent = result.about;
            formProfileInfo.profileAuthor.id = result._id;
            profileAvatar.src = result.avatar;
        })
        .catch((err) => {
            console.log(err);
        });
}

/*=============== ниже классы и функции для редактирования профиля ==================*/
const userInfo = new UserInfo (formProfileInfo); /*класс информации о пользователе*/

const editFormProfile = new PopupWithForm ({  /*класс формы редактирования профиля*/
    submitFormHandler: (item) => {
        renderLoading(true, formProfile,'Сохранить', 'Сохранение...');
        api.editProfileUser(item.author, item.status)
            .then((result) => {
                userInfo.setUserInfo(result);
                editFormProfile.close();
            })
            .catch((err) => {
                console.log(err);
            })
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
const changeAvatar = (item) => {     /*изменение аватара*/
    renderLoading(true, formAvatar,'Сохранить', 'Сохранение...');
    api.editProfileAvatar(item.link)
        .then((result) => {
            profileAvatar.src = result.avatar;
            editProfileAvatar.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false, formAvatar,'Сохранить', 'Сохранение...');
        });
};

const editProfileAvatar = new PopupWithForm ({  /*класс формы редактирования аватара*/
    submitFormHandler: (item) => {
        changeAvatar(item);
    }
}, formAvatar);

const profileEditAvatarHandler = () => {   /*открытие формы редактирования аватара профиля*/
    avatarLinkInput.value = profileAvatar.src;
    editProfileAvatar.open();
    cleanErrors(formAvatar);
}

/*============= ниже классы и функции для удаления карточки ===========*/
let currentCard; /*переменная для хранения значений текущей карточки (нужно для удаления и должна находиться именно в index.js)*/

const deleteCardConfirmation = new PopupWithForm ({  /*класс формы подтверждения удаления карточки*/
    submitFormHandler: () => {
        api.deleteCard(currentCard.object._id)  /*удаление карточки*/
            .then((result) => {
                currentCard.class.handleRemove();
                deleteCardConfirmation.close();
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, formCardRemove);

/*=========== ниже функции для добавления и удаления лайков =============*/
const addLike = (Object) => {      /*добавление лайка*/
    api.addLike(Object)
        .then((result) => {
            currentCard.class.handleLike();
            Object.likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
};

const deleteLike = (Object) => {   /*удаление лайка*/
    api.deleteLikes(Object)
        .then((result) => {
            currentCard.class.handleLike();
            Object.likeCounter.textContent = result.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
}

/*======= ниже классы и функции для добавления карточек (в том числе начальных) ==========*/
const popupImage = new popupWithImage(elementImage);  /*класс для открытия формы картинки карточки*/

const addCardsToDom = (card, position) => {     /*добавление карточки в DOM*/
    if(position==='prepend') {
        defaultCardList.addPrependItem(card);
    } else {
        defaultCardList.addAppendItem(card);
    }
};

const createCard = (item, position) => {  /*создание карточки и добавление в разметку*/
    const card = new Card ({
        data: item,
        handleCardClick: (cardObject) => {
            if (cardObject.command==='openImage') {
                popupImage.open(item);
            }
            if (cardObject.command==='likeImage') {
                if(cardObject.like) {
                    deleteLike(cardObject);
                } else {
                    addLike(cardObject);
                }
            }
            if (cardObject.command==='removeCard') {
                deleteCardConfirmation.open();
            }
            currentCard = {
                object: item,
                class: card
            };
        }
    }, templateElementsClass, formProfileInfo);
    const cardElement = card.generateCard();
    addCardsToDom(cardElement, position);
};

const formAddCard = new PopupWithForm ({   /*класс открытия/закрытия попапа добавления карточки*/
    submitFormHandler: (item) => {
        renderLoading(true, formCard,'Создать', 'Создание...');
        api.addCard(item)     /*добавление карточки на сервер*/
            .then((result) => {
                createCard(result, prepend);
                formAddCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
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
    api.getCards()
        .then((result) => {
            defaultCardList.renderItems(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

/*ниже классы для валидации форм*/
const formProfileValidation = new FormValidator(formElements, formProfile); /*валидация формы профиля*/
const formAvatarValidation = new FormValidator(formElements, formAvatar); /*валидация формы изменения аватара*/
const formCardValidation = new FormValidator(formElements, formCard); /*валидация формы добавления карточки*/
/*ниже события и запуск валидации*/
profileEditAvatarButton.addEventListener('click', profileEditAvatarHandler);  /*редактирование аватара профиля*/
editButton.addEventListener('click', profileEditHandler); /*редактирование профиля*/
profileAddButton.addEventListener('click', OpenAddCardHandler); /*добавление новой карточки*/
formProfileValidation.enableValidation(); /*запуск валидация формы профиля*/
formCardValidation.enableValidation(); /*запуск валидация формы добавления карточки*/
formAvatarValidation.enableValidation(); /*запуск валидации формы изменения аватара*/

Promise.all( [profileInfoLoader()] )   /*загрузка данных профиля при загрузке старницы*/
    .then((result) => {
        defaultCardsLoader();       /*добавление начальных карточек*/
    })
    .catch((err) => {
        console.log(err);
    });