export default function TitleSlideLayout({ slide, theme }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`relative w-full h-full ${theme.title.bg} overflow-hidden`} style={{ backgroundColor: theme.title.bgRgb }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 opacity-95"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-16">
        {/* Title - matching PPTX positioning and size */}
        <h1 className={`text-5xl font-bold ${theme.title.text} mb-6 leading-tight`} style={{ fontSize: '3rem' }}>
          {slide.title}
        </h1>

        {/* Content - matching PPTX positioning and size */}
        {slide.content && (
          <div 
            className={`text-xl ${theme.title.text} text-opacity-100 leading-relaxed max-w-4xl mt-8`}
            style={{ fontSize: '1rem' }}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
          />
        )}
      </div>
    </div>
  );
}
