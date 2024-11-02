// функция создания карточки 
import {deleteCardServer,likeCard,unLike} from "../components/api"

function createCard (cards, clickDelete,clickLike,clicklIgm,myId) {

    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardElement = cardTemplate.querySelector('.card');

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardlike = cardElement.querySelector(".card__like-number");

    imageElement.src = cards.link;
    imageElement.alt = cards.name;
    titleElement.textContent = cards.name;
    cardElement.id = cards['_id'];
    cardlike.textContent = cards.likes.length;
    likeButton.setAttribute('data-id', cards['_id'])

// Проверка поставленных лайков
if (checkLike(cards, myId)) {
    likeButton.classList.add("card__like-button_is-active");
} else {
    likeButton.classList.remove("card__like-button_is-active");
}


// проверяем карточку, если карточка моя вещается слушатель удаления карточки
    if (myId !== cards.owner['_id']) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', clickDelete);
    };

        
    likeButton.addEventListener('click', clickLike);

    imageElement.addEventListener('click', clicklIgm);

    return cardElement;
};

//функция удаления карточки 
function deleteCards(evt) {
    const deleteCard = evt.target.closest(".card");
    deleteCardServer(deleteCard.getAttribute('id'))
    .then(() => {
        deleteCard.remove()
    })   
    
}


//функция лайка карточки
function likeCards(evt) {
    const like = evt.target
    const cardId = like.getAttribute('data-id')
    const isliked = evt.target.classList.contains('card__like-button_is-active')
    const cardlike = document.getElementById(cardId)
    const likeNumbElement = cardlike.querySelector('.card__like-number')
    if(isliked) {
        unLike(cardId)
        .then((res)=>{
            likeNumbElement.textContent = res.likes.length
            evt.target.classList.toggle('card__like-button_is-active')
        })
        
    } else {
        likeCard(cardId)
        .then((res)=>{
            likeNumbElement.textContent = res.likes.length
            evt.target.classList.toggle('card__like-button_is-active')
        })
    }
};

//проверка лайка 
function checkLike(cards, myId) {
    return cards.likes.some((item) => item["_id"] === myId);
}




export {createCard,deleteCards,likeCards,};
