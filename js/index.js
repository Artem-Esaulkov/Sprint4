//Popup variables
const popups = Array.from(document.querySelectorAll(".popup"));
const popupEdit = popups[0];
const popupAdd = popups[1];
const popupImage = popups[2];
const popupsClose = Array.from(document.querySelectorAll(".popup__close"));
const popupEditClose = popupEdit.querySelector(".popup__close");
const popupAddClose = popupAdd.querySelector(".popup__close");
const popupImageClose = popupImage.querySelector(".popup__close");
const formElementEdit = popupEdit.querySelector(".popup__container_edit");
const formElementAdd = popupAdd.querySelector(".popup__container_add");
const nameInput = formElementEdit.querySelector(".popup__field_name");
const descriptionInput = formElementEdit.querySelector(
  ".popup__field_description"
);
const placeTitleInput = formElementAdd.querySelector(".popup__field_title");
const placeLinkInput = formElementAdd.querySelector(".popup__field_link");
const popupImageElement = popupImage.querySelector(".popup__image-element");
const popupImageTitle = popupImage.querySelector(".popup__image-title");

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
let element = document.querySelector(".element");
const card = document.querySelector("#card").content;

const takeElementFromTemplate = (item) => {
  element = card.cloneNode(true);
  const elementImage = element.querySelector(".element__image");
  const elementDescription = element.querySelector(".element__description");
  const elementTitle = elementDescription.querySelector(".element__title");
  const elementLike = elementDescription.querySelector(".element__like");
  const elementDelete = element.querySelector(".element__delete");
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;
  elementLike.addEventListener("click", (evt) => {
    evt.target.classList.toggle("element__like_active");
  });
  elementDelete.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  elementImage.addEventListener("click", (evt) => {
    openPopup(popupImage);
    popupImageElement.src = evt.target.src;
    popupImageElement.alt = evt.target.alt;
    popupImageTitle.textContent = evt.target.alt;
  });
};

initialCards.forEach((item) => {
  takeElementFromTemplate(item);
  elements.append(element);
});

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

const openPopup = (arg) => {
  arg.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const openEditPopup = () => {
  openPopup(popupEdit);
  nameInput.setAttribute("value", profileName.textContent);
  descriptionInput.setAttribute("value", profileDescription.textContent);
};

const openAddPopup = () => {
  openPopup(popupAdd);
  placeTitleInput.setAttribute("placeholder", "Название");
  placeLinkInput.setAttribute("placeholder", "Ссылка на картинку");
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

const addPlaceCard = () => {
  reserveCards.name = placeTitleInput.value;
  reserveCards.link = placeLinkInput.value;
  takeElementFromTemplate(reserveCards);
  elements.prepend(element);
};

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

//EventListeners
profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
closeAllPopups();
formElementEdit.addEventListener("submit", submitFormEdit);
formElementAdd.addEventListener("submit", submitFormAdd);
