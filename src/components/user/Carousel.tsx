'use client';

import 'swiper/css';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselSlide from './CarouselSlide';
import { useExplore } from '@/lib/api/user';

type Props = {
  autoPlay?: boolean;
  showSideBox: boolean;
  size: 'md' | 'lg';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (swiper: any) => void;
};

export default function Carousel({
  autoPlay = false,
  showSideBox = false,
  size = 'md',
  onChange,
}: Props) {
  const { data } = useExplore();

  const sizeMap = {
    md: '120px',
    lg: '560px',
  };

  const height = sizeMap[size];

  return (
    <Swiper
      autoplay={
        autoPlay ? { delay: 10000, disableOnInteraction: false } : false
      }
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      keyboard={true}
      mousewheel={true}
      modules={[Mousewheel]}
      grabCursor={true}
      className={`w-full h-[${[height]}]`}
      onSlideChange={onChange}
    >
      {data?.map((item) => (
        <SwiperSlide key={item.id}>
          <CarouselSlide
            showSideBox={showSideBox}
            item={item}
            height={height}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
