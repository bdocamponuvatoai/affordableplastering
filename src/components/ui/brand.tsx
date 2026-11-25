import { site } from "@/config/site";
import { SmartLink } from "./smart-link";

/** Logo lock-up used in the header and footer. */
export function Brand() {
  return (
    <SmartLink className="brand" href="/#home" aria-label={`${site.name} home`}>
      <svg className="brand-icon" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M5 39 20 8h9l15 31H33L24.5 19 16 39Z" fill="currentColor" />
        <path d="M20 31h11l4 8H16Z" fill="#bb613e" />
        <path d="m8 44 31-4" stroke="currentColor" strokeWidth="2" />
      </svg>
      <span>
        AFFORDABLE <span>PLASTERING</span>
      </span>
    </SmartLink>
  );
}
