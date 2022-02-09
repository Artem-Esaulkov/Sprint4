let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let popupClose = popup.querySelector(".popup__close");
let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let saveProfile = popup.querySelector(".popup__button");
let formElement = popup.querySelector(".popup__container");

function popupOpened() {
  popup.classList.add("popup_opened");
}

function popupClosed() {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector(".popup__field_name").value;
  let descriptionInput = formElement.querySelector(
    ".popup__field_description"
  ).value;

  profileName.textContent = nameInput;
  profileDescription.textContent = descriptionInput;
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", popupOpened);
popupClose.addEventListener("click", popupClosed);
formElement.addEventListener("submit", formSubmitHandler);
