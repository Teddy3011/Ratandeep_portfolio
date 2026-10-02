// All editable site content lives here. Change text, numbers, links and images in this one file.
// Images go in /public; a project/gallery item without `image` shows a labelled placeholder.

export const site = {
  name: "Ratandeep Reddy",
  fullName: "Ratandeep Reddy Allgupally",
  initials: "RR",
  role: "Mechanical Engineer",
  location: "Tempe, Arizona",
  timeZone: "America/Phoenix",
  availability: "Open to roles · May 2027",
  email: "ratandeep569@gmail.com",
  resume: "/Ratandeep_Reddy_Resume.pdf",
  portrait: "/portrait.webp",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/a-ratandeep-reddy-1a777b322/" },
    { label: "Email", href: "mailto:ratandeep569@gmail.com" },
    // { label: "GitHub", href: "https://github.com/Teddy3011" },
    // { label: "Instagram", href: "https://instagram.com/..." },
  ],
};

export const hero = {
  label: "MECHANICAL ENGINEER — ASU '27",
  headline: ["I design things", "that move, then", "break them on purpose."],
  support:
    "Mechanical engineering student at Arizona State, turning CAD models into prototypes that survive the real world — with an eye on motorsport.",
};

export const statement = {
  quote:
    "Every part I design gets tested until it fails. That's the only honest way to find out where the limits really are.",
  intro: [
    "I started on the help desk as an ASU Technology Consultant, fixing hardware and sneaking in time on SolidWorks and ANSYS.",
    "Then a summer on a real shop floor in Hyderabad: 15+ prototypes, load tests, GD&T drawings and a lot of broken parts.",
    "Now I build experimental rigs as an undergraduate research assistant — and I want to take all of it trackside.",
  ],
};

export const metrics = {
  lead: "Numbers that came out of the shop, the lab and the test bench.",
  items: [
    { value: 15, suffix: "+", label: "prototypes built & evaluated" },
    { value: 200, suffix: "+", label: "components quality-inspected" },
    { value: 30, suffix: "%", label: "reliability improvement" },
    { value: 25, suffix: "%", label: "fewer design-revision cycles" },
    { value: 3.75, suffix: "", label: "GPA at ASU / 4.00" },
  ],
};

export const philosophy = {
  statement: "MEASURE. BUILD. BREAK.",
  support:
    "Good engineering isn't the prettiest CAD render. It's the part that still works after the load test, the heat cycle and the tenth rebuild.",
  principles: [
    {
      n: "01",
      title: "Model it",
      body: "Start in SolidWorks and ANSYS. Tolerances, load paths and failure modes get worked out on screen, where mistakes are free.",
    },
    {
      n: "02",
      title: "Build it",
      body: "3D print, machine, wire the Arduino. A prototype on the bench teaches more in an hour than a week of assumptions.",
    },
    {
      n: "03",
      title: "Break it",
      body: "Load test, stress test, inspect. Find the failure point, fix the root cause, and build it again — stronger.",
    },
  ],
};

export const experience = [
  {
    role: "Undergraduate Research Assistant",
    org: "Arizona State University",
    years: "2025 — Now",
    summary: "Designing and building experimental rigs to validate mechanical systems.",
    achievement: "−12% waste, +20% workflow efficiency",
    details: [
      "Built functional prototypes and instrumented test setups for structured data acquisition.",
      "Improved manufacturing workflow efficiency by 20% by finding and restructuring bottlenecks.",
      "Inspected 200+ components and applied DFM changes, cutting waste by 12%.",
    ],
  },
  {
    role: "Mechanical Engineering Intern",
    org: "Sreenex Machine Pvt. Ltd. — Hyderabad",
    years: "2025",
    summary: "A summer on the shop floor: CAD, prototypes, load tests and drawings.",
    achievement: "15+ prototypes, +30% reliability",
    details: [
      "Optimized 3D CAD models, cutting design-revision cycles by 25% through tighter tolerance control.",
      "Built and evaluated 15+ prototypes, found structural failure points and improved reliability by 30%.",
      "Load testing and dimensional inspection reduced defect rates by 18%.",
      "GD&T drawings and BOMs sped up approvals by 20%.",
    ],
  },
  {
    role: "Technology Consultant",
    org: "Arizona State University",
    years: "2024 — 2025",
    summary: "Kept campus tech running while assisting with CAD and simulation work.",
    achievement: "",
    details: [
      "Diagnosed and resolved hardware and software issues in a fast-paced support environment.",
      "Assisted with CAD modeling and simulations in SolidWorks, AutoCAD and ANSYS.",
      "Supported process-optimization, digital-manufacturing and IoT projects.",
    ],
  },
];

