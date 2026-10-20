/*
 * main.js: builds the pages from the data in content.js.
 * You normally don't need to edit this file.
 */

const NAV = [
  { page: "about", label: "About", href: "index.html" },
  { page: "publications", label: "Publications", href: "publications.html" },
  { page: "works", label: "Other works", href: "works.html" },
  { page: "cv", label: "CV", href: "cv.html" },
  { page: "passions", label: "Passions", href: "passions.html" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PAGE = document.body.dataset.page;
const app = document.getElementById("app");

/* ---------- helpers ---------- */

const filled = (v) => (Array.isArray(v) ? v.length > 0 : v != null && String(v).trim() !== "");

// For text pasted from arXiv: a "<" in the math must not be read as HTML
const escapeHtml = (s) => String(s).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);

// 1-12 from a month written as a number (3) or a name ("March", "Mar"); 0 if missing
const monthNumber = (m) =>
  Number(m) || MONTHS.findIndex((name) => String(m).toLowerCase().startsWith(name.toLowerCase())) + 1;

// "Mar 2026" from { month: 3, year: 2026 }
const formatDate = (item) => [MONTHS[monthNumber(item.month) - 1], item.year].filter(filled).join(" ");

// Newest first, by year and then by month
const byDate = (list) =>
  [...list].sort((a, b) => (b.year || 0) - (a.year || 0) || monthNumber(b.month) - monthNumber(a.month));

// Label for a link: "pdf" for PDF files, "link" otherwise
const linkLabel = (url) => (/\.pdf$/i.test(url) ? "pdf" : "link");

// "Jane Doe", "Jane Doe and John Smith", "Jane Doe, John Smith and Ann Lee"
const joinNames = (names) =>
  names.length > 1 ? names.slice(0, -1).join(", ") + " and " + names[names.length - 1] : names.join("");

const arxivUrl = (v) => (/^https?:/.test(v) ? v : "https://arxiv.org/abs/" + v);

// "<em>Category</em> · rest", e.g. "<em>Presentation</em> · Sep 2026"
const metaLine = (category, rest) =>
  [filled(category) && `<em>${category}</em>`, filled(rest) && rest].filter(Boolean).join(" · ");

// Sorts the entries by date and renders them under one heading per year.
// Entries without a title (not filled in yet) are skipped.
function listByYear(items, renderEntry) {
  let html = "";
  let year = null;
  byDate(items.filter((item) => filled(item.title))).forEach((item, i) => {
    const y = item.year || "Other";
    if (y !== year) {
      html += `${year === null ? "" : "</ul>"}<h2 class="group">${y}</h2><ul class="entries">`;
      year = y;
    }
    html += renderEntry(item, i);
  });
  return html && html + "</ul>";
}

// Plain text with paragraphs separated by an empty line -> <p> elements
const paragraphs = (text) =>
  String(text || "")
    .split(/\n\s*\n/)
    .filter(filled)
    .map((p) => `<p>${p.trim()}</p>`)
    .join("");

const initials = () => SITE.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

// Called when the photo is missing: shows the initials instead (and drops the photo's caption)
function showAvatar(img) {
  img.parentElement.querySelector("figcaption")?.remove();
  img.outerHTML = `<div class="photo avatar" role="img" aria-label="${SITE.name}">${initials()}</div>`;
}

/* ---------- header ---------- */

function renderHeader() {
  const links = NAV.map(
    (n) => `<a href="${n.href}"${n.page === PAGE ? ' aria-current="page"' : ""}>${n.label}</a>`
  ).join("");
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<header class="site-header"><div class="wrap">
      <a class="site-name" href="index.html">${SITE.name}</a>
      <nav>${links}</nav>
    </div></header>`
  );
}

/* ---------- about (home) ---------- */

function renderAbout() {
  const c = SITE.contact || {};
  const affiliation = filled(SITE.affiliationUrl)
    ? `<a href="${SITE.affiliationUrl}">${SITE.affiliation}</a>`
    : SITE.affiliation;
  const role = [SITE.position, affiliation].filter(filled).join("<br>");

  const bio = paragraphs(SITE.bio);

  const photo = filled(SITE.photo)
    ? `<img class="photo" src="${SITE.photo}" alt="Photo of ${SITE.name}" onerror="showAvatar(this)">` +
      (filled(SITE.photoCaption) ? `<figcaption>${SITE.photoCaption}</figcaption>` : "")
    : `<div class="photo avatar" role="img" aria-label="${SITE.name}">${initials()}</div>`;

  const profiles = (SITE.links || [])
    .filter((l) => filled(l.url))
    .map((l) => `<a href="${l.url}">${l.label}</a>`)
    .join(" · ");

  const contact = [
    ["Email", filled(c.email) && `<a href="mailto:${c.email}">${c.email}</a>`],
    ["Address", filled(c.address) && c.address],
    ["Office", filled(c.office) && c.office],
    ["Phone", filled(c.phone) && c.phone],
    ["Profiles", profiles],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<dt>${label}</dt><dd>${value}</dd>`)
    .join("");

  const interests = filled(SITE.interests)
    ? `<h2>Research interests</h2><p>${SITE.interests.join(", ")}.</p>`
    : "";

  const news = filled(SITE.news)
    ? `<h2>News</h2>
       <ul class="news">${SITE.news
         .map((n) => `<li><span class="date">${n.date || ""}</span><span>${n.text}</span></li>`)
         .join("")}</ul>`
    : "";

  // Always shown, right after the bio
  const contactSection = `
    <h2>Contact</h2>
    ${contact ? `<dl class="contact">${contact}</dl>` : `<p class="empty">Contact details coming soon.</p>`}`;

  app.innerHTML = `
    <div class="about">
      <figure class="about-photo">${photo}</figure>
      <div class="about-text">
        <h1>${SITE.name}</h1>
        ${role ? `<p class="role">${role}</p>` : ""}
        ${bio}
        ${contactSection}
        ${interests}
        ${news}
      </div>
    </div>`;
}

