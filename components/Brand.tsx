import Image from "next/image";
import Link from "next/link";
import { business } from "@/lib/business";

export default function Brand({ priority = false }: { priority?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label={`${business.brand} — Home`}>
      <Image
        className="brand-logo"
        src={business.logo}
        alt="Bhupendra"
        width={612}
        height={408}
        priority={priority}
      />
    </Link>
  );
}
