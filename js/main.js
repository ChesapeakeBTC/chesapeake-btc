/**
 * Chesapeake Bitcoin — The Causeway
 * js/main.js
 *
 * - Navbar: hamburger toggle + Contact scroll
 * - index.html: render last 3 meetups from data/meetups.json
 * - meetups.html: render all meetups from data/meetups.json
 * - resources.html: render grouped resources from data/resources.json
 */

/* ────────────────────────────────────────────────────────────
   Helpers
──────────────────────────────────────────────────────────── */

/** Resolve data paths relative to the script location so pages
 *  work when opened directly as files (file:// protocol). */
function dataPath(filename) {
  // Works for both file:// and http://
  const base = document.currentScript
    ? document.currentScript.src.replace(/js\/main\.js.*$/, '')
    : window.location.href.replace(/[^/]*$/, '');
  return base + 'data/' + filename;
}

function formatDate(dateStr) {
  // Already a human-readable string in our JSON
  return dateStr;
}

/* ────────────────────────────────────────────────────────────
   Navbar — Hamburger + Contact scroll
──────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      // Prevent body scroll when menu open
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close menu on scroll attempt (touchmove or wheel)
    function closeMenuOnScroll() {
      if (navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
    window.addEventListener('wheel', closeMenuOnScroll, { passive: true });
    window.addEventListener('touchmove', closeMenuOnScroll, { passive: true });
  }

  // "Contact" nav link → smooth scroll to footer
  document.querySelectorAll('a[href="#contact"], a[href*="#contact"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const footer = document.querySelector('#contact');
      if (footer) {
        e.preventDefault();
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // Route to the right loader
  if (document.getElementById('recent-meetups')) {
    loadRecentMeetups();
  }
  if (document.getElementById('all-meetups')) {
    loadAllMeetups();
  }
  if (document.getElementById('resources-list')) {
    loadResources();
  }
});

/* ────────────────────────────────────────────────────────────
   Fetch wrapper — works on file:// (array input) and http://
──────────────────────────────────────────────────────────── */

async function fetchJSON(filename) {
  const url = dataPath(filename);
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Failed to load ${filename}: ${resp.status}`);
  return resp.json();
}

/* ────────────────────────────────────────────────────────────
   index.html — Recent Meetups (last 3)
──────────────────────────────────────────────────────────── */

async function loadRecentMeetups() {
  const container = document.getElementById('recent-meetups');
  if (!container) return;

  container.innerHTML = '<p class="loading-state">Loading meetups…</p>';

  try {
    const meetups = await fetchJSON('meetups.json');
    // Sort newest first, take last 3
    const sorted = [...meetups].sort((a, b) => (b.date > a.date ? 1 : -1));
    const recent = sorted.slice(0, 3);

    if (recent.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No meetups yet — stay tuned!</p></div>';
      return;
    }

    container.innerHTML = recent.map(m => `
      <article class="meetup-card">
        <div class="card-date">${m.date}</div>
        <h3 class="card-title">${escapeHTML(m.title)}</h3>
        <p class="card-excerpt">${escapeHTML(m.excerpt)}</p>
        <div class="card-actions">
          <a href="meetups.html#meetup-${escapeAttr(m.id)}" class="btn btn-secondary">View Recap</a>
        </div>
      </article>
    `).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<div class="empty-state"><p>Could not load meetups. Check back soon.</p></div>';
  }
}

/* ────────────────────────────────────────────────────────────
   meetups.html — All Meetups
──────────────────────────────────────────────────────────── */

async function loadAllMeetups() {
  const container = document.getElementById('all-meetups');
  if (!container) return;

  container.innerHTML = '<p class="loading-state">Loading meetup history…</p>';

  try {
    const meetups = await fetchJSON('meetups.json');
    const sorted = [...meetups].sort((a, b) => (b.date > a.date ? 1 : -1));

    if (sorted.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>No meetups recorded yet. Our first is on the way!</p></div>';
      return;
    }

    container.innerHTML = sorted.map(m => {
      const slidesBtn = m.slides
        ? `<a href="slides/${escapeAttr(m.slides)}" class="btn btn-secondary" target="_blank" rel="noopener">View Slides →</a>`
        : '';
      return `
        <article class="meetup-entry" id="meetup-${escapeAttr(m.id)}">
          <div class="entry-date">${m.date}</div>
          <h2 class="entry-title">${escapeHTML(m.title)}</h2>
          <p class="entry-recap">${escapeHTML(m.recap || m.excerpt)}</p>
          ${slidesBtn ? `<div class="entry-actions">${slidesBtn}</div>` : ''}
        </article>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<div class="empty-state"><p>Could not load meetup history.</p></div>';
  }
}

/* ────────────────────────────────────────────────────────────
   resources.html — Resources grouped by topic
──────────────────────────────────────────────────────────── */

async function loadResources() {
  const container = document.getElementById('resources-list');
  if (!container) return;

  container.innerHTML = '<p class="loading-state">Loading resources…</p>';

  try {
    const topics = await fetchJSON('resources.json');

    if (!topics || topics.length === 0) {
      container.innerHTML = '<div class="empty-state"><p>Resources coming soon.</p></div>';
      return;
    }

    container.innerHTML = topics.map(topic => {
      const cards = (topic.resources || []).map(r => {
        const dlBtn = r.file
          ? `<a href="slides/${escapeAttr(r.file)}" class="btn btn-secondary" target="_blank" rel="noopener" download>Download PDF →</a>`
          : r.url
          ? `<a href="${escapeHTML(r.url)}" class="btn btn-secondary" target="_blank" rel="noopener">Visit Site →</a>`
          : `<span class="btn btn-outline" style="opacity:0.45;cursor:default;">Coming Soon</span>`;
        return `
          <div class="resource-card">
            <div class="res-title">${escapeHTML(r.title)}</div>
            <p class="res-desc">${escapeHTML(r.description)}</p>
            <div class="res-actions">${dlBtn}</div>
          </div>
        `;
      }).join('');

      return `
        <section class="topic-section">
          <h2 class="topic-heading">${escapeHTML(topic.topic)}</h2>
          <div class="resource-list">${cards}</div>
        </section>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<div class="empty-state"><p>Could not load resources.</p></div>';
  }
}

/* ────────────────────────────────────────────────────────────
   Security helpers
──────────────────────────────────────────────────────────── */

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/[^a-zA-Z0-9_-]/g, '-');
}
