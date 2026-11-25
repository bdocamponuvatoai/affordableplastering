export type IconName =
  | "phone"
  | "pin"
  | "layers"
  | "square"
  | "home-icon"
  | "plus"
  | "check"
  | "chat"
  | "measure"
  | "expand"
  | "close";

/** Decorative icon referencing a symbol in <IconDefinitions />. */
export function Icon({ name }: { name: IconName }) {
  return (
    <svg aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
