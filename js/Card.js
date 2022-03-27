import { popups, popupImage, openPopup, popupImageElement, popupImageTitle } from "./index.js";

export class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content.querySelector(".element")
    .cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(".element__title").textContent = this._title;
    return this._element;
  };

  _setEventListeners() {
    const buttonLike = this._element.querySelector(".element__like");
    buttonLike.addEventListener("click", () => {
      buttonLike.classList.toggle("element__like_active");
    });
    const buttonDelete = this._element.querySelector(".element__delete");
    buttonDelete.addEventListener("click", () => {
      buttonDelete.parentElement.remove();
    });
    const imageOpenPopup = this._element.querySelector(".element__image");
    imageOpenPopup.addEventListener('click', () => {
        openPopup(popupImage);
        popupImageElement.src = this._image;
        popupImageElement.alt = this._title;
        popupImageTitle.textContent = this._title;
    });
  };
};
