let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let popupClose = popup.querySelector(".popup__close");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let saveProfile = popup.querySelector(".popup__button");
let formElement = popup.querySelector(".popup__container");
// let overlay = popup.querySelector(".popup__overlay");
let nameInput = formElement.querySelector(".popup__field_name");
let descriptionInput = formElement.querySelector(".popup__field_description");

function popupOpened() {
  popup.classList.add("popup_opened");
  nameInput.setAttribute('value', profileName.textContent);
  descriptionInput.setAttribute('value', profileDescription.textContent);
}

function popupClosed() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpened);
popupClose.addEventListener("click", popupClosed);
// overlay.addEventListener("click", popupClosed);
formElement.addEventListener("submit", formSubmitHandler);
