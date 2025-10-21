export default function TextOnlyLayout({ slide, slideNumber }) {
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
        return `<div class="flex items-start mb-4"><span class="text-blue-500 font-bold mr-4 mt-1 text-lg">${bulletCount.toString().padStart(2, '0')}.</span><span class="text-gray-700 leading-relaxed">${content}</span></div>`;
      })
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="url(#gradient)" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center h-full px-12 lg:px-20 py-12">
        <div className="text-center max-w-4xl">
          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {slide.title}
          </h1>

          {/* Blue accent line - centered */}
          <div className="w-24 h-1 bg-blue-500 mb-12 rounded-full mx-auto"></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="text-xl leading-relaxed max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}

          {/* Decorative Elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full opacity-60"></div>
          <div className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-cyan-500 rounded-full opacity-40"></div>
        </div>
      </div>
    </div>
  );
}