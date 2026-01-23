# Gemini Web Design Style Guide

This guide defines the design language, layout patterns, and component library derived from the "Aura/Fintech" aesthetic. Use this reference to ensure consistency when creating high-trust, professional websites.

## 1. Core Design Philosophy
*   **Visual Tone:** Professional, Clean, Trustworthy, Modern.
*   **Key Characteristics:** High-quality typography, generous whitespace, subtle glassmorphism, refined gradients, and smooth micro-interactions.
*   **Target Audience:** Professional services (CPA, Legal, Medical, Tech) requiring a balance of authority and approachability.

## 2. Typography
**Primary Font:** `Inter` (Body text, general UI)
**Heading/Accent Font:** `Geist` (Headings, buttons, labels, numbers)

*   **Headings (H1):** `font-geist font-semibold tracking-tighter leading-[0.95] text-neutral-900`
*   **Headings (H2/H3):** `font-geist font-semibold tracking-tight text-neutral-900`
*   **Body:** `font-inter text-neutral-500/600 leading-relaxed font-normal`
*   **Labels/Caps:** `font-geist text-xs font-semibold uppercase tracking-wider`

## 3. Color System (Tailwind CSS)

### Base Neutrals
*   **Background (Body):** `bg-stone-100` (Warm light grey)
*   **Background (Sections):** `bg-white` or `bg-neutral-50`
*   **Text (Primary):** `text-neutral-900` or `text-slate-900`
*   **Text (Secondary):** `text-neutral-500` or `text-neutral-600`
*   **Borders:** `border-neutral-200`

### Brand Colors (Blue Dominant)
*   **Primary Action:** `bg-blue-600 hover:bg-blue-700`
*   **Accents:** `text-blue-600`, `bg-blue-50`
*   **Dark Mode Backgrounds:** `bg-[#0B1120]` (Deep Navy)

### Semantic Colors (Status)
*   **Success:** `text-emerald-600`, `bg-emerald-50`, `border-emerald-100`
*   **Warning:** `text-orange-600`, `bg-orange-50`
*   **Error/Alert:** `text-red-600`, `bg-red-50`
*   **Premium/Special:** `text-purple-600`, `bg-purple-50`

## 4. Layout & Spacing
*   **Max Width:** `max-w-[1600px]` (Main Wrapper), `container mx-auto px-6 lg:px-12` (Section Content).
*   **Section Padding:** `py-20` or `py-24` (Standard vertical rhythm).
*   **Grids:**
    *   **Features:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
    *   **Cards/Reviews:** `grid-cols-1 md:grid-cols-3`

## 5. Component Library

### Navigation (Fixed with Progressive Blur & Mobile Slide-over)
A sticky, full-width header with a progressive gradient blur effect for seamless blending. Implemented as a React component.

**1. Progressive Blur (Background)**
Place this immediately after `<body>` or at the top of your `App` layout to create a smooth fade at the top of the viewport.
```css
/* Add .gradient-blur CSS from style block */
```

**2. React Component (`Navbar.tsx`)**
Standard implementation using `useState` for mobile menu and scroll detection.

```tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Progressive Blur Background */}
      <div className="gradient-blur">
          <div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <header 
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                L
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-geist text-neutral-900 leading-none">Logo</span>
                <span className="text-xs text-neutral-500 font-medium tracking-wide">Tagline</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-geist text-neutral-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <div className="relative group">
                <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0 p-2">
                  <Link to="/services/1" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Service One</Link>
                  <Link to="/services/2" className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">Service Two</Link>
                </div>
              </div>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:+15555555555" className="flex items-center gap-2 text-neutral-600 hover:text-blue-600 transition-colors font-medium text-sm">
                <Phone className="w-4 h-4" />
                (555) 555-5555
              </a>
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30">
                Book Consultation
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2 text-neutral-600 hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className={`absolute right-0 top-0 bottom-0 h-[100dvh] w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 shrink-0">
              <span className="text-lg font-bold text-neutral-900 font-geist">Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-500 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="p-6 space-y-4 flex-grow font-geist overflow-y-auto">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-neutral-800 hover:text-blue-600">Home</Link>
              <div className="space-y-2">
                <div className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">Services</div>
                <Link to="/services/1" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Service One</Link>
                <Link to="/services/2" onClick={() => setMobileMenuOpen(false)} className="block pl-4 text-neutral-600 hover:text-blue-600">Service Two</Link>
              </div>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-medium text-neutral-800 hover:text-blue-600">Contact</Link>
            </nav>
            <div className="p-6 border-t border-neutral-100 bg-neutral-50 shrink-0">
                <a href="tel:+15555555555" className="flex items-center justify-center gap-2 w-full bg-white border border-neutral-200 py-3 rounded-lg text-neutral-700 font-medium mb-3">
                    <Phone className="w-4 h-4" /> Call Us
                </a>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow-lg shadow-blue-600/20">
                    Book Consultation
                </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
