import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(data) {
        const popupImage = this._popupSelector.querySelector('.popup__image');
        const popupImageName = this._popupSelector.querySelector('.popup__image-name');
        popupImage.src = data.link;
        popupImage.alt = data.link;
        popupImageName.textContent = data.name;
        super.open();
    }
}