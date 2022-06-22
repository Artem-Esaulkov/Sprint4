export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    const popupsClose = document.querySelectorAll(".popup__close");
    const popupsOverlay = document.querySelectorAll(".popup__overlay");
    popupsClose.forEach((item) => {
      item.addEventListener('click', () => {
        this.close()})
    });
    popupsOverlay.forEach((item) => {
      item.addEventListener('click', () => {
        this.close()})
    });
  }
}
