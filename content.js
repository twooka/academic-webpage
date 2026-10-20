/*
 * =====================================================================
 *  content.js: ALL the content of the website lives in this file.
 * =====================================================================
 *  Edit the values below and reload the page.
 *  - Empty fields ("" or []) are simply not shown on the site.
 *  - Text may contain simple HTML, e.g. <a href="...">a link</a>, <em>italic</em>.
 *  - Put your photo in img/ and files (CV, papers, slides...) in files/.
 */

const SITE = {
  name: "Valentino Badalucco",

  position: "",       // e.g. "PhD Student in ..."
  affiliation: "École Normale Supérieure – Département de Mathématiques et Applications",
  affiliationUrl: "https://www.math.ens.psl.eu/",

  // If this file does not exist, your initials are shown instead
  photo: "img/profile.jpg",
  photoCaption: "A snowy day in Paris", // small text under the photo, "" for none

  // Bio on the home page, as plain text between the backticks.
  // Leave an empty line between paragraphs. Links are optional: <a href="...">text</a>
  bio: `
    I am a Master's student at the <a href="https://www.math.ens.psl.eu/">Département de Mathématiques et Applications</a>
    of the École Normale Supérieure in Paris, currently writing my Master's thesis under the supervision of Alex Cohen. I received my Bachelor's degree in Mathematics from University of Padova
    in 2025, under the joint supervision of Tony Carbery and Paolo Ciatti. More details can be found in my <a href="cv.html">CV</a>.

    In december '26 I will be visiting NYU Courant Institute of Mathematical Sciences.

    My main interests lie in Analysis, nonlinear partial differential equations, and Quantum Chaos theory.
  `,

  contact: {
    email: "valentino.badalucco@ens.fr",
    address: "Département de Mathématiques et Applications<br>École Normale Supérieure<br>45 rue d'Ulm<br>75005 Paris, France", // use <br> for line breaks
    office: "",  // e.g. "Room 123, Building B"
    phone: "",
  },

  // Online profiles: entries with an empty url are hidden. Add more if you like.
  links: [
    { label: "arXiv", url: "https://arxiv.org/search/?searchtype=author&query=Badalucco%2C+Valentino" },
    { label: "ORCID", url: "https://orcid.org/0009-0005-4616-0215" },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=b1hDPGwAAAAJ&hl=en" },
    { label: "GitHub", url: "https://github.com/twooka" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/valentinobadalucco" },
  ],
};

/*
 * ---------------------------------------------------------------------
 *  PUBLICATIONS: one object per paper, always with these fields.
 *  The order doesn't matter: they are sorted by date and grouped by year.
 *
 *  Title and abstract can be pasted as they are on arXiv, LaTeX math included
 *  ($...$). Wrap them in String.raw`...` (as below) so the backslashes are kept.
 * ---------------------------------------------------------------------
 *  {
 *    title:     "Title of the paper",
 *    abstract:  "Text of the abstract.",              // shown when clicking "Abstract"
 *    field:     "Research field",                     // shown as a small label
 *    coauthors: ["Jane Doe", "John Smith"],           // optional: [] if you are the only author
 *    arxiv:     "2601.01234",                         // arXiv id or full link
 *    journal:   "Submitted to Journal of Examples",   // journal and status, e.g. "Published in ...", "Preprint"
 *    month:     3,                                    // 1-12, or a name like "March"
 *    year:      2026,
 *  },
 */
const PUBLICATIONS = [
  {
    title:     String.raw`Existence and uniqueness of bound states with prescribed number of nodes for nonlinear dispersive equations on spherically symmetric manifolds`,
    abstract:  String.raw`Standing waves $e^{i\omega t}u(x)$ of nonlinear dispersive equations, such as the nonlinear Schrödinger and Klein–Gordon equations, have a profile $u$ that solves a nonlinear elliptic ODE of the form $\Delta u+f(u)=0$. We prove the existence of radial bound states with a prescribed number of nodal surfaces for this equation, on a large class of spherically symmetric manifolds and nonlinearities $f$. Under mild assumptions, we prove uniqueness of such bound states for the model nonlinearity $f(u)=|u|^{p-1}u-u$. Both existence and uniqueness results apply to some manifolds with a singularity at the origin.`,
    field:     "PDE",
    coauthors: [],
    arxiv:     "2610.13813",
    journal:   "Preprint",
    month:     10,
    year:      2026,
  },
  {
    title:     String.raw`Fractal uncertainty principle over $\mathbb{Q}_p$`,
    abstract:  String.raw`We prove a fractal uncertainty principle over $\mathbb{Q}_p$ for porous sets, resolving a conjecture of Cohen.`,
    field:     "Harmonic Analysis/Quantum Chaos",
    coauthors: ["Leonardo Franchi"],
    arxiv:     "2607.11534",
    journal:   "in peer review at IMRN",
    month:     7,
    year:      2026,
  },
];

/*
 * ---------------------------------------------------------------------
 *  OTHER WORKS: everything that is not a publication.
 *  Same idea: one object per work, sorted by date and grouped by year.
 *  Entries without a title are not shown, so you can prepare them in advance.
 * ---------------------------------------------------------------------
 *  {
 *    title:       "Title of the work",
 *    description: "What it is and why you did it, e.g. Bachelor's thesis, University of ..., supervised by ...",
 *    abstract:    String.raw`Text of the abstract.`,  // shown when clicking "Abstract", LaTeX math allowed
 *    type:        "Thesis",             // Thesis, Presentation, Poster, Report, Software, ...
 *    link:        "files/thesis.pdf",   // a file in files/ or any URL
 *    month:       7,                    // 1-12, or a name like "July"
 *    year:        2025,
 *  },
 */
const WORKS = [
  {
    title:       "On the multilinear Kakeya and Fourier restriction conjectures",
    description: "Bachelor's thesis in Mathematics, University of Padova. Supervisors: Tony Carbery and Paolo Ciatti.",
    abstract:    String.raw`An exposition of the multilinear Kakeya and Fourier restriction conjectures, with a proof of the multilinear Kakeya inequality and a discussion of its applications to the restriction problem, along with a more concise solution.`,
    type:        "Thesis",
    link:        "https://thesis.unipd.it/retrieve/5486bd10-78e6-47a1-b006-048d759d1d22/Tesi-Finale.pdf",
    month:       "February",
    year:        2025,
  },
  {
    title:       "Weighted inequalities for maximal averages over manifolds",
    description: "Presentation following M1 research stay at Universitat de València, supervised by David Beltran",
    abstract:    String.raw`We study classical methods for weighted inequalities for maximal averages over manifolds, and present a new approach to the problem based on off-grid $L^pL^q$ estimates for the associated maximal operator, which simplify other proofs in the literature and extends the result to the Heisenberg group.`,
    type:        "Presentation",
    link:        "files/valencia-presentation.pdf",
    month:       "September",
    year:        2026,
  },
  {
    title:       "Existence of bound states with prescribed number of nodes for nonlinear dispersive equations on spherically symmetric manifolds",
    description: "We study and extend a classical result by McLeod, Troy and Weissler to a large class of spherically symmetric manifolds.",
    abstract:    String.raw``,
    type:        "Presentation",
    link:        "files/memoire-presentation.pdf",
    month:       "May",
    year:        2026,
  },
  {
    title:       "Calderón-Zygmund decomposition",
    description: "A presentation on the Calderón-Zygmund decomposition, given as part of the selection process for the ENS Master in Mathematics.",
    abstract:    String.raw``,
    type:        "Presentation",
    link:        "files/ens-presentation.pdf",
    month:       "March",
    year:        2025,
  },
];

/*
 * ---------------------------------------------------------------------
 *  CV: the sections appear in this order.
 *  - fromPublications / fromWorks sections are filled automatically from the
 *    lists above (fromWorks: which work types to include).
 *  - The other sections list their items, one object per row:
 *      { when: "2024 – present", what: "PhD in ...", where: "University of ...", details: "Advisor: ..." }
 *  - Empty sections show a dash, unless they have hideIfEmpty: true.
 * ---------------------------------------------------------------------
 */
const CV = {
  pdf: "", // e.g. "files/cv.pdf": adds a "Download PDF" button

  sections: [
    {
      title: "Education",
      items: [
        {
          when: "2025 – present",
          what: "Master's degree in Mathematics and Diplôme de l'ENS",
          where: "École Normale Supérieure – PSL, Paris",
          details: "Master's thesis under the supervision of Alex Cohen.",
        },
        {
          when: "2022 – 2025",
          what: "Bachelor's degree in Mathematics",
          where: "University of Padova",
          details: "Thesis under the joint supervision of Tony Carbery and Paolo Ciatti.",
        },
      ],
    },

    { title: "Publications", fromPublications: true },

    { title: "Theses", fromWorks: ["Thesis"] },

    {
      title: "Visits",
      items: [
        // e.g. { when: "Apr – Jun 2026", what: "Universitat de València", where: "Valencia, Spain", details: "..." }
        {
          when: "Apr - Aug 2026", // dates of the stay
          what: "Universitat de València",
          where: "Valencia, Spain",
          details: "M1 research stay, supervised by David Beltran.",
        },
      ],
    },

    {
      title: "Attended workshops and seminars",
      items: [
        // e.g. { when: "Jun 2026", what: "Name of the workshop", where: "Institution, City", details: "" }
        {
            when: "January+March 2027 (Upcoming)",
            what: "Frontiers in Harmonic Analysis",
            where: "Cambridge University, United Kingdom",
        },
        {
            when: "May 2026",
            what: "Harmonic Analysis and Number Theory Seminars and Workshops",
            where: "Renyi Institute, Budapest, Hungary",
        },
        {
            when: "November 2025",
            what: "Union of tubes and kakeya sets",
            where: "IHES, Saclay, France",
        },
        {
            when: "May 2025",
            what: "Mini-courses in Analysis",
            where: "University of Padova, Italy",
        },
      ],
    },

    {
      title: "Talks",
      hideIfEmpty: true,
      items: [
        // e.g. { when: "Mar 2026", what: "Title of the talk", where: "Seminar, Institution", details: "" }
      ],
    },
  ],
};

/*
 * ---------------------------------------------------------------------
 *  PASSIONS: one section per passion, shown in this order on the Passions page.
 *  - text: plain text like the bio (empty line between paragraphs, links allowed).
 *  - quote: optional, shown under the title, e.g. { text: "...", by: "Author" }.
 *  - list: optional, one entry per line of a list shown after the text.
 *  - photos: put the files in img/passions/. Phone photos are large, so shrink
 *    copies of them first, e.g.  mogrify -resize '1600x1600>' -quality 85 img/passions/*.jpg
 *    (mogrify overwrites the files it is given).
 * ---------------------------------------------------------------------
 *  {
 *    title:  "Hiking",
 *    text:   `A few words about it.`,
 *    photos: [
 *      { src: "img/passions/dolomites.jpg", caption: "Tre Cime di Lavaredo, 2024" },
 *      // Photos are cropped to the same shape in the grid. For a tall photo, "position"
 *      // picks the part to keep: "50% 0%" = top, "50% 50%" = middle, "50% 100%" = bottom.
 *      { src: "img/passions/lake.jpg", caption: "...", position: "50% 85%" },
 *    ],
 *  },
 */
const PASSIONS = [
  {
    title: "Travel",
    text: ``,
    photos: [
      { src: "img/passions/copenhagen.jpg", caption: "The Gefion Fountain and St. Alban's Church, Copenhagen" },
      { src: "img/passions/seoul.jpg", caption: "Cherry blossoms at night, Seoul" },
      { src: "img/passions/gudauri.jpg", caption: "Gudauri, in the Georgian Caucasus" },
      { src: "img/passions/waterfall.jpg", caption: "Steinsdalsfossen, Norway" },
      { src: "img/passions/bled.jpg", caption: "Lake Bled, Slovenia", position: "50% 85%" },
      { src: "img/passions/venice.jpg", caption: "Sunset over Venice" },
    ],
  },
  {
    title: "Volunteering for the Italian Math Olympiads",
    // e.g. a link to the official site: <a href="https://olimpiadi.dm.unibo.it/">Olimpiadi della Matematica</a>
    text: `I have volunteered for the <a href="https://olimpiadi.dm.unibo.it/">Italian Math Olympiads</a>, helping to organize and run the events, and preparing problems for the competitions. Since 2024 I also grade the national exams for the Italian Math Olympiads.`,
    photos: [],
  },
  {
    title: "Hiking",
    quote: { text: "Estote parati.", by: "Robert Baden-Powell" },
    text: ``,
    photos: [
      { src: "img/passions/hike-0.jpg", caption: "The Dolomites" },
      { src: "img/passions/hike-1.jpg", caption: "Lago d'Idro" },
      { src: "img/passions/hike-2.jpg", caption: "Peaks near Pasubio" },
    ],
  },
  {
    title: "Music",
    text: `Here's a very random and massively underrepresenting selection of my favourite music:`,
    list: [
      `<em>The Winner Takes It All</em>, ABBA`,
      `<em>Eskimo</em>, Francesco Guccini`,
      `<em>12-gatsu no Paris</em> (12月のパリ), Miki Matsubara`,
      `<em>First Suite in E-flat for Military Band</em>, Gustav Holst <a class="btn" href="https://bmpdf.nyc3.cdn.digitaloceanspaces.com/pdf/F/FirstSuite-sc.pdf">score</a>`,
      `<em>Ripple</em>, Grateful Dead`,
      `<em>Hey Jude</em>, The Beatles`,
    ],
    photos: [],
  },
];
