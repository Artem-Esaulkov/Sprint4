// import

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  obj,
  profileEditButton,
  profileName,
  profileDescription,
  profileAddButton,
  reserveCards,
  profileAvatar,
  profileEditAvatar,
} from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// Form Validation

const validateForm = () => {
  const formOpened = document.querySelector(obj.formSelectorOpened);
  const form = new FormValidator(obj, formOpened);
  form.enableValidation();
  form._setButtonDisabled();
};

// Profile forming

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-40",
  headers: {
    authorization: "ec3562dc-38d6-49a4-b958-d2cdacbbc00f",
    "Content-Type": "application/json",
  },
});

const profile = new UserInfo({
  name: profileName,
  description: profileDescription,
});
api.getInitialProfile().then((data) => {
  profile.setUserInfo(data);
  profileAvatar.src = data.avatar;
})
.catch(err => {console.log(err)}); 

//Cards forming

const handleCardClick = (item, title) => {
  item.addEventListener("click", () => {
    reserveCards.name = title.textContent;
    reserveCards.link = item.src;
    const imagePopup = new PopupWithImage(".popup_image", reserveCards);
    imagePopup.open();
  });
};

api.getInitialCards().then((data) => {
  api.getInitialProfile().then((res) => {
    const cardElements = new Section(
      {
        items: data,
        renderer: (item) => {
          const card = new Card(
            res,
            item,
            ".elements__card",
            handleCardClick,
            item.likes,
            (e) => {
              const deletePopup = new PopupWithForm({
                popupSelector: ".popup_delete",
                handleFormSubmit: (evt) => {
                  evt.preventDefault();
                  api.deleteCard(item._id);
                  e.target.parentElement.remove();
                  deletePopup.close();
                },
              });
              deletePopup.open();
            },
            (elem, counter) => {
              if (elem.classList.contains("element__like_active")) {
                counter.textContent = `${parseInt(counter.textContent) + 1}`;
                api.likeCard(item._id);
              } else {
                counter.textContent = `${parseInt(counter.textContent) - 1}`;
                api.dislikeCard(item._id);
              }
            }
          );
          const cardItem = card.generateCard(item.owner._id);
          cardElements.addItems(cardItem);
        },
      },
      ".elements"
    );
    cardElements.renderItems();
  }).catch(err => {console.log(err)});
}).catch(err => {console.log(err)});

//Open popups and form submits

// Profile

const submitButton = (popup) => {
  return popup.querySelector('.popup__button');
}

const handleFormSubmitProfile = (evt) => {
  evt.preventDefault();
  api
    .editProfile({
      name: editPopup._getInputValues()['profile-name'],
      about: editPopup._getInputValues()['profile-description'],
    })
    .then((data) => {
      submitButton(editPopup._form).textContent = 'Сохранение...';
      profile.setUserInfo(data);
      editPopup.close();
    }).catch(err => {console.log(err)}); 
};

const editPopup = new PopupWithForm({
  popupSelector: ".popup_edit",
  handleFormSubmit: handleFormSubmitProfile,
});

const openEditPopup = () => {
  submitButton(editPopup._form).textContent = 'Сохранить';
  editPopup.open();
  const nameValue = document.querySelector(`${obj.inputSelector}_name`);
  nameValue.setAttribute("value", profile.getUserInfo()['profile-name']);
  const descriptionValue = document.querySelector(`${obj.inputSelector}_description`);
  descriptionValue.setAttribute("value", profile.getUserInfo()['profile-description']);
  validateForm();
};

// New cards

const handleFormSubmitCards = (evt) => {
  evt.preventDefault();
  api
    .addCard({
      name: addPopup._getInputValues().name,
      link: addPopup._getInputValues().link,
    })
    .then((data) => {
      api.getInitialProfile().then((res) => {
        const newCard = new Section(
          {
            items: [{ name: data.name, link: data.link }],
            renderer: (item) => {
              const card = new Card(
                res,
                data,
                ".elements__card",
                handleCardClick,
                [],
                (e) => {
                  const deletePopup = new PopupWithConfirmation({
                    popupSelector: ".popup_delete",
                    handleCardDelete: (evt) => {
                      evt.preventDefault();
                      api.deleteCard(data._id);
                      e.target.parentElement.remove();
                      deletePopup.close();
                    },
                  });
                  deletePopup.open();
                },
                (elem, counter) => {
                  if (elem.classList.contains("element__like_active")) {
                    counter.textContent = `${
                      parseInt(counter.textContent) + 1
                    }`;
                    api.likeCard(data._id);
                  } else {
                    counter.textContent = `${
                      parseInt(counter.textContent) - 1
                    }`;
                    api.dislikeCard(data._id);
                  }
                }
              );
              const cardItem = card.generateCard(res._id);
              newCard._container.prepend(cardItem);
            },
          },
          ".elements"
        );
        newCard.renderItems();
        submitButton(addPopup._form).textContent = 'Создание...';
        addPopup.close();
      }).catch(err => {console.log(err)});
    }).catch(err => {console.log(err)});
};

const addPopup = new PopupWithForm({
  popupSelector: ".popup_add",
  handleFormSubmit: handleFormSubmitCards,
});

const openAddPopup = () => {
  submitButton(addPopup._form).textContent = 'Создать';
  addPopup.open();
  const titleValue = document.querySelector(`${obj.inputSelector}_title`);
  titleValue.setAttribute("placeholder", "Название");
  const linkValue = document.querySelector(`${obj.inputSelector}_link`);
  linkValue.setAttribute("placeholder", "Ссылка на картинку");
  validateForm();
};

// Edit avatar

const handleFormSubmitAvatar = (evt) => {
  evt.preventDefault();
  api
    .editAvatar(avatarPopup._getInputValues().src)
    .then((res) => {
      submitButton(avatarPopup._form).textContent = 'Сохранение...';
      profileAvatar.setAttribute("src", res.avatar);
      avatarPopup.close();
    }).catch(err => {console.log(err)});
};

const avatarPopup = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleFormSubmit: handleFormSubmitAvatar
});

const openAvatarPopup = () => {
  submitButton(avatarPopup._form).textContent = 'Сохранить';
  avatarPopup.open();
  api.getInitialProfile().then((data) => {
    const avatarValue = document.querySelector(`${obj.inputSelector}_src`);
    avatarValue.setAttribute("value", data.avatar);
    validateForm();
  }).catch(err => {console.log(err)});
};

//EventListeners
profileEditButton.addEventListener("click", openEditPopup);
profileAddButton.addEventListener("click", openAddPopup);
profileEditAvatar.addEventListener("click", openAvatarPopup);
