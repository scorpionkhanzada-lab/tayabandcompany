import projectDuctwork from "@/assets/project-ductwork.jpg";
import projectBoilerBlue from "@/assets/project-boiler-blue.jpg";
import projectBoilerSilver from "@/assets/project-boiler-silver.jpg";
import projectHotInsulation from "@/assets/project-hot-insulation.jpg";
import projectOrangeVessel from "@/assets/project-orange-vessel.jpg";
import projectPiping from "@/assets/project-piping.jpg";

// Motor & Cold Image Imports
import motor1 from "@/assets/motor1.jpg";
import motor2 from "@/assets/motor2.jpg";
import motor3 from "@/assets/motor3.jpg";
import motor4 from "@/assets/motor4.jpg";
import motor5 from "@/assets/motor5.jpg";
import cold1 from "@/assets/cold1.jpg";
import cold2 from "@/assets/cold2.jpg";

// Duct Work Image Imports
import duct1 from "@/assets/duct1.jpg";
import duct2 from "@/assets/duct2.jpg";
import duct3 from "@/assets/duct3.jpg";

// Flange Image Imports
import flange1 from "@/assets/Flange1.jpg";
import flange2 from "@/assets/flange2.jpg";
import flange3 from "@/assets/flange3.jpg";

// Valve Image Imports
import valve1 from "@/assets/Valve1.jpg";
import valve2 from "@/assets/valve2.jpg";
import valve3 from "@/assets/valve3.jpg";
import valve4 from "@/assets/valve4.jpg";

// Historical Legacy Projects Imports
import legacyChirat from "@/assets/legacy-chirat-cement-1984.jpg";
import legacyKohinoor from "@/assets/legacy-kohinoor-power.jpg";
import legacyParco from "@/assets/legacy-parco-refinery-1999.jpg";

// Client Certificates Imports (Restored)
import certHaLub from "@/assets/cert-ha-lubricants.jpg";
import certHafeezGhee from "@/assets/cert-hafeez-ghee.jpg";
import certFaisalFeeds from "@/assets/cert-faisal-feeds.jpg";
import certServo from "@/assets/cert-servo-motor-oil.jpg";
import certSabirs from "@/assets/cert-sabirs-oils.jpg";
import certAtta from "@/assets/cert-atta-chemicals.jpg";
import certSafia from "@/assets/cert-safia-rice.jpg";
import certNtn from "@/assets/cert-ntn-fbr.png";

export type ServiceSlug =
  | "hot-insulation"
  | "cold-insulation"
  | "duct-work"
  | "valve-box"
  | "flange-box"
  | "motor-covers";

export interface ProcessStep {
  step: string;
  title: string;
  detail: string;
}

export interface Service {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  brief: string;
  bullets: string[];
  materials: string[];
  applications: string[];
  process: ProcessStep[];
  cover: string;
  gallery: { src: string; caption: string }[];
}