```

### Buttons

**1. Shiny CTA (Hero Primary)**
High-visibility button with a rotating gradient border and shimmer effect.
*   *Key Classes:* `shiny-cta`, `relative`, `overflow-hidden`, `rounded-full`
*   *Structure:* Requires specialized CSS for `@property --gradient-angle` animation.

**2. Standard Primary**
```html
<button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg shadow-blue-500/25 transition-all">
  Get Started
</button>
```

**3. Secondary / Outline**
```html
<button class="px-8 py-4 rounded-full border border-neutral-200/80 bg-white/60 backdrop-blur-sm text-neutral-600 hover:bg-white transition-all shadow-sm">
  Learn More
</button>
```

### Cards

**1. Feature Card (Light)**
Clean white card with icon and hover lift.
```html
<div class="group bg-white rounded-xl p-6 border border-neutral-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
  <div class="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
    <iconify-icon icon="lucide:award"></iconify-icon>
  </div>
  <h3 class="font-semibold text-neutral-900 mb-2 font-geist">Title</h3>
  <p class="text-sm text-neutral-500">Description text.</p>
</div>
```

**2. Dark Mode Service Card**
Deep blue background with glowing borders on hover.
```html
<div class="group bg-[#151e32] border border-slate-800 hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] transition-all duration-300 rounded-2xl p-8">
  <!-- Content -->
</div>
```

**3. Glass Panel Form**
Used in Hero sections for high conversion.
```html
<div class="bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-blue-900/5 p-8 rounded-2xl">
  <!-- Inputs -->
</div>
```

### Inputs
High-quality inputs with focus rings.
```html
<input type="text" class="w-full px-3 py-2.5 rounded-lg border border-neutral-200/80 bg-white/50 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all backdrop-blur-sm">
```

## 6. Visual Effects & Animation

### Glassmorphism
*   **Class:** `backdrop-blur-md` or `backdrop-blur-xl`
*   **Background:** `bg-white/60` or `bg-white/70`
*   **Border:** `border-white/40` or `border-white/50`

### Animated Blobs (Background)
Soft, moving colored orbs behind content to add depth.
*   **Animation:** `animate-blob` (custom keyframes for translation and scaling).
*   **Colors:** `bg-blue-400/20`, `bg-indigo-400/20`, `bg-sky-300/30`.
*   **Blend Mode:** `mix-blend-multiply`.

### Gradients & Masks
*   **Mask:** `mask-gradient` (fade out edges).
*   **Grid Overlay:** `bg-[linear-gradient(...)]` for subtle texture.

## 7. Icons
*   **Library:** `Lucide` (via Iconify).
*   **Style:** Clean lines, stroke width matches typography.
*   **Usage:** Wrapped in rounded containers (`bg-blue-50`, `bg-neutral-100`) often with `group-hover:scale-110`.

## 8. Implementation Checklist
1.  [ ] Import `Inter` and `Geist` fonts.
2.  [ ] Configure Tailwind theme colors (extend config).
3.  [ ] Add custom animations (`blob-bounce`, `shimmer`) to `tailwind.config.js` or CSS.
4.  [ ] Ensure "Shiny CTA" CSS properties (`@property`) are included.
5.  [ ] Use `iconify-icon` web component or React equivalent.
