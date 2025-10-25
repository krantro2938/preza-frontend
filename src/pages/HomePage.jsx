import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Loader2, FileText, Eye } from 'lucide-react';
import { presentationApi } from '../services/api';
import { localStorageUtils } from '../utils/localStorage';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() {
  const [topic, setTopic] = useState('');
  const [slidesCount, setSlidesCount] = useState(5);
  const [style, setStyle] = useState('minimal');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      setError('Пожалуйста, введите тему презентации');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const presentation = await presentationApi.create({
        topic: topic.trim(),
        slides_count: slidesCount,
        style: style,
      });

      // Сохраняем ID презентации в localStorage
      localStorageUtils.addUserPresentation(presentation.id);
      
      // Переходим к просмотру презентации
      navigate(`/presentation/${presentation.id}`);
    } catch (err) {
      console.error('Ошибка создания презентации:', err);
      setError(
        err.response?.data?.detail || 
        'Произошла ошибка при создании презентации. Попробуйте еще раз.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewAll = () => {
    navigate('/presentations');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Создайте презентацию с помощью ИИ
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Просто опишите тему, и наш ИИ создаст профессиональную презентацию 
          с подходящими изображениями и структурированным контентом
        </p>
        
        <button
          onClick={handleViewAll}
          className="btn-secondary mb-8 inline-flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>Посмотреть все презентации</span>
        </button>
      </div>

      {/* Main Form */}
      <div className="card max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
              Тема презентации
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="input h-24 resize-none"
              placeholder="Опишите тему вашей презентации, например: 'Искусственный интеллект в медицине' или 'Маркетинговая стратегия для стартапа'"
              disabled={loading}
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Slides Count */}
            <div>
              <label htmlFor="slides-count" className="block text-sm font-medium text-gray-700 mb-2">
                Количество слайдов
              </label>
              <select
                id="slides-count"
                value={slidesCount}
                onChange={(e) => setSlidesCount(parseInt(e.target.value))}
                className="input"
                disabled={loading}
              >
                <option value={3}>3 слайда</option>
                <option value={5}>5 слайдов</option>
                <option value={8}>8 слайдов</option>
                <option value={10}>10 слайдов</option>
                <option value={15}>15 слайдов</option>
                <option value={20}>20 слайдов</option>
              </select>
            </div>

            {/* Style */}
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-2">
                Стиль презентации
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="input"
                disabled={loading}
              >
                <option value="minimal">Минималистичный</option>
                <option value="professional">Профессиональный</option>
                <option value="creative">Креативный</option>
                <option value="academic">Академический</option>
                <option value="dark">Тёмный</option>
              </select>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          {loading ? (
            <LoadingSpinner message="Создание презентации..." />
          ) : (
            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Создать презентацию</span>
            </button>
          )}
        </form>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Структурированный контент
          </h3>
          <p className="text-sm text-gray-600">
            ИИ создает логично структурированные слайды с заголовками и ключевыми пунктами
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Eye className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Подходящие изображения
          </h3>
          <p className="text-sm text-gray-600">
            Автоматический подбор качественных изображений из Unsplash для каждого слайда
          </p>
        </div>
        
        <div className="text-center">
          <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Play className="w-6 h-6 text-primary-500" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Готово к показу
          </h3>
          <p className="text-sm text-gray-600">
            Минималистичный дизайн, который выглядит профессионально на любом экране
          </p>
        </div>
      </div>
    </div>
  );
}