export const services: Service[] = [
  {
    slug: "hot-insulation",
    cover: projectHotInsulation,
    title: "Hot Insulation",
    tagline: "Heat retained. Energy preserved.",
    description:
      "High-temperature insulation systems for boilers, steam lines, exhaust ducts, and process piping — engineered to minimise heat loss and protect personnel.",
    brief:
      "Our hot insulation systems combine mineral wool, ceramic fibre, glass wool and calcium silicate cores with aluminium or galvanised steel cladding. Each installation is engineered to operating temperature, vibration profile, and ambient conditions for maximum thermal efficiency.",
    bullets: [
      "Operating range up to 1000°C",
      "Mineral wool, glass wool, ceramic fibre & calcium silicate cores",
      "Weatherproof aluminium / GI cladding",
      "Custom flange, valve & elbow boxes",
    ],
    materials: [
      "Rock (Mineral) Wool — 100 to 160 kg/m³ density",
      "Glass Wool — lightweight, 24 to 100 kg/m³",
      "Ceramic Fibre Blanket — high-temperature service to 1260°C",
      "Calcium Silicate — rigid, load-bearing, asbestos-free",
      "Aluminium / GI Sheet Cladding — 0.5 to 1.0 mm",
    ],
    applications: [
      "Steam boilers & economisers",
      "Exhaust & flue gas ducts",
      "Process piping headers",
      "Storage tanks & pressure vessels",
      "Heat exchangers & reformers",
    ],
    process: [
      {
        step: "01",
        title: "Surface Preparation",
        detail:
          "Strip old insulation, wire-brush the substrate, descale, and apply anti-corrosion primer where required. A clean, sound surface is the foundation of every Tayeb install.",
      },
      {
        step: "02",
        title: "Rock Wool Type",
        detail:
          "High-density rock wool blanket (50–160 kg/m³) — or glass wool, where specified — is wrapped, butted and stitched against the hot surface with stainless wire. Joints are staggered to eliminate thermal bridges.",
      },
      {
        step: "03",
        title: "Aluminium / Steel / GI Cladding",
        detail:
          "Pre-rolled aluminium, stainless or galvanised sheet is fastened with self-tapping screws and weather-sealed with silicone. The result is a polished, rain-proof, decade-grade jacket.",
      },
      {
        step: "04",
        title: "Inspection & Handover",
        detail:
          "Surface temperatures, joint integrity and cladding alignment are checked. A Tayeb completion certificate is issued — the same record our clients have relied on since 1983.",
      },
    ],
    gallery: [
      { src: projectHotInsulation, caption: "Boiler economiser cladding" },
      { src: projectPiping, caption: "Steam header insulation" },
      { src: projectBoilerSilver, caption: "Fire-tube boiler shell" },
      { src: legacyParco, caption: "PARCO Mid-Country Refinery — pipeline insulation, 1999" },
    ],
  },
  {
    slug: "cold-insulation",
    cover: cold1,
    title: "Cold Insulation",
    tagline: "Condensation controlled. Cold protected.",
    description:
      "Vapour-sealed insulation for chilled water lines, refrigeration plants, cold storage, and cryogenic systems — preventing condensation, ice and energy loss.",
    brief:
      "Closed-cell elastomeric foam, polyurethane and PIR systems sealed with vapour barriers and engineered claddings keep cold-side equipment efficient and corrosion-free.",
    bullets: [
      "Operating range down to -50°C",
      "Closed-cell elastomeric & PIR insulation",
      "Continuous vapour barrier sealing",
      "Anti-corrosion under-insulation treatment",
    ],
    materials: [
      "Closed-cell Elastomeric Foam (Armaflex-grade)",
      "Polyurethane (PU) & PIR Boards",
      "Aluminium Foil Vapour Barrier",
      "Stainless / Aluminium Cladding",
    ],
    applications: [
      "Chilled water headers (HVAC)",
      "Cold storage rooms & blast freezers",
      "Refrigeration suction lines",
      "Cryogenic vessels & LNG piping",
    ],
    process: [
      { step: "01", title: "Surface Cleaning", detail: "Degrease and dry the cold surface; apply anti-corrosion under-insulation coating to protect against CUI." },
      { step: "02", title: "Closed-Cell Wrap", detail: "Bond elastomeric or PIR insulation tight to the surface with cold-rated adhesive — no air gaps that could condense." },
      { step: "03", title: "Vapour Barrier", detail: "Seal every joint and seam with aluminium foil tape to create a continuous vapour-tight envelope." },
      { step: "04", title: "Cladding & Sealing", detail: "Wrap with aluminium or stainless cladding, weather-seal terminations, and pressure-test for breaches." },
    ],
    gallery: [
      { src: cold1, caption: "Chilled refrigeration lines insulation" },
      { src: cold2, caption: "Closed-cell cold insulation cladding setup" },
    ],
  },
  {
    slug: "duct-work",
    cover: duct1,
    title: "Duct Work",
    tagline: "Airflow shaped with precision.",
    description:
      "Industrial HVAC and process duct fabrication & installation — from circular spiral ducts to heavy-gauge rectangular plenums.",
    brief:
      "In-house fabrication using galvanised, stainless and aluminium sheet, with welded or flanged joints. Designed to SMACNA standards for low leakage and balanced airflow.",
    bullets: [
      "Spiral, rectangular & oval ducts",
      "GI, SS304 & aluminium fabrication",
      "SMACNA leakage-class compliance",
      "Insulated & acoustically lined options",
    ],
    materials: [
      "Galvanised Iron (GI) — 22 to 16 gauge",
      "Stainless Steel SS304 / SS316",
      "Aluminium Sheet",
      "Acoustic & thermal lining options",
    ],
    applications: [
      "Industrial HVAC systems",
      "Solvent extraction plants",
      "Flue & exhaust manifolds",
      "Dust collection systems",
    ],
    process: [
      { step: "01", title: "Drawing & Take-Off", detail: "Site survey, drawing review and material take-off per SMACNA / ASHRAE specification." },
      { step: "02", title: "Shop Fabrication", detail: "CNC cutting, rolling and seaming in our Multan workshop for repeatable accuracy." },
      { step: "03", title: "Site Erection", detail: "Sectional installation with flanged or welded joints, supported on engineered hangers." },
      { step: "04", title: "Leak Test & Insulate", detail: "Pressure-test the run, apply thermal/acoustic lining and balance airflow before handover." },
    ],
    gallery: [
      { src: duct1, caption: "Industrial exhaust ducting installation" },
      { src: duct2, caption: "Heavy-gauge rectangular supply air plenums" },
      { src: duct3, caption: "Ventilation duct network assembly setup" },
      { src: projectDuctwork, caption: "Central HVAC plant distribution ducts" },
    ],
  },
  {
    slug: "valve-box",
    cover: valve1,
    title: "Valve Box",
    tagline: "Service-ready insulation.",
    description:
      "Removable insulated valve jackets engineered for repeat access — protecting personnel and energy without sacrificing maintainability.",
    brief:
      "Custom-tailored hot or cold valve boxes with quick-release fasteners, allowing inspection and service in minutes while preserving thermal integrity.",
    bullets: [
      "Removable & reusable design",
      "Custom-fit to valve geometry",
      "Hot or cold service ratings",
      "Stainless mesh & velcro closures",
    ],
    materials: [
      "Silicone-coated fibreglass outer",
      "Mineral wool or aerogel core",
      "Stainless wire mesh reinforcement",
      "Velcro / D-ring quick-release",
    ],
    applications: [
      "Steam isolation valves",
      "Process line block valves",
      "Boiler manifold gate valves",
      "Cold-service control valves",
    ],
    process: [
      { step: "01", title: "Field Template", detail: "Take physical templates of every valve — handles, stems and bonnets included." },
      { step: "02", title: "Workshop Stitching", detail: "Cut fibreglass shells, fill with mineral wool / aerogel, and stitch with stainless thread." },
      { step: "03", title: "Site Fit & Strap", detail: "Wrap, strap and label each jacket — service teams can remove and refit in minutes." },
    ],
    gallery: [
      { src: valve1, caption: "Insulated steam distribution line valve cover" },
      { src: valve2, caption: "Quick-access custom jacket for utility room valve" },
      { src: valve3, caption: "Thermal insulation protection layer on valve system" },
      { src: valve4, caption: "Industrial high-temperature valve insulation jacket" },
    ],
  },
  {
    slug: "flange-box",
    cover: flange1,
    title: "Flange Box",
    tagline: "Weatherproof. Inspection-friendly.",
    description:
      "Insulated flange covers that preserve thermal continuity across bolted joints while remaining easy to remove for inspection.",
    brief:
      "Engineered flange jackets with tongue-and-groove edges and inner thermal cores eliminate cold spots at flange pairs in steam and process service.",
    bullets: [
      "Eliminates flange thermal bridging",
      "Quick-release for inspection",
      "Resistant to oil, water & UV",
      "Custom sizes for ANSI / DIN flanges",
    ],
    materials: [
      "PTFE-coated fibreglass shell",
      "Mineral wool inner core",
      "Stainless straps & hooks",
    ],
    applications: [
      "Header flange pairs",
      "Boiler manifold flanges",
      "Refinery process flanges",
    ],
    process: [
      { step: "01", title: "Measure", detail: "Record flange OD, bolt count and gap to the adjacent fitting." },
      { step: "02", title: "Shape", detail: "Cut PTFE-coated fibreglass to a tongue-and-groove envelope around the flange." },
      { step: "03", title: "Strap & Seal", detail: "Strap closed and silicone-seal the seam to shed water." },
    ],
    gallery: [
      { src: flange1, caption: "Thermal isolation flange joint jacket" },
      { src: flange2, caption: "Weatherproof industrial flange protective cover" },
      { src: flange3, caption: "Removable process line pipeline flange insulation" },
    ],
  },
  {
    slug: "motor-covers",
    cover: motor1,
    title: "Motor Covers",
    tagline: "Protection for rotating assets.",
    description:
      "All-weather motor and pump enclosures shielding equipment from rain, dust, sun and chemical exposure in outdoor industrial settings.",
    brief:
      "Tailored covers in galvanised, stainless or coated steel — ventilated to preserve cooling while sealing out the environment.",
    bullets: [
      "Ventilated for motor cooling",
      "GI, SS & coated steel options",
      "Quick-access service panels",
      "Marine & coastal grade variants",
    ],
    materials: [
      "Galvanised steel sheet",
      "Stainless SS304 sheet",
      "Powder-coated steel for coastal sites",
    ],
    applications: [
      "Outdoor motors & VFD enclosures",
      "Pump skids exposed to weather",
      "Cooling tower drives",
    ],
    process: [
      { step: "01", title: "Site Measure", detail: "Capture motor envelope, cable entries and ventilation requirement." },
      { step: "02", title: "Fabricate", detail: "Roll, weld and powder-coat the cover with louvres for cooling airflow." },
      { step: "03", title: "Install", detail: "Bolt to the skid, fit removable service panel and seal cable glands." },
    ],
    gallery: [
      { src: motor1, caption: "Industrial motor protective enclosure - Unit 1" },
      { src: motor2, caption: "Outdoor ventilated pump motor shroud" },
      { src: motor3, caption: "Heavy-duty custom fabrication for rotating assets" },
      { src: motor4, caption: "Weatherproof steel motor cover assembly" },
      { src: motor5, caption: "Skid motor casing with integrated airflow access" },
    ],
  },
];

