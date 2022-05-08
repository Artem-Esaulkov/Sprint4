export const obj = {
    formSelector: ".popup",
    formSelectorOpened: ".popup_opened",
    formFieldSet: ".popup__container",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_inactive",
    inputErrorClass: "popup__field_type-error",
    errorClass: "popup__field-error",
  };

  //Profile variables
export const profileEditButton = document.querySelector(".profile__edit-button");
export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(".profile__description");
export const profileAddButton = document.querySelector(".profile__add-button");

//initialCards declaration
export const initialCards = [
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
    }
];

export const reserveCards = { name: "", link: "" };