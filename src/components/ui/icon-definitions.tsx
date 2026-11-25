/** Inline SVG sprite: one <symbol> per IconName, rendered once per page. */
export function IconDefinitions() {
  return (
    <svg
      className="icon-definitions"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <symbol id="phone" viewBox="0 0 24 24">
          <path d="M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2Z" />
        </symbol>
        <symbol id="pin" viewBox="0 0 24 24">
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </symbol>
        <symbol id="layers" viewBox="0 0 24 24">
          <path d="m3 7 9-4 9 4-9 4ZM3 12l9 4 9-4M3 17l9 4 9-4" />
        </symbol>
        <symbol id="square" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M9 9v12" />
        </symbol>
        <symbol id="home-icon" viewBox="0 0 24 24">
          <path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8" />
        </symbol>
        <symbol id="plus" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5v14" />
        </symbol>
        <symbol id="check" viewBox="0 0 24 24">
          <path d="m5 12 4 4L19 6" />
        </symbol>
        <symbol id="chat" viewBox="0 0 24 24">
          <path d="M21 14a3 3 0 0 1-3 3H9l-6 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z" />
          <path d="M7 8h10M7 12h6" />
        </symbol>
        <symbol id="measure" viewBox="0 0 24 24">
          <path d="m3 16 13-13 5 5L8 21ZM13 6l2 2M9 10l2 2M5 14l2 2" />
        </symbol>
        <symbol id="expand" viewBox="0 0 24 24">
          <path d="M9 3H3v6M15 3h6v6M3 15v6h6M21 15v6h-6" />
        </symbol>
        <symbol id="close" viewBox="0 0 24 24">
          <path d="m6 6 12 12M6 18 18 6" />
        </symbol>
      </defs>
    </svg>
  );
}
