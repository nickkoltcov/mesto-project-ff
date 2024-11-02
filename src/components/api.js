// Конфиг обращения к апи 

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
    headers: {
      authorization: '4bf101d5-19f2-4f0d-a5da-d4b2c8a40cc9',
      'Content-Type': 'application/json'
    }
};



const responseServer = (res) => {
    if (res.ok) {
        return res.json();
    }
  
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
};


// 3. Загрузка информации о пользователе с сервера

const loadingProfileInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(responseServer);
};


// 4. Загрузка карточек с сервера

const loadingCardServer = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(responseServer);
};


// 5. Редактирование профиля

const editProfileInfo = (profileName, profileJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileJob,
    }),
  }).then(responseServer);
};


//6. Добавление новой карточки 

const addNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    }),
  }).then(responseServer);
};


// 8. удаление карточки 

const deleteCardServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(responseServer);
};


// 9.Постановка и снятие лайка

//лайк
const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(responseServer);
};


// убрать  лайк 
const unLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(responseServer);
};


// 10. Обновление аватара пользователя

const updateAvatarProfile = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(responseServer);
};


export {
    responseServer, 
    loadingProfileInfo, 
    loadingCardServer,
    editProfileInfo,
    addNewCard,
    deleteCardServer,
    likeCard,
    unLike,
    updateAvatarProfile
};