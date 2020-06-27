export default class Card {
    constructor( {data, handleCardClick }, cardSelector, profileInfo) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._author = data.owner;
        this._profileAuthor = profileInfo.profileAuthor;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this._clickImage = () => {
            this._handleCardClick({
                command: 'openImage',
                id: this._id
            });
        };
        this._clickLike = () => {
            this._handleCardClick({
                command: 'likeImage',
                id: this._id,
                like: this._element.querySelector('.elements__like').classList.contains('elements__like_active'),
                likeCounter: this._element.querySelector('.elements__like-counter')
            });
        };
        this._clickRemove = () => {
            this._handleCardClick({
                command: 'removeCard',
                id: this._id
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
    handleLike() {
        this._element.querySelector('.elements__like').classList.toggle('elements__like_active');

    }
    handleRemove() {
        this._element.remove();
        this._element.querySelector('.elements__image').removeEventListener('click', this._clickImage);
        this._element.querySelector('.elements__like').removeEventListener('click', this._clickLike);
        this._element.querySelector('.elements__remove').removeEventListener('click', this._clickRemove);
        this._element = null;
    }
    _setEventListeners() {
        this._element.querySelector('.elements__image').addEventListener('click', this._clickImage);
        this._element.querySelector('.elements__like').addEventListener('click', this._clickLike);
        this._element.querySelector('.elements__remove').addEventListener('click', this._clickRemove);
    }
    generateCard() {
        this._element = this._getTemplate();
        const elementsImage = this._element.querySelector('.elements__image');
        this._setEventListeners();
        if (this._author._id !== this._profileAuthor.id) {
            this._element.querySelector('.elements__remove').style.display = 'none';
        }
        if (this._likes.some((user) => (user._id === this._profileAuthor.id))) {
            this._element.querySelector('.elements__like').classList.add('elements__like_active');
        }
        this._element.querySelector('.elements__name').textContent = this._name;
        elementsImage.src = this._link;
        elementsImage.alt = this._name;
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length;

        return this._element;
    }
}