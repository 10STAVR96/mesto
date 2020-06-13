import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({submitFormHandler}, popupSelector) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
    }
    close() {
        super.close();
        this._popupSelector.querySelector('#card-name').value = '';
        this._popupSelector.querySelector('#card-url').value = '';
        this._popupSelector.querySelector('.popup__container').removeEventListener('submit', this._submitFormHandler);
    }
    getInputValues() {            /*данный метод используется в OpenAddCardHandler, если сделать его приватным, то он вобще нигде не нужен*/
        const item = {
            name: this._popupSelector.querySelector('#card-name').value,
            link: this._popupSelector.querySelector('#card-url').value
        };
        return item;
    }
    _setEventListeners() {
        super._setEventListeners();
        this._popupSelector.querySelector('.popup__container').addEventListener('submit', this._submitFormHandler);
    }
}