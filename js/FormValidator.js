export class FormValidator {
  constructor(obj, formElement) {
    this._obj = obj;
    this._inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    this._formElement = formElement;
    this._buttonElement = formElement.querySelector(obj.submitButtonSelector);
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(`popup__field_${inputElement.id}`);
    inputElement.classList.add(this._obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._obj.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`popup__field_${inputElement.id}`);
    inputElement.classList.remove(this._obj.inputErrorClass);
    errorElement.classList.remove(this._obj.errorClass);
    errorElement.textContent = "";
  };
  
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(inputElement, inputElement.validationMessage);
    } else {
      hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  
  _setButtonDisabled () {
    this._buttonElement.setAttribute("disabled", true);
    this._buttonElement.classList.add(this._obj.inactiveButtonClass);
  };
  
  _removeButtonDisabled () {
    this._buttonElement.removeAttribute("disabled", true);
    this._buttonElement.classList.remove(this._obj.inactiveButtonClass);
  };
  
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._setButtonDisabled();
    } else {
      this._removeButtonDisabled();
    };
  };
  
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}

// const formList = Array.from(document.querySelectorAll(this._obj.formSelector));
//     formList.forEach((formElement) => {
//       formElement.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//       });
  
//       const fieldsetList = Array.from(
//         formElement.querySelectorAll(obj.formFieldSet)
//       );
//       fieldsetList.forEach((fieldSet) => {
