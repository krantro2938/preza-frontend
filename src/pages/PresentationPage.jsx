import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowLeft, Home, Monitor, FileText, DownloadIcon, Edit, List } from 'lucide-react';
import { presentationApi } from '../services/api';
import SlideRenderer from '../components/slides/SlideRenderer';
import SlideEditor from '../components/SlideEditor';
import SlideOrderManager from '../components/SlideOrderManager';

export default function PresentationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [presentation, setPresentation] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    loadPresentation();
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'Escape') {
        setFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, presentation]);

  const loadPresentation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await presentationApi.getById(id);
      setPresentation(data);
    } catch (err) {
      console.error('Ошибка загрузки презентации:', err);
      setError('Презентация не найдена');
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (presentation && currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
    if (!fullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleDownloadPptx = async () => {
    try {
      const response = await presentationApi.downloadPptx(id);
      
      // Create blob from response
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${presentation.topic.replace(/[^a-zA-Z0-9а-яёА-ЯЁ]/g, '_')}.pptx`;
      
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

  const handleSaveSlide = async (slideData) => {
    try {
      await presentationApi.updateSlide(currentSlideData.id, slideData);
      // Reload presentation to get updated data
      await loadPresentation();
    } catch (err) {
      console.error('Ошибка сохранения слайда:', err);
      throw err;
    }
  };

  const handleSaveOrder = async (newOrder) => {
    try {
      await presentationApi.reorderSlides(id, newOrder);
      // Reset to first slide and reload
      setCurrentSlide(0);
      await loadPresentation();
    } catch (err) {
      console.error('Ошибка сохранения порядка:', err);
      throw err;
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Загрузка презентации...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{error}</h1>
          <div className="space-x-4">
            <button onClick={() => navigate('/')} className="btn-primary">
              На главную
            </button>
            <button onClick={() => navigate('/presentations')} className="btn-secondary">
              Все презентации
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!presentation) {
    return null;
  }

  const currentSlideData = presentation.slides.find(s => s.slide_number === currentSlide + 1) || presentation.slides[0];

  return (
    <div className={`${fullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-white`}>
      {/* Navigation Bar */}
      {!fullscreen && (
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/presentations')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="font-semibold text-gray-900 truncate max-w-md">
                {presentation.topic}
              </h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Редактировать слайд"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsReordering(true)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Изменить порядок слайдов"
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={handleDownloadPptx}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Скачать PPTX"
              >
                <DownloadIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="На главную"
              >
                <Home className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Полноэкранный режим"
              >
                <Monitor className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <SlideRenderer slide={currentSlideData} layoutOrder={presentation.layout_order} style={presentation.style} />
        </div>

        {/* Slide Navigation */}
        <div className="mt-8 flex items-center space-x-4">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-2">
            {presentation.slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index 
                    ? 'bg-primary-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === presentation.slides.length - 1}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Слайд {currentSlide + 1} из {presentation.slides.length}
        </p>
      </div>

      {/* Fullscreen controls */}
      {fullscreen && (
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={toggleFullscreen}
            className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <Monitor className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slide Editor Modal */}
      <SlideEditor
        slide={currentSlideData}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        onSave={handleSaveSlide}
      />

      {/* Slide Order Manager Modal */}
      <SlideOrderManager
        presentation={presentation}
        isOpen={isReordering}
        onClose={() => setIsReordering(false)}
        onSave={handleSaveOrder}
      />
    </div>
  );
}
