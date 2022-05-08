export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._handleEscClose();
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
