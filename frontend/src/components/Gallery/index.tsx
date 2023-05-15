import { useState } from 'react';

import useAxios from '../../hooks/useAxios';

import Carousel from '../Carousel';
import ErrorState from '../State/Error';
import LoadingState from '../State/Loading';
import EmptyState from '../State/Empty';
import GalleryList from './GalleryList';

export type Image = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export const Gallery: React.FC = () => {
  const { data, error, loaded } = useAxios({ endpoint: 'images' });
  const [activeImage, setActiveImage] = useState(0);

  const images: Image[] = data || [];

  if (error) {
    return <ErrorState />;
  }

  if (!loaded) {
    return <LoadingState />;
  }

  if (loaded && images.length < 1) {
    return <EmptyState message='No images to display' />;
  }

  return (
    <div style={{ margin: '3rem auto', maxWidth: '80vw' }}>
      <Carousel images={images} activeImage={activeImage} />
      <GalleryList images={images} setActiveImage={setActiveImage} />
    </div>
  );
};

export default Gallery;
