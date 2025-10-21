const USER_PRESENTATIONS_KEY = 'user_presentations';

export const localStorageUtils = {
  // Получение списка презентаций пользователя
  getUserPresentations: () => {
    try {
      const stored = localStorage.getItem(USER_PRESENTATIONS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Ошибка чтения localStorage:', error);
      return [];
    }
  },

  // Добавление презентации пользователя
  addUserPresentation: (presentationId) => {
    try {
      const presentations = localStorageUtils.getUserPresentations();
      if (!presentations.includes(presentationId)) {
        presentations.push(presentationId);
        localStorage.setItem(USER_PRESENTATIONS_KEY, JSON.stringify(presentations));
      }
    } catch (error) {
      console.error('Ошибка записи в localStorage:', error);
    }
  },

  // Удаление презентации пользователя
  removeUserPresentation: (presentationId) => {
    try {
      const presentations = localStorageUtils.getUserPresentations();
      const filteredPresentations = presentations.filter(id => id !== presentationId);
      localStorage.setItem(USER_PRESENTATIONS_KEY, JSON.stringify(filteredPresentations));
    } catch (error) {
      console.error('Ошибка записи в localStorage:', error);
    }
  },

  // Проверка, является ли презентация пользовательской
  isUserPresentation: (presentationId) => {
    const userPresentations = localStorageUtils.getUserPresentations();
    return userPresentations.includes(presentationId);
  },

  // Очистка всех пользовательских презентаций
  clearUserPresentations: () => {
    try {
      localStorage.removeItem(USER_PRESENTATIONS_KEY);
    } catch (error) {
      console.error('Ошибка очистки localStorage:', error);
    }
  },
};