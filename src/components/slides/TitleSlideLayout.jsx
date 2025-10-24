export default function TitleSlideLayout({ slide }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-indigo-600 overflow-hidden" style={{ backgroundColor: 'rgb(99, 102, 241)' }}>
      {/* Gradient overlay to match PPTX */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-600 to-indigo-700 opacity-100"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-16">
        {/* Title - matching PPTX positioning and size */}
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight" style={{ fontSize: '3rem' }}>
          {slide.title}
        </h1>

        {/* Content - matching PPTX positioning and size */}
        {slide.content && (
          <div 
            className="text-xl text-white text-opacity-100 leading-relaxed max-w-4xl mt-8"
            style={{ fontSize: '1.25rem' }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
          />
        )}
      </div>
    </div>
  );
}
