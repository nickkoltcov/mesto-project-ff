import "./index.css";
import {initialCards} from "../components/cards";
import {createCard,deleteCards,likeCard} from "../components/card"
import {openPopup, closePopup} from "../components/modal";


const placesList = document.querySelector('.places__list');

// объявляю переменную кнопок, которые вызывают popup
const profileButton = document.querySelector('.profile__edit-button'); // кнопка профаила 
const addCardButton = document.querySelector('.profile__add-button'); //кнопка добавление карточки 

// объявляю переменную, которые открываются при нажатии кнопки 
const popupProfil = document.querySelector('.popup_type_edit'); // модульное окно popup профеля 
const addCardPopup = document.querySelector('.popup_type_new-card'); // модульное окно popup добавление новой карточки 
const ImgPopup = document.querySelector('.popup_type_image'); // модульное окно popup картинки 

//объявляю переменную кнопки, которая закрывает popup 
const closePopupButtons = document.querySelectorAll('.popup__close');

//объявляю переменную формы  профиля 
const formProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formProfile.querySelector(".popup__input_type_name");
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//объявляю переменную формы карточки 
const formAddCard = document.forms['new-place'];
// Находим поля формы в DOM
const placeName = formAddCard.querySelector('.popup__input_type_card-name');
const url = formAddCard.querySelector('.popup__input_type_url');
const addCardImg = document.querySelector('.popup__image');
const addCardCaption = document.querySelector('.popup__caption');

//вывод карточек 
initialCards.forEach(cards => {
  const createdCard = createCard(cards, deleteCards,likeCard,openPopupIgm);
  placesList.append(createdCard);
});


// открытия окон 
profileButton.addEventListener('click', function () {
    openPopup(popupProfil); // открываем попап редактора профеля 
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

addCardButton.addEventListener('click', function () {
    openPopup(addCardPopup); // открываем попап добавления карточки 
});

//закрытие окна
closePopupButtons.forEach(function(close) {
  close.addEventListener("click", () => {
    closePopup(close.closest('.popup'));
  });
});



// редактор профеля 
// Обработчик «отправки» формы, хотя пока,не отправляет 
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfil);  
}
formProfile.addEventListener('submit', handleFormProfileSubmit); 


//добавления карточки
function handleFormAddCardSubmit(evt) {
    evt.preventDefault();   
    const cards = {
      name: placeName.value,
      link: url.value

    };
    const createdCard = createCard(cards, deleteCards,likeCard,openPopupIgm);
    placesList.prepend(createdCard);
    closePopup(addCardPopup);
    formAddCard.reset()
}
formAddCard.addEventListener('submit', handleFormAddCardSubmit); 

//открытие popup по нажатию на карточку 
function openPopupIgm(evt) {
  openPopup(ImgPopup);
  addCardImg.src =  evt.target.src;
  addCardImg.alt =  evt.target.alt;
  addCardCaption.textContent = evt.target.alt;
};

// плавность 
document.querySelectorAll('.popup').forEach(function (popup) {
  popup.classList.add('popup_is-animated');
});



