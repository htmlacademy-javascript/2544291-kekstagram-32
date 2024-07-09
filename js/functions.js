// Функция для проверки длины строки.

const checkString = (string, numberOfSymbols) => string.length <= numberOfSymbols ? 'Строка меньше или равна' : 'Строка больше';

checkString('проверяемая строка', 20);

// Функция для проверки, является ли строка палиндромом.

function checkPalindrom(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString ? 'Строка является палиндромом' : 'Строка не является палиндромом';
}

checkPalindrom('Лёша на полке клопа нашёл ');

// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9
// и возвращает их в виде целого положительного числа.
// Если в строке нет ни одной цифры, функция должна вернуть NaN

const extractNumbers = (input) => {
  if (typeof input === 'number') {
    input = input.toString();
  }

  const numbers = '0123456789';
  let newString = '';

  for (let i = 0; i < input.length; i++) {
    if (numbers.includes(input[i])) {
      newString += input[i];
    }
  }

  const result = parseInt(newString, 10);

  if (Number.isNaN(result) || result <= 0) {
    return NaN;
  }
  return result;
};

extractNumbers('1 кефир, 0.5 батона');
