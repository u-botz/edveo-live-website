"use client";

import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 601px)");
    const close = () => setOpen(false);
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    query.addEventListener("change", close);
    document.addEventListener("keydown", escape);
    return () => {
      query.removeEventListener("change", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <header className="site-header">
      <a className="brand" href="#" aria-label="Edveo Live home">
        <span className="brand-mark" aria-hidden="true">
          e<span />
        </span>
        <span>
          edveo<span className="brand-live">live</span>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="main-nav"
        className={open ? "is-open" : undefined}
        aria-label="Main navigation"
        onClick={() => setOpen(false)}
      >
        <a href="#classroom">The classroom</a>
        <a href="#your-way">Your way to teach</a>
        <a href="#integrations">Integrations</a>
        <a href="#pricing">Usage & pricing</a>
      </nav>
      <a className="button button-small header-cta" href="/get-started/">
        Get started <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
