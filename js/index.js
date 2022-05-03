import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

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

//Validate Form
const validateForm = () => {
  const formOpened = document.querySelector(obj.formSelectorOpened);
  const form = new FormValidator(obj, formOpened);
  form.enableValidation();
  form._setButtonDisabled();
}

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

//Cards forming
const reserveCards = { name: "", link: "" };

const handleCardClick = (item, title) => {
  item.addEventListener('click', () => {
    reserveCards.name = title.textContent;
    reserveCards.link = item.src;
    const imagePopup = new PopupWithImage('.popup_image', reserveCards);
    imagePopup.open();
    console.log(imagePopup._popup);
  })
}

const cardElements = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item, '.elements__card', handleCardClick);
  const cardItem = card.generateCard();
  cardElements.addItems(cardItem);
}}, '.elements');
cardElements.renderItems();

//Open popups and form submits

const userInfo = new UserInfo({name: ".popup__field_name", description: ".popup__field_description"});

const cardInfo = new UserInfo({name: ".popup__field_title", description: ".popup__field_link"});

const editPopup = new PopupWithForm({ popupSelector: '.popup_edit', handleFormSubmit: (evt) => {
  evt.preventDefault();
  profileName.textContent = userInfo._name.value;
  profileDescription.textContent = userInfo._description.value;
  editPopup.close();
}});

const addPopup = new PopupWithForm({ popupSelector: '.popup_add', handleFormSubmit: (evt) => {
  evt.preventDefault();
  const newCard = new Section({items: [addPopup._getInputValues()], renderer: (item) => {
    const card = new Card(item, '.elements__card', handleCardClick);
    const cardItem = card.generateCard();
    cardElements._container.prepend(cardItem);
  }}, '.elements');
  newCard.renderItems();
  addPopup.close();
}});

const openEditPopup = () => {
  editPopup.open();
  userInfo._name.setAttribute("value", profileName.textContent);
  userInfo._description.setAttribute("value", profileDescription.textContent);
  validateForm();
};

const openAddPopup = () => {
  addPopup.open();
  cardInfo._name.setAttribute("placeholder", "Название");
  cardInfo._description.setAttribute("placeholder", "Ссылка на картинку");
  validateForm();
};

//EventListeners
profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
