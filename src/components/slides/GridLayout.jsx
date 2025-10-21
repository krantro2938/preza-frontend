export default function GridLayout({ slide, slideNumber }) {
  const renderBulletPoints = (text) => {
    if (!text) return [];
    
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .slice(0, 4); // Max 4 boxes for grid
  };

  const bullets = renderBulletPoints(slide.content);

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ef4444" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {slide.title}
        </h1>
        <div className="w-20 h-1 bg-red-500 mx-auto rounded-full"></div>
      </div>

      {/* Grid Content */}
      <div className="relative z-10 px-12 pb-12">
        <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto">
          {bullets.map((bullet, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Card */}
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-red-500 shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[200px] flex flex-col justify-center">
                {/* Decorative Corner */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-red-500 rounded-full"></div>
                
                {/* Content */}
                <div className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm mb-4 mx-auto">
                    {index + 1}
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed text-base">
                    {bullet}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              </div>

              {/* Shadow Effect */}
              <div className="absolute inset-0 bg-red-500 rounded-2xl -z-10 transform translate-x-1 translate-y-1 opacity-20"></div>
            </div>
          ))}

          {/* Fill remaining spots if less than 4 bullets */}
          {Array.from({ length: Math.max(0, 4 - bullets.length) }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="bg-gray-100 rounded-2xl p-8 border-2 border-dashed border-gray-300 min-h-[200px] flex items-center justify-center opacity-30"
            >
              <div className="text-gray-400 text-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <p className="text-sm">Содержимое</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-8 w-6 h-6 bg-red-500 rounded-full opacity-60"></div>
      <div className="absolute bottom-1/4 left-8 w-4 h-4 bg-red-400 rounded-full opacity-40"></div>
      
      {/* Corner Decoration */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10">
        <div className="w-full h-full bg-gradient-to-tl from-red-500 to-pink-500 transform rotate-45 translate-x-16 translate-y-16"></div>
      </div>
    </div>
  );
}