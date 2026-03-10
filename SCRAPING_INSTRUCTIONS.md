# Scraping Instructions - How to Collect Business Information

This document provides instructions on what information to collect from a business website to populate `BUSINESS_INFO.md` files in each business folder.

---

## Purpose

When creating a new website for a business, you need comprehensive information about the company. This guide tells you what to look for and where to find it on their existing website.

---

## Using agent-browser Tool

**agent-browser** is an automated browser tool that can help you efficiently collect information from business websites. It's especially useful for:

- Large websites with many pages
- Extracting structured data (lists, tables, testimonials)
- Taking screenshots of logos and visual assets
- Navigating complex site structures
- Collecting consistent data across multiple businesses

**Benefits over manual browsing**:
- Faster data extraction
- Repeatable processes
- Automated screenshots
- Programmable workflows
- Reduced human error

**Reference**: See `agent-browser.skill.md` in this directory for complete command documentation and advanced features.

---

## When to Use Manual vs Automated

### Use agent-browser for:
- Large/complex websites with many pages
- Collecting consistent data across multiple businesses
- Extracting structured data (lists, tables, testimonials)
- Taking screenshots of assets (logos, team photos, offices)
- Navigating complex site structures
- When you need to automate repetitive tasks
- When you need precise element-by-element extraction

### Use manual browsing for:
- Small/simple websites (1-3 pages)
- Understanding brand voice and tone (requires human judgment)
- Finding nuanced information (context, relationships between sections)
- Quick visual inspection of overall design
- When you need to understand the user experience
- When automated extraction is unreliable due to dynamic content

**Best approach**: Combine both methods - use agent-browser for structured data collection, then manually review and supplement with insights that require human judgment.

---

## agent-browser Workflow

1. **Navigate**: `agent-browser open <url>`
2. **Snapshot**: `agent-browser snapshot -i` (finds interactive elements with refs like `@e1`, `@e2`)
3. **Extract**: Use refs to get text, take screenshots, or interact with elements
4. **Repeat**: Re-snapshot after page navigation or significant DOM changes

**Core pattern**:
```bash
agent-browser open https://example-business.com
agent-browser snapshot -i
agent-browser get text @e1  # Extract specific information
agent-browser screenshot logo.png  # Save visual assets
```

**Remember**: Always re-run `snapshot -i` after navigating to a new page to get fresh element references.

---

## Information to Collect

### 1. Business Contact Information
- Phone number(s)
- Email address(es)
- Physical address
- Social media links (LinkedIn, Facebook, Instagram, etc.)
- Website URL

### 2. Services Offered
- Complete list of all services they provide
- Brief description of each service
- Service categories (if applicable)
- Any specialized or niche services

### 3. Target Audience
- Who they serve (small businesses, individuals, corporations, etc.)
- Industry specialties (healthcare, real estate, tech, etc.)
- Geographic focus (local, regional, national)
- Business sizes they work with

### 4. Founder/Owner Information
- Name(s) of founders/owners
- Credentials and certifications (CPA, JD, PhD, etc.)
- Professional background and experience
- Years in the industry
- Education (if relevant)

### 5. Years in Business
- How long the company has been operating
- Any milestone years or founding date
- Notable history (rebrands, expansions, etc.)

### 6. Brand Voice & Tone
- How they communicate (professional, friendly, casual, formal)
- Key phrases and language they use
- Writing style descriptors
- Examples of their communication style

### 7. Location Information
- Full physical address
- City and state
- Areas served (neighborhoods, counties, regions)
- Service radius (if applicable, e.g., "within 50 miles")

### 8. Hours of Operation
- Regular business hours (Monday-Friday)
- Weekend hours (if any)
- After-hours availability or emergency services
- Seasonal hours (if applicable)

### 9. Client Reviews & Testimonials
- 3-5 standout testimonials
- What clients praise most
- Star ratings (if available)
- Any awards or recognition received

### 10. Certifications & Licenses
- Professional certifications
- Industry accreditations
- Board memberships
- State or local licenses required for their industry

### 11. Key Differentiators
- What makes them unique from competitors
- Competitive advantages
- Special offers or guarantees
- Unique value proposition

### 12. Visual Assets
- **Logos:** Look for high-quality versions (SVG or transparent PNG preferred) in the header or footer.
- **Team Photos:** Save professional headshots of founders and key team members.
- **Naming Convention:** Rename files clearly upon saving (e.g., `founder-name.jpg`, `logo-main.png`, `office-exterior.jpg`).

### 13. SEO & Metadata
- **Page Titles:** Note the browser tab titles for key pages to understand their primary keywords.
- **Meta Descriptions:** If possible, view the page source or search result description to see how they summarize their business for search engines.

