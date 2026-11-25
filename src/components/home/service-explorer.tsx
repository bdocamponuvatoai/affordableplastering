"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { PlanButton } from "@/components/dialogs/plan-button";
import { Icon } from "@/components/ui/icon";
import { services, type ServiceKey } from "@/content/services";

const PANEL_ID = "service-panel";
const tabId = (key: ServiceKey) => `tab-${key}`;

/**
 * Vertical tabs (WAI-ARIA tabs pattern with automatic activation): arrow
 * keys move between tabs, Home/End jump to the first/last.
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
    if (event.key === "ArrowDown" || event.key === "ArrowRight")
      next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft")
      next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === undefined) return;
    event.preventDefault();
    const key = services[next].key;
    setActiveKey(key);
    tabRefs.current.get(key)?.focus();
  }

  return (
    <div className="services-layout">
      <div
        className="service-tabs"
        role="tablist"
        aria-label="Plastering and drywall services"
        aria-orientation="vertical"
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
              id={tabId(service.key)}
              role="tab"
              aria-selected={selected}
              aria-controls={PANEL_ID}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveKey(service.key)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span>{service.label}</span>
              <Icon name="plus" />
              <small>{service.teaser}</small>
            </button>
          );
        })}
        <p className="services-footnote">
          {"Not sure what your walls need? "}
          <PlanButton className="inline-button">
            Start a conversation.
          </PlanButton>
        </p>
      </div>
      <div
        className="service-panel"
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={tabId(active.key)}
        tabIndex={0}
      >
        <div className="service-photo">
          <Image
            {...active.image}
            alt={active.alt}
            sizes="(min-width: 64em) 660px, 100vw"
            loading="lazy"
          />
          <span>CRAFT IN THE DETAILS</span>
        </div>
        <div className="service-details">
          <h3>{active.title}</h3>
          <p>{active.description}</p>
          <PlanButton className="text-link" service={active.key}>
            {active.cta}
          </PlanButton>
        </div>
      </div>
    </div>
  );
}
