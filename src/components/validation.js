

// функция добавляет класс с ошибкой 
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass ,errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};
 
//=====================================================================================================================

// функция удаляет класс с ошибкой  
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);  // Находим элемент ошибки
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//=================================================================================================================
 

//проверяет валидность поля, внутри вызывает showInputError или hideInputError.
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    // встроенный метод setCustomValidity принимает на вход строку
    // и заменяет ею стандартное сообщение об ошибке
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    // если передать пустую строку, то будут доступны
    // стандартные браузерные сообщения
    inputElement.setCustomValidity("");
  }


  if (!inputElement.validity.valid) { //если поле не проходит валидацию покахывает ошибку
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле 
    showInputError(formElement, inputElement, inputElement.validationMessage,inputErrorClass,errorClass);
  } else { // если прошло, то скрывает 
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//============================================================================================================================================
  

// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}

//====================================================================================================================================================

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
  }
}

//===========================================================================================================================
  
const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', function () {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};
  
const enableValidation = (validationSetting) => {// тут пока затупак никита посмотри валидацию урок 5 
   // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
       evt.preventDefault();
    });
    setEventListeners(formElement,
      validationSetting.inputSelector,
      validationSetting.submitButtonSelector,
      validationSetting.inactiveButtonClass,
      validationSetting.inputErrorClass,
      validationSetting.errorClass     
    )
 });
};

const clearValidation = (formElement, validationSetting) => {
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));
  const submitButton = formElement.querySelector(validationSetting.submitButtonSelector);
  submitButton.classList.add(validationSetting.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSetting.inputErrorClass, validationSetting.errorClass);
  });
  submitButton.classList.add(validationSetting.inactiveButtonClass);
};

export {enableValidation, clearValidation}
