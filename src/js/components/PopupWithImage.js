import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._name = data.name;
        this._link = data.link;
    }
    open() {
        super.open();
        const popupImage = this._popupSelector.querySelector('.popup__image');
        const popupImageName = this._popupSelector.querySelector('.popup__image-name');
        popupImage.src = this._link;
        popupImage.alt = this._link;
        popupImageName.textContent = this._name;
    }
}