export const timeline = [
  {
    n: "01",
    title: "The Beginning",
    date: "AUG 2023",
    body: "Started a B.S.E. in Mechanical Engineering at Arizona State University.",
    note: "first CAD model: definitely over-constrained",
    image: "",
  },
  {
    n: "02",
    title: "First Job on Campus",
    date: "NOV 2024",
    body: "Joined ASU as a Technology Consultant — and found every excuse to open SolidWorks.",
    note: "fixing laptops by day",
    image: "",
  },
  {
    n: "03",
    title: "Listening Like a Seal",
    date: "ASU",
    body: "Volunteered on seal-whisker sensor research: built a Doppler setup and learned to love signal data.",
    note: "this is where research hooked me",
    image: "",
  },
  {
    n: "04",
    title: "The Shop Floor",
    date: "MAY 2025",
    body: "Interned at Sreenex Machine in Hyderabad. 15+ prototypes, real tolerances, real deadlines.",
    note: "things break differently in real life",
    image: "",
  },
  {
    n: "05",
    title: "Research Mode",
    date: "AUG 2025",
    body: "Became an undergraduate research assistant, building rigs for experimental validation.",
    note: "more sensors = more questions",
    image: "",
  },
  {
    n: "06",
    title: "Still Iterating",
    date: "NOW",
    body: "Building an aerodynamic RC car, graduating May 2027, and aiming for motorsport engineering.",
    note: "rev. 06 — not final",
    image: "",
  },
];

export const projects = [
  {
    n: "01",
    title: "Aerodynamic Active RC Car",
    category: "Vehicle design · CFD",
    year: "In progress",
    outcome: "Brushless drone motor, SolidWorks chassis and ANSYS aero tuned for downforce.",
    image: "",
    featured: true,
  },
  {
    n: "02",
    title: "Seal-Whisker Shaped Sensors",
    category: "Research · Signals",
    year: "ASU",
    outcome: "Doppler-effect rig and acoustic frequency analysis for dynamic object detection.",
    image: "",
  },
  {
    n: "03",
    title: "Water Tank Outlet Radius Simulation",
    category: "Numerical methods · MATLAB",
    year: "Spring 2025",
    outcome: "RK4, splines, Simpson's rule and bisection to calibrate the optimal outlet radius.",
    image: "",
  },
  {
    n: "04",
    title: "Solar Flipping Mechanism",
    category: "Mechanism design",
    year: "Spring 2025",
    outcome: "A weight-powered, non-electrical panel flipper with iteratively prototyped gears.",
    image: "",
  },
  {
    n: "05",
    title: "Automated Irrigation System",
    category: "Embedded · Arduino",
    year: "Summer 2025",
    outcome: "Soil-moisture sensing and servo valves in a SolidWorks-designed enclosure.",
    image: "",
  },
];

