import re

with open('index-claude.html', 'r') as f:
    content = f.read()

# 1. CSS variables
content = content.replace('''    :root {
      --yellow:  #F5C518;
      --yellow2: #FFDA44;
      --black:   #000000;
      --black2:  #0a0a0a;
      --black3:  #111111;
      --white:   #FFFFFF;
      --gray:    #888888;
      --gray2:   #333333;
    }''', '''    :root {
      --yellow:  #FFF200;
      --yellow2: #FFFF66;
      --pink:    #EC008C;
      --cyan:    #00AEEF;
      --black:   #000000;
      --black2:  #080808;
      --black3:  #111111;
      --white:   #FFFFFF;
      --gray:    #888888;
      --gray2:   #333333;
    }''')

# 2. Add mix-blend-mode to nav-logo
content = content.replace('''    .nav-logo {
      height: 44px;
      width: auto;
      opacity: 0;
      animation: fadeIn 0.6s 0.2s ease forwards;
    }''', '''    .nav-logo {
      height: 44px;
      width: auto;
      opacity: 0;
      animation: fadeIn 0.6s 0.2s ease forwards;
      mix-blend-mode: screen;
    }''')

# 3. Nav hover
content = content.replace('''    .nav-links a:hover { color: var(--yellow); }''', '''    .nav-links a:hover { color: var(--cyan); }''')

# 4. CTA
content = content.replace('''    .nav-cta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--black);
      background: var(--yellow);''', '''    .nav-cta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--white);
      background: var(--pink);''')

content = content.replace('''    .nav-cta:hover {
      background: var(--yellow2);''', '''    .nav-cta:hover {
      background: var(--cyan);
      color: var(--black);''')

# 5. Hero Stripe
content = content.replace('background: var(--yellow);\n      transform: skewX(-7deg);', 'background: var(--cyan);\n      transform: skewX(-7deg);')

# 6. Hero Logo Mark
content = content.replace('''    .hero-logo-mark {
      width: 72px;
      height: auto;
      margin-bottom: 20px;
      opacity: 0;
      animation: fadeUp 0.6s 0.3s ease forwards;
      filter: drop-shadow(0 0 20px rgba(245,197,24,0.25));
    }''', '''    .hero-logo-mark {
      width: 220px;
      height: auto;
      margin-bottom: 20px;
      opacity: 0;
      animation: fadeUp 0.6s 0.3s ease forwards;
      mix-blend-mode: screen;
    }''')

# 7. Hero badge
content = content.replace('''    .hero-badge-dot {
      width: 8px;
      height: 8px;
      background: var(--yellow);''', '''    .hero-badge-dot {
      width: 8px;
      height: 8px;
      background: var(--pink);''')

content = content.replace('''      color: var(--yellow);\n    }\n\n    .hero-headline {''', '''      color: var(--pink);\n    }\n\n    .hero-headline {''')

# 8. Hero headline line 2
content = content.replace('''    .hero-headline .line2 {
      display: block;
      font-size: clamp(72px, 9.5vw, 148px);
      color: var(--yellow);
      opacity: 0;
      animation: slideRight 0.7s 0.88s cubic-bezier(0.16,1,0.3,1) forwards;
      text-shadow: 4px 4px 0px rgba(0,0,0,0.6), 0 0 60px rgba(245,197,24,0.15);
    }''', '''    .hero-headline .line2 {
      display: block;
      font-size: clamp(72px, 9.5vw, 148px);
      color: var(--cyan);
      opacity: 0;
      animation: slideRight 0.7s 0.88s cubic-bezier(0.16,1,0.3,1) forwards;
      text-shadow: 4px 4px 0px rgba(0,0,0,0.6), 0 0 60px rgba(0, 174, 239, 0.25);
    }''')

# 9. Hero sub
content = content.replace('border-left: 3px solid var(--yellow);', 'border-left: 3px solid var(--pink);')

# 10. Btn primary
content = content.replace('''    .btn-primary {
      font-family: 'Teko', sans-serif;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--black);
      background: var(--yellow);''', '''    .btn-primary {
      font-family: 'Teko', sans-serif;
      font-size: 18px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--white);
      background: var(--pink);''')

content = content.replace('''    .btn-primary:hover {
      background: var(--yellow2);''', '''    .btn-primary:hover {
      background: var(--yellow);
      color: var(--black);''')

# 11. Btn outline
content = content.replace('''    .btn-outline:hover {
      border-color: var(--yellow);
      color: var(--yellow);''', '''    .btn-outline:hover {
      border-color: var(--cyan);
      color: var(--cyan);''')

# 12. Hero ticker
content = content.replace('''    .hero-ticker {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      z-index: 20;
      height: 64px;
      background: var(--yellow);''', '''    .hero-ticker {
      position: absolute;
      bottom: 0; left: 0; right: 0;
      z-index: 20;
      height: 64px;
      background: var(--cyan);''')

# 13. Services topbar
content = content.replace('background: linear-gradient(to right, var(--yellow) 60%, transparent);', 'background: linear-gradient(to right, var(--cyan), var(--pink), var(--yellow), transparent);')

