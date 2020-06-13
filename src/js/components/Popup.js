export default class Popup {   /*открытия/закрытия всех popup блоков*/
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        this._setEventListeners();
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    _handleOverlayClose(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }
    _setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.close());
        document.addEventListener('keydown', evt => this._handleEscClose(evt));
        document.addEventListener('click', evt => this._handleOverlayClose(evt));
    }
}