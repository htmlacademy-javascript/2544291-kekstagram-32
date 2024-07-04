const NAMES = [
  'Александр',
  'Екатерина',
  'Михаил',
  'Анна',
  'Дмитрий',
  'София',
  'Иван',
  'Анастасия',
  'Константин',
  'Виктория',
  'Сергей',
  'Елена',
  'Павел',
  'Анатолий',
  'Артем',
  'Наталья',
  'Андрей',
  'Юлия',
  'Максим',
  'Мария',
  'Владимир',
  'Ирина',
  'Николай',
  'Татьяна',
  'Станислав',
];

const DESCRIPTIONS = [
  'Закат на пляже',
  'Цветущие сакуры в парке',
  'Горный пейзаж с облаками',
  'Архитектурные детали старого города',
  'Роскошный вид на городской небоскреб',
  'Играющие дети на лужайке',
  'Пикник на лоне природы',
  'Разноцветные воздушные шары на фестивале',
  'Дикие животные в своем естественном местообитании',
  'Граффити на стене',
  'Собрание цветов в ботаническом саду',
  'Заснеженный лес зимой',
  'Вдохновляющий вид с горы',
  'Уютный интерьер кафе',
  'Парад ярких костюмов на карнавале',
  'Интересный уличный арт',
  'Эмоциональный концерт в ночном клубе',
  'Блестящие небоскребы в деловом центре',
  'Застывшие капли дождя на стекле',
  'Феерический закат в горах',
  'Приглашающий вид ресторана на берегу',
  'Динамичный городской пейзаж',
  'Таинственный лесной уголок',
  'Магический взгляд звездного неба в пустыне',
  'Пленительные водопады в тропическом лесу',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const MAX_VALUE_PHOTOS = 25;

const VALUE_LIKES = {
  min: 15,
  max: 200,
};

const VALUE_COMMENTS = {
  min: 0,
  max: 30,
};

const VALUE_AVATARS = {
  min: 1,
  max: 6,
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createId = () => {
  let counter = 0;
  return () => {
    counter++;
    return counter;
  };
};

const createIdUser = createId();

const createUsers = () => ({
  id: createIdUser(),
  avatar: `img/avatar-${getRandomInteger(VALUE_AVATARS.min, VALUE_AVATARS.max)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotos = () => {
  const idGenerator = createId();
  const id = idGenerator();
  const url = `photos/${id}.jpg`;
  return {
    id,
    url,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(VALUE_LIKES.min, VALUE_LIKES.max),
    comments:  Array.from({length: getRandomInteger(VALUE_COMMENTS.min, VALUE_COMMENTS.max)}, createUsers)
  };
};

const photosArr = Array.from({length: MAX_VALUE_PHOTOS}, (_, index) => {
  const photo = createPhotos();
  photo.id = index + 1;
  photo.url = `photos/${photo.id}.jpg`;
  return photo;
});

// eslint-disable-next-line no-console
console.log(photosArr);
