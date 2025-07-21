const popupElement = document.querySelector('.popup');
const profileInfo = document.querySelector('.profile__content');

const nameElement = profileInfo.querySelector('.profile__name');
const descriptionElement = profileInfo.querySelector('.profile__description');

const inputName = popupElement.querySelector('#name');
const inputDescription = popupElement.querySelector('#description');

function openPopup() {
  popupElement.classList.add('popup__opened');

  inputName.value = nameElement.textContent;
  inputDescription.value = descriptionElement.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup__opened');
}

function submitForm(event) {
  event.preventDefault();
  nameElement.textContent = inputName.value;
  descriptionElement.textContent = inputDescription.value;
  popupElement.classList.remove('popup__opened');
  closePopup();
}
