// открыть popup
function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
    popup.addEventListener('click', closeOverlay);
};

// закрыть popup 
function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
    popup.removeEventListener('click', closeOverlay);
};

// закрыть popup нажатием на ESCAPE
function closeEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_is-opened'))
    }
};

// закрытие popup кликом на оверлей
function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
};

export {openPopup, closePopup};