// Public-facing portfolio (Restored and Unbroken)
export interface Project {
  id: number;
  title: string;
  city: string;
  image: string;
  year?: string;
  description?: string;
}

export const projects: Project[] = [
  { id: 1, title: "Multan Steam Plant", city: "Multan", image: projectBoilerSilver, year: "2019", description: "Full insulation upgrade of the Multan steam-generation plant — high-density rock wool over headers and economisers, finished with aluminium cladding for a decade-grade weather jacket." },
  { id: 2, title: "Lahore HVAC Retrofit", city: "Lahore", image: projectDuctwork, year: "2017", description: "Retrofitted central HVAC ductwork across multiple production halls, with SMACNA-class GI duct fabrication, acoustic lining and re-balanced airflow." },
  { id: 3, title: "Karachi Refinery Insulation", city: "Karachi", image: projectOrangeVessel, year: "2015", description: "Process vessel and piping insulation for a Karachi refinery — calcium silicate cores, stainless cladding, and turnaround inspection certification." },
  { id: 4, title: "Faisalabad Textile Boiler", city: "Faisalabad", image: projectBoilerBlue, year: "2018", description: "Boiler shell and exhaust insulation for a Faisalabad textile mill, reducing heat loss and improving operator safety around the firing platform." },
  { id: 5, title: "Islamabad Cold Storage", city: "Islamabad", image: projectPiping, year: "2020", description: "Cold-side insulation of chilled water headers and refrigeration suction lines using closed-cell elastomeric foam with a continuous vapour-tight envelope." },
  { id: 6, title: "Hyderabad Process Lines", city: "Hyderabad", image: projectHotInsulation, year: "2016", description: "Hot insulation of process headers and steam tracing across a Hyderabad chemical plant, completed during a planned shutdown window." },
  { id: 7, title: "Chirat Cement Factory — Pre-heater Insulation", city: "Nowshera", image: legacyChirat, year: "1984", description: "One of Tayeb & Company's earliest landmark contracts — pre-heater insulation at Chirat Cement, completed within twelve months of the firm's founding." },
  { id: 8, title: "Kohinoor Power Plant — Sub-Contract (Zelin Pvt Ltd)", city: "Lahore", image: legacyKohinoor, year: "1996", description: "Sub-contract execution of the thermal insulation scope at the Kohinoor power plant under main contractor Zelin Pvt Ltd." },
  { id: 9, title: "PARCO Mid-Country Refinery — Qasba Gujrat", city: "Gujrat", image: legacyParco, year: "1999", description: "Pipeline insulation works for the Pak-Arab Refinery (PARCO) Mid-Country Refinery project at Qasba Gujrat — a flagship national-scale deployment." },
  { id: 10, title: "Hafeez Ghee & General Mills — Insulation", city: "Multan", image: projectHotInsulation, year: "2003", description: "Plant insulation and duct work for the Hafeez Ghee & General Mills facility — long-running maintenance partnership documented in the client certificate archive." },
  { id: 11, title: "H&A Lubricants — Boiler Insulation", city: "Lahore", image: projectBoilerSilver, year: "2004", description: "Boiler shell insulation and cladding for H & A Lubricants (Pvt) Ltd, with a signed completion certificate dated 23 September 2004." },
  { id: 12, title: "Servo Motor-Oil (Chicago Group) — Plant Insulation", city: "Multan", image: projectPiping, year: "2008", description: "Plant insulation works for the Servo Motor-Oil facility (Chicago Group) — process lines and storage equipment." },
  { id: 13, title: "Faisal Feeds — Solvent Plant Insulation & Ductwork", city: "Multan", image: projectDuctwork, year: "2012", description: "Insulation and duct work at the Faisal Solvent extraction plant — fabrication of GI ductwork and thermal lagging across the process train." },
  { id: 14, title: "Sabirs' Vegetable Oils — Insulation & Duct Work", city: "Sheikhupura", image: projectOrangeVessel, year: "2014", description: "Insulation and duct work for Sabirs' Vegetable Oils — combined hot insulation scope and process exhaust ducting." },
  { id: 15, title: "Atta Chemicals — Thermal Insulation", city: "Multan", image: projectBoilerBlue, year: "2017", description: "Thermal insulation across the Atta Chemicals process plant, including reactor jackets, headers and storage." },
  { id: 16, title: "Safia Rice Mills — Insulation & Ductwork", city: "Sahiwal", image: projectDuctwork, year: "2024", description: "Recent deployment at Safia Rice Mills covering boiler insulation and process exhaust ductwork." },
];
// Expanded city footprint — 1000+ projects across Pakistan.
// Coordinates are approximate normalised positions (x%, y%) on the SVG map.
export const cities = [
  { name: "Karachi",      x: 22, y: 88, projectId: 3 },
  { name: "Hyderabad",    x: 30, y: 78, projectId: 6 },
  { name: "Sukkur",       x: 32, y: 68, projectId: 3 },
  { name: "Multan",       x: 38, y: 55, projectId: 1 },
  { name: "Bahawalpur",   x: 40, y: 62, projectId: 1 },
  { name: "D.G. Khan",    x: 33, y: 52, projectId: 12 },
  { name: "Sahiwal",      x: 49, y: 48, projectId: 16 },
  { name: "Faisalabad",   x: 47, y: 44, projectId: 4 },
  { name: "Sheikhupura",  x: 53, y: 41, projectId: 14 },
  { name: "Lahore",       x: 56, y: 40, projectId: 2 },
  { name: "Gujrat",       x: 56, y: 33, projectId: 9 },
  { name: "Sialkot",      x: 60, y: 30, projectId: 9 },
  { name: "Gujranwala",   x: 57, y: 35, projectId: 8 },
  { name: "Rawalpindi",   x: 56, y: 20, projectId: 5 },
  { name: "Islamabad",    x: 58, y: 18, projectId: 5 },
  { name: "Nowshera",     x: 50, y: 16, projectId: 7 },
  { name: "Peshawar",     x: 47, y: 14, projectId: 7 },
  { name: "Quetta",       x: 18, y: 56, projectId: 3 },
];

