# Gemini Sites Build Guidelines

This document serves as the **Source of Truth** for creating, maintaining, and updating websites within the `gemini-sites` repository. All new projects must adhere to these standards to ensure consistency, quality, and maintainability.

## 1. Tech Stack & Environment

All projects in this monorepo share the following technology stack:

*   **Framework:** React 19+ (via Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v3.4+
*   **Routing:** React Router DOM v7+
*   **Icons:** `lucide-react`
*   **Package Manager:** `npm` (utilize existing `package-lock.json` versions)

## 2. Project Structure

Every website folder (e.g., `henderson-financial/`) must follow this structure:

```text
site-name/
├── index.html              # Entry HTML with Google Fonts & Schema.org JSON-LD
├── BUSINESS_INFO.md        # Business information gathered pre-build
├── .env.example            # Environment variable template (if needed)
├── src/
│   ├── main.tsx            # Entry point
│   ├── App.tsx             # Main Layout & Routing
│   ├── index.css           # Tailwind imports
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx      # Responsive navigation with dropdowns
│   │   ├── Footer.tsx      # Multi-column footer
│   │   ├── LeadConnectorForm.tsx # Standard contact form wrapper (or placeholder)
│   │   ├── PlaceholderForm.tsx   # Temporary form until CRM integration
│   │   ├── ReviewsWidget.tsx     # Placeholder for Google Reviews widget
│   │   └── ScrollToTop.tsx # Handles scroll reset on route change
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── Contact.tsx
│   │   ├── NotFound.tsx    # 404 error page
│   │   └── services/       # Service-specific landing pages
│   │       ├── ServiceOne.tsx
│   │       └── ServiceTwo.tsx
│   └── assets/             # Images and static assets
│       ├── images/         # Optimized images (.webp, .jpg, .png)
│       ├── icons/          # Custom icons (if not using lucide-react)
│       └── fonts/          # Local fonts (if not using Google Fonts)
├── public/                 # Static files copied to root on build
│   ├── favicon.ico         # Browser tab icon
│   ├── apple-touch-icon.png # iOS home screen icon (180x180)
│   └── og-image.jpg        # Open Graph social sharing image (1200x630)
├── dist/                   # Build output (git-ignored)
├── tailwind.config.js      # Custom theme configuration
├── vite.config.ts          # Vite configuration
└── package.json
```

## 3. Design System & Theming

### Colors
Define a primary and secondary color palette in `tailwind.config.js`. Common pattern:
*   **Primary (Dark):** Navy, Slate, or Black (e.g., `navy-900`) for text, headings, and footer backgrounds.
*   **Accent (Bright):** Gold, Blue, or Green (e.g., `gold-500`) for buttons, links, and highlights.

### Typography
Load fonts via `index.html` (Google Fonts).
*   **Headings:** Serif font (e.g., `Playfair Display`) for authority and elegance.
*   **Body:** Sans-serif font (e.g., `Inter`) for readability.

**Example `tailwind.config.js` extension:**
```javascript
theme: {
  extend: {
    colors: {
      'brand-dark': '#0a192f',
      'brand-accent': '#d4af37',
    },
    fontFamily: {
      serif: ['"Playfair Display"', 'serif'],
      sans: ['"Inter"', 'sans-serif'],
    },
  },
}
```

## 4. Required Components

### Navbar (`Navbar.tsx`)
*   **Fixed position:** `fixed w-full z-50`.
*   **Responsive:** Hamburger menu for mobile, horizontal list for desktop.
*   **Features:**
    *   Logo on the left.
    *   "Services" dropdown menu.
    *   Smooth scroll links for "About" and "Resources" (if on Home).
    *   **CTAs:** "Call Us" (outline button) and "Book Consultation" (solid primary color button).
*   **Implementation Note:** Uses `useState` for mobile menu toggling and scroll detection. Requires `lucide-react` for icons and `react-router-dom` for links.

```tsx
// Standard Navbar Structure
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
      <div className="gradient-blur"></div>
      <header 
        className={`fixed z-50 w-full top-0 left-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            {/* Logo, Nav, Actions, Mobile Toggle... */}
            {/* Refer to Gemini-Style-Guide.md for full implementation */}
          </div>
        </div>

        {/* Mobile Menu Slide-over */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className={`absolute right-0 top-0 bottom-0 h-[100dvh] w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
             {/* Mobile Menu Content */}
          </div>
        </div>
      </header>
    </>
  );
};
```

### Footer (`Footer.tsx`)
*   **Layout:** 4 columns on desktop (Brand Info, Contact Details, Quick Links, Disclaimer).
*   **Content:**
    *   Physical address with `MapPin`.
    *   Phone number with `Phone` icon (clickable `tel:` link).
    *   Email with `Mail` icon.
    *   Copyright year updated automatically or set to current year.
    *   Privacy/Terms links.

### LeadConnector Form (`LeadConnectorForm.tsx`)
*   Standard component for lead capture.
*   Uses `iframe` to embed HighLevel/LeadConnector forms.
*   **Props:** `formId` (required), `height`, `className`.
*   **Key Behavior:** Must inject the `msgsndr-form-embed-js` script if missing.
*   **Note:** This is a post-build integration. Use `PlaceholderForm.tsx` during initial development.

### Placeholder Form (`PlaceholderForm.tsx`)
*   Temporary contact form used during initial development before CRM integration.
*   Displays a styled form matching the site's design system.
*   Form fields: Name, Email, Phone, Message.
*   **Does NOT submit data** - displays a message like "Form integration coming soon" or logs to console.
*   **Replace with `LeadConnectorForm.tsx`** once CRM form embed code is available.

```tsx
// Example PlaceholderForm structure
const PlaceholderForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted - integrate with LeadConnector');
    alert('Thank you! Form integration pending.');
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name" required className="..." />
      <input type="email" placeholder="Email" required className="..." />
      <input type="tel" placeholder="Phone" className="..." />
      <textarea placeholder="Message" rows={4} className="..." />
      <button type="submit" className="...">Send Message</button>
    </form>
  );
};
```

### Reviews Widget Placeholder (`ReviewsWidget.tsx`)
*   Placeholder component for Google Reviews integration.
*   Displays static testimonials or a "Reviews coming soon" message during development.
*   **Replace with actual Google Reviews widget code** post-build.

```tsx
// Example ReviewsWidget placeholder
const ReviewsWidget = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg text-center">
      <p className="text-gray-500">Google Reviews Widget</p>
      <p className="text-sm text-gray-400">Integration pending</p>
      {/* Replace this div with CRM widget embed code */}
    </div>
  );
};
```

### ScrollToTop (`ScrollToTop.tsx`)
*   Must be included in `App.tsx` inside `<Router>` to ensure window scrolls to top on navigation.

## 5. Page Requirements (VERY IMPORTANT)

### Home Page (`Home.tsx`) 

**THIS IS INCREDIBLY IMPORTANT TO INCLUDE ALL THE FOLLOWING SECTIONS IN THE HOME PAGE**

*   **Hero Section:** High-impact image/background, clear Headline, Subheadline, and two CTAs ("Book Now", "Learn More").
*   **Services Grid:** Summary of top services with icons. Include brief descriptions of the type of services the firm helps with and include bullet points for under each service with keywords that customers can easily scan. Things like "Personal Tax Returns" "Retirement Account Planning" "Real Estate Investment Planning" just to name a few so you can get a good idea. 
*   **About Section:** Brief company intro.
*   **Areas Served Section:** Embed a Google Map of the business address and have a couple bullet points listing the other areas/towns around the business address that the business would serve. This is to help with SEO. 
*   **Reviews/Testimonials:** Social proof.
*   **Credentials Section:** This lists all the software and credentials the company has. It'll list things like CPA, software they're compatible with, how many years they've been in business, etc. 
*   **3 Easy Steps To Get Started:** Include a "3 Easy Steps" to get started section. It'll typically include a "Free Consult" "Custom Roadmap" and  "Get Up And Running" steps. Adjust it to the specific business though. 
*   **Frequently Asked Questions:** Include a FAQ sections of the 8 most common questions related to the business. This is help ful for SEO espeically. The FAQ section should be collapsable list items. 
*   **CTA Section:** Final push to contact or book.

### Service Pages (`pages/services/*.tsx`)
*   Dedicated page for each core service (SEO benefit).
*   Clear description of the service, benefits, and a call to action.

### Contact Page (`Contact.tsx`)
*   Embed `LeadConnectorForm` (or `PlaceholderForm` during development).
*   List contact info (Phone, Email, Address) alongside the form.
*   Optional: Google Maps embed.

### 404 Page (`NotFound.tsx`)
*   User-friendly error page for invalid routes.
*   **Required elements:**
    *   Clear "Page Not Found" message.
    *   Brief explanation (e.g., "The page you're looking for doesn't exist or has been moved.").
    *   Link back to Home page.
    *   Optional: Links to popular pages (Services, Contact).
*   **Styling:** Match site design system, keep it simple and helpful.

```tsx
// Example 404 page structure
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-dark">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-block btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  );
};
```

**React Router Setup:** Add catch-all route in `App.tsx`:
```tsx
<Route path="*" element={<NotFound />} />
```

## 6. SEO & Metadata (`index.html`)

### Basic Meta Tags
*   **Title Tag:** `[Company Name] | [City] [Primary Service]`
*   **Meta Description:** < 160 characters, including keywords.
*   **Favicon:** Include `favicon.ico` in `/public` folder.

### Open Graph Tags (Social Sharing)
Required for proper display when shared on Facebook, LinkedIn, etc.

```html
<!-- Open Graph -->
<meta property="og:title" content="[Company Name] | [Primary Service]" />
<meta property="og:description" content="[Meta description]" />
<meta property="og:image" content="https://[domain]/og-image.jpg" />
<meta property="og:url" content="https://[domain]" />
<meta property="og:type" content="website" />
<meta property="og:site_name" content="[Company Name]" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="[Company Name] | [Primary Service]" />
<meta name="twitter:description" content="[Meta description]" />
<meta name="twitter:image" content="https://[domain]/og-image.jpg" />
```

**OG Image Requirements:**
*   Dimensions: 1200x630 pixels
*   Format: JPG or PNG
*   Location: `/public/og-image.jpg`
*   Content: Company logo, tagline, or branded graphic

### Schema.org (JSON-LD)
Structured data for `LocalBusiness`, `AccountingService`, or `ProfessionalService`. Include:
*   Name, Image, Description
*   Address, GeoCoordinates
*   Telephone, PriceRange
*   OpeningHours

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "[Company Name]",
  "description": "[Company description]",
  "url": "https://[domain]",
  "telephone": "[Phone]",
  "email": "[Email]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Street]",
    "addressLocality": "[City]",
    "addressRegion": "[State]",
    "postalCode": "[ZIP]",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "[lat]",
    "longitude": "[lng]"
  },
  "openingHours": "Mo-Fr 09:00-17:00",
  "priceRange": "$$"
}
</script>
```

## 7. Pre-Build Workflow

**Before writing any code**, gather all necessary business information. This ensures you have everything needed to build the site without delays.

### Step 1: Gather Business Information
Use the `SCRAPING_INSTRUCTIONS.md` guide to collect information from the client's existing website or provided materials.

**Required information:**
*   Company name, tagline, and description
*   Contact details (phone, email, address)
*   Services offered (for service pages)
*   Brand colors (or extract from existing site/logo)
*   Logo and any existing images
*   Testimonials or reviews
*   Business hours
*   Target audience/keywords for SEO

### Step 2: Create BUSINESS_INFO.md
Create a `BUSINESS_INFO.md` file in the site folder with all gathered information. This serves as the single source of truth for content.

**Template location:** See existing site folders for examples (e.g., `henderson-financial/BUSINESS_INFO.md`).

### Step 3: Collect Assets
*   **Logo:** Request or download high-resolution logo (SVG preferred, PNG acceptable).
*   **Images:** Gather hero images, team photos, office photos, etc.
*   **Fonts:** Identify brand fonts or select appropriate Google Fonts.

### Step 4: Plan Site Structure
Based on gathered info, outline:
*   Number of service pages needed
*   Navigation structure
*   Key CTAs and conversion points

---

## 8. Development Workflow

Once pre-build is complete, start development:

### Initial Setup
1.  **Copy Template:** Duplicate an existing folder (e.g., `henderson-financial`) or init new Vite project.
2.  **Clean Up:** Remove old assets and component-specific text.
3.  **Config:** Update `tailwind.config.js` with new brand colors.
4.  **Content:** Update `index.html` (Title, Meta, Schema, OG tags).
5.  **Routes:** Define pages in `App.tsx`, including 404 catch-all route.
6.  **Run:** `npm install && npm run dev`.

### Development Checklist
- [ ] Brand colors configured in `tailwind.config.js`
- [ ] Fonts loaded in `index.html`
- [ ] Navbar with logo, links, and CTAs
- [ ] Footer with contact info and links
- [ ] Home page with all required sections
- [ ] Service pages created
- [ ] Contact page with `PlaceholderForm`
- [ ] 404 page added
- [ ] SEO meta tags and Schema.org JSON-LD
- [ ] Open Graph tags for social sharing
- [ ] Favicon and OG image in `/public`
- [ ] All links working (internal and external)
- [ ] Mobile responsive on all pages

### Testing Before Handoff
*   Test all navigation links
*   Verify responsive design (mobile, tablet, desktop)
*   Check all images load correctly
*   Validate Schema.org markup (use Google's Rich Results Test)
*   Test page load speed (Lighthouse audit)

---

## 9. Image & Asset Guidelines

### File Organization
```text
src/assets/
├── images/
│   ├── hero-home.webp       # Hero images
│   ├── about-team.jpg       # Team/about photos
│   ├── service-[name].jpg   # Service-specific images
│   └── testimonial-[name].jpg
├── icons/                   # Custom icons (if needed)
└── logo/
    ├── logo.svg             # Primary logo (SVG preferred)
    ├── logo-white.svg       # White version for dark backgrounds
    └── logo.png             # Fallback PNG
```

### Naming Conventions
*   Use lowercase with hyphens: `hero-background.webp` (not `HeroBackground.webp`)
*   Be descriptive: `service-tax-planning.jpg` (not `img1.jpg`)
*   Include size if multiple versions: `logo-200.png`, `logo-400.png`

### Recommended Formats
| Use Case | Format | Notes |
|----------|--------|-------|
| Photos | `.webp` | Best compression, wide browser support |
| Photos (fallback) | `.jpg` | Use for older browser compatibility |
| Logos/Icons | `.svg` | Scalable, smallest file size |
| Screenshots/Graphics | `.png` | When transparency needed |
| OG Image | `.jpg` | 1200x630px for social sharing |
| Favicon | `.ico` | 32x32 or 16x16 |

### Image Optimization Tips
*   Compress images before adding to project (use tools like Squoosh, TinyPNG)
*   Hero images: max 1920px wide, aim for < 200KB
*   Thumbnails/cards: max 600px wide, aim for < 50KB
*   Always include `alt` text for accessibility

---

## 10. Accessibility Checklist

Ensure basic accessibility compliance on all sites:

### Images
- [ ] All `<img>` tags have descriptive `alt` attributes
- [ ] Decorative images use `alt=""`
- [ ] Complex images have extended descriptions if needed

### Color & Contrast
- [ ] Text has minimum 4.5:1 contrast ratio against background
- [ ] Links are distinguishable from regular text (not just by color)
- [ ] Focus states are clearly visible on interactive elements

### Keyboard Navigation
- [ ] All interactive elements are reachable via Tab key
- [ ] Focus order follows logical reading order
- [ ] No keyboard traps (user can always Tab out)
- [ ] Skip link provided for main content (optional but recommended)

### Semantic HTML
- [ ] Use proper heading hierarchy (`h1` > `h2` > `h3`, etc.)
- [ ] Only one `<h1>` per page
- [ ] Use `<nav>`, `<main>`, `<footer>` landmarks
- [ ] Forms have associated `<label>` elements

### Interactive Elements
- [ ] Buttons use `<button>`, links use `<a>`
- [ ] Touch targets minimum 44x44 pixels
- [ ] Form inputs have visible labels (not just placeholders)

### Quick Fixes
```tsx
// Bad: Missing alt text
<img src="team.jpg" />

// Good: Descriptive alt text
<img src="team.jpg" alt="Henderson Financial team in their Henderson office" />

// Bad: Click handler on div
<div onClick={handleClick}>Submit</div>

// Good: Proper button element
<button onClick={handleClick}>Submit</button>

// Bad: Placeholder as only label
<input placeholder="Email" />

// Good: Visible label
<label htmlFor="email">Email</label>
<input id="email" placeholder="you@example.com" />
```

---

## 11. Performance Best Practices

### Code Optimization
*   **Lazy load images:** Use `loading="lazy"` on images below the fold
*   **Code splitting:** React Router handles this automatically with lazy routes (optional)
*   **Tree shaking:** Import only needed icons from `lucide-react`

```tsx
// Bad: Imports entire library
import * as Icons from 'lucide-react';

// Good: Import only what you need
import { Phone, Mail, MapPin } from 'lucide-react';
```

### Font Loading
*   Use `font-display: swap` in Google Fonts URL to prevent invisible text
*   Limit to 2-3 font weights maximum

```html
<!-- Include font-display=swap -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

### Image Optimization
*   Use WebP format when possible
*   Specify `width` and `height` attributes to prevent layout shift
*   Use responsive images with `srcset` for hero images (optional)

```tsx
// Prevent layout shift with explicit dimensions
<img 
  src="hero.webp" 
  alt="..." 
  width={1200} 
  height={600}
  loading="lazy"
/>
```

### General Tips
*   Minimize third-party scripts (load after page content)
*   Use Vite's built-in optimizations (automatic in production build)
*   Run Lighthouse audit before deployment (aim for 90+ performance score)

---

## 12. Error Handling Patterns

### Form Validation
Display clear error messages for form inputs:

```tsx
const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

const validateForm = () => {
  const newErrors: typeof errors = {};
  
  if (!email) {
    newErrors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'Please enter a valid email';
  }
  
  if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
    newErrors.phone = 'Please enter a valid phone number';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Display error below input
<input type="email" className={errors.email ? 'border-red-500' : ''} />
{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
```

### Loading States
Show loading indicators during async operations:

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  try {
    await submitForm();
  } finally {
    setIsLoading(false);
  }
};

