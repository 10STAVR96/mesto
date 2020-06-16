export default class Card {
    constructor( {data, handleCardClick }, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);
        return cardElement;
    }
    _handleLike() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
    }
    _handleRemove() {
        this._element.remove();
    }
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', () => this._handleCardClick());
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