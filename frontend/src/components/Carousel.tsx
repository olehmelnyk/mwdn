import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { Image } from './Gallery';

interface CarouselProps {
  images: Image[];
  activeImage: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images, activeImage }) => {
  const renderSlides = () =>
    images.map((image) => (
      <img
        key={image.id}
        src={image.url}
        alt={image.title}
        width='100%'
        height='700px'
        style={{ objectFit: 'cover' }}
      />
    ));

  return (
    <AliceCarousel infinite items={renderSlides()} activeIndex={activeImage} />
  );
};

export default Carousel;
