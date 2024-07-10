import {getRandomInteger, getRandomArrayElement, createId} from './util.js';

const names = [
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

const descriptions = [
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

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const ValueLikes = {
  MIN: 15,
  MAX: 200,
};

const ValueComments = {
  MIN: 0,
  MAX: 30,
};

const ValueAvatars = {
  MIN: 1,
  MAX: 6,
};

const MAX_VALUE_PHOTOS = 25;

const createIdUser = createId();

const createUsers = () => ({
  id: createIdUser(),
  avatar: `img/avatar-${getRandomInteger(ValueAvatars.MIN, ValueAvatars.MAX)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names),
});

const createPhotos = () => {
  const idGenerator = createId();
  const id = idGenerator();
  const url = `photos/${id}.jpg`;
  return {
    id,
    url,
    description: getRandomArrayElement(descriptions),
    likes: getRandomInteger(ValueLikes.MIN, ValueLikes.MAX),
    comments:  Array.from({length: getRandomInteger(ValueComments.MIN, ValueComments.MAX)}, createUsers)
  };
};


const photos = Array.from({length: MAX_VALUE_PHOTOS}, (_, index) => {
  const photo = createPhotos();
  photo.id = index + 1;
  photo.url = `photos/${photo.id}.jpg`;
  return photo;
});

export {photos};
