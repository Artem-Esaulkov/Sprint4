//Popup variables
const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_edit");
const popupAdd = document.querySelector(".popup_add");
const popupEditClose = document.querySelectorAll(".popup__close")[0];
const popupAddClose = document.querySelectorAll(".popup__close")[1];
const formElementEdit = popupEdit.querySelector(".popup__container_edit");
const formElementAdd = popupAdd.querySelector(".popup__container_add");
const nameInput = formElementEdit.querySelector(".popup__field_name");
const descriptionInput = formElementEdit.querySelector(".popup__field_description");
const placeTitleInput = formElementAdd.querySelector(".popup__field_title");
const placeLinkInput = formElementAdd.querySelector(".popup__field_link");
// const popupOverlay = popup.querySelector(".popup__overlay");

//Profile variables
const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");

//initialCards declaration
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const reserveCards = {name: '', link: ''};

//Elements forming
const elements = document.querySelector('.elements');
let element = document.querySelector('.element');
const card = document.querySelector('#card').content;

function takeElementFromTemplate(item) {
  element = card.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementDescription = element.querySelector('.element__description');
  const elementTitle = elementDescription.querySelector('.element__title');
  const elementLike = elementDescription.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete');
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementTitle.textContent = item.name;
  elementLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__like_active');
  });
  elementDelete.addEventListener('click', function(evt) {
    evt.target.parentElement.remove();
  });
};

// function toggleLike() {
//   elementLike.addEventListener('click', function(evt) {
//     evt.target.classList.toggle('element__like_active');
//   });
// };

initialCards.forEach(function(item) {
  takeElementFromTemplate(item);
  elements.append(element);
  // toggleLike();
});

//Forms functions
function openPopup(arg) {
  arg.classList.add("popup_opened");
};

function openEditPopup() {
  openPopup(popupEdit);
  nameInput.setAttribute('value', profileName.textContent);
  descriptionInput.setAttribute('value', profileDescription.textContent);
};

function openAddPopup() {
  openPopup(popupAdd);
  placeTitleInput.setAttribute('placeholder', 'Название');
  placeLinkInput.setAttribute('placeholder', 'Ссылка на картинку');
};

function closePopup(arg) {
  arg.classList.remove("popup_opened");
  // arg.style = 'transition: opacity .5s linear';
};

function addPlaceCard() {
  reserveCards.name = placeTitleInput.value;
  reserveCards.link = placeLinkInput.value;
  takeElementFromTemplate(reserveCards);
  elements.prepend(element);
  // toggleLike();
};

function submitFormEdit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupEdit.classList.remove("popup_opened");
}

function submitFormAdd(evt) {
  evt.preventDefault();
  addPlaceCard();
  popupAdd.classList.remove("popup_opened");
}

//EventListeners
profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
popupEditClose.addEventListener("click", function() {
  closePopup(popupEdit);
});
popupAddClose.addEventListener("click", function() {
  closePopup(popupAdd);
});
// popupOverlay.addEventListener("click", closePopup);
formElementEdit.addEventListener("submit", submitFormEdit);
formElementAdd.addEventListener("submit", submitFormAdd);

