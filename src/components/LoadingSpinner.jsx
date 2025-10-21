import { Sparkles } from 'lucide-react';

export default function LoadingSpinner({ message = "Загрузка..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <div className="relative">
        {/* Animated background circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-primary-200 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-t-primary-500 border-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Center icon */}
        <div className="relative z-10 w-20 h-20 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-primary-500 animate-bounce" />
        </div>
      </div>
      
      <p className="mt-6 text-lg font-medium text-gray-700 animate-pulse">
        {message}
      </p>
      
      {/* Dots animation */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}