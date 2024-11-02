import "./index.css";
import {createCard,deleteCards,likeCards,} from "../components/card"
import {openPopup, closePopup} from "../components/modal";
import {enableValidation,clearValidation} from "../components/validation"
import {loadingProfileInfo, loadingCardServer,editProfileInfo,addNewCard,updateAvatarProfile} from "../components/api"


let myId;

const placesList = document.querySelector('.places__list');


// Переменные связанные с профелем 
const profileButton = document.querySelector('.profile__edit-button'); // кнопка профаила 
const popupProfil = document.querySelector('.popup_type_edit'); // модульное окно popup профеля 
//объявляю переменную формы  профиля 
const formProfile = document.forms['edit-profile'];
// Находим поля формы в DOM
const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.description;
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

//переменные связанные с добавлением карточки 
const addCardButton = document.querySelector('.profile__add-button'); //кнопка добавление карточки
const addCardPopup = document.querySelector('.popup_type_new-card'); // модульное окно popup добавление новой карточки 
//объявляю переменную формы карточки 
const formAddCard = document.forms['new-place'];
// Находим поля формы в DOM
const placeName = formAddCard.elements['place-name'];
const url = formAddCard.elements.link
const addCardImg = document.querySelector('.popup__image');
const addCardCaption = document.querySelector('.popup__caption');

//переменные связаные с аватаркой профеля
const formAvatar = document.forms['update-avatar'] 
const profileAvatarButton = document.querySelector('.avatar-button') // кнопка изминения аватарки 
const popupAvatar = document.querySelector('.popup_type_edit-avatar') ; // модульное окно popup аватарки профеля 
const profileAvatar = document.querySelector(".profile__image");
const avatarUrl = formAvatar.elements.avatar;


const ImgPopup = document.querySelector('.popup_type_image'); // модульное окно popup картинки


//объявляю переменную кнопки, которая закрывает popup 
const closePopupButtons = document.querySelectorAll('.popup__close');



const validationSetting = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};


//вывод карточек на страницу 
Promise.all([loadingProfileInfo(), loadingCardServer()])
  .then(([info, Cards]) => {
    myId = info["_id"];
    profileName.textContent = info.name;
    profileJob.textContent = info.about;
    profileAvatar.style.backgroundImage = `url('${info.avatar}')`;
    Cards.forEach((res) => {
      withdrawCard(res,placesList);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// функция вывода карточек 
function withdrawCard(cards, list) {
  list.append(
    createCard(cards, deleteCards,likeCards,openPopupIgm,myId)
  );
}

// открытия окон 
profileButton.addEventListener('click', function () { 
    clearValidation(formProfile,validationSetting); 
    openPopup(popupProfil); // открываем попап редактора профеля 
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

addCardButton.addEventListener('click', function () {
    clearValidation(formAddCard,validationSetting);
    openPopup(addCardPopup); // открываем попап добавления карточки 
});

profileAvatarButton.addEventListener('click', function(){
  clearValidation(formAvatar,validationSetting);
  openPopup(popupAvatar)//открытие попап редактирования аватарки 
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

    editProfileInfo(
      nameInput.value,
      jobInput.value
    )
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfil);  
}
formProfile.addEventListener('submit', handleFormProfileSubmit); 

// обновления аватарки 
function handleFormAvatarSubmit(evt) {
  evt.preventDefault();
  updateAvatarProfile(avatarUrl.value)
  .then((info)=> {
    profileAvatar.style.backgroundImage = `url('${info.avatar}')`;
  })
  closePopup(popupAvatar);
  
}
formAvatar.addEventListener('submit', handleFormAvatarSubmit); 


//добавления карточки
function handleFormAddCardSubmit(evt) {
    evt.preventDefault();   
    const cards = {
      name: placeName.value,
      link: url.value
    };

    addNewCard(cards.name, cards.link)
    .then((cards) => {
      const createdCard = createCard(cards, deleteCards,likeCards,openPopupIgm,myId);
    placesList.prepend(createdCard);
    closePopup(addCardPopup);
    })
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

enableValidation(validationSetting);