<button disabled={isLoading}>
  {isLoading ? 'Sending...' : 'Send Message'}
</button>
```

### Image Fallbacks
Handle broken images gracefully:

```tsx
<img 
  src="team.webp" 
  alt="Team photo"
  onError={(e) => {
    e.currentTarget.src = '/placeholder.jpg';
  }}
/>
```

---

## 13. Deployment to Vercel

### Pre-Deployment Checklist
- [ ] All development features removed (console.logs, test data)
- [ ] Environment variables configured (if any)
- [ ] Build completes without errors: `npm run build`
- [ ] Preview build locally: `npm run preview`
- [ ] All links use correct production URLs

### Vercel Setup

**Option 1: Deploy via Vercel CLI**
```bash
# Install Vercel CLI globally (one-time)
npm install -g vercel

# Deploy from site folder
cd site-name/
vercel

# Follow prompts to link to Vercel account
# For production deployment:
vercel --prod
```

**Option 2: Deploy via Git Integration**
1. Push site folder to GitHub repository
2. Import project in Vercel dashboard
3. Configure:
   *   **Framework Preset:** Vite
   *   **Root Directory:** `site-name/` (if monorepo)
   *   **Build Command:** `npm run build`
   *   **Output Directory:** `dist`

### Vercel Configuration (`vercel.json`)
Create in site root for SPA routing (handles client-side routes):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### Post-Deployment
*   Verify all pages load correctly
*   Test contact form (should show placeholder message)
*   Check mobile responsiveness on actual device
*   Validate OG tags with Facebook Sharing Debugger
*   Set up custom domain in Vercel dashboard (if applicable)

---

## 14. Git Conventions

### Branch Naming
Use descriptive branch names with prefixes:

| Prefix | Use Case | Example |
|--------|----------|---------|
| `feat/` | New feature or site | `feat/henderson-financial` |
| `fix/` | Bug fixes | `fix/navbar-mobile-menu` |
| `update/` | Content or style updates | `update/henderson-services` |
| `chore/` | Maintenance, config changes | `chore/update-dependencies` |

### Commit Messages
Write clear, concise commit messages:

**Format:** `type: brief description`

**Types:**
*   `feat:` New feature or component
*   `fix:` Bug fix
*   `style:` Styling changes (no logic change)
*   `content:` Content updates (text, images)
*   `refactor:` Code restructuring
*   `chore:` Build, config, dependencies

**Examples:**
```
feat: add Henderson Financial homepage
fix: correct mobile nav dropdown z-index
style: update hero section spacing
content: add testimonials to home page
chore: update Tailwind to v3.4
```

### Workflow
1.  Create feature branch from `main`: `git checkout -b feat/site-name`
2.  Make commits with clear messages
3.  Push branch: `git push -u origin feat/site-name`
4.  Create Pull Request for review (if team workflow)
5.  Merge to `main` after approval
6.  Deploy from `main` branch

### .gitignore
Ensure these are ignored (should be in root `.gitignore`):

```
node_modules/
dist/
.env
.env.local
.DS_Store
*.log
```

---

## 15. Post-Build Integrations

These integrations are added **after** the initial site build is complete and deployed.

### LeadConnector Form Integration
1.  Get form embed code from HighLevel/LeadConnector CRM
2.  Replace `PlaceholderForm` with `LeadConnectorForm` component
3.  Pass the `formId` from your CRM

```tsx
// Replace this:
<PlaceholderForm />

