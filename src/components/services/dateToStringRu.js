'use strict';

export function dateToStringRu(date) {
  const dateString = date.toLocaleDateString('ru-RU');
  return dateString.slice(0, 7) + dateString.slice(9);
}
