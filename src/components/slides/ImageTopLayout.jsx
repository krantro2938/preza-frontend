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
        return `<div class="flex items-start mb-4"><span class="text-orange-500 font-bold mr-4 mt-1 text-lg">${bulletCount.toString().padStart(2, '0')}.</span><span class="text-gray-700 leading-relaxed">${content}</span></div>`;
      })
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Top Section - Image */}
      <div className="relative w-full h-2/5">
        {slide.image_url ? (
          <div className="relative w-full h-full">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white z-10"></div>
            
            <img
              src={slide.image_url}
              alt={slide.image_alt || slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-6 h-6 bg-orange-500 rounded-full opacity-80 z-20"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 bg-red-500 rounded-full opacity-60 z-20"></div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-orange-600 opacity-60 text-8xl">🎯</div>
          </div>
        )}
      </div>

      {/* Bottom Section - Content */}
      <div className="relative z-20 h-3/5 px-12 lg:px-20 py-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {slide.title}
          </h1>

          {/* Orange accent line - centered */}
          <div className="w-20 h-1 bg-orange-500 mb-8 rounded-full mx-auto"></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="text-lg leading-relaxed max-w-4xl mx-auto text-left"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>

        {/* Background Pattern */}
        <div className="absolute bottom-0 right-0 w-64 h-32 opacity-5 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 200 100" fill="none">
            <path d="M0 50C50 0 100 100 150 50C175 25 200 50 200 50V100H0V50Z" fill="#f97316" />
            <path d="M0 75C75 25 125 125 200 75V100H0V75Z" fill="#dc2626" />
          </svg>
        </div>
      </div>
    </div>
  );
}