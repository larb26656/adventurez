interface SwiperControlsProps {
  hasEnoughSlides: boolean;
}

export default function SwiperControls({ hasEnoughSlides }: SwiperControlsProps) {
  if (!hasEnoughSlides) return null;

  return (
    <>
      <div className="swiper-button-next !text-[var(--color-primary)] !bg-black/70 !w-12 !h-12 !rounded-full !after:text-lg after:font-bold transition-transform active:scale-90 shadow-xl" />
      <div className="swiper-button-prev !text-[var(--color-primary)] !bg-black/70 !w-12 !h-12 !rounded-full !after:text-lg after:font-bold transition-transform active:scale-90 shadow-xl" />
      <div className="swiper-pagination !-bottom-2" />
    </>
  );
}