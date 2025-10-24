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
          htmlBlocks.push(`<div class="text-gray-700 text-md">${escaped}</div>`);
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
            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span class="text-gray-700 text-md">${formattedContent}</span>
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