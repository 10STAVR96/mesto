const escape = 'Escape';
const elementImage = document.querySelector('#element-image');
const popupImage = elementImage.querySelector('.popup__image');
const popupImageName = elementImage.querySelector('.popup__image-name');

export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._name = data.name;
        this._link = data.link;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);
        return cardElement;
    }
    _handleClosePopupClickEsc(evt) {
        if (evt.key === escape) {
            elementImage.classList.remove('popup_opened');
        }
    }
    _handlerClosePopupClickOverlay(evt) {
        if (evt.target.classList.contains('popup')) {
            elementImage.classList.remove('popup_opened');
        }
    }
    _handleOpenImage() {
        const popupOpened = this._element.classList.contains('popup_opened');
        if (!popupOpened) {
            popupImage.src = this._link;
            popupImage.alt = this._name;
            popupImageName.textContent = this._name;
            document.addEventListener('keydown', this._handleClosePopupClickEsc);
            document.addEventListener('click', this._handlerClosePopupClickOverlay);
        } else {
            document.removeEventListener('keydown', this._handleClosePopupClickEsc);
            document.removeEventListener('click', this._handlerClosePopupClickOverlay);
        }
        elementImage.classList.toggle('popup_opened');
    }
    _handleLike() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }
    _handleRemove() {
        this._element.remove();
    }
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', () => this._handleOpenImage());
        this._element.querySelector('.elements__like').addEventListener('click', () => this._handleLike());
        this._element.querySelector('.elements__remove').addEventListener('click', () => this._handleRemove());
    }
    generateCard() {
        this._element = this._getTemplate();
        const elementsImage = this._element.querySelector('.elements__image');
        this._setEventListeners();
        this._element.querySelector('.elements__name').textContent = this._name;
        elementsImage.src = this._link;
        elementsImage.alt = this._name;

        return this._element;
    }
}