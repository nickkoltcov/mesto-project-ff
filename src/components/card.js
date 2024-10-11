// функция создания карточки 
function createCard (cards, clickDelete,clickLike,clicklIgm) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardElement = cardTemplate.querySelector('.card');

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    imageElement.src = cards.link;
    imageElement.alt = cards.name;
    titleElement.textContent = cards.name;

    deleteButton.addEventListener('click', clickDelete);
        
    likeButton.addEventListener('click', clickLike);

    imageElement.addEventListener('click', clicklIgm);


    return cardElement;
};

//функция удаления карточки 
function deleteCards(evt) {
    const deleteCard = evt.target.closest(".card");
    deleteCard.remove();
}

//функция лайка карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active')
};

export {createCard,deleteCards,likeCard};