### 14. Additional Valuable Information
- Pricing information (if publicly available)
- Payment methods accepted
- Insurance accepted (if applicable)
- Industry-specific details (for CPAs: tax year deadlines, etc.)
- Company mission or values
- Team size

---

## Where to Find This Information

### Homepage
- Overview of what the business does
- Taglines and key messaging
- Main services highlighted
- Quick contact info (often in header/footer)

### About Us / About Page
- Founder/owner information
- Company history and years in business
- Mission and values
- Team bios and credentials

### Services / Services Offered Page
- Complete list of all services
- Detailed descriptions of each service
- Service categories

### Contact Page
- Full address
- Phone number(s)
- Email address(es)
- Business hours
- Contact form (for email address)
- Map location

### Testimonials / Reviews Page
- Client testimonials
- Star ratings
- Case studies
- Success stories

### Team Page
- Staff credentials and bios
- Certifications and education
- Experience levels

### Footer
- Often contains:
  - Physical address
  - Phone number
  - Email
  - Business hours
  - Social media links
  - Quick links to services

### Google Business Profile (if linked)

If the Google Business Profile is not linked, do a Google Search of the business to find their Google Business Profile

- Reviews and testimonials
- Hours of operation
- Address and phone
- Photos

---

## Practical Examples with agent-browser

### Contact Information
```bash
agent-browser open https://example.com
agent-browser snapshot -i  # Find footer/contact elements
agent-browser get text @e5  # Phone number
agent-browser get text @e6  # Email address
agent-browser get text @e7  # Address
```

### Services Extraction
```bash
agent-browser open https://example.com/services
agent-browser snapshot -i
agent-browser get text @e10  # Service 1
agent-browser get text @e11  # Service 2
agent-browser get text @e12  # Service 3
# Continue for all services
```

### Visual Assets
```bash
agent-browser open https://example.com
agent-browser screenshot logo.png  # Logo from header
agent-browser screenshot team.jpg  # Team photos from About page
agent-browser screenshot office.png  # Office/location images
```

### Testimonials
```bash
agent-browser open https://example.com/testimonials
agent-browser snapshot -i
agent-browser get text @e20  # First testimonial
agent-browser get text @e21  # Second testimonial
agent-browser get text @e22  # Third testimonial
```

### Page Metadata
```bash
agent-browser open https://example.com
agent-browser get title  # Page title for SEO
agent-browser get url  # Current URL
```

---

## Tips for Collecting Information

### General Tips
- **Note inconsistencies** across pages (e.g., different phone numbers listed)
- **Capture multiple testimonials** so you have options to choose the best ones
- **Look for credentials and certifications** in bios, about pages, and footers
- **Check multiple pages** for complete service lists (services may be spread across pages)
- **Take note of any unique terminology** they use for their services
- **Identify their target audience** by looking at how they describe their clients
- **Save images immediately** to a dedicated assets folder to avoid having to go back for them later.

### agent-browser Specific Tips
- **Use `snapshot -i` first** to identify interactive elements before extracting
- **Re-snapshot after navigation** to get fresh element references
- **Use `--json` flag** if you need to parse output programmatically: `agent-browser get text @e1 --json`
- **Take screenshots** of logos, team photos, and office images
- **Use wait commands** for pages with dynamic content or loading animations
- **Check element visibility** before extraction: `agent-browser is visible @e1`
- **Reference `agent-browser.skill.md`** for complete command documentation

---

## Error Handling Tips

### Common Issues and Solutions

**Element not found**
- Re-run `snapshot -i` after waiting for load
- Use `agent-browser wait --load networkidle` before extracting
- Try semantic locators: `agent-browser find text "Contact" click`

**Timeouts**
- Increase wait time: `agent-browser wait 5000` (5 seconds)
- Wait for specific element: `agent-browser wait @e1`
- Wait for network idle: `agent-browser wait --load networkidle`

**Dynamic content**
- Use `agent-browser wait @e1` to wait for specific elements to appear
- Scroll down to load lazy content: `agent-browser scroll down 500`
- Check if element is visible: `agent-browser is visible @e1`

**Broken selectors**
- Try semantic locators: `agent-browser find role button click --name "Submit"`
- Find by text: `agent-browser find text "Services" click`
- Re-snapshot to get fresh refs

**Connection issues**
- Check if site requires cookies/auth: `agent-browser state load auth.json`
- Set viewport size: `agent-browser set viewport 1920 1080`
- Check if site blocks bots: Try with `--headed` flag to see what's happening

**Multiple elements**
- Use `agent-browser get count ".service"` to verify element count
- Use `agent-browser find nth 2 "a"` to select specific occurrence
- Use `agent-browser find first ".item"` to get first match

**Viewport issues**
- Set viewport: `agent-browser set viewport 1920 1080`
- Try mobile emulation: `agent-browser set device "iPhone 14"`
- Scroll element into view: `agent-browser scrollintoview @e1`

