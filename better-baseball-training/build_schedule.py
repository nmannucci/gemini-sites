import re

with open('/Users/nico/Gemini/gemini-sites/better-baseball-training/index.html', 'r') as f:
    html = f.read()

parts = html.split('  <!-- ── HERO ─────────────────────────────────────────────────── -->')
head_and_nav = parts[0]

footer_parts = html.split('  <!-- ── FOOTER ────────────────────────────────────────────────── -->')
footer = '  <!-- ── FOOTER ────────────────────────────────────────────────── -->' + footer_parts[1]

# Modify the head title for schedule page
head_and_nav = head_and_nav.replace('<title>Better Baseball Training | It\'s Just Better.</title>', '<title>Class Schedule | Better Baseball Training</title>')

# Update nav in schedule to point to index for anchors
head_and_nav = head_and_nav.replace('href="#hero"', 'href="index.html#hero"')
head_and_nav = head_and_nav.replace('href="#lessons"', 'href="index.html#lessons"')
head_and_nav = head_and_nav.replace('href="#facilities"', 'href="index.html#facilities"')
head_and_nav = head_and_nav.replace('href="#memberships"', 'href="index.html#memberships"')

old_nav_links_index = """    <ul class="nav-links">
      <li><a href="index.html#hero">Home</a></li>
      <li><a href="index.html#lessons">Lessons</a></li>
      <li><a href="coaches.html">Coaches</a></li>
      <li><a href="index.html#facilities">Facilities</a></li>
      <li><a href="index.html#memberships">Memberships</a></li>
    </ul>"""

new_nav_links_schedule = """    <ul class="nav-links">
      <li><a href="index.html#hero">Home</a></li>
      <li><a href="index.html#lessons">Lessons</a></li>
      <li><a href="coaches.html">Coaches</a></li>
      <li><a href="#">Schedule</a></li>
      <li><a href="index.html#facilities">Facilities</a></li>
      <li><a href="index.html#memberships">Memberships</a></li>
    </ul>"""

head_and_nav = head_and_nav.replace(old_nav_links_index, new_nav_links_schedule)

schedule_content = """
  <-m pip install --upgrade ── PAGE HERO ───────────────────────────────────────────── -->
  <section class="page-hero" style="position: relative; height: 35vh; min-height: 350px; display: flex; align-items: center; justify-content: center; overflow: hidden; background: var(--black); border-bottom: 1px solid rgba(255,255,255,0.05); text-align: center; padding-top: 72px;">
    <div style="position: absolute; inset: 0; z-index: 1;">
      <img src="assets/images/hero-slideshow-1.PNG" alt="BBT Schedule" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.3; filter: grayscale(100%);" />
      <div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 100%);"></div>
    </div>
    <div style="position: relative; z-index: 2; max-width: 800px; padding: 0 40px;">
      <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: clamp(60px, 8vw, 100px); color: var(--white); line-height: 0.9; margin-bottom: 16px; text-transform: uppercase;">Class <em style="font-style: normal; color: var(--yellow);">Schedule</em></h1>
      <p style="font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 300; line-height: 1.6; color: rgba(255,255,255,0.85);">Book your next lesson or academy session below.</p>
    </div>
  </section>

  <-m pip install --upgrade ── SCHEDULE IFRAME ──────────────────────────────────────── -->
  <section class="schedule" style="padding: 100px 72px; background: var(--black2); position: relative;">
    <div style="max-width: 1200px; margin: 0 auto;">
      <-m pip install --upgrade Calendar Schedule -->
      <div style="overflow:scroll;-webkit-overflow-scrolling:touch;">
        <iframe style="width:100%;min-width: 600px; height: 920px; border: none; border-radius: 8px;" src="https://syncapp.wodhopper.com/gym/15529/rsvp/calendar"></iframe>
      </div>
    </div>
  </section>
"""

full_schedule_html = head_and_nav + "\n" + schedule_content + "\n" + footer

with open('/Users/nico/Gemini/gemini-sites/better-baseball-training/schedule.html', 'w') as f:
    f.write(full_schedule_html)
