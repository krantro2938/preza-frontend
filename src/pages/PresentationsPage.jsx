import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Calendar, Layers, User, ArrowLeft, Trash2, FileText, DownloadIcon } from 'lucide-react';
import { presentationApi } from '../services/api';
import { localStorageUtils } from '../utils/localStorage';

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'my'
  
  const navigate = useNavigate();

  useEffect(() => {
    loadPresentations();
  }, []);

  const loadPresentations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await presentationApi.getAll();
      setPresentations(data);
    } catch (err) {
      console.error('Ошибка загрузки презентаций:', err);
      setError('Не удалось загрузить презентации');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (presentationId) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту презентацию?')) {
      return;
    }

    try {
      await presentationApi.delete(presentationId);
      localStorageUtils.removeUserPresentation(presentationId);
      await loadPresentations();
    } catch (err) {
      console.error('Ошибка удаления презентации:', err);
      alert('Не удалось удалить презентацию');
    }
  };

  const handleDownloadPptx = async (presentationId, topic) => {
    try {
      const response = await presentationApi.downloadPptx(presentationId);
      
      // Create blob from response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${topic.replace(/[^a-zA-Z0-9а-яёА-ЯЁ]/g, '_')}.pptx`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      alert('Не удалось скачать презентацию');
    }
  };


  const filteredPresentations = presentations.filter(presentation => {
    if (filter === 'my') {
      return localStorageUtils.isUserPresentation(presentation.id);
    }
    return true;
  });

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка презентаций...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={loadPresentations}
            className="mt-4 btn-primary"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900">
            Все презентации
          </h1>
        </div>
        
        {/* Filter */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Все презентации
          </button>
          <button
            onClick={() => setFilter('my')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'my' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Мои презентации
          </button>
        </div>
      </div>

      {filteredPresentations.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Layers className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {filter === 'my' ? 'У вас пока нет презентаций' : 'Презентации не найдены'}
          </h3>
          <p className="text-gray-500 mb-6">
            {filter === 'my' 
              ? 'Создайте вашу первую презентацию с помощью ИИ'
              : 'Пока что никто не создал ни одной презентации'
            }
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Создать презентацию
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPresentations.map((presentation) => {
            const isUserPresentation = localStorageUtils.isUserPresentation(presentation.id);
            
            return (
              <div key={presentation.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                    {presentation.topic}
                  </h3>
                  
                  {isUserPresentation && (
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4 text-primary-500" />
                      {filter === 'all' && (
                        <button
                          onClick={() => handleDelete(presentation.id)}
                          className="p-1 text-red-500 hover:text-red-600 transition-colors"
                          title="Удалить презентацию"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Layers className="w-4 h-4" />
                    <span>{presentation.slides_count} слайдов</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(presentation.created_at)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {presentation.style}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownloadPptx(presentation.id, presentation.topic)}
                      className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                      title="Скачать PPTX"
                    >
                      <DownloadIcon className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => navigate(`/presentation/${presentation.id}`)}
                      className="btn-primary btn-sm inline-flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Просмотр</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}