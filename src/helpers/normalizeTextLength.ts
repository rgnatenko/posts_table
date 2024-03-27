export const normalizeTextLength = (
  text: string,
  lengthLimit: number,
  textToAdd: string,
) => {
  if (text.split(' ').length > lengthLimit) {
    return text.split(' ').slice(0, lengthLimit).join(' ') + textToAdd;
  }

  return text;
};


