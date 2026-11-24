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
  chips: ["FURI researcher", "Dean's List ×5"],
};

export const toolkit = [
  { title: "CAD & simulation", caption: "Where the part is born and broken first.", tools: ["SolidWorks", "AutoCAD", "ANSYS FEA", "GD&T", "Tolerance stack-up"] },
  { title: "Test & data", caption: "Measuring what the model only predicted.", tools: ["MATLAB", "NI DAQ", "6-axis force/torque", "PIV"] },
  { title: "Code", caption: "Solvers, controllers and the glue in between.", tools: ["Python", "C/C++", "Arduino (Embedded C)", "JavaScript", "HTML/CSS", "Git/GitHub"] },
  { title: "Hardware & fab", caption: "Things that leave the screen.", tools: ["Arduino Uno R4 WiFi", "Servos", "3D printing (FDM)", "Load testing"] },
  { title: "AI tools", caption: "Faster iterations, same rigor.", tools: ["Claude Code", "Codex", "Antigravity", "Cursor"] },
];

export const statement = {
  quote:
    "Every part I design gets tested until it fails. That's the only honest way to find out where the limits really are.",
  intro: [
    "I started on the help desk as an ASU Technology Consultant, then started teaching ANSYS FEA as an undergraduate TA.",
    "A summer on a real shop floor in Hyderabad followed: 15+ prototypes, load tests, GD&T drawings and a lot of broken parts.",
    "Now I'm building a biomimetic robotic eel for FURI research at ASU's OASIS Lab, and writing my own FEA solvers along the way.",
  ],
};

export const metrics = {
  lead: "Numbers that came out of the shop, the lab and the classroom.",
  items: [
    { value: 15, suffix: "+", label: "prototypes designed, built & tested" },
    { value: 200, suffix: "+", label: "components quality-inspected" },
    { value: 13, suffix: "%", label: "bracket mass left after topology optimization" },
    { value: 100, suffix: "", label: "students helped in ANSYS FEA office hours (approx.)" },
    { value: 3.76, suffix: "", label: "GPA at ASU / 4.00 · Dean's List ×5" },
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
    org: "FURI · OASIS Lab, Arizona State University",
    years: "2025 — Now",
    summary: "Designing a multi-segment biomimetic robotic eel for non-invasive marine ecosystem monitoring, funded through FURI.",
    achievement: "1 kHz force/torque data · −12% waste",
    details: [
      "Design and fabricate the eel's segments with waterproofed servo joints.",
      "Engineer traveling-wave joint kinematics, tuning wave frequency, amplitude envelope and joint stiffness for propulsive efficiency.",
      "Build test setups with a National Instruments DAQ and a 6-axis force/torque sensor, acquiring data at 1 kHz.",
      "Analyze kinematic and hydrodynamic data in MATLAB and PIV to characterize the wake structure.",
      "Inspected 200+ components and applied DFM improvements, cutting waste by 12%.",
    ],
  },
  {
    role: "Mechanical Engineering Intern",
    org: "Sreenex Machine Pvt. Ltd. — Hyderabad",
    years: "2025",
    summary: "A summer on the shop floor: taking parts from concept through physical validation.",
    achievement: "15+ prototypes · +30% reliability",
    details: [
      "Designed, built and tested 15+ mechanical prototypes, from concept through validation and refinement.",
      "Cut design-revision cycles by 25% by tightening design reviews and documenting requirements more clearly.",
      "Improved component reliability by 30% and reduced defects by 18% by finding failure causes in testing.",
      "Sped up design approvals by 20% by standardizing drawings and applying GD&T.",
    ],
  },
  {
    role: "Undergraduate TA, MEE 323 (ANSYS FEA)",
    org: "Arizona State University",
    years: "2024 — 2026",
    summary: "Guiding students through ANSYS-based FEA labs and office hours, coaching rather than handing out answers.",
    achievement: "~100 students helped · 200+ assignments graded",
    details: [
      "Helped about 100 students in office hours, troubleshooting modeling errors and FEA concepts.",
      "Graded 200+ assignments, including ANSYS simulation projects, against course rubrics.",
      "Prepare ANSYS lab materials with the course faculty.",
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
      "Managed technology inventory and supported process-optimization and digital-manufacturing projects.",
    ],
  },
];

