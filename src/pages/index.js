import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { obj, profileEditButton, profileName, profileDescription, profileAddButton, initialCards, reserveCards } from "../utils/constants.js";
import './index.css';

//Validate Form
const validateForm = () => {
  const formOpened = document.querySelector(obj.formSelectorOpened);
  const form = new FormValidator(obj, formOpened);
  form.enableValidation();
  form._setButtonDisabled();
}

//Cards forming

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
