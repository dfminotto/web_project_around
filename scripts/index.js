const profileInfo = document.querySelector('.profile__content');
const elementContainer = document.querySelector('.elements');

const nameElement = profileInfo.querySelector('.profile__name');
const descriptionElement = profileInfo.querySelector('.profile__description');

function openPopup(type) {
  const popupElement = document.querySelector(`.popup[data-type="${type}"]`);

  if (type === 'edit') {
    const inputName = popupElement.querySelector('#name');
    const inputDescription = popupElement.querySelector('#description');
    popupElement.classList.add('popup__opened');
    inputName.value = nameElement.textContent;
    inputDescription.value = descriptionElement.textContent;
  } else {
    popupElement.querySelector('form').reset();
  }
  popupElement.classList.add('popup__opened');
}

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

    const addCard = (card) => {
      const cardTemplate = document.querySelector('#elements-template').content;
      const cardElement = cardTemplate.cloneNode(true);

      const img = cardElement.querySelector('.element__image');
      const titleEl = cardElement.querySelector('.element__title');

      img.src = card.link;
      img.alt = `Imagem de ${card.name}`;
      titleEl.textContent = card.name;

      elementContainer.prepend(cardElement);
    };
    addCard(cardData);
  }

  closePopup(popupElement);
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

initialCards.forEach((card) => {
  const cardTemplate = document.querySelector('#elements-template').content;
  const cardElement = cardTemplate.cloneNode(true);

  const img = cardElement.querySelector('.element__image');
  const title = cardElement.querySelector('.element__title');

  img.src = card.link;
  img.alt = `Imagem de ${card.name}`;
  title.textContent = card.name;

  elementContainer.append(cardElement);
});