export const timeline = [
  {
    n: "01",
    title: "The Beginning",
    date: "AUG 2023",
    body: "Started a B.S.E. in Mechanical Engineering at ASU's Fulton Schools, and made the Dean's List that first semester.",
    note: "first CAD model: definitely over-constrained",
    image: "",
  },
  {
    n: "02",
    title: "Teaching the Tools",
    date: "FALL 2024",
    body: "Became an undergraduate TA for MEE 323, helping students debug ANSYS FEA models, and joined ASU as a Technology Consultant.",
    note: "explaining it is how you really learn it",
    image: "",
  },
  {
    n: "03",
    title: "The Shop Floor",
    date: "MAY 2025",
    body: "Interned at Sreenex Machine in Hyderabad. 15+ prototypes, real tolerances, real deadlines.",
    note: "things break differently in real life",
    image: "",
  },
  {
    n: "04",
    title: "Building an Eel",
    date: "AUG 2025",
    body: "Joined FURI research at the OASIS Lab to build a biomimetic robotic eel, measured with a 6-axis force sensor and PIV.",
    note: "turns out fish are hard",
    image: "",
  },
  {
    n: "05",
    title: "Optimizing Everything",
    date: "2026",
    body: "Wrote an FEA solver and topology optimizer from scratch, trained a physics-informed neural network, and started the CheckMate capstone.",
    note: "13% of the mass, same job",
    image: "",
  },
  {
    n: "06",
    title: "Still Iterating",
    date: "NOW",
    body: "Building a quadruped robot and an aerodynamic RC car, graduating May 2027.",
    note: "rev. 06 — not final",
    image: "",
  },
];

export const projects = [
  {
    n: "01",
    title: "Biomimetic Robotic Eel",
    category: "FURI research · Robotics",
    year: "2025 — Now",
    outcome: "Multi-segment eel with waterproofed servo joints, NI DAQ force sensing and PIV wake analysis.",
    image: "",
    stats: [
      { value: "1 kHz", label: "force/torque sampling" },
      { value: "6-axis", label: "load sensing" },
      { value: "PIV", label: "wake analysis" },
    ],
    bullets: [
      "Traveling-wave joint kinematics: wave frequency, amplitude envelope, joint stiffness",
      "Waterproofed servo joints for non-invasive marine monitoring",
      "Funded through FURI, Dr. Leixin Ma's lab",
    ],
  },
  {
    n: "02",
    title: "Engine-Mount Bracket Topology Optimization",
    category: "FEA · Optimization",
    year: "MAE 494/598",
    outcome: "Hex8 FEA solver, adjoint sensitivities and MMA optimizer built from scratch; 13% of the original mass with every constraint met.",
    image: "",
    stats: [
      { value: "13%", label: "of original mass" },
      { value: "4", label: "constraints met" },
      { value: "Hex8", label: "FEA solver, from scratch" },
    ],
    bullets: [
      "3D hex8 finite-element solver written from scratch",
      "Adjoint sensitivities + MMA optimizer",
      "Meets stress, displacement, frequency and buckling limits",
    ],
  },
  {
    n: "03",
    title: "Physics-Informed Neural Network Study",
    category: "Machine learning · Team",
    year: "MAE 494/598",
    outcome: "PINN for the 1-D viscous Burgers equation; adding L-BFGS after Adam cut L2 error from 38.35% to 15.76%.",
    image: "",
  },
  {
    n: "04",
    title: "CheckMate Electromagnetic Chess Bot",
    category: "Capstone · Mechatronics",
    year: "MEE 488/489",
    outcome: "An automated board that mirrors remote moves, sliding the pieces with an electromagnet.",
    image: "",
  },
  {
    n: "05",
    title: "Quadruped Walking Robot",
    category: "Personal · Arduino",
    year: "Personal",
    outcome: "4-servo walker on an Arduino Uno R4 WiFi with a non-blocking trot gait and 3D-printed legs.",
    image: "",
  },
  {
    n: "06",
    title: "Geneva Drive Mechanism",
    category: "Mechanism design · ANSYS",
    year: "MEE 342",
    outcome: "Full SolidWorks assembly, ANSYS structural analysis and validated intermittent-motion timing.",
    image: "",
  },
  {
    n: "07",
    title: "Aerodynamic Active RC Car",
    category: "Vehicle design · CFD",
    year: "In progress",
    outcome: "SolidWorks chassis, Arduino control and ANSYS aero tuned for downforce.",
    image: "",
    featured: true,
  },
  {
    n: "08",
    title: "Water Tank Outlet Radius Simulation",
    category: "Numerical methods · MATLAB",
    year: "MAE 384",
    outcome: "RK4, splines and Simpson's rule to calibrate the optimal outlet radius.",
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
  filters: ["All", "CAD", "Simulation", "Prototypes", "Electronics", "Data"],
  items: [
    { label: "Robotic eel servo segment", category: "Prototypes", image: "" },
    { label: "PIV wake behind the eel", category: "Data", image: "" },
    { label: "Topology-optimized engine bracket", category: "Simulation", image: "" },
    { label: "Geneva drive assembly", category: "CAD", image: "" },
    { label: "Quadruped trot gait", category: "Electronics", image: "" },
    { label: "CheckMate electromagnet carriage", category: "CAD", image: "" },
    { label: "6-axis force/torque readings at 1 kHz", category: "Data", image: "" },
    { label: "RC car body, aero study", category: "Simulation", image: "" },
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
