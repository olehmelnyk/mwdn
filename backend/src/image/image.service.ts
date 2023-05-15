import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

import { myJsonServer } from 'src/lib/axios';
import { Image, Photo } from './image.types';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async getInitialImages() {
    const [imagesData, photosData] = await Promise.all([
      myJsonServer.get('/images'),
      myJsonServer.get('/photos'),
    ]);

    const mappedImages = imagesData?.data?.[0].map(
      ({ title, path: url }: Image) => ({
        title,
        url,
      }),
    );

    const mappedPhotos = photosData?.data?.[0].map(({ title, url }: Photo) => ({
      title,
      url,
    }));

    // some images from API does not include the proper url format, so we don't include them
    const imageList = [...mappedImages, ...mappedPhotos].filter((image) =>
      image.url.includes('/600/'),
    );

    return imageList;
  }

  create(createImageDto: Prisma.ImageCreateInput) {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  async findAll() {
    const images = await this.prisma.image.findMany();
    if (images.length) {
      return images;
    }

    const initlaImages = await this.getInitialImages();

    await this.prisma.image.createMany({
      data: initlaImages as Prisma.ImageCreateInput[],
      skipDuplicates: true,
    });

    return await this.prisma.image.findMany();
  }

  findOne(id: string) {
    return this.prisma.image.findUnique({
      where: { id },
    });
  }

  update(id: string, updateImageDto: Prisma.ImageUpdateInput) {
    return this.prisma.image.update({ data: updateImageDto, where: { id } });
  }

  remove(id: string) {
    return this.prisma.image.delete({
      where: { id },
    });
  }
}
