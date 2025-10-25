export default function ContentSlideLayout({ slide, theme }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    let bulletCount = 0;
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mb-3 text-gray-800">$1</h3>')
      .replace(/## (.*?)\n/g, '<h2 class="text-xl font-semibold mb-4 text-gray-800">$1</h2>')
      .replace(/# (.*?)\n/g, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
      .replace(/- (.*?)(?=\n|$)/g, (match, content) => {
        bulletCount++;
        return `<div class="flex items-start mb-4"><span class="${theme.content.bullet} font-bold mr-3 text-md">${bulletCount.toString().padStart(2, '0')}.</span><span class="${theme.content.text} leading-relaxed text-md">${content}</span></div>`;
      })
      .replace(/\n/g, '');
  };

  return (
    <div className={`relative w-full h-full ${theme.content.bg} overflow-hidden`}>
      {/* Main Content */}
      <div className="relative z-10 flex h-full" style={{ padding: '2.5% 3%' }}>
        {/* Left Section - Image */}
        {slide.image_url && (
          <div className="flex items-center justify-start" style={{ width: '46.5%', paddingRight: '5%' }}>
            <div className="relative w-full">
              {/* White container with border and shadow - matching PPTX */}
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200" style={{ padding: '2.4%' }}>
                <img
                  src={slide.image_url}
                  alt={slide.image_alt || slide.title}
                  className="w-full object-cover rounded-xl"
                  style={{ height: '280px' }}
                />
              </div>

              {/* Decorative circles - matching PPTX positioning */}
              <div 
                className={`absolute w-3 h-3 rounded-full`}
                style={{ top: '-0.5%', right: '-0.8%', backgroundColor: theme.content.accentRgb }}
              ></div>
              <div 
                className="absolute w-2.5 h-2.5 bg-purple-600 rounded-full"
                style={{ bottom: '-0.8%', left: '-0.5%' }}
              ></div>
            </div>
          </div>
        )}

        {/* Right Section - Content */}
        <div className={`flex flex-col justify-center ${slide.image_url ? '' : 'text-center mx-auto'}`} style={{ width: slide.image_url ? '48.5%' : '100%', maxWidth: slide.image_url ? 'none' : '85%' }}>
          {/* Title */}
          <h1 className={`font-bold ${theme.content.text} mb-4 leading-tight`} style={{ fontSize: '2.25rem' }}>
            {slide.title}
          </h1>

          {/* Accent line - matching PPTX */}
          <div className={`h-1 ${theme.content.line} mb-6 rounded-full`} style={{ width: '90px' }}></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
