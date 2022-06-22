import PopupWithForm from './PopupWithForm.js';

export default class PopupWithConfirmation extends PopupWithForm {
    constructor({ popupSelector, handleCardDelete }) {
        super(popupSelector);
        super(this._form);
        this._handleCardDelete = handleCardDelete;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleCardDelete);
    }

    close() {
        super.close();
    }
}