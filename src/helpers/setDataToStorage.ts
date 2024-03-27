export const setDataToStorage = <T>(nameInStorage: string, data: T) => {
  localStorage.setItem(nameInStorage, JSON.stringify(data));
};
