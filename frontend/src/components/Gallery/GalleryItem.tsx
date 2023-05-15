import { Image } from '../Gallery';

interface GalleryItemProps {
  item: Image;
  index: number;
  setActiveImage: (activeImageIndex: number) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, setActiveImage, index }) => {
  return (
    <article
      key={item.id}
      style={{
        border: '1px solid #eee',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      onClick={() => {
        setActiveImage(index);
      }}
    >
      <main>
        <img
          src={item.url}
          alt={item.title}
          width='100%'
          height='300px'
          style={{ objectFit: 'cover' }}
        />
      </main>
      <footer>
        <p style={{ padding: '0 1rem' }}>{item.description}</p>
      </footer>
    </article>
  );
};

export default GalleryItem;
