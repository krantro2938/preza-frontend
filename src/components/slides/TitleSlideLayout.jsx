import { Sparkles } from 'lucide-react';

export default function TitleSlideLayout({ slide }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-12 lg:px-20">
        {/* Sparkle Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {slide.title}
        </h1>

        {/* Purple accent line */}
        <div className="w-24 h-1 bg-white bg-opacity-60 mb-8 rounded-full"></div>

        {/* Content */}
        {slide.content && (
          <div 
            className="text-xl lg:text-2xl text-white text-opacity-90 leading-relaxed max-w-4xl"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
          />
        )}

        {/* Bottom decoration */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
            <div className="w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
            <div className="w-2 h-2 bg-white bg-opacity-20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}