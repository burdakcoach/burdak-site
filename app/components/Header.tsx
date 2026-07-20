"use client";

import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="siteHeader">
      <a href="/" className="logo" onClick={() => setMenuOpen(false)}>
        BURDAK COACH
      </a>

      <div className="navLinks">
        <a href="/#about">Про мене</a>
        <a href="/#services">Послуги</a>
        <a href="/#results">Результати</a>
        <a href="/#reviews">Відгуки</a>
        <a href="/library">Бібліотека вправ</a>
        <a href="/#contacts">Контакти</a>
      </div>

      <a href="/booking">Записатись</a>

      <a href="https://t.me/coach_burdak" target="_blank" className="headerBtn">
        Консультація
      </a>

      <button
        className={`menuToggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Меню"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`mobileMenu ${menuOpen ? "mobileMenuOpen" : ""}`}>
        <a href="/#about" onClick={() => setMenuOpen(false)}>Про мене</a>
        <a href="/#services" onClick={() => setMenuOpen(false)}>Послуги</a>
        <a href="/#results" onClick={() => setMenuOpen(false)}>Результати</a>
        <a href="/#reviews" onClick={() => setMenuOpen(false)}>Відгуки</a>
        <a href="/library" onClick={() => setMenuOpen(false)}>Бібліотека вправ</a>
        <a href="/#contacts" onClick={() => setMenuOpen(false)}>Контакти</a>
        <a
          href="https://t.me/coach_burdak"
          target="_blank"
          className="mobileMenuBtn"
          onClick={() => setMenuOpen(false)}
        >
          <a href="/booking" onClick={() => setMenuOpen(false)}>Записатись</a>
          Консультація
        </a>
      </div>
    </header>
  );
}