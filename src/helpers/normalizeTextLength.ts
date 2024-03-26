export const normalizeTextLength = (text: string) => {
  return text.split(' ').length > 5
    ? text.split(' ').slice(0, 5).join(' ') + '...'
    : text;
};
