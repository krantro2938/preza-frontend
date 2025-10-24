export default function TextOnlyLayout({ slide, slideNumber }) {
  const renderMarkdown = (text) => {
    if (!text) return '';

    // Helper: apply inline formatting (bold, italic)
    const applyInlineFormatting = (str) => {
      return str
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    };

    const lines = text.split('\n');
    let htmlBlocks = [];
    let paragraphLines = [];
    let bulletCount = 0;

    const flushParagraph = () => {
      if (paragraphLines.length > 0) {
        const combined = paragraphLines.join(' ').trim();
        if (combined) {
          // Escape basic HTML characters for safety
          const escaped = combined
            .replace(/&/g, '&amp;')
            .replace(/</g, '<')
            .replace(/>/g, '>');
          const formatted = applyInlineFormatting(escaped);
          htmlBlocks.push(`<div class="text-gray-700">${formatted}</div>`);
        }
        paragraphLines = [];
      }
    };

    for (let line of lines) {
      const trimmed = line.trim();

      // Handle empty lines → paragraph separator
      if (trimmed === '') {
        flushParagraph();
        continue;
      }

      // Headings
      if (trimmed.startsWith('# ')) {
        flushParagraph();
        const content = applyInlineFormatting(trimmed.slice(2));
        htmlBlocks.push(`<h1 class="text-2xl font-bold mb-4 text-gray-900">${content}</h1>`);
        continue;
      }
      if (trimmed.startsWith('## ')) {
        flushParagraph();
        const content = applyInlineFormatting(trimmed.slice(3));
        htmlBlocks.push(`<h2 class="text-xl font-semibold mb-4 text-gray-800">${content}</h2>`);
        continue;
      }
      if (trimmed.startsWith('### ')) {
        flushParagraph();
        const content = applyInlineFormatting(trimmed.slice(4));
        htmlBlocks.push(`<h3 class="text-lg font-semibold mb-3 text-gray-800">${content}</h3>`);
        continue;
      }

      // Bullet list items
      if (trimmed.startsWith('- ')) {
        flushParagraph();
        bulletCount++;
        const content = applyInlineFormatting(trimmed.slice(2));
        const numberLabel = bulletCount.toString().padStart(2, '0');
        htmlBlocks.push(
          `<div class="flex items-start mb-4">` +
            `<span class="text-blue-500 font-bold mr-3 text-md">${numberLabel}.</span>` +
            `<span class="text-gray-700 text-md">${content}</span>` +
          `</div>`
        );
        continue;
      }

      // Regular paragraph line — collect it
      paragraphLines.push(trimmed);
    }

    // Flush any remaining paragraph
    flushParagraph();

    return htmlBlocks.join('');
  };

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">
      {/* Decorative circles - matching PPTX */}
      <div className="absolute w-5 h-5 bg-blue-400 rounded-full " style={{ top: '13.33%', left: '7.5%' }}></div>
      <div className="absolute w-6 h-6 bg-green-500 rounded-full " style={{ bottom: '13.33%', right: '7.5%' }}></div>

      {/* Main Content - Centered */}
      <div className="relative z-10 flex  h-full" style={{ padding: '2.5% 15%' }}>
        <div className=" w-full">
          {/* Title */}
          <h1 className="mt-10 font-bold text-gray-900 mb-14 leading-tight text-center" style={{ fontSize: '2rem' }}>
            {slide.title}
          </h1>

          {/* Blue accent line - centered */}
          <div className="h-1 bg-blue-500 rounded-full mx-auto mb-8" style={{ width: '90px' }}></div>

          {/* Content */}
          {slide.content && (
            <div 
              className=""
              style={{  }}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(slide.content) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
