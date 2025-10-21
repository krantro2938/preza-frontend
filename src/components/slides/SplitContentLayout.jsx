export default function SplitContentLayout({ slide, slideNumber }) {
  const renderBulletPoints = (text) => {
    if (!text) return [];
    
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .slice(0, 4); // Max 4 bullets for this layout
  };

  const bullets = renderBulletPoints(slide.content);

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Title spanning full width */}
      <div className="absolute top-0 left-0 right-0 z-20 px-12 pt-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center">
          {slide.title}
        </h1>
        <div className="w-16 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="relative z-10 grid grid-cols-3 gap-8 h-full px-8 py-20">
        {/* Left Column - Bullets */}
        <div className="flex flex-col justify-center space-y-6">
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-sm leading-relaxed text-gray-700">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Center Column - Image */}
        <div className="flex items-center justify-center">
          {slide.image_url ? (
            <div className="relative w-full">
              <img
                src={slide.image_url}
                alt={slide.image_alt || slide.title}
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
              <div className="text-green-600 opacity-60 text-6xl">📊</div>
            </div>
          )}
        </div>

        {/* Right Column - Description */}
        <div className="flex flex-col justify-center">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {(() => {
                if (!slide.content) return 'Основные выводы и рекомендации по данной теме.';
                const nonBulletLines = slide.content.split('\n')
                  .filter(line => !line.trim().startsWith('-') && line.trim().length > 0);
                const keyInsights = nonBulletLines.slice(-1)[0];
                return keyInsights || 'Стратегические выводы и основные рекомендации по этому разделу.';
              })()
              }
            </p>
            
            {/* Decorative Elements */}
            <div className="mt-6 flex space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-tr from-green-500 to-emerald-500 transform rotate-45"></div>
      </div>
      
      <div className="absolute top-1/3 right-0 w-24 h-24 opacity-5">
        <div className="w-full h-full bg-gradient-to-bl from-emerald-500 to-green-500 rounded-full"></div>
      </div>
    </div>
  );
}