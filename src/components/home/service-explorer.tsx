"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { PlanButton } from "@/components/dialogs/plan-button";
import { services, type ServiceKey } from "@/content/services";

const PANEL_ID = "service-panel";
const tabId = (key: ServiceKey) => `tab-${key}`;

/**
 * Segmented service tabs (WAI-ARIA tabs, automatic activation). Left/Right
 * (and Up/Down) move between tabs, Home/End jump to the first/last. On narrow
 * screens the row scrolls sideways.
 */
export function ServiceExplorer() {
  const [activeKey, setActiveKey] = useState<ServiceKey>(services[0].key);
  const tabRefs = useRef(new Map<ServiceKey, HTMLButtonElement>());
  const active =
    services.find((service) => service.key === activeKey) ?? services[0];

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const last = services.length - 1;
    let next: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = index === last ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === undefined) return;
    event.preventDefault();
    const key = services[next].key;
    setActiveKey(key);
    const tab = tabRefs.current.get(key);
    tab?.focus();
    // focus() alone leaves a partly visible tab partly off-screen; align its
    // start to the snap position so snapping engines (WebKit) don't undo it.
    tab?.scrollIntoView({ block: "nearest", inline: "start" }); // agrees with scroll-snap
  }

  return (
    <div className="services">
      <div
        className="services__tabs"
        role="tablist"
        aria-label="Plastering and drywall services"
        aria-orientation="horizontal"
      >
        {services.map((service, index) => {
          const selected = service.key === activeKey;
          return (
            <button
              key={service.key}
              ref={(node) => {
                if (node) tabRefs.current.set(service.key, node);
                else tabRefs.current.delete(service.key);
              }}
              className="services__tab"
              id={tabId(service.key)}
              role="tab"
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveKey(service.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {service.label}
            </button>
          );
        })}
      </div>
      <div
        className="service-card"
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={tabId(active.key)}
        tabIndex={0}
      >
        <div className="service-card__media">
          <Image
            {...active.image}
            alt={active.alt}
            sizes="(min-width: 64em) 660px, 100vw"
            loading="lazy"
          />
          <span className="chip chip--frosted service-card__kicker">
            CRAFT IN THE DETAILS
          </span>
        </div>
        <div className="service-card__body">
          <p className="service-card__teaser">{active.teaser}</p>
          <h3>{active.title}</h3>
          <p className="service-card__text">{active.description}</p>
          <PlanButton
            className="link-arrow service-card__cta"
            service={active.key}
          >
            {active.cta}
          </PlanButton>
        </div>
      </div>
      <p className="services-footnote">
        {"Not sure what your walls need? "}
        <PlanButton className="services-footnote__link">
          Start a conversation.
        </PlanButton>
      </p>
    </div>
  );
}
