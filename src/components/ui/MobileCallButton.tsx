import { getPhoneLink } from "../../services/contactPhone";
import { PhoneCall } from "lucide-react";

function MobileCallButton() {
  return (
    <a
      href={getPhoneLink()}
      aria-label="Llamar a Mejor Internet"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-purple text-white shadow-[0_4px_16px_rgba(138,56,245,0.45)] transition duration-200 hover:scale-105 active:scale-95 md:hidden"
    >
      <PhoneCall className="h-7 w-7" />
    </a>
  );
}

export default MobileCallButton;


