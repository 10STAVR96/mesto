const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit');
let profileAuthor = profile.querySelector('.profile__author');
let profileStatus = profile.querySelector('.profile__status');
let popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__author');
let statusInput = formElement.querySelector('.popup__status');
/*Выше переменные для кнопок из блоков: profile, popup*/

function editCloseButtons () {                          /*кнопка редактировать профиль и закрыть окно*/
    if (popup.classList.contains('popup_opened')) {
        popup.classList.remove('popup_opened');
    } else {
        popup.classList.add('popup_opened');
        nameInput.value = profileAuthor.textContent;
        statusInput.value = profileStatus.textContent;
    }
}

function formSubmitHandler (evt) {         /*кнопка сохранить изменения в редактировании профиля*/
    evt.preventDefault();

    profileAuthor.textContent = nameInput.value;
    profileStatus.textContent = statusInput.value;
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', editCloseButtons);
closeButton.addEventListener('click', editCloseButtons);
formElement.addEventListener('submit', formSubmitHandler);