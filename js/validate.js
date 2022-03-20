// Form validation

const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(`popup__field_${inputElement.id}`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(`popup__field_${inputElement.id}`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, obj);
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setButtonDisabled = (buttonElement, obj) => {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(obj.inactiveButtonClass);
};

const removeButtonDisabled = (buttonElement, obj) => {
  buttonElement.removeAttribute("disabled", true);
  buttonElement.classList.remove(obj.inactiveButtonClass);
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    setButtonDisabled(buttonElement, obj);
  } else {
    removeButtonDisabled(buttonElement, obj);
  };
};

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(
    formElement.querySelectorAll(obj.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    obj.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(obj.formFieldSet)
    );
    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet, obj);
    });
  });
};

enableValidation({
  formSelector: ".popup",
  formSelectorOpened: ".popup_opened",
  formFieldSet: ".popup__container",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__field_type-error",
  errorClass: "popup__field-error",
});