# 14. Services watermark
content = content.replace('''    .services-watermark {
      position: absolute;
      right: -60px;
      top: 50%;
      transform: translateY(-50%);
      width: 550px;
      height: auto;
      opacity: 0.03;
      pointer-events: none;
      user-select: none;
    }''', '''    .services-watermark {
      position: absolute;
      right: -60px;
      top: 50%;
      transform: translateY(-50%);
      width: 550px;
      height: auto;
      opacity: 0.1;
      pointer-events: none;
      user-select: none;
      mix-blend-mode: screen;
    }''')

# 15. Services label and title
content = content.replace('color: var(--yellow);\n      display: block;\n      margin-bottom: 12px;\n    }', 'color: var(--cyan);\n      display: block;\n      margin-bottom: 12px;\n    }')
content = content.replace('    .services-title em {\n      font-style: normal;\n      color: var(--yellow);\n    }', '    .services-title em {\n      font-style: normal;\n      color: var(--pink);\n    }')

# 16. Service card hover
content = content.replace('border-bottom-color: var(--yellow);', 'border-bottom-color: var(--pink);')

# 17. Service number
content = content.replace('''    .service-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
      color: var(--yellow);''', '''    .service-number {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 42px;
      color: var(--cyan);''')

# 18. Service name and link
content = content.replace('''    .service-card:hover .service-name {
      color: var(--yellow);
    }''', '''    .service-card:hover .service-name {
      color: var(--pink);
    }''')
content = content.replace('''    .service-card:hover .service-link {
      color: var(--yellow);
    }''', '''    .service-card:hover .service-link {
      color: var(--cyan);
    }''')

# 19. Services divider
content = content.replace('background: linear-gradient(to right, var(--yellow), rgba(245,197,24,0.2), transparent);', 'background: linear-gradient(to right, var(--cyan), rgba(0, 174, 239, 0.2), transparent);')

# 20. Membership banner (rgba adjustments)
content = content.replace('border: 1px solid rgba(245,197,24,0.2);', 'border: 1px solid rgba(236, 0, 140, 0.2);')
content = content.replace('border-color: rgba(245,197,24,0.55);', 'border-color: var(--pink);')
content = content.replace('box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,197,24,0.15);', 'box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(236, 0, 140, 0.25);')
content = content.replace('background: linear-gradient(225deg, rgba(245,197,24,0.12) 0%, transparent 60%);', 'background: linear-gradient(225deg, rgba(0, 174, 239, 0.15) 0%, transparent 60%);')
content = content.replace('background: linear-gradient(225deg, rgba(245,197,24,0.22) 0%, transparent 60%);', 'background: linear-gradient(225deg, rgba(0, 174, 239, 0.25) 0%, transparent 60%);')
content = content.replace('background: var(--yellow);\n      transition: height 0.4s', 'background: var(--pink);\n      transition: height 0.4s')
content = content.replace('box-shadow: 2px 0 16px rgba(245,197,24,0.4);', 'box-shadow: 2px 0 16px rgba(236, 0, 140, 0.4);')
content = content.replace('color: var(--yellow);\n      margin-bottom: 10px;', 'color: var(--cyan);\n      margin-bottom: 10px;')
content = content.replace("content: '—';\n      position: absolute;\n      left: 0;\n      color: var(--yellow);", "content: '—';\n      position: absolute;\n      left: 0;\n      color: var(--pink);")

# Prices & Membership CTA
content = content.replace('''    .price-amount {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 52px;
      color: var(--yellow);
      line-height: 1;
    }''', '''    .price-amount {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 52px;
      color: var(--cyan);
      line-height: 1;
    }''')

content = content.replace('''    .membership-cta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--black);
      background: var(--yellow);''', '''    .membership-cta {
      font-family: 'DM Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--white);
      background: var(--pink);''')

content = content.replace('''    .membership-cta:hover {
      background: var(--yellow2);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(245,197,24,0.3);
    }''', '''    .membership-cta:hover {
      background: var(--cyan);
      color: var(--black);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 174, 239, 0.3);
    }''')


# Finally, IMAGE PATHS replacements in HTML
content = content.replace('<img src="assets/images/logo-bbt.png" alt="Better Baseball Training" class="nav-logo" />', '<img src="assets/brand-assets/BBT Logo 2.jpeg" alt="Better Baseball Training" class="nav-logo" />')
content = content.replace('<img src="assets/images/logo-american-b-white.png" alt="BBT" class="hero-logo-mark" />', '<img src="assets/brand-assets/BBT Logo 1.jpeg" alt="BBT" class="hero-logo-mark" />')
content = content.replace('<img\n      src="assets/images/logo-bbt.png"\n      alt=""\n      class="services-watermark"\n      aria-hidden="true"\n    />', '<img\n      src="assets/brand-assets/BBT Logo 2.jpeg"\n      alt=""\n      class="services-watermark"\n      aria-hidden="true"\n    />')


with open('index-claude.html', 'w') as f:
    f.write(content)

print("HTML modified successfully.")
