'use strict';

export function currentDateToString () {
  const today = new Date();
  const dateString = today.toLocaleDateString('ru-RU');
  return dateString.slice(0, 7) + dateString.slice(9);
}
