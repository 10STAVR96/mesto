import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({submitFormHandler}, popupSelector) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._submit = evt => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
            this.close();
        };
    }
    close() {
        super.close();
        this._popupSelector.querySelector('.popup__container').reset();
        this._popupSelector.querySelector('.popup__container').removeEventListener('submit', this._submit);
    }
    _getInputValues() {
        this._inputList = this._popupSelector.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }
    _setEventListeners() {
        super._setEventListeners();
        this._popupSelector.querySelector('.popup__container').addEventListener('submit', this._submit);
    }
}