export default class Card {
    constructor( {data, handleClickImage, handleClickLike, handleClickDelete}, cardSelector, userId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._author = data.owner;
        this._userId = userId;
        this._handleClickImage = handleClickImage;
        this._handleClickLike = handleClickLike;
        this._handleClickDelete = handleClickDelete;
        this._cardSelector = cardSelector;
        this._clickLike = () => {
            this._handleClickLike({
                id: this._id,
                like: this._element.querySelector('.elements__like').classList.contains('elements__like_active'),
                likeCounter: this._element.querySelector('.elements__like-counter')
            });
        };
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.elements__element')
            .cloneNode(true);
        return cardElement;
    }
    handleLike(quantity) {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
        this._element.querySelector('.elements__like-counter').textContent = quantity;

    }
    handleRemove() {
        this._element.remove();
        this._element.querySelector('.elements__image').removeEventListener('click', this._handleClickImage);
        this._element.querySelector('.elements__like').removeEventListener('click', this._clickLike);
        this._element.querySelector('.elements__remove').removeEventListener('click', this._handleClickDelete);
        this._element = null;
    }
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', this._handleClickImage);
        this._element.querySelector('.elements__like').addEventListener('click', this._clickLike);
        this._element.querySelector('.elements__remove').addEventListener('click', this._handleClickDelete);
    }
    generateCard() {
        this._element = this._getTemplate();
        const elementsImage = this._element.querySelector('.elements__image');
        this._setEventListeners();
        if (this._author._id !== this._userId) {
            this._element.querySelector('.elements__remove').style.display = 'none';
        }
        if (this._likes.some((user) => (user._id === this._userId))) {
            this._element.querySelector('.elements__like').classList.add('elements__like_active');
        }
        this._element.querySelector('.elements__name').textContent = this._name;
        elementsImage.src = this._link;
        elementsImage.alt = this._name;
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length;

        return this._element;
    }
}