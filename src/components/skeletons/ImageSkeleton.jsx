import { Skeleton } from '@/components/ui/skeleton.jsx';

function ImageWithTextSkeleton({ 
  imageHeight = "h-48", 
  imageWidth = "w-full",
  imageRounded = "rounded-lg",
  
  titleWidth = "w-2/3",
  textWidth = "w-full",
  textLines = 2,
  
  layout = "vertical",
  spacing = "space-y-4", 
  className = ""
}) {
  // Generate text line skeletons
  const textSkeletons = Array.from({ length: textLines }, (_, i) => (
    <Skeleton key={i} className={`h-4 ${textWidth} ${i === textLines - 1 ? 'w-3/4' : ''}`} />
  ));

  return (
    <div className={`${layout === 'horizontal' ? 'flex space-x-4' : ''} ${className}`}>
      {/* Image */}
      <Skeleton className={`${imageWidth} ${imageHeight} ${imageRounded} ${layout === 'horizontal' ? 'flex-shrink-0' : 'mb-4'}`} />
      <div className={`flex-1 ${layout === 'vertical' ? spacing : ''}`}>
        <Skeleton className={`h-6 ${titleWidth} mb-2`} />
        <div className={spacing}>
          {textSkeletons}
        </div>
      </div>
    </div>
  );
}

export default ImageWithTextSkeleton;