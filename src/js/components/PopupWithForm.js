import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({submitFormHandler}, popupSelector) {
        super(popupSelector);
        this._submitFormHandler = submitFormHandler;
    }
    close() {
        super.close();
        if (this._popupSelector.id === 'form-card') {    /*можно было сделать также как в _getInputValues, но не уверен что нам нужно чистить инпуты профиля после сохранения, поэтому сделал с условной конструкцией*/
            this._popupSelector.querySelector('#card-name').value = '';
            this._popupSelector.querySelector('#card-url').value = '';
        }
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
        this._popupSelector.querySelector('.popup__container').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormHandler(this._getInputValues());
            this.close();
        }, {once: true});
    }
}