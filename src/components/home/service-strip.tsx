import { Icon } from "@/components/ui/icon";
import { highlights } from "@/content/home";

/** Four short highlights: 2 × 2 tiles on phones, one row on desktop. */
export function ServiceStrip() {
  return (
    <div className="highlights">
      <ul className="container highlights__list reveal" role="list">
        {highlights.map((item) => (
          <li key={item.label} className="highlights__item">
            <span className="highlights__icon">
              <Icon name={item.icon} />
            </span>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
