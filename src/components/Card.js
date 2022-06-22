export default class Card {
  constructor(user, data, cardSelector, handleCardClick, likes, handleCardDelete, handleCardLike) {
    this._user = user;
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = document.querySelector(cardSelector);
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._likes = likes;
    this._handleCardLike = handleCardLike;
    }

  _getTemplate() {
    const cardElement = this._cardSelector
    .content.querySelector(".element")
    .cloneNode(true);
    return cardElement;
  };

  generateCard(id) {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector(".element__delete");
    this._likeButton = this._element.querySelector(".element__like");
    this._setEventListeners();
    const elementImage = this._element.querySelector(".element__image");
    const elementTitle = this._element.querySelector(".element__title");
    elementImage.src = this._image;
    elementTitle.textContent = this._title;
    this._handleCardClick(elementImage, elementTitle);
    if (this._user._id === 0) {
      this._deleteButton.style.display = 'inline';
    } else if (this._user._id !== id) {
      this._deleteButton.style.display = 'none';
    }
    
    if (JSON.stringify(this._likes).includes(JSON.stringify(this._user))) {
      this._likeButton.classList.add('element__like_active');
    }
    return this._element;
  };

  _setEventListeners() {
    const likeCounter = this._element.querySelector(".element__like-counter");
    likeCounter.textContent = `${this._likes.length}`;
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle('element__like_active');
      this._handleCardLike(this._likeButton, likeCounter, this._user._id);
    });
    this._deleteButton.addEventListener('click', this._handleCardDelete);
  };
};
