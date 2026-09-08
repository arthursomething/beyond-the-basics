(() => {
  "use strict";

  const root = document.getElementById("btb");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BASE_RATE = 35;
  const HOURS = 37;
  const fmt = (n) => "$" + Math.round(n).toLocaleString("en-US");

  const phases = [
    { code: "P00", title: "Recalibration", label: "P00 — Recalibration", meta: "1 module   1.0h", modules: [
      { n: "01", title: "What changed since you learned Figma", h: "1.0h",
        blurb: "A guided tour of the 2024-2026 feature wave, aimed at someone who already knows the tool: what replaced what, what is now the default way to work, and which habits are costing you time.",
        bullets: ["Audit one of your own files against the current feature set", "Map old workarounds to the features that replaced them", "Set the vocabulary the rest of the course uses"],
        leave: "A written list of the habits you are going to drop, and where each one gets replaced later in the course." },
    ]},
    { code: "P01", title: "Systems thinking", label: "P01 — Systems thinking", meta: "5 modules   12.5h", modules: [
      { n: "02", title: "Auto layout, revisited as a constraint system", h: "2.5h",
        blurb: "Auto layout treated as a set of constraints instead of a stack of frames: sizing rules, wrapping, min and max widths, and the absolute escapes that keep a layout honest.",
        bullets: ["Rebuild a dense screen so it survives four breakpoints", "Fix the three layouts that always break in critique", "Decide when NOT to use auto layout"],
        leave: "A responsive screen that reflows correctly without a single manual resize." },
      { n: "03", title: "Component APIs: variants, booleans, instance swaps", h: "2.5h",
        blurb: "Designing a component's interface before its visuals. Which properties belong on the component, which belong on the instance, and how to keep the panel readable for the next designer.",
        bullets: ["Name and order properties so the panel reads top to bottom", "Collapse variant explosions into boolean and swap props", "Write the component's usage rules into the file"],
        leave: "One component with a documented API that a teammate can use without asking you." },
      { n: "04", title: "Properties bound to variables", h: "3.0h",
        blurb: "The core module. A variable can drive more than a fill — bind it to a property and the component reconfigures itself instead of needing a manual swap for every state.",
        bullets: ["Bind text, boolean and number properties to variables", "Drive state changes from a single source of truth", "Debug a binding that silently does nothing"],
        leave: "The properties-and-variables starter file, plus a working pattern you can drop into your own library." },
      { n: "05", title: "Variable modes, scoping and theming", h: "2.5h",
        blurb: "Collections, modes, scoping and aliasing built to match what engineering already has, so the theme in Figma and the theme in code do not drift.",
        bullets: ["Structure collections for brand, theme and density", "Scope variables so the wrong token cannot be picked", "Test a theme swap across a full screen"],
        leave: "A themed screen that switches light, dark and a brand mode with no duplicated frames." },
      { n: "06", title: "Library governance, branching and deprecation", h: "2.0h",
        blurb: "The part nobody teaches: publishing discipline, branch reviews, versioning, and how to remove a component without breaking three product teams.",
        bullets: ["Run a branch review the way a code review works", "Write a deprecation path with a real timeline", "Set up release notes people actually read"],
        leave: "A governance one-pager you can adopt for your library on Monday." }
    ]},
    { code: "P02", title: "Motion, AI & dimension", label: "P02 — Motion, AI & dimension", meta: "3 modules   7.0h", modules: [
      { n: "07", title: "Figma Motion: timelines, easing, and what to hand off", h: "2.5h",
        blurb: "Motion built in Figma with intent: timelines, easing curves that match the platform, and deciding what an engineer actually needs from you versus what is just a nice demo.",
        bullets: ["Build an entrance, a state change and a transition", "Pick easing from platform conventions, not taste", "Write a spec an engineer can implement"],
        leave: "Three production-ready motion specs and the file that documents them." },
      { n: "08", title: "AI tooling: Make, First Draft, and where to stop", h: "2.5h",
        blurb: "Where the AI features genuinely save hours and where they quietly cost you them. Prompting for structure instead of pictures, and the review pass that makes output usable.",
        bullets: ["Generate a first pass, then rebuild it as a real system", "Set a stop rule for AI output in your own workflow", "Keep generated work reviewable by a team"],
        leave: "A repeatable AI pass for early exploration that does not leave debt in the file." },
      { n: "09", title: "Dimension and 3D inside a flat file", h: "2.0h",
        blurb: "Perspective, depth and 3D assets used with restraint, so a flat product interface can carry a moment of dimension without turning into decoration.",
        bullets: ["Place and light a 3D object in a product layout", "Keep exports and file weight under control", "Decide when depth helps the message"],
        leave: "One dimensional hero or feature moment built to spec." }
    ]},
    { code: "P03", title: "Ship it", label: "P03 — Ship it", meta: "4 modules   8.0h", modules: [
      { n: "10", title: "Prototypes with conditionals and real state", h: "2.0h",
        blurb: "Prototypes that hold up in usability testing: variables as state, conditional navigation, and flows that respond to input instead of faking it with more frames.",
        bullets: ["Drive a flow from variables instead of duplicate screens", "Add conditionals and expressions to a real form", "Prep a prototype for an unmoderated test"],
        leave: "A testable prototype of a multi-step flow with real state." },
      { n: "11", title: "Dev Mode and Code Layers", h: "2.0h",
        blurb: "Dev Mode as the handoff surface it was meant to be, plus Code Layers and Code Connect so what engineering reads matches what exists in the codebase.",
        bullets: ["Set up Code Connect against a component library", "Use Code Layers where a static frame is not enough", "Structure a file for the way developers inspect it"],
        leave: "A file wired to Dev Mode that answers questions before they get asked." },
      { n: "12", title: "Annotations, specs and handoff hygiene", h: "2.0h",
        blurb: "Annotating behaviour, edge cases, empty and error states — the information that decides whether a build matches the design.",
        bullets: ["Annotate states, rules and edge cases at the right density", "Document accessibility intent alongside visuals", "Run a pre-handoff checklist"],
        leave: "A handoff package for one full feature, checklist included." },
      { n: "13", title: "Publishing with Figma Sites", h: "2.0h",
        blurb: "Taking a design out of the canvas and onto a URL with Sites: what it is genuinely good for, its limits, and how to keep a published page maintainable.",
        bullets: ["Publish a real page from a design file", "Structure content so edits stay cheap", "Know when to hand it to engineering instead"],
        leave: "A live page you published yourself, plus a judgement call on when to use it." }
    ]},
    { code: "P04", title: "Extend & explain", label: "P04 — Extend & explain", meta: "4 modules   8.5h", modules: [
      { n: "14", title: "Plugins and widgets worth building", h: "2.0h",
        blurb: "The small internal tools that remove repetitive work from a team: what is worth building, what already exists, and how to scope one you can maintain.",
        bullets: ["Scope a plugin against a real repetitive task", "Build and run a minimal working version", "Decide build versus adopt"],
        leave: "One working internal tool, or a written case for not building it." },
      { n: "15", title: "Capstone: one system, end to end", h: "3.0h",
        blurb: "Everything from the previous phases assembled into a single documented system, built on your own product surface and reviewed live.",
        bullets: ["Assemble library, variables, motion and handoff into one file", "Document decisions as you go", "Take a full critique pass on it"],
        leave: "A documented capstone system you can show in an interview or a promotion case." },
      { n: "16", title: "Explaining a decision in critique", h: "2.0h",
        blurb: "The module built for the moment someone asks why. Defending a decision in critique, walking a PM through a system, and unblocking a teammate who copied your file without understanding it.",
        bullets: ["Structure an explanation for three different audiences", "Run a mock critique on your capstone", "Handle the disagreement that follows"],
        leave: "A recorded walkthrough of your own system, defended out loud." },
      { n: "17", title: "Onboarding a team into your file", h: "1.5h",
        blurb: "Making a system survive without you: entry points, naming, examples, and the short document that gets a new designer productive in a day.",
        bullets: ["Build a cover page and entry points that get read", "Write the one-page onboarding doc", "Set the rules for contribution"],
        leave: "An onboarding page attached to your capstone file." }
    ]}
  ];

  const trackDefs = [
    { label: "Cohort seat", rate: BASE_RATE, badge: "MOST TAKEN",
      note: "A live group capped small enough that every file gets looked at.",
      features: ["Live group, capped for real critique", "Built on the shared class project", "Fixed cohort dates"],
      note2: "Seats limited to keep critique small" },
    { label: "Private 1:1", rate: Math.round(BASE_RATE * 1.7), badge: "",
      note: "The same 37 hours, run entirely on your own files and your own calendar.",
      features: ["Every session on your own work", "Scheduled around your week", "Start any week"],
      note2: "Scheduled directly with me" },
    { label: "Team of 3+", rate: Math.round(BASE_RATE * 0.8), badge: "PER SEAT", perSeat: true,
      note: "A per-seat rate for a team that shares one library and one invoice.",
      features: ["Per-seat rate, one company invoice", "Capstone on your team's library", "Minimum 3 seats"],
      note2: "Invoiced to the company" }
  ];

  const paceDefs = [
    { label: "1 class / week", perWeek: 1 },
    { label: "2 classes / week", perWeek: 2 },
    { label: "3 classes / week", perWeek: 3 }
  ];
  const weeksOf = (n) => Math.ceil(HOURS / (2.5 * n));

  const stats = [
    { v: HOURS + "h", num: HOURS, pre: "", suf: "h", k: "INSTRUCTION", delay: 0 },
    { v: "17", num: 17, pre: "", suf: "", k: "MODULES", delay: 90 },
    { v: "$" + BASE_RATE, num: BASE_RATE, pre: "$", suf: "", k: "PER HOUR", delay: 180 },
    { v: "1", num: 1, pre: "", suf: "", k: "CAPSTONE SYSTEM", delay: 270 }
  ];

  const audience = [
    { n: "01", delay: 0, title: "Mid-to-senior product designers", body: "You use Figma daily, you're comfortable with components and auto layout, and the 2025-2026 feature wave (Motion, Code Layers, Sites, Make) is where you've fallen behind." },
    { n: "02", delay: 110, title: "Design leads building a system", body: "You're responsible for a library used by more than one team and need properties bound to variables, branching, and governance to actually hold up." },
    { n: "03", delay: 220, title: "Designers who get asked \"why\"", body: "You don't run workshops, but you defend a decision in critique, walk a PM through a system, or unblock a teammate who copied your file without understanding it. Module 16 is built for exactly that moment." }
  ];

  const outcomes = [
    { n: "01", delay: 0, title: "A documented capstone system", body: "Library, variables, properties, motion specs and governance in one file, built on a real product surface and reviewed in critique." },
    { n: "02", delay: 80, title: "17 module files, kept", body: "Including the properties-and-variables starter file from Module 4, so the patterns are copy-ready instead of remembered." },
    { n: "03", delay: 160, title: "A recorded walkthrough of your own work", body: "You defend your capstone out loud on camera. It doubles as portfolio material and as evidence in a promotion case." },
    { n: "04", delay: 240, title: "Critique on your files, not exercises", body: "The cohort is capped so your own work gets looked at every phase, which is the part a video course structurally cannot give you." },
    { n: "05", delay: 320, title: "Every session recorded, for good", body: "Recordings and materials stay available after the cohort ends, including future re-recordings when Figma changes." }
  ];

  const format = [
    { k: "STRUCTURE", delay: 0, title: "Live, small cohort", body: "Sessions run live over video with a group capped small enough for real critique, plus recordings if you miss one." },
    { k: "PACE", delay: 90, title: "2 sessions / week", body: "Roughly 2-2.5 hour sessions, twice a week, built around the schedule of people already working full-time." },
    { k: "REQUIREMENT", delay: 180, title: "Figma Professional", body: "Bring a working Figma account. Motion, 3D and Make modules need a plan with AI credits enabled." },
    { k: "ACCESS", delay: 270, title: "Lifetime materials", body: "Recordings and every module file stay yours, including the properties-and-variables starter file from Module 4." }
  ];

  const faq = [
    { delay: 0, q: "I still mix up some auto layout basics. Am I ready?", a: "Module 1 is a fast recalibration, not a re-teach. If auto layout and components are still shaky, spend a week in Figma's own beginner material first. This course assumes that's already comfortable." },
    { delay: 80, q: "Do I need to be good at explaining things?", a: "No. That's what Module 16 builds. Most of the course is pure craft: properties, systems, motion, AI tooling, handoff. The explain module just makes sure you can defend a decision out loud, not just make a good one." },
    { delay: 160, q: "What if I can't make a live session?", a: "Every session is recorded and posted within a day. You keep access to recordings and files after the cohort ends." },
    { delay: 240, q: "Is there a certificate?", a: "You leave with a documented capstone system and a recorded walkthrough of it: a stronger reference for a portfolio or a promotion case than a certificate." }
  ];

  const levels = ["1–2 years", "3–5 years", "6–9 years", "10+ years"];
  const gaps = ["Variables & properties", "Design systems", "Motion", "AI tooling", "Dev Mode / handoff", "Explaining decisions"];

  const state = { phase: 1, track: 0, pace: 1, sheet: null, sent: false };

  // ---------- one-time static renders ----------

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) for (const k in props) {
      if (k === "class") node.className = props[k];
      else if (k === "html") node.innerHTML = props[k];
      else if (k.startsWith("on")) node.addEventListener(k.slice(2).toLowerCase(), props[k]);
      else node.setAttribute(k, props[k]);
    }
    (children || []).forEach((c) => { if (c) node.appendChild(c); });
    return node;
  }
  const text = (s) => document.createTextNode(s);

  function renderStats() {
    const wrap = document.getElementById("stats-grid");
    stats.forEach((s) => {
      const numEl = el("div", { class: "stat-num", "data-count": s.num, "data-pre": s.pre, "data-suf": s.suf }, [text(s.v)]);
      const item = el("div", { "data-reveal": "1", "data-reveal-delay": s.delay }, [
        numEl,
        el("div", { class: "stat-key" }, [text(s.k)])
      ]);
      wrap.appendChild(item);
    });
  }

  function renderAudience() {
    const wrap = document.getElementById("audience-grid");
    audience.forEach((a) => {
      wrap.appendChild(el("div", { class: "audience-card", "data-reveal": "1", "data-reveal-delay": a.delay }, [
        el("div", { class: "audience-num mono" }, [text(a.n)]),
        el("h3", { class: "audience-title" }, [text(a.title)]),
        el("p", { class: "audience-body" }, [text(a.body)])
      ]));
    });
  }

  function renderOutcomes() {
    const wrap = document.getElementById("outcome-list");
    outcomes.forEach((o) => {
      wrap.appendChild(el("div", { class: "outcome-row", "data-reveal": "1", "data-reveal-delay": o.delay }, [
        el("div", { class: "outcome-head" }, [
          el("span", { class: "n mono" }, [text(o.n)]),
          el("h3", { class: "outcome-title" }, [text(o.title)])
        ]),
        el("p", { class: "outcome-body" }, [text(o.body)])
      ]));
    });
  }

  function renderFormat() {
    const wrap = document.getElementById("format-grid");
    format.forEach((f) => {
      wrap.appendChild(el("div", { "data-reveal": "1", "data-reveal-delay": f.delay }, [
        el("div", { class: "format-key mono" }, [text(f.k)]),
        el("h3", { class: "format-title" }, [text(f.title)]),
        el("p", { class: "format-body" }, [text(f.body)])
      ]));
    });
  }

  function renderFaq() {
    const wrap = document.getElementById("faq-list");
    faq.forEach((q) => {
      wrap.appendChild(el("div", { class: "faq-row", "data-reveal": "1", "data-reveal-delay": q.delay }, [
        el("h3", { class: "faq-q" }, [text(q.q)]),
        el("p", { class: "faq-a" }, [text(q.a)])
      ]));
    });
  }

  function renderFormOptions() {
    const levelWrap = document.getElementById("level-options");
    levels.forEach((lv) => {
      levelWrap.appendChild(el("label", { class: "pill-option" }, [
        el("input", { type: "radio", name: "level", value: lv }),
        text(lv)
      ]));
    });
    const gapWrap = document.getElementById("gap-options");
    gaps.forEach((g) => {
      gapWrap.appendChild(el("label", { class: "pill-option" }, [
        el("input", { type: "checkbox", name: "gap", value: g }),
        text(g)
      ]));
    });
  }

  // ---------- dynamic renders ----------

  function renderPhases() {
    const wrap = document.getElementById("phase-grid");
    wrap.innerHTML = "";
    phases.forEach((p, i) => {
      const active = i === state.phase;
      const btn = el("button", {
        type: "button",
        class: "phase-card" + (active ? " active" : ""),
        "data-reveal": "1",
        "data-reveal-delay": i * 70,
        onClick: () => {
          if (i === state.phase) return;
          const from = measure("[data-modwrap]");
          state.phase = i;
          renderPhases();
          renderModules();
          afterCommit("[data-modwrap]", from, ".module-row");
        }
      }, [
        active ? el("span", { class: "phase-card-glow" }, [el("span", { class: "phase-card-sheen" })]) : null,
        el("span", { class: "phase-code" }, [text(p.code)]),
        el("span", { class: "phase-title" }, [text(p.title)]),
        el("span", { class: "phase-meta mono" }, [text(p.meta)])
      ]);
      wrap.appendChild(btn);
    });
    markReveal(wrap);
  }

  function renderModules() {
    const active = phases[state.phase];
    document.getElementById("active-phase-label").textContent = active.label;
    document.getElementById("active-phase-meta").textContent = active.meta;
    const wrap = document.getElementById("module-list");
    wrap.innerHTML = "";
    active.modules.forEach((m) => {
      wrap.appendChild(el("button", {
        type: "button",
        class: "module-row",
        onClick: () => openSheet(active.label, m)
      }, [
        el("span", { class: "n" }, [text(m.n)]),
        el("span", { class: "title" }, [text(m.title)]),
        el("span", { class: "h" }, [text(m.h)]),
        el("span", { class: "arrow" }, [text("→")])
      ]));
    });
  }

  function renderPacePills() {
    const wrap = document.getElementById("pace-pills");
    wrap.innerHTML = "";
    paceDefs.forEach((p, i) => {
      const active = i === state.pace;
      wrap.appendChild(el("button", {
        type: "button",
        class: "pace-pill" + (active ? " active" : ""),
        onClick: () => {
          if (i === state.pace) return;
          const from = measure("[data-matrixwrap]");
          state.pace = i;
          renderPacePills();
          renderTracks();
          renderMatrix();
          afterCommit("[data-matrixwrap]", from, ".matrix-row");
        }
      }, [
        el("span", { class: "label" }, [text(p.label)]),
        el("span", { class: "weeks mono" }, [text("≈ " + weeksOf(p.perWeek) + " weeks")])
      ]));
    });
  }

  function renderTracks() {
    const pace = paceDefs[state.pace];
    const wrap = document.getElementById("track-grid");
    wrap.innerHTML = "";
    trackDefs.forEach((t, i) => {
      const active = i === state.track;
      const weeks = weeksOf(pace.perWeek);
      const total = t.rate * HOURS;
      const card = el("div", {
        class: "track-card" + (active ? " active" : ""),
        "data-reveal": "1",
        onClick: () => {
          if (i === state.track) return;
          state.track = i;
          renderTracks();
          renderMatrix();
          document.getElementById("closing-cta-label").textContent = "Enroll for " + fmt(trackDefs[state.track].rate * HOURS);
        }
      }, [
        el("div", { class: "track-head" }, [
          el("span", { class: "track-label" }, [text(t.label)]),
          t.badge ? el("span", { class: "track-badge mono" }, [text(t.badge)]) : null
        ]),
        el("p", { class: "track-blurb" }, [text(t.note)]),
        el("div", { class: "track-price-row" }, [
          el("div", { class: "track-price" }, [
            el("span", { class: "track-price-num mono", "data-count": total, "data-pre": "$" }, [text(fmt(total))]),
            el("span", { class: "track-price-suffix mono" }, [text(t.perSeat ? "/ seat" : "total")])
          ]),
          el("div", { class: "track-rate-line mono" }, [text("$" + t.rate + " / hour × " + HOURS.toFixed(0) + " hours")]),
          el("div", { class: "track-weeks-line mono" }, [text("≈ " + weeks + " weeks at " + pace.perWeek + " / week")])
        ]),
        el("div", { class: "track-features" }, t.features.map((f) => el("div", { class: "track-feature" }, [
          el("span", { class: "plus mono" }, [text("+")]),
          el("span", { class: "text" }, [text(f)])
        ]))),
        el("div", { class: "track-actions" }, [
          el("a", { href: "#contact", class: "btn btn-solid", onClick: () => { state.track = i; renderTracks(); renderMatrix(); } }, [text("Enroll on this track")]),
          el("span", { class: "track-note2 mono" }, [text(t.note2)])
        ])
      ]);
      wrap.appendChild(card);
    });
    markReveal(wrap);
  }

  function renderMatrix() {
    const pace = paceDefs[state.pace];
    const weeks = weeksOf(pace.perWeek);
    const rows = [
      { k: "Instruction hours", a: HOURS.toFixed(1) + " h", b: HOURS.toFixed(1) + " h", c: HOURS.toFixed(1) + " h" },
      { k: "Hourly rate", a: "$" + trackDefs[0].rate + " / h", b: "$" + trackDefs[1].rate + " / h", c: "$" + trackDefs[2].rate + " / h" },
      { k: "Total", a: fmt(trackDefs[0].rate * HOURS), b: fmt(trackDefs[1].rate * HOURS), c: fmt(trackDefs[2].rate * HOURS) + " / seat" },
      { k: "Calendar at " + pace.label, a: "≈ " + weeks + " weeks", b: "≈ " + weeks + " weeks", c: "≈ " + weeks + " weeks" },
      { k: "All 17 modules & files", a: "Included", b: "Included", c: "Included" },
      { k: "Sessions recorded", a: "Yes", b: "Yes", c: "Yes" },
      { k: "Critique on your own files", a: "In group critique", b: "Every session", c: "Team critique" },
      { k: "Capstone built on", a: "Class project", b: "Your own product", c: "Your team's library" },
      { k: "Capstone review", a: "Group walkthrough", b: "1:1 walkthrough", c: "Team walkthrough" },
      { k: "Scheduling", a: "Fixed cohort dates", b: "Booked around you", c: "Booked with your team" },
      { k: "Seats", a: "1", b: "1", c: "3 or more" },
      { k: "Invoiced to", a: "You", b: "You", c: "Your company" },
      { k: "Extra 1:1 time", a: "$" + BASE_RATE + " / h, optional", b: "Included in rate", c: "$" + BASE_RATE + " / h, optional" }
    ];
    const wrap = document.getElementById("matrix");
    wrap.innerHTML = "";
    wrap.appendChild(el("div", { class: "matrix-header" }, [
      el("span", { class: "feature-label mono" }, [text("FEATURE")]),
      el("span", { class: "head" }, [text(trackDefs[0].label)]),
      el("span", { class: "head" }, [text(trackDefs[1].label)]),
      el("span", { class: "head" }, [text(trackDefs[2].label)])
    ]));
    rows.forEach((r) => {
      wrap.appendChild(el("div", { class: "matrix-row" }, [
        el("span", { class: "k" }, [text(r.k)]),
        el("span", { class: "v mono" }, [text(r.a)]),
        el("span", { class: "v mono" }, [text(r.b)]),
        el("span", { class: "v mono" }, [text(r.c)])
      ]));
    });
    document.getElementById("mentor-line").textContent = "Extra 1:1 time: $" + BASE_RATE + " / hour, no minimum";
  }

  // ---------- module side sheet ----------

  function openSheet(phaseLabel, m) {
    state.sheet = { phase: phaseLabel, ...m };
    document.getElementById("sheet-phase").textContent = state.sheet.phase;
    document.getElementById("sheet-n").textContent = "MODULE " + state.sheet.n;
    document.getElementById("sheet-h").textContent = state.sheet.h;
    document.getElementById("sheet-title").textContent = state.sheet.title;
    document.getElementById("sheet-blurb").textContent = state.sheet.blurb;
    document.getElementById("sheet-leave").textContent = state.sheet.leave;
    const bulletsWrap = document.getElementById("sheet-bullets");
    bulletsWrap.innerHTML = "";
    state.sheet.bullets.forEach((b) => {
      bulletsWrap.appendChild(el("div", { class: "sheet-bullet" }, [
        el("span", { class: "plus mono" }, [text("+")]),
        el("span", { class: "text" }, [text(b)])
      ]));
    });
    document.getElementById("sheet-overlay").hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeSheet() {
    state.sheet = null;
    document.getElementById("sheet-overlay").hidden = true;
    document.body.style.overflow = "";
  }

  document.getElementById("sheet-backdrop").addEventListener("click", closeSheet);
  document.getElementById("sheet-close").addEventListener("click", closeSheet);
  document.getElementById("sheet-pricing-link").addEventListener("click", closeSheet);
  document.getElementById("sheet-contact-link").addEventListener("click", closeSheet);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.sheet) closeSheet();
  });

  // ---------- contact form ----------

  document.getElementById("contact-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = e.target;
    const val = (n) => (f.elements[n] && f.elements[n].value) || "—";
    const level = f.querySelector('input[name="level"]:checked');
    const gapVals = Array.from(f.querySelectorAll('input[name="gap"]:checked')).map((c) => c.value);
    const body = [
      "Name: " + val("name"),
      "Email: " + val("email"),
      "Current role: " + val("role"),
      "Years in Figma: " + (level ? level.value : "—"),
      "Gaps: " + (gapVals.length ? gapVals.join(", ") : "—"),
      "",
      "Message:",
      val("message")
    ].join("\n");
    window.location.href =
      "mailto:arthur.escom@gmail.com?subject=" +
      encodeURIComponent("Beyond the Basics — enrollment enquiry from " + val("name")) +
      "&body=" + encodeURIComponent(body);
    document.getElementById("form-note").textContent = "Opening your mail client…";
  });

  // ---------- height animation between states ----------

  function measure(sel) {
    const w = root.querySelector(sel);
    return w ? w.offsetHeight : null;
  }

  function afterCommit(sel, from, rowSel) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      animateHeight(sel, from);
      if (rowSel) {
        root.querySelectorAll(rowSel).forEach((row, i) => {
          row.style.animation = "none";
          void row.offsetWidth;
          row.style.animation = "rowin .5s " + i * 50 + "ms cubic-bezier(.2,.8,.3,1) both";
        });
      }
    }));
  }

  function animateHeight(sel, from) {
    if (from == null || reduceMotion) return;
    const w = root.querySelector(sel);
    if (!w) return;
    w.style.height = "auto";
    const to = w.offsetHeight;
    if (from === to) { w.style.height = ""; return; }
    w.style.overflow = "hidden";
    w.style.transition = "none";
    w.style.height = from + "px";
    void w.offsetWidth;
    requestAnimationFrame(() => {
      w.style.transition = "height .5s cubic-bezier(.2,.8,.3,1)";
      w.style.height = to + "px";
    });
    clearTimeout(w._ht);
    w._ht = setTimeout(() => {
      w.style.height = ""; w.style.overflow = ""; w.style.transition = "";
    }, 560);
  }

  // ---------- scroll reveal + count up ----------

  const pending = new Set();
  let io;

  function countUp(elNode, delay) {
    if (!elNode || !elNode.hasAttribute || !elNode.hasAttribute("data-count")) return;
    const target = parseFloat(elNode.getAttribute("data-count"));
    if (!isFinite(target)) return;
    const pre = elNode.getAttribute("data-pre") || "";
    const suf = elNode.getAttribute("data-suf") || "";
    if (reduceMotion) { elNode.textContent = pre + Math.round(target).toLocaleString("en-US") + suf; return; }
    const dur = 1000;
    const start = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      const e = 1 - Math.pow(1 - p, 3);
      elNode.textContent = pre + Math.round(target * e).toLocaleString("en-US") + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function reveal(elNode) {
    pending.delete(elNode);
    if (io) io.unobserve(elNode);
    if (elNode.dataset.revealed) return;
    elNode.dataset.revealed = "1";
    const d = parseInt(elNode.getAttribute("data-reveal-delay") || "0", 10);
    elNode.classList.add("revealed");
    if (!reduceMotion) elNode.style.animation = "reveal .9s " + d + "ms cubic-bezier(.2,.8,.3,1) both";
    countUp(elNode, d);
    elNode.querySelectorAll("[data-count]").forEach((n) => countUp(n, d + 120));
  }

  function markReveal(container) {
    const nodes = container.hasAttribute && container.hasAttribute("data-reveal")
      ? [container]
      : Array.from(container.querySelectorAll("[data-reveal]"));
    nodes.forEach((elNode) => {
      if (elNode.getBoundingClientRect().top > window.innerHeight * 0.9) {
        pending.add(elNode);
      } else {
        reveal(elNode);
        return;
      }
      if (io) io.observe(elNode);
    });
  }

  function initScroll() {
    const bar = document.querySelector("[data-progress]");
    const dots = document.querySelector("[data-dots]");
    const onScroll = () => {
      const h = document.documentElement;
      const max = Math.max(1, h.scrollHeight - h.clientHeight);
      const p = Math.min(1, Math.max(0, h.scrollTop / max));
      if (bar) bar.style.transform = "scaleX(" + p + ")";
      if (dots && !reduceMotion) dots.style.transform = "translateY(" + (h.scrollTop * -0.05) + "px)";
      pending.forEach((elNode) => {
        if (elNode.getBoundingClientRect().top < window.innerHeight) reveal(elNode);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    Array.from(root.querySelectorAll("[data-reveal]")).forEach((elNode) => {
      if (elNode.getBoundingClientRect().top > window.innerHeight * 0.9) {
        pending.add(elNode);
        io.observe(elNode);
      } else {
        reveal(elNode);
      }
    });
  }

  // ---------- boot ----------

  renderStats();
  renderAudience();
  renderOutcomes();
  renderFormat();
  renderFaq();
  renderFormOptions();
  renderPhases();
  renderModules();
  renderPacePills();
  renderTracks();
  renderMatrix();
  document.getElementById("closing-cta-label").textContent = "Enroll for " + fmt(trackDefs[state.track].rate * HOURS);
  initScroll();
})();
