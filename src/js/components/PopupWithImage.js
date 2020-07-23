import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image');
        this._popupImageName = this._popupSelector.querySelector('.popup__image-name');
    }
    open(data) {
        this._popupImage.src = data.link;
        this._popupImage.alt = data.link;
        this._popupImageName.textContent = data.name;
        super.open();
    }
}