import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const presentationApi = {
  // Создание новой презентации
  create: async (data) => {
    const response = await api.post('/api/presentations', data);
    return response.data;
  },

  // Получение всех презентаций
  getAll: async () => {
    const response = await api.get('/api/presentations');
    return response.data;
  },

  // Получение презентации по ID
  getById: async (id) => {
    const response = await api.get(`/api/presentations/${id}`);
    return response.data;
  },

  // Удаление презентации
  delete: async (id) => {
    const response = await api.delete(`/api/presentations/${id}`);
    return response.data;
  },

  // Скачивание презентации в PPTX
  downloadPptx: async (id) => {
    const response = await api.get(`/api/presentations/${id}/download/pptx`, {
      responseType: 'blob'
    });
    return response;
  },

  // Обновление слайда
  updateSlide: async (slideId, data) => {
    const response = await api.patch(`/api/slides/${slideId}`, data);
    return response.data;
  },

  // Изменение порядка слайдов
  reorderSlides: async (presentationId, newOrder) => {
    const response = await api.patch(`/api/presentations/${presentationId}/reorder`, newOrder);
    return response.data;
  },

};

export default api;