import re

with open('index-claude.html', 'r') as f:
    content = f.read()

# 1. Reduce logo mark size to stop overlap
content = content.replace('''    .hero-logo-mark {
      width: 220px;
      height: auto;
      margin-bottom: 20px;''', '''    .hero-logo-mark {
      width: 140px;
      height: auto;
      margin-bottom: 12px;''')

# 2. Adjust hero-left padding to not get covered by ticker or overlap from nav
content = content.replace('''    .hero-left {
      position: relative;
      z-index: 2;
      width: 52%;
      height: 100%;
      background: var(--black);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 100px 64px 80px 72px;''', '''    .hero-left {
      position: relative;
      z-index: 2;
      width: 52%;
      height: 100%;
      background: var(--black);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 100px 64px 100px 72px;''')

# 3. Reduce headline line-height slightly to fit better
content = content.replace('''      line-height: 1.0;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      margin-bottom: 32px;''', '''      line-height: 0.95;
      letter-spacing: 0.01em;
      text-transform: uppercase;
      margin-bottom: 24px;''')

# 4. Reduce sub text margin bottom
content = content.replace('''    .hero-sub {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.65;
      color: rgba(255,255,255,0.5);
      max-width: 380px;
      margin-bottom: 40px;''', '''    .hero-sub {
      font-family: 'Inter', sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 1.6;
      color: rgba(255,255,255,0.5);
      max-width: 380px;
      margin-bottom: 28px;''')

with open('index-claude.html', 'w') as f:
    f.write(content)

print("HTML spacing modified successfully.")
