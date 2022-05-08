export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    }

  _getTemplate() {
    const cardElement = this._cardSelector
    .content.querySelector(".element")
    .cloneNode(true);
    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementImage = this._element.querySelector(".element__image");
    const elementTitle = this._element.querySelector(".element__title");
    elementImage.src = this._image;
    elementTitle.textContent = this._title;
    this._handleCardClick(elementImage, elementTitle);
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
  };
}