// Featured case study: the RC car, presented as a race-weekend walkthrough.
export const caseStudy = {
  kicker: "FEATURED BUILD",
  title: "WELCOME TO THE PIT LANE",
  subtitle: "Aerodynamic Active RC Car",
  caution: "CAUTION: This garage may stay open past midnight during test weekends.",
  board: ["NEXT SESSION: CFD ANALYSIS", "TYRES: 3D PRINTED", "STATUS: IN PROGRESS"],
  stations: ["Brief", "Concept", "CAD", "Aero", "Electronics", "Build", "Test"],
  sections: [
    { title: "Overview", body: "A high-performance RC car powered by a brushless drone motor, built to explore how active aerodynamics change grip and top speed at small scale." },
    { title: "The challenge", body: "Small cars see very different airflow than full-size ones. The goal: generate useful downforce without drag killing top speed or the battery." },
    { title: "Research & references", body: "Motorsport wing profiles, ground-effect floors and scale-model testing methods. [Add the papers, videos and cars you studied.]" },
    { title: "CAD & chassis", body: "Chassis and body modeled in SolidWorks, designed around the motor, battery and servo packaging. [Add renders.]" },
    { title: "Aero simulation", body: "ANSYS simulations to compare wing angles and body shapes for downforce vs. drag. [Add pressure plots and the numbers.]" },
    { title: "Electronics & control", body: "Arduino control logic for the drive and active aero elements. [Add wiring diagram or code snippet.]" },
    { title: "Build & test", body: "Printed and assembled parts, then testing. [Add photos, lap data and what broke.]" },
    { title: "Outcome", body: "Still in progress. [Add final downforce/drag figures and lessons learned.]" },
  ],
};

export const lab = {
  filters: ["All", "CAD", "Simulation", "Prototypes", "Electronics", "Sketches"],
  items: [
    { label: "Chassis v3 exploded view", category: "CAD", image: "" },
    { label: "Wing pressure contours", category: "Simulation", image: "" },
    { label: "Gear train for the solar flipper", category: "Prototypes", image: "" },
    { label: "Irrigation controller wiring", category: "Electronics", image: "" },
    { label: "Napkin sketch: active rear wing", category: "Sketches", image: "" },
    { label: "Tank drain RK4 convergence plot", category: "Simulation", image: "" },
    { label: "Doppler rig on the bench", category: "Prototypes", image: "" },
    { label: "Sensor enclosure, printed", category: "CAD", image: "" },
  ],
};

export const marquee = ["DESIGN", "ANALYZE", "PROTOTYPE", "TEST", "ITERATE", "REPEAT"];

export const contact = {
  headline: ["READY TO", "BUILD SOMETHING?"],
  support: "Write to me about full-time roles, internships, research, motorsport projects — or just to talk engineering.",
  cta: "DROP ME A LINE — I READ EVERYTHING",
  closing: "Thanks for scrolling to the very end. Hope the rest of your day runs within tolerance.",
};

// The floating radio. Each station is a Spotify track (the ID from its open.spotify.com/track/<ID> link),
// placed on the dial at a frequency between 88.0 and 108.0. Visitors not logged in to Spotify hear 30-second previews.
export const radio = {
  name: "RR FM",
  tagline: "via Spotify",
  autoplay: true, // start when the site opens (or on the first click/tap/key press if the browser blocks sound)
  stations: [
    { freq: 88.7, title: "Nazar", artist: "Darzi", spotify: "35LRDedmdcVBcZp5b4VSXG" },
    { freq: 90.9, title: "52 Bars", artist: "Karan Aujla, Ikky", spotify: "6rFckZb1cuJYzsZiGHgqks" },
    { freq: 93.1, title: "Loser", artist: "Tame Impala", spotify: "3dRRam4ZHVYRefzJA79cns" },
    { freq: 95.3, title: "I Don't Miss That Life", artist: "Seedhe Maut", spotify: "6tBiXnvflFCcEQAbQAdKkf" },
    { freq: 97.5, title: "11K", artist: "Seedhe Maut", spotify: "2qFZHvoVTcyQtDZKA7J1BK" },
    { freq: 99.7, title: "Natkhat", artist: "Seedhe Maut", spotify: "5wfAOhET7HtNKI1rf4l7GE" },
    { freq: 101.9, title: "Hangova", artist: "Anirudh Ravichander, Heisenberg", spotify: "2MvEcJxJAxCr31kA5wHwve" },
    { freq: 104.1, title: "Dekha Hi Nahi", artist: "Osho Jain", spotify: "5zK7gzWMZlT4TUf2iN2Wjw" },
    { freq: 106.3, title: "Sharmeeli", artist: "Frappe Ash, toorjo dey", spotify: "1zaDxoxv6CjrS9sLarRs8a" },
  ],
};
