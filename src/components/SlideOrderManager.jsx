import { useState, useEffect } from 'react';
import { X, Save, GripVertical, Lock } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableSlideItem({ slide, index, isFirst }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: slide.id,
    disabled: isFirst // Disable dragging for first slide (title)
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 rounded-lg border transition-colors ${
        isFirst 
          ? 'bg-gray-100 border-gray-300 cursor-not-allowed' 
          : isDragging
          ? 'bg-primary-50 border-primary-300 shadow-lg'
          : 'bg-gray-50 border-gray-200 hover:border-primary-300'
      }`}
    >
      {/* Drag Handle or Lock Icon */}
      <div
        {...attributes}
        {...listeners}
        className={`flex-shrink-0 ${
          isFirst ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'
        }`}
      >
        {isFirst ? (
          <Lock className="w-5 h-5 text-gray-400" />
        ) : (
          <GripVertical className="w-5 h-5 text-gray-400" />
        )}
      </div>
      
      {/* Slide Number */}
      <div className={`flex items-center justify-center w-8 h-8 font-bold rounded-full text-sm flex-shrink-0 ${
        isFirst ? 'bg-gray-400 text-white' : 'bg-primary-500 text-white'
      }`}>
        {index + 1}
      </div>
      
      {/* Slide Title */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">
          {slide.title}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {isFirst ? 'Титульный слайд (не перемещается)' : 'Контентный слайд'}
        </p>
      </div>
    </div>
  );
}

export default function SlideOrderManager({ presentation, isOpen, onClose, onSave }) {
  const [slides, setSlides] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Reset slides when modal opens or presentation changes
  useEffect(() => {
    if (isOpen && presentation?.slides) {
      setSlides([...presentation.slides].sort((a, b) => a.slide_number - b.slide_number));
    }
  }, [isOpen, presentation]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // Prevent moving to/from position 0 (title slide)
        if (oldIndex === 0 || newIndex === 0) {
          return items;
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Create new order mapping (slide_id -> new_slide_number)
      const newOrder = slides.map((slide, index) => ({
        id: slide.id,
        slide_number: index + 1
      }));
      
      await onSave(newOrder);
      onClose();
    } catch (error) {
      console.error('Error saving slide order:', error);
      alert('Не удалось сохранить порядок слайдов');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Изменить порядок слайдов
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Перетащите слайды за значок захвата
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={slides.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {slides.map((slide, index) => (
                    <SortableSlideItem
                      key={slide.id}
                      slide={slide}
                      index={index}
                      isFirst={index === 0}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Сохранение...' : 'Сохранить порядок'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
