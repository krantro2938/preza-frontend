import { getProxiedImageUrl } from '../../utils/imageProxy';

export default function SplitContentLayout({ slide, slideNumber, theme }) {
  const renderBulletPoints = (text) => {
    if (!text) return [];
    
    return text
      .split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^-\s*/, '').trim())
      .slice(0, 4); // Max 4 bullets for this layout
  };

  const bullets = renderBulletPoints(slide.content);
  
  // Get key insights text
  const getKeyInsights = () => {
    if (!slide.content) return 'Основные выводы и рекомендации по данной теме.';
    const nonBulletLines = slide.content.split('\n')
      .filter(line => !line.trim().startsWith('-') && line.trim().length > 0);
    return nonBulletLines.slice(-1)[0] || 'Стратегические выводы и основные рекомендации по этому разделу.';
  };

  return (
    <div className={`relative w-full h-full ${theme.content.bg} overflow-hidden`}>
      {/* Title spanning full width */}
      <div className="absolute top-0 left-0 right-0 z-20 mb-6" style={{ padding: '3.75% 3.75% 0' }}>
        <h1 className={`text-center font-bold ${theme.content.text} mb-3`} style={{ fontSize: '1.75rem' }}>
          {slide.title}
        </h1>
        <div className={`h-1 ${theme.content.line} mx-auto rounded-full`} style={{ width: '100px', marginTop: '2.67%' }}></div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="relative z-10 flex h-full mt-6" style={{ padding: '13.33% 2.25% 0' }}>
        {/* Left Column - Bullets (28.5% width) */}
        <div className="flex flex-col justify-start" style={{ width: '33%', paddingRight: '2%' }}>
          {bullets.map((bullet, index) => (
            <div key={index} className="flex items-start mb-5">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ marginTop: '0.4rem', marginRight: '0.75rem', backgroundColor: theme.content.accentRgb }}></div>
              <span className={`${theme.content.text}`} style={{ fontSize: '0.8125rem' }}>{bullet}</span>
            </div>
          ))}
        </div>

        {/* Center Column - Image (32.5% width) */}
        <div className="flex  justify-center" style={{ width: '33%', paddingLeft: '1.5%', paddingRight: '1.5%' }}>
          {slide.image_url ? (
            <div className="relative w-full">
              {/* Image container with rounded border and shadow */}
              <div className="relative bg-white rounded-xl shadow-lg border border-gray-300" style={{ padding: '2.3%' }}>
                <img
                  src={getProxiedImageUrl(slide.image_url)}
                  alt={slide.image_alt || slide.title}
                  className="w-full object-cover rounded-lg"
                  style={{ height: '220px' }}
                />
              </div>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center" style={{ height: '280px' }}>
              <div className="text-green-600 opacity-60 text-6xl">📊</div>
            </div>
          )}
        </div>

        {/* Right Column - Description (27% width) */}
        <div className="flex flex-col items-center justify-start" style={{ width: '30%', paddingLeft: '2%' }}>
          <div className="bg-gray-50 rounded-xl border border-gray-200  px-4 flex flex-col justify-center" style={{ height: '230px' }}>
            <h3 className="font-semibold text-gray-900 mb-3" style={{ fontSize: '0.8rem' }}>Ключевые выводы</h3>
            <p className="text-gray-600  mb-5 leading-tight" style={{ fontSize: '0.7rem' }}>
              {getKeyInsights()}
            </p>
            
            {/* Decorative circles */}
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.content.accentRgb }}></div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.content.accentRgb }}></div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.content.accentRgb }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
