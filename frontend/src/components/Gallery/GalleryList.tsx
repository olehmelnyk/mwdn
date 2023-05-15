import { Image } from '../Gallery';
import GalleryItem from './GalleryItem';

interface GalleryListProps {
  images: Image[];
  setActiveImage: (activeImage: number) => void;
}

const GalleryList: React.FC<GalleryListProps> = ({
  images,
  setActiveImage,
}) => {
  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '1rem',
      }}
    >
      {images.length > 0 &&
        images.map((image, index) => (
          <GalleryItem
            key={image.id}
            item={image}
            setActiveImage={setActiveImage}
            index={index}
          />
        ))}
    </section>
  );
};

export default GalleryList;