// With this:
<LeadConnectorForm formId="your-form-id-from-crm" height={500} />
```

### Google Reviews Widget
1.  Get widget embed code from CRM or Google Business Profile tool
2.  Replace `ReviewsWidget` placeholder with actual embed code
3.  Usually an iframe or script injection

```tsx
// Replace placeholder with actual widget
<div 
  dangerouslySetInnerHTML={{ 
    __html: `<script src="your-reviews-widget-script"></script>` 
  }} 
/>
```

### Google Analytics / Tag Manager
Add tracking scripts to `index.html` in the `<head>`:

```html
<!-- Google Tag Manager -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Integration Checklist
- [ ] LeadConnector form connected and submitting to CRM
- [ ] Google Reviews widget displaying live reviews
- [ ] Analytics tracking installed and verified
- [ ] Form submissions appearing in CRM dashboard
- [ ] Test conversion tracking (if applicable)

---

## Quick Reference

### Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
vercel --prod
```

### Key Files to Update for New Site
1. `BUSINESS_INFO.md` - Business information
2. `tailwind.config.js` - Brand colors and fonts
3. `index.html` - Title, meta, Schema.org, OG tags
4. `src/App.tsx` - Routes
5. `src/components/Navbar.tsx` - Logo, links
6. `src/components/Footer.tsx` - Contact info
7. `public/` - Favicon, OG image

### Related Documentation
*   `SCRAPING_INSTRUCTIONS.md` - Guide for gathering business information
*   `agent-browser.skill.md` - Automated browser tool documentation
