import TitleSlideLayout from './TitleSlideLayout';
import ContentSlideLayout from './ContentSlideLayout';
import ImageRightLayout from './ImageRightLayout';
import TextOnlyLayout from './TextOnlyLayout';
import SplitContentLayout from './SplitContentLayout';
import ImageTopLayout from './ImageTopLayout';
import GridLayout from './GridLayout';
import { getTheme } from '../../utils/themes';

export default function SlideRenderer({ slide, layoutOrder, style = 'minimal' }) {
  const getSlideLayout = (layout, slideNumber, layoutOrder) => {
    // Check if it's a title slide (slide_number === 1 or layout === 'title-slide')
    if (layout === 'title-slide' || slideNumber === 1) {
      return TitleSlideLayout;
    }
    
    // Map layout names to components
    const layoutMap = {
      'image_left': ContentSlideLayout,
      'image_right': ImageRightLayout,
      'text_only': TextOnlyLayout,
      'split_content': SplitContentLayout,
      'image_top': ImageTopLayout,
      'grid_layout': GridLayout
    };
    
    // For content slides (not title), use layout order
    // Adjust index: slide 2 uses index 0, slide 3 uses index 1, etc.
    const contentSlideIndex = slideNumber - 2;  // -2 because slide 1 is title
    
    // If layoutOrder is provided, use it; otherwise fallback to sequential
    if (layoutOrder && layoutOrder.length > 0 && contentSlideIndex >= 0) {
      const layoutName = layoutOrder[contentSlideIndex % layoutOrder.length];
      return layoutMap[layoutName] || ContentSlideLayout;
    }
    
    // Default sequential order (for old presentations without layout_order)
    const defaultLayoutStyles = [
      ContentSlideLayout,        // image_left
      ImageRightLayout,          // image_right 
      TextOnlyLayout,            // text_only
      SplitContentLayout,        // split_content
      ImageTopLayout,            // image_top
      GridLayout                 // grid_layout
    ];
    
    return defaultLayoutStyles[Math.max(0, contentSlideIndex) % defaultLayoutStyles.length];
  };

  const LayoutComponent = getSlideLayout(slide.layout, slide.slide_number, layoutOrder);
  const theme = getTheme(style);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <LayoutComponent slide={slide} slideNumber={slide.slide_number - 1} theme={theme} />
    </div>
  );
}
