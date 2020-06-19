export default class Popup {   /*открытия/закрытия всех popup блоков*/
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        };
        this._handleOverlayClose = (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
        };
    }
    open() {
        this._popupSelector.classList.add('popup_opened');
        this._setEventListeners();
    }
    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
    }
    
    _setEventListeners() {
        this._popupSelector.querySelector('.popup__close').addEventListener('click', () => this.close());
        document.addEventListener('keydown', this._handleEscClose);
        document.addEventListener('click', this._handleOverlayClose);
    }
}