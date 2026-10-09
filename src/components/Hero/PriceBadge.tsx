// BURBUJA DE PRECIO del hero.
// GUÍA: celular h-[130px] w-[130px] · PC sm:h-[230px] sm:w-[230px]

interface PriceBadgeProps {
  label: string;
  price: string;
}

function PriceBadge({ label, price }: PriceBadgeProps) {
  const amount = price.replace('S/', '');

  return (
    <div className="flex h-[130px] w-[130px] flex-col items-center justify-center rounded-full bg-gradient-to-br from-purple to-dark text-center shadow-[0_18px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/20 sm:h-[230px] sm:w-[230px]">
      <span className="text-xs font-bold italic sm:text-2xl">{label}</span>
      <span className="flex items-start font-bold">
        <span className="mt-1 text-xs sm:mt-2 sm:text-2xl">S/</span>
        <span className="text-3xl font-extrabold leading-none sm:text-7xl">{amount}</span>
      </span>
      <span className="text-xs sm:text-xl">mensual</span>
    </div>
  );
}

export default PriceBadge;