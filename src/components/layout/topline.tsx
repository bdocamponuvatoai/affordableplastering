import { Icon } from "@/components/ui/icon";
import { site } from "@/config/site";

export function Topline() {
  return (
    <div className="topline">
      <div className="container">
        <span>GOOD WORK. DOWN TO THE FINISH.</span>
        <span>
          {`${site.address.locality}, ${site.address.regionName} `}
          <Icon name="pin" />
        </span>
      </div>
    </div>
  );
}
