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
    _handleOpenImage() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageName.textContent = this._name;
        elementImage.classList.add('popup_opened');
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
        this._setEventListeners();
        this._element.querySelector('.elements__name').textContent = this._name;
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = this._name;

        return this._element;
    }
}