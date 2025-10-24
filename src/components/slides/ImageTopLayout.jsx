export default function ImageTopLayout({ slide, slideNumber }) {
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
        return `<div class="flex items-start mb-4"><span class="text-amber-500 font-bold mr-3 text-md">${bulletCount.toString().padStart(2, '0')}.</span><span class="text-gray-700 text-md">${content}</span></div>`;
      })
      .replace(/\n/g, '');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Top Section - Image (full width, no padding) */}
      <div className="relative w-full" style={{ height: '42.67%' }}>
        {slide.image_url ? (
          <img
            src={slide.image_url}
            alt={slide.image_alt || slide.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-orange-600 opacity-60 text-8xl">🎯</div>
          </div>
        )}
      </div>

      {/* Bottom Section - Content */}
      <div className="relative z-20" style={{ height: '57.33%', padding: '5.07% 7.5% 0' }}>
        <div className="text-center max-w-5xl mx-auto">
          {/* Title */}
          <h1 className="font-bold text-gray-900 mb-4 leading-tight" style={{ fontSize: '2rem' }}>
            {slide.title}
          </h1>

          {/* Orange accent line - centered */}
          <div className="h-1 bg-amber-500 rounded-full mx-auto mb-6" style={{ width: '90px' }}></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="leading-relaxed max-w-4xl mx-auto"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
