export default function ContentSlideLayout({ slide }) {
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
        return `<div class="flex items-start mb-4"><span class="text-primary-500 font-bold mr-4 mt-1 text-lg">${bulletCount.toString().padStart(2, '0')}.</span><span class="text-gray-700 leading-relaxed">${content}</span></div>`;
      })
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Decorative Wave Patterns */}
      <div className="absolute top-0 left-0 w-64 h-full opacity-5 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none">
          <path d="M0 100C50 150 100 50 150 100C175 125 200 100 200 100V0H0V100Z" fill="#6366f1" opacity="0.3" />
          <path d="M0 200C75 250 125 150 200 200V150C150 175 100 150 50 175L0 200Z" fill="#6366f1" opacity="0.2" />
        </svg>
      </div>

      <div className="absolute top-0 right-0 w-64 h-full opacity-5 overflow-hidden transform scale-x-[-1]">
        <svg className="w-full h-full" viewBox="0 0 200 400" fill="none">
          <path d="M0 100C50 150 100 50 150 100C175 125 200 100 200 100V0H0V100Z" fill="#6366f1" opacity="0.3" />
          <path d="M0 200C75 250 125 150 200 200V150C150 175 100 150 50 175L0 200Z" fill="#6366f1" opacity="0.2" />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full px-12 lg:px-20 py-12">
        {/* Left Section - Image */}
        {slide.image_url && (
          <div className="flex-1 flex items-center justify-center pr-12">
            {/* Grid Pattern Background */}
            <div className="absolute left-12 top-12 w-96 h-96 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <defs>
                  <pattern id="content-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#content-grid)" />
              </svg>
            </div>

            <div className="relative z-20 w-full max-w-lg">
              {/* Image Container with Shadow */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                  <img
                    src={slide.image_url}
                    alt={slide.image_alt || slide.title}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500 rounded-full opacity-60"></div>
            </div>
          </div>
        )}

        {/* Right Section - Content */}
        <div className={`flex-1 flex flex-col justify-center ${slide.image_url ? 'pl-12' : 'text-center'}`}>
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {slide.title}
          </h1>

          {/* Purple accent line */}
          <div className="w-20 h-1 bg-primary-500 mb-8 rounded-full"></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}

          {/* Decorative Quote Mark */}
          <div className="absolute bottom-8 right-12 text-6xl text-primary-500 opacity-20 font-serif">
            "
          </div>
        </div>
      </div>
    </div>
  );
}