/* ---------- publications ---------- */

function publicationEntry(p, i) {
  const meta = metaLine(p.field, [p.journal, formatDate(p)].filter(filled).join(", "));
  const abstractButton = filled(p.abstract)
    ? `<button class="btn" type="button" data-toggle="abstract-${i}" aria-expanded="false">abstract</button>`
    : "";
  const arxivButton = filled(p.arxiv) ? `<a class="btn" href="${arxivUrl(p.arxiv)}">arXiv</a>` : "";

  return `
    <li class="entry">
      <div class="entry-title">${escapeHtml(p.title)}</div>
      ${filled(p.coauthors) ? `<div class="entry-meta">with ${joinNames(p.coauthors)}</div>` : ""}
      ${meta ? `<div class="entry-meta">${meta}</div>` : ""}
      ${abstractButton || arxivButton ? `<div class="entry-links">${abstractButton}${arxivButton}</div>` : ""}
      ${abstractButton ? `<div class="abstract" id="abstract-${i}" hidden>${escapeHtml(p.abstract)}</div>` : ""}
    </li>`;
}

function renderPublications() {
  const scholar = (SITE.links || []).find((l) => /scholar/i.test(l.label) && filled(l.url));

  app.innerHTML = `
    <h1>Publications</h1>
    ${scholar ? `<p class="lead">An up-to-date list is also available on <a href="${scholar.url}">Google Scholar</a>.</p>` : ""}
    ${listByYear(PUBLICATIONS, publicationEntry) || `<p class="empty">No publications yet.</p>`}`;
}

/* ---------- other works ---------- */

function workEntry(w, i) {
  const meta = metaLine(w.type, formatDate(w));
  const abstractButton = filled(w.abstract)
    ? `<button class="btn" type="button" data-toggle="abstract-${i}" aria-expanded="false">abstract</button>`
    : "";
  const linkButton = filled(w.link) ? `<a class="btn" href="${w.link}">${linkLabel(w.link)}</a>` : "";

  return `
    <li class="entry">
      <div class="entry-title">${w.title}</div>
      ${meta ? `<div class="entry-meta">${meta}</div>` : ""}
      ${filled(w.description) ? `<div class="entry-desc">${w.description}</div>` : ""}
      ${abstractButton || linkButton ? `<div class="entry-links">${abstractButton}${linkButton}</div>` : ""}
      ${abstractButton ? `<div class="abstract" id="abstract-${i}" hidden>${escapeHtml(w.abstract)}</div>` : ""}
    </li>`;
}

function renderWorks() {
  app.innerHTML = `
    <h1>Other works</h1>
    <p class="lead">Theses, presentations, posters and other work that is not a publication.</p>
    ${listByYear(WORKS, workEntry) || `<p class="empty">Nothing here yet.</p>`}`;
}

/* ---------- passions ---------- */

// A quote shown like a book epigraph under a section title
function epigraph(q) {
  if (!q || !filled(q.text)) return "";
  return `<blockquote class="epigraph"><p>${q.text}</p>${filled(q.by) ? `<footer>— ${q.by}</footer>` : ""}</blockquote>`;
}

// A simple list, e.g. favourite music
function itemList(items = []) {
  const lines = items.filter(filled).map((it) => `<li>${it}</li>`);
  return lines.length ? `<ul class="plain-list">${lines.join("")}</ul>` : "";
}

