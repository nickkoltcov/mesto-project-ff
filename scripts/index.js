const placesList = document.querySelector('.places__list');



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

    cards.forEach(cards => {
        const card = createCard(cards, deleteCard);
        placesList.appendChild(card);
    });
}

function deleteCard(cardElement) {
    placesList.removeChild(cardElement);
}

renderCards(initialCards);