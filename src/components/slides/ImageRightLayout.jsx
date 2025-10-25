export default function ImageRightLayout({ slide, slideNumber, theme }) {
  const renderMarkdown = (text) => {
    if (!text) return '';

    // Step 1: Split into lines and process block-level elements first
    let lines = text.split('\n');

    // We'll build an array of HTML blocks
    let htmlBlocks = [];
    let paragraphBuffer = [];

    const flushParagraph = () => {
      if (paragraphBuffer.length > 0) {
        const paraText = paragraphBuffer.join(' ').trim();
        if (paraText) {
          // Escape HTML just in case (optional but safer)
          const escaped = paraText
            .replace(/&/g, '&amp;')
            .replace(/</g, '<')
            .replace(/>/g, '>');
          htmlBlocks.push(`<div class="${theme.content.text} text-md">${escaped}</div>`);
        }
        paragraphBuffer = [];
      }
    };

    for (let line of lines) {
      line = line.trim();

      // Skip empty lines (they separate paragraphs)
      if (line === '') {
        flushParagraph();
        continue;
      }

      // Check for headings
      if (/^#{1,3} /.test(line)) {
        flushParagraph();
        if (line.startsWith('### ')) {
          const content = line.slice(4);
          htmlBlocks.push(`<h3 class="text-lg font-semibold mb-3 text-gray-800">${content}</h3>`);
        } else if (line.startsWith('## ')) {
          const content = line.slice(3);
          htmlBlocks.push(`<h2 class="text-xl font-semibold mb-4 text-gray-800">${content}</h2>`);
        } else if (line.startsWith('# ')) {
          const content = line.slice(2);
          htmlBlocks.push(`<h1 class="text-2xl font-bold mb-4 text-gray-900">${content}</h1>`);
        }
        continue;
      }

      // Check for list items
      if (line.startsWith('- ')) {
        flushParagraph();
        const content = line.slice(2);
        // Apply inline formatting to list content
        const formattedContent = applyInlineFormatting(content);
        htmlBlocks.push(
          `<div class="flex items-start mb-4">
            <div class="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style="background-color: ${theme.content.accentRgb}"></div>
            <span class="${theme.content.text} text-md">${formattedContent}</span>
          </div>`
        );
        continue;
      }

      // If it's not a special block, treat as paragraph content
      paragraphBuffer.push(line);
    }

    // Flush any remaining paragraph
    flushParagraph();

    return htmlBlocks.join('');
  };

  // Helper: apply inline formatting (bold, italic)
  const applyInlineFormatting = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  };

  return (
    <div className={`relative w-full h-full ${theme.content.bg} overflow-hidden`}>
      {/* Main Content */}
      <div className="relative z-10 flex h-full ml-10" style={{ padding: '2.5% 1%' }}>
        {/* Left Section - Content */}
        <div className="mt-10 flex flex-col" style={{ width: '50%', paddingRight: '3%' }}>
          {/* Title */}
          <h1 className={`font-bold ${theme.content.text} mb-4 leading-tight`} style={{ fontSize: '2rem' }}>
            {slide.title}
          </h1>

          {/* Purple accent line */}
          <div className={`min-h-1 h-1 ${theme.content.line} mb-6 rounded-full`} style={{ width: '90px' }}></div>

          {/* Content */}
          {slide.content && (
            <div 
              // className="leading-relaxed"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>

        {/* Right Section - Image */}
        {slide.image_url && (
          <div className="-mt-16 flex items-center justify-end" style={{ width: '52.5%', paddingLeft: '3.5%' }}>
            <div className="relative w-full">
              {/* White container with border and shadow */}
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200" style={{ padding: '2.4%' }}>
                <img
                  src={slide.image_url}
                  alt={slide.image_alt || slide.title}
                  className="w-full object-cover rounded-xl"
                  style={{ height: '240px' }}
                />
              </div>

              {/* Decorative circles - matching PPTX */}
              <div className="absolute w-3 h-3 rounded-full" style={{ top: '-1.2%', right: '-0.8%', backgroundColor: theme.content.accentRgb }}></div>
              <div className="absolute w-2.5 h-2.5 bg-blue-500 rounded-full" style={{ bottom: '-0.8%', left: '-0.5%' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
