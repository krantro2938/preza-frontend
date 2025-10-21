export default function ImageRightLayout({ slide, slideNumber }) {
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/### (.*?)\n/g, '<h3 class="text-lg font-semibold mb-3 text-gray-800">$1</h3>')
      .replace(/## (.*?)\n/g, '<h2 class="text-xl font-semibold mb-4 text-gray-800">$1</h2>')
      .replace(/# (.*?)\n/g, '<h1 class="text-2xl font-bold mb-4 text-gray-900">$1</h1>')
      .replace(/- (.*?)(?=\n|$)/g, '<div class="flex items-start mb-4"><div class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-4 flex-shrink-0"></div><span class="text-gray-700 leading-relaxed">$1</span></div>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex h-full px-12 lg:px-20 py-12">
        {/* Left Section - Content */}
        <div className="flex-1 flex flex-col justify-center pr-12">
          {/* Title */}
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {slide.title}
          </h1>

          {/* Purple accent line */}
          <div className="w-20 h-1 bg-purple-500 mb-8 rounded-full"></div>

          {/* Content */}
          {slide.content && (
            <div 
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>

        {/* Right Section - Image */}
        {slide.image_url && (
          <div className="flex-1 flex items-center justify-center pl-12">
            <div className="relative w-full max-w-lg">
              {/* Image Container with Shadow */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                  <img
                    src={slide.image_url}
                    alt={slide.image_alt || slide.title}
                    className="w-full h-80 object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-500 rounded-full opacity-80"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-blue-500 rounded-full opacity-60"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}