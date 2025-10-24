import TitleSlideLayout from './TitleSlideLayout';
import ContentSlideLayout from './ContentSlideLayout';
import ImageRightLayout from './ImageRightLayout';
import TextOnlyLayout from './TextOnlyLayout';
import SplitContentLayout from './SplitContentLayout';
import ImageTopLayout from './ImageTopLayout';
import GridLayout from './GridLayout';

export default function SlideRenderer({ slide }) {
  const getSlideLayout = (layout, slideNumber) => {
    if (layout === 'title-slide') {
      return TitleSlideLayout;
    }
    
    // Use different layouts based on slide number to match PPTX variety
    const layoutStyles = [
      ContentSlideLayout,        // image_left
      ImageRightLayout,          // image_right 
      TextOnlyLayout,            // text_only
      SplitContentLayout,        // split_content
      ImageTopLayout,            // image_top
      GridLayout                 // grid_layout
    ];
    
    return layoutStyles[slideNumber % layoutStyles.length];
  };

  const LayoutComponent = getSlideLayout(slide.layout, (slide.slide_number - 1) % 6);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg border overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <LayoutComponent slide={slide} slideNumber={slide.slide_number - 1} />
    </div>
  );
}