export const team = [
  { name: "Zulfiqar Ali Qureshi (Late)", role: "Founder", bio: "Established Tayeb & Company in 1983 with a singular standard of precision." },
  { name: "Shamas Tayeb", role: "Chief Executive Officer", bio: "Stewards the Tayeb legacy into a new era of nationwide engineering excellence." },
  { name: "Muhammad Nasir Farooq", role: "General Manager", bio: "Leads field operations across Pakistan with four decades of cumulative expertise." },
];

export const contact = {
  address: "Bismillah Town, Bahawalpur Bypass Chowk, Multan",
  phones: ["0300 6346506", "0300 7382695"],
  tagline: "Nationwide Scale. World-Class Engineering.",
};

// Headline stats — visible across home, footer, hero
export const stats = {
  yearsExperience: 44,         // Established 1983 → 2027
  established: 1983,
  projectsDelivered: "1000+",
  citiesServed: 80,
  teamLegacy: "3 Generations",
};

// Performance certificates issued to Tayeb & Company by clients
export interface Certificate {
  id: string;
  client: string;
  industry: string;
  city: string;
  date: string;
  scope: string;
  image: string;
}

export const certificates: Certificate[] = [
  {
    id: "ha-lubricants",
    client: "H & A Lubricants (Pvt) Ltd",
    industry: "Lubricants",
    city: "Lahore",
    date: "23 Sep 2004",
    scope: "Boiler insulation work",
    image: certHaLub,
  },
  {
    id: "hafeez-ghee",
    client: "Hafeez Ghee & General Mills (Pvt) Ltd",
    industry: "Edible Oils",
    city: "Multan",
    date: "Pre-2010",
    scope: "Plant insulation & duct work",
    image: certHafeezGhee,
  },
  {
    id: "faisal-feeds",
    client: "Faisal Feeds (Pvt) Ltd",
    industry: "Solvent / Feeds",
    city: "Multan",
    date: "—",
    scope: "Insulation and duct work at Faisal Solvent Plant",
    image: certFaisalFeeds,
  },
  {
    id: "servo-motor-oil",
    client: "Servo Motor-Oil (Pvt) Ltd — Chicago Group",
    industry: "Lubricants",
    city: "Multan",
    date: "—",
    scope: "Plant insulation work",
    image: certServo,
  },
  {
    id: "sabirs-oils",
    client: "Sabirs' Vegetable Oils (Pvt) Ltd",
    industry: "Vegetable Oil",
    city: "Sheikhupura",
    date: "—",
    scope: "Insulation and duct work at oil mill",
    image: certSabirs,
  },
  {
    id: "atta-chemicals",
    client: "Atta Chemicals (Pvt) Ltd",
    industry: "Chemicals",
    city: "Multan",
    date: "21 Jul 2017",
    scope: "Thermal insulation work",
    image: certAtta,
  },
  {
    id: "safia-rice",
    client: "Safia Rice Mills",
    industry: "Rice / Food Processing",
    city: "Sahiwal",
    date: "08 Oct 2024",
    scope: "Insulation and duct work at rice mills",
    image: certSafia,
  },
  {
    id: "ntn-fbr",
    client: "Tayeb & Company — FBR Taxpayer Registration",
    industry: "Government / Compliance",
    city: "Multan",
    date: "05 Oct 2020",
    scope: "Federal Board of Revenue Taxpayer Registration Certificate (NTN: 4230126239547) issued under Section 181C of the Income Tax Ordinance 2001.",
    image: certNtn,
  },
];
