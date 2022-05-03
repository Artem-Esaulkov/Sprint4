import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
    }

    _getInputValues() {
        const inputElements = Array.from(this._form.querySelectorAll('.popup__field'));
        const inputValues = {};
        inputElements.forEach((item) => {inputValues[item.name] = item.value});
        return inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleFormSubmit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}