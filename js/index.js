import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//Object settings
const obj = {
  formSelector: ".popup",
  formSelectorOpened: ".popup_opened",
  formFieldSet: ".popup__container",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__field_type-error",
  errorClass: "popup__field-error",
};

//Popup variables
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEdit = popups[0];
const popupAdd = popups[1];
const popupImage = popups[2];
export {popups, popupImage};
const popupsClose = Array.from(document.querySelectorAll(".popup__close"));
// const popupEditClose = popupEdit.querySelector(".popup__close");
// const popupAddClose = popupAdd.querySelector(".popup__close");
// const popupImageClose = popupImage.querySelector(".popup__close");
const formElementEdit = popupEdit.querySelector(".popup__container_edit");
const formElementAdd = popupAdd.querySelector(".popup__container_add");
const nameInput = formElementEdit.querySelector(".popup__field_name");
const descriptionInput = formElementEdit.querySelector(
  ".popup__field_description"
);
const placeTitleInput = formElementAdd.querySelector(".popup__field_title");
const placeLinkInput = formElementAdd.querySelector(".popup__field_link");
export const popupImageElement = popupImage.querySelector(".popup__image-element");
export const popupImageTitle = popupImage.querySelector(".popup__image-title");

//Profile variables
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");

//initialCards declaration
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const reserveCards = { name: "", link: "" };

//Elements forming
const elements = document.querySelector(".elements");

initialCards.forEach((item) => {
  const card = new Card(item, '.elements__card');
  const cardItem = card.generateCard();
  elements.append(cardItem);
});

const addPlaceCard = () => {
  reserveCards.name = placeTitleInput.value;
  reserveCards.link = placeLinkInput.value;
  const newCard = new Card(reserveCards, '.elements__card');
  elements.prepend(newCard.generateCard());
  reserveCards.name = '';
  reserveCards.link = '';
};

//Forms and Popups functions
const closePopup = (arg) => {
  arg.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

const closeByEscape = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
};

export const openPopup = (arg) => {
  arg.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const openEditPopup = () => {
  openPopup(popupEdit);
  nameInput.setAttribute("value", profileName.textContent);
  descriptionInput.setAttribute("value", profileDescription.textContent);
  const buttonEditProfile = popupEdit.querySelector(obj.submitButtonSelector);
  //setButtonDisabled(buttonEditProfile, obj);
};

const openAddPopup = () => {
  openPopup(popupAdd);
  placeTitleInput.setAttribute("placeholder", "Название");
  placeLinkInput.setAttribute("placeholder", "Ссылка на картинку");
  const buttonAddCard = popupAdd.querySelector(obj.submitButtonSelector);
  //setButtonDisabled(buttonAddCard, obj);
};

const closeAllPopups = () => {
  const popupOverlay = Array.from(document.querySelectorAll(".popup__overlay"));
  popupOverlay.forEach((item) => {
    popupsClose.push(item);
  });

  popupsClose.forEach((item) => {
    item.addEventListener("click", (evt) => {
      const popupClosing = evt.target.parentElement.parentElement;
      if (popupClosing !== document.querySelector(".page")) {
        closePopup(popupClosing);
      } else {
        closePopup(evt.target.parentElement);
      }
    });
  });
};

// Forms submit

const submitFormEdit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
};

const submitFormAdd = (evt) => {
  evt.preventDefault();
  addPlaceCard();
  closePopup(popupAdd);
  placeTitleInput.value = "";
  placeLinkInput.value = "";
};

// Forms Validation

const formList = Array.from(document.querySelectorAll(obj.formSelector));
formList.forEach((item) => {
  const form = new FormValidator(obj, item);
  form.enableValidation();
});

//EventListeners
profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
closeAllPopups();
formElementEdit.addEventListener("submit", submitFormEdit);
formElementAdd.addEventListener("submit", submitFormAdd);
