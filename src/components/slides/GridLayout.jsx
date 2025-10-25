export default function GridLayout({ slide, slideNumber, theme }) {
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
    <div className={`relative w-full h-full ${theme.content.bg} overflow-hidden`}>
      {/* Title */}
      <div className="relative z-10 text-center" style={{ padding: '3.75% 7.5% 0' }}>
        <h1 className={`font-bold ${theme.content.text} mb-3`} style={{ fontSize: '2rem' }}>
          {slide.title}
        </h1>
        <div className={`h-1 ${theme.content.line} mx-auto rounded-full -mb-4`} style={{ width: '175px', marginTop: '3.47%' }}></div>
      </div>

      {/* Grid Content */}
      <div className="relative z-10" style={{ padding: '6.13% 9% 0' }}>
        <div className="grid grid-cols-2 gap-x-10 gap-y-8">
          {bullets.map((bullet, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Card */}
              <div className={`${theme.content.bg === 'bg-gray-900' ? 'bg-gray-800' : 'bg-gray-50'} rounded-3xl border-2 shadow-md flex flex-col justify-center`} style={{ padding: '6% 6%', minHeight: '140px', borderColor: theme.content.accentRgb }}>
                {/* Number badge in corner */}
                <div className="absolute rounded-full flex items-center justify-center text-white font-bold" style={{ width: '32px', height: '32px', top: '8%', left: '4%', fontSize: '0.875rem', backgroundColor: theme.content.accentRgb }}>
                  {index + 1}
                </div>
                
                {/* Content */}
                <div className="text-center" >
                  <p className={`${theme.content.text} text-md`}>
                    {bullet}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Fill remaining spots if less than 4 bullets
          // {Array.from({ length: Math.max(0, 4 - bullets.length) }).map((_, index) => (
          //   <div
          //     key={`empty-${index}`}
          //     className="bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center opacity-30"
          //     style={{ padding: '6%', minHeight: '165px' }}
          //   >
          //     <div className="text-gray-400 text-center">
          //       <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
          //       <p className="text-sm">Содержимое</p>
          //     </div>
          //   </div>
          // ))} */}
        </div>
      </div>
    </div>
  );
}
