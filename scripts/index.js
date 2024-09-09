
function createCard(cards, deletecard) {
    const cardTemplate = document.querySelector('#card-template').content.cloneNode(true);
    const cardElement = cardTemplate.querySelector('.card');

    const imageElement = cardElement.querySelector('.card__image');
    const titleElement = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    imageElement.src = cards.link;
    imageElement.alt = cards.name;
    titleElement.textContent = cards.name;

    deleteButton.addEventListener('click', () => {
        deletecard(cardElement)
    });
    
    return cardElement;
}

function renderCards(cards) {
    const placesList = document.querySelector('.places__list');
  
    cards.forEach(cardData => {
        const card = createCard(cardData, deleteCard);
        placesList.appendChild(card);
    });
}

function deleteCard(cardElement) {
    const placesList = document.querySelector('.places__list');
    placesList.removeChild(cardElement);
}

renderCards(initialCards);