**Debugging**
- Use `--headed` flag to see browser: `agent-browser open example.com --headed`
- Check console errors: `agent-browser errors`
- Record session: `agent-browser record start debug.webm`

---

## agent-browser Command Quick Reference

| Task | Command |
|------|---------|
| Navigate to page | `agent-browser open <url>` |
| Find interactive elements | `agent-browser snapshot -i` |
| Get element text | `agent-browser get text @e1` |
| Get element HTML | `agent-browser get html @e1` |
| Get element attribute | `agent-browser get attr @e1 href` |
| Take screenshot | `agent-browser screenshot path.png` |
| Full page screenshot | `agent-browser screenshot --full` |
| Get page title | `agent-browser get title` |
| Get current URL | `agent-browser get url` |
| Count elements | `agent-browser get count ".service"` |
| Click element | `agent-browser click @e1` |
| Fill input | `agent-browser fill @e1 "text"` |
| Scroll down | `agent-browser scroll down 500` |
| Wait for element | `agent-browser wait @e1` |
| Wait for network idle | `agent-browser wait --load networkidle` |
| Check visibility | `agent-browser is visible @e1` |
| Find by text | `agent-browser find text "Services" click` |
| Find by role | `agent-browser find role button click --name "Submit"` |
| Set viewport | `agent-browser set viewport 1920 1080` |
| Check console errors | `agent-browser errors` |
| Close browser | `agent-browser close` |

---

## BUSINESS_INFO.md Template

Copy this template into each business folder and fill in the information you've collected:

```markdown
# BUSINESS - Company Context & Services

## Company Overview
[Brief 2-3 sentence description of what the business does]

## Target Audience
- [Who they serve - e.g., Small businesses in the healthcare industry]
- [Another audience segment]
- [And so on...]

## Services Offered

### [Service Category 1]
- [Service 1]: [Brief description]
- [Service 2]: [Brief description]

### [Service Category 2]
- [Service 3]: [Brief description]
- [Service 4]: [Brief description]

## Founder/Owner Information
- **Name**: [Name]
- **Credentials**: [CPA, JD, PhD, etc.]
- **Background**: [Brief professional background]
- **Experience**: [Years in industry]

## Years in Business
[Number of years or founding year]

## Brand Voice & Tone
[Describe their communication style - e.g., Professional, approachable, expert, friendly]

## Location Information
- **Address**: [Street address, City, State, ZIP]
- **City**: [City, State]
- **Areas Served**: [List specific neighborhoods, counties, or regions]

## Contact Information
- **Phone**: [Phone number]
- **Email**: [Email address]
- **Website**: [Website URL]
- **Social Media**: [LinkedIn, Facebook, Instagram links]

## Hours of Operation
[Example: Monday-Friday 9:00 AM - 5:00 PM]

## Certifications & Licenses
- [Certification 1]
- [Certification 2]
- [License details if applicable]

## Key Differentiators
- [What makes them unique - bullet points]
- [Competitive advantages]
- [Special offers or guarantees]

## Client Reviews & Testimonials
- **[Client Name/Company]**: "[Testimonial text]"
- **[Client Name/Company]**: "[Testimonial text]"
- **[Client Name/Company]**: "[Testimonial text]"

## SEO Basics
- **Current Title Tag**: [Copy from homepage]
- **Meta Description**: [Copy from homepage or search result]

## Visual Assets Checklist
- [ ] Logo saved
- [ ] Founder/Team photos saved
- [ ] Office/Location photos saved

## Additional Information
[Any other relevant details - pricing, payment methods, insurance, etc.]
```

---

## Quick Checklist

Before moving to website development, make sure you have:

- [ ] All contact information (phone, email, address)
- [ ] Complete list of services
- [ ] Target audience identified
- [ ] Founder/owner details
- [ ] Years in business
- [ ] Brand voice documented
- [ ] Location and service areas
- [ ] Business hours
- [ ] At least 3 testimonials
- [ ] Certifications and licenses
- [ ] Key differentiators
- [ ] Visual assets (Logo, Team, Office)
- [ ] Basic SEO info (Title, Description)
- [ ] Any industry-specific details

---

## Where to Place BUSINESS_INFO.md

Create a `BUSINESS_INFO.md` file in each business folder:

```
gemini-sites/
├── SCRAPING_INSTRUCTIONS.md      (This file)
├── agent-browser.skill.md         (Tool reference)
├── henderson-financial/
│   └── BUSINESS_INFO.md          (Create this)
├── mash-cpa/
│   └── BUSINESS_INFO.md          (Create this)
└── [other-business-folders]/
    └── BUSINESS_INFO.md          (Create this)
```
