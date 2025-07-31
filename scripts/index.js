const profileInfo = document.querySelector('.profile__content');
const elementContainer = document.querySelector('.elements');

const nameElement = profileInfo.querySelector('.profile__name');
const descriptionElement = profileInfo.querySelector('.profile__description');

const imagePopup = document.querySelector('#image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const titleImage = imagePopup.querySelector('.popup__image-title');

imagePopup.addEventListener('click', (event) => {
  const clickedOutside = !event.target.closest('.popup__container-image');
  if (clickedOutside) {
    closePopup(imagePopup);
  }
});

elementContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__icon')) {
    event.target.classList.toggle('element__icon-active');
  }

  if (event.target.classList.contains('element__trash')) {
    const cardRemove = event.target.closest('.element');
    cardRemove.remove();
  }

  const clickedImage = event.target.closest('.element__image');

  if (clickedImage) {
    const cardElement = clickedImage.closest('.element');
    const title = cardElement.querySelector('.element__title').textContent;

    popupImage.src = clickedImage.src;
    popupImage.alt = clickedImage.alt;
    titleImage.textContent = title;
    imagePopup.classList.add('popup__opened');
  }
});

profileInfo.addEventListener('click', (event) => {
  if (event.target.closest('.profile__add-button')) {
    openPopup('new-card');
  }

  if (event.target.closest('.profile__edit-button')) {
    openPopup('edit');
  }
});

function openPopup(type) {
  const popupElement = document.querySelector(`.popup[data-type="${type}"]`);

  if (type === 'edit') {
    const inputName = popupElement.querySelector('#name');
    const inputDescription = popupElement.querySelector('#description');
    inputName.value = nameElement.textContent;
    inputDescription.value = descriptionElement.textContent;
  } else {
    popupElement.querySelector('form').reset();
  }
  popupElement.classList.add('popup__opened');
}

document.querySelectorAll('.popup').forEach((popupElement) => {
  popupElement.addEventListener('click', (event) => {
    if (event.target === popupElement) {
      closePopup(popupElement);
    }
  });
});

function closePopup(popupElement) {
  popupElement.classList.remove('popup__opened');
}

function submitForm(event) {
  event.preventDefault();

  const form = event.target;
  const popupElement = form.closest('.popup');
  const type = popupElement.dataset.type;

  if (type === 'edit') {
    const inputName = popupElement.querySelector('#name');
    const inputDescription = popupElement.querySelector('#description');

    nameElement.textContent = inputName.value;
    descriptionElement.textContent = inputDescription.value;
    popupElement.classList.remove('popup__opened');
  }

  if (type === 'new-card') {
    const title = popupElement.querySelector('#titulo').value;
    const link = popupElement.querySelector('#url-link').value;

    const cardData = {
      name: title,
      link: link,
    };

    addCard(cardData);
  }

  closePopup(popupElement);
}

function addCard(card) {
  const cardTemplate = document.querySelector('#elements-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const img = cardElement.querySelector('.element__image');
  const titleElement = cardElement.querySelector('.element__title');

  img.src = card.link;
  img.alt = card.name;
  titleElement.textContent = card.name;

  elementContainer.prepend(cardElement);
}

const initialCards = [
  {
    name: 'Vale de Yosemite',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
  },
  {
    name: 'Lago Louise',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
  },
  {
    name: 'Montanhas Carecas',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
  },
  {
    name: 'Latemar',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
  },
  {
    name: 'Parque Nacional da Vanoise ',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
  },
  {
    name: 'Lago di Braies',
    link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
  },
];

initialCards.forEach(addCard);
