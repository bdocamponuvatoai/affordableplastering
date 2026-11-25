import { Icon } from "@/components/ui/icon";
import { highlights } from "@/content/home";

export function ServiceStrip() {
  return (
    <div className="service-strip">
      <div className="container reveal">
        {highlights.map((item) => (
          <span key={item.label}>
            <Icon name={item.icon} />
            {` ${item.label}`}
          </span>
        ))}
      </div>
    </div>
  );
}
