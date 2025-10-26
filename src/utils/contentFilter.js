/**
 * Filter slide content based on layout type
 * For image_left, image_right, and image_top layouts, remove non-bullet lines (key insights)
 * For other layouts, keep all content
 */
export const filterContentForLayout = (content, layoutType) => {
  if (!content) return content;
  
  // Layouts that should only show bullet points
  const bulletOnlyLayouts = ['image_left', 'image_right', 'image_top'];
  
  if (bulletOnlyLayouts.includes(layoutType)) {
    // Split content into lines and keep only bullet points
    const lines = content.split('\n');
    const bulletLines = lines.filter(line => line.trim().startsWith('-'));
    return bulletLines.join('\n');
  }
  
  // For other layouts, return all content
  return content;
};
