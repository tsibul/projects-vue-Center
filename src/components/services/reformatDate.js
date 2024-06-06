'use strict';

export function stringToDate(string){
  let dateString;
  if (string) {
    const dateParts = string.split('.');
    dateString = `20${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }
  return dateString;
}