// Photos as a grid; each one opens full size when clicked
function photoGrid(photos = []) {
  const items = photos
    .filter((ph) => filled(ph.src))
    .map((ph) => {
      const alt = String(ph.caption || "").replace(/<[^>]*>/g, "").replace(/"/g, "&quot;");
      const crop = filled(ph.position) ? ` style="object-position: ${ph.position}"` : "";
      return `
        <figure>
          <a href="${ph.src}"><img src="${ph.src}" alt="${alt}" loading="lazy"${crop}></a>
          ${filled(ph.caption) ? `<figcaption>${ph.caption}</figcaption>` : ""}
        </figure>`;
    })
    .join("");
  return items ? `<div class="photos">${items}</div>` : "";
}

function renderPassions() {
  app.innerHTML = `
    <h1>Passions</h1>
    <p class="lead">Things I enjoy besides research.</p>
    ${PASSIONS.map(
      (p) =>
        `<h2>${p.title}</h2>${
          epigraph(p.quote) + paragraphs(p.text) + itemList(p.list) + photoGrid(p.photos) || `<p class="empty">—</p>`
        }`
    ).join("")}`;
}

/* ---------- CV ---------- */

function cvItem(it) {
  return `
    <div class="cv-item">
      <div class="cv-when">${it.when || ""}</div>
      <div>
        ${filled(it.what) ? `<strong>${it.what}</strong>` : ""}${filled(it.where) ? `${filled(it.what) ? ", " : ""}${it.where}` : ""}
        ${filled(it.details) ? `<div class="cv-details">${it.details}</div>` : ""}
      </div>
    </div>`;
}

// A publication as a compact CV row: date | title, then co-authors · status · arXiv
function cvPublication(p) {
  const id = String(p.arxiv || "").replace(/^https?:\/\/arxiv\.org\/abs\//, "");
  return cvItem({
    when: formatDate(p),
    what: escapeHtml(p.title),
    details: [
      filled(p.coauthors) && `With ${joinNames(p.coauthors)}`,
      p.journal,
      filled(p.arxiv) && `<a href="${arxivUrl(p.arxiv)}">${/^https?:/.test(id) ? "arXiv" : "arXiv:" + id}</a>`,
    ]
      .filter(Boolean)
      .join(" · "),
  });
}

// A work as a compact CV row: date | title, then description · link
function cvWork(w) {
  return cvItem({
    when: formatDate(w),
    what: w.title,
    details: [w.description, filled(w.link) && `<a href="${w.link}">${linkLabel(w.link)}</a>`]
      .filter(Boolean)
      .join(" · "),
  });
}

function renderCv() {
  const sections = CV.sections
    .map((sec) => {
      let rows;
      if (sec.fromPublications) {
        rows = byDate(PUBLICATIONS.filter((p) => filled(p.title))).map(cvPublication);
      } else if (sec.fromWorks) {
        const types = sec.fromWorks.map((t) => t.toLowerCase());
        const works = WORKS.filter((w) => filled(w.title) && types.includes(String(w.type).toLowerCase()));
        rows = byDate(works).map(cvWork);
      } else {
        rows = (sec.items || []).map(cvItem);
      }

      if (!rows.length && sec.hideIfEmpty) return "";
      return `<h2>${sec.title}</h2>${rows.join("") || `<p class="empty">—</p>`}`;
    })
    .join("");

  app.innerHTML = `
    <div class="cv-head">
      <h1>Curriculum Vitae</h1>
      ${filled(CV.pdf) ? `<a class="btn" href="${CV.pdf}">pdf version</a>` : ""}
    </div>
    ${sections || `<p class="empty">Coming soon.</p>`}`;
}

/* ---------- math ---------- */

// Typesets LaTeX written between $...$ with KaTeX, loaded only on pages that contain some
function renderMath() {
  if (!document.body.textContent.includes("$")) return;
  const cdn = "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.19.0/";
  const load = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      document.head.append(script);
    });

  document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${cdn}katex.min.css">`);
  load(cdn + "katex.min.js")
    .then(() => load(cdn + "contrib/auto-render.min.js"))
    .then(() =>
      renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      })
    );
}

/* ---------- start ---------- */

// "Abstract" buttons show/hide the abstract below them
app.addEventListener("click", (e) => {
  const toggle = e.target.closest("[data-toggle]");
  if (!toggle) return;
  const box = document.getElementById(toggle.dataset.toggle);
  box.hidden = !box.hidden;
  toggle.setAttribute("aria-expanded", String(!box.hidden));
});

renderHeader();
({ about: renderAbout, publications: renderPublications, works: renderWorks, cv: renderCv, passions: renderPassions })[PAGE]();
renderMath();
