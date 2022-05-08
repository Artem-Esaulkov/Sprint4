import Popup from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._element = this._popup.querySelector(".popup__image-element");
    this._caption = this._popup.querySelector(".popup__image-title");
    this._image = data.link;
    this._title = data.name;
  }

  open() {
    super.open();
    this._element.src = this._image;
    this._element.alt = this._title;
    this._caption.textContent = this._title;
  }
}
