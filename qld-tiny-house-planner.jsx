const { useState, useEffect, useRef, useCallback } = React;

// Icon components using Font Awesome
const HouseIcon = () => <i className="fa-solid fa-house" style={{ fontSize: 20, color: "#fff" }} />;
const MapIcon = () => <i className="fa-solid fa-map-location-dot" style={{ fontSize: 18, color: "#22c55e" }} />;
const SearchIcon = () => <i className="fa-solid fa-magnifying-glass" style={{ fontSize: 14 }} />;
const CrosshairIcon = () => <i className="fa-solid fa-crosshairs" style={{ fontSize: 12, marginRight: 4 }} />;
const TrashIcon = () => <i className="fa-solid fa-trash" style={{ fontSize: 11 }} />;
const AlertIcon = () => <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 14, color: "#fbbf24" }} />;
const ChevronRight = () => <i className="fa-solid fa-chevron-right" style={{ fontSize: 11, marginLeft: 4 }} />;
const ChevronLeft = () => <i className="fa-solid fa-chevron-left" style={{ fontSize: 11, marginRight: 4 }} />;
const RulerIcon = () => <i className="fa-solid fa-ruler" style={{ fontSize: 18, color: "#22c55e" }} />;
const CheckIcon = () => <i className="fa-solid fa-check" style={{ fontSize: 14 }} />;
const DollarIcon = () => <i className="fa-solid fa-dollar-sign" style={{ fontSize: 18, color: "#22c55e" }} />;
const CalendarIcon = () => <i className="fa-solid fa-calendar" style={{ fontSize: 18, color: "#22c55e" }} />;
const ClipboardIcon = () => <i className="fa-solid fa-clipboard" style={{ fontSize: 18, color: "#22c55e" }} />;

const QLD_COUNCILS = {
  "Brisbane City": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Gold Coast": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Sunshine Coast": { maxGFA: 60, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Logan City": { maxGFA: 70, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Ipswich City": { maxGFA: 50, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Moreton Bay": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Redland City": { maxGFA: 85, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Toowoomba": { maxGFA: 80, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Cairns": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Townsville": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
  "Mackay": { maxGFA: 80, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Rockhampton": { maxGFA: 80, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Bundaberg": { maxGFA: 80, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Fraser Coast": { maxGFA: 70, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Gladstone": { maxGFA: 80, minLot: 600, zone: "LDR", proximityRule: 20 },
  "Other QLD Council": { maxGFA: 80, minLot: 450, zone: "LDR", proximityRule: 20 },
};

// Suburb database with coordinates for offline geocoding
const SUBURB_DB = [
  // Brisbane City
  {s:"Paddington",c:"Brisbane City",lat:-27.4598,lng:152.9988},{s:"Toowong",c:"Brisbane City",lat:-27.4838,lng:152.9838},{s:"Indooroopilly",c:"Brisbane City",lat:-27.4998,lng:152.9728},{s:"New Farm",c:"Brisbane City",lat:-27.4678,lng:153.0488},{s:"Fortitude Valley",c:"Brisbane City",lat:-27.4568,lng:153.0348},{s:"West End",c:"Brisbane City",lat:-27.4818,lng:153.0058},{s:"South Brisbane",c:"Brisbane City",lat:-27.4788,lng:153.0208},{s:"Woolloongabba",c:"Brisbane City",lat:-27.4878,lng:153.0368},{s:"Coorparoo",c:"Brisbane City",lat:-27.4958,lng:153.0488},{s:"Camp Hill",c:"Brisbane City",lat:-27.4928,lng:153.0618},{s:"Carindale",c:"Brisbane City",lat:-27.5058,lng:153.1008},{s:"Mt Gravatt",c:"Brisbane City",lat:-27.5328,lng:153.0808},{s:"Sunnybank",c:"Brisbane City",lat:-27.5788,lng:153.0588},{s:"Eight Mile Plains",c:"Brisbane City",lat:-27.5818,lng:153.0948},{s:"Chermside",c:"Brisbane City",lat:-27.3868,lng:153.0318},{s:"Nundah",c:"Brisbane City",lat:-27.3978,lng:153.0598},{s:"Hamilton",c:"Brisbane City",lat:-27.4378,lng:153.0618},{s:"Ascot",c:"Brisbane City",lat:-27.4288,lng:153.0618},{s:"Bulimba",c:"Brisbane City",lat:-27.4538,lng:153.0618},{s:"Hawthorne",c:"Brisbane City",lat:-27.4618,lng:153.0568},{s:"Kangaroo Point",c:"Brisbane City",lat:-27.4768,lng:153.0358},{s:"Spring Hill",c:"Brisbane City",lat:-27.4578,lng:153.0188},{s:"Milton",c:"Brisbane City",lat:-27.4678,lng:153.0008},{s:"Auchenflower",c:"Brisbane City",lat:-27.4748,lng:152.9918},{s:"St Lucia",c:"Brisbane City",lat:-27.4968,lng:153.0008},{s:"Taringa",c:"Brisbane City",lat:-27.4878,lng:152.9818},{s:"Kenmore",c:"Brisbane City",lat:-27.5108,lng:152.9408},{s:"Chapel Hill",c:"Brisbane City",lat:-27.5008,lng:152.9518},{s:"The Gap",c:"Brisbane City",lat:-27.4388,lng:152.9478},{s:"Ashgrove",c:"Brisbane City",lat:-27.4438,lng:152.9788},{s:"Bardon",c:"Brisbane City",lat:-27.4558,lng:152.9728},{s:"Red Hill",c:"Brisbane City",lat:-27.4578,lng:152.9968},{s:"Kelvin Grove",c:"Brisbane City",lat:-27.4478,lng:153.0068},{s:"Herston",c:"Brisbane City",lat:-27.4448,lng:153.0168},{s:"Annerley",c:"Brisbane City",lat:-27.5048,lng:153.0318},{s:"Yeronga",c:"Brisbane City",lat:-27.5098,lng:153.0168},{s:"Moorooka",c:"Brisbane City",lat:-27.5238,lng:153.0288},{s:"Rocklea",c:"Brisbane City",lat:-27.5398,lng:153.0018},{s:"Oxley",c:"Brisbane City",lat:-27.5458,lng:152.9688},{s:"Sherwood",c:"Brisbane City",lat:-27.5238,lng:152.9698},{s:"Graceville",c:"Brisbane City",lat:-27.5208,lng:152.9728},{s:"Jindalee",c:"Brisbane City",lat:-27.5348,lng:152.9388},{s:"Forest Lake",c:"Brisbane City",lat:-27.6248,lng:152.9688},{s:"Richlands",c:"Brisbane City",lat:-27.5988,lng:152.9528},{s:"Inala",c:"Brisbane City",lat:-27.5868,lng:152.9688},{s:"Brisbane CBD",c:"Brisbane City",lat:-27.4698,lng:153.0251},{s:"Greenslopes",c:"Brisbane City",lat:-27.5038,lng:153.0418},{s:"Wishart",c:"Brisbane City",lat:-27.5518,lng:153.0918},{s:"Salisbury",c:"Brisbane City",lat:-27.5508,lng:153.0348},{s:"Sunnybank Hills",c:"Brisbane City",lat:-27.5968,lng:153.0548},{s:"Stretton",c:"Brisbane City",lat:-27.6158,lng:153.0548},{s:"Calamvale",c:"Brisbane City",lat:-27.6228,lng:153.0468},{s:"Runcorn",c:"Brisbane City",lat:-27.5938,lng:153.0788},{s:"Kedron",c:"Brisbane City",lat:-27.3998,lng:153.0188},{s:"Stafford",c:"Brisbane City",lat:-27.4058,lng:153.0078},{s:"Wavell Heights",c:"Brisbane City",lat:-27.3818,lng:153.0498},{s:"Banyo",c:"Brisbane City",lat:-27.3748,lng:153.0788},{s:"Hendra",c:"Brisbane City",lat:-27.4208,lng:153.0658},{s:"Clayfield",c:"Brisbane City",lat:-27.4168,lng:153.0538},{s:"Windsor",c:"Brisbane City",lat:-27.4328,lng:153.0318},{s:"Wilston",c:"Brisbane City",lat:-27.4318,lng:153.0178},{s:"Newstead",c:"Brisbane City",lat:-27.4498,lng:153.0458},{s:"Morningside",c:"Brisbane City",lat:-27.4608,lng:153.0738},{s:"Balmoral",c:"Brisbane City",lat:-27.4538,lng:153.0688},{s:"Norman Park",c:"Brisbane City",lat:-27.4758,lng:153.0598},{s:"Fig Tree Pocket",c:"Brisbane City",lat:-27.5248,lng:152.9528},{s:"Brookfield",c:"Brisbane City",lat:-27.4898,lng:152.9108},{s:"Pullenvale",c:"Brisbane City",lat:-27.5188,lng:152.8808},{s:"Moggill",c:"Brisbane City",lat:-27.5588,lng:152.8768},
  // Gold Coast
  {s:"Southport",c:"Gold Coast",lat:-27.9668,lng:153.3998},{s:"Surfers Paradise",c:"Gold Coast",lat:-28.0028,lng:153.4298},{s:"Broadbeach",c:"Gold Coast",lat:-28.0268,lng:153.4308},{s:"Burleigh Heads",c:"Gold Coast",lat:-28.0868,lng:153.4478},{s:"Palm Beach",c:"Gold Coast",lat:-28.1118,lng:153.4598},{s:"Coolangatta",c:"Gold Coast",lat:-28.1658,lng:153.5348},{s:"Robina",c:"Gold Coast",lat:-28.0768,lng:153.3858},{s:"Varsity Lakes",c:"Gold Coast",lat:-28.0878,lng:153.4068},{s:"Nerang",c:"Gold Coast",lat:-28.0058,lng:153.3368},{s:"Coomera",c:"Gold Coast",lat:-27.8628,lng:153.3328},{s:"Ormeau",c:"Gold Coast",lat:-27.7648,lng:153.2638},{s:"Pimpama",c:"Gold Coast",lat:-27.8158,lng:153.2948},{s:"Mudgeeraba",c:"Gold Coast",lat:-28.0818,lng:153.3658},{s:"Ashmore",c:"Gold Coast",lat:-27.9858,lng:153.3818},{s:"Benowa",c:"Gold Coast",lat:-27.9958,lng:153.3988},{s:"Carrara",c:"Gold Coast",lat:-28.0108,lng:153.3658},{s:"Labrador",c:"Gold Coast",lat:-27.9468,lng:153.3998},{s:"Runaway Bay",c:"Gold Coast",lat:-27.9388,lng:153.3898},{s:"Hope Island",c:"Gold Coast",lat:-27.8728,lng:153.3618},{s:"Helensvale",c:"Gold Coast",lat:-27.9028,lng:153.3408},{s:"Pacific Pines",c:"Gold Coast",lat:-27.9148,lng:153.3258},{s:"Oxenford",c:"Gold Coast",lat:-27.8848,lng:153.3128},{s:"Upper Coomera",c:"Gold Coast",lat:-27.8728,lng:153.2898},{s:"Currumbin",c:"Gold Coast",lat:-28.1418,lng:153.4828},{s:"Elanora",c:"Gold Coast",lat:-28.1378,lng:153.4598},{s:"Tugun",c:"Gold Coast",lat:-28.1508,lng:153.4918},{s:"Miami",c:"Gold Coast",lat:-28.0648,lng:153.4398},{s:"Mermaid Beach",c:"Gold Coast",lat:-28.0398,lng:153.4348},{s:"Mermaid Waters",c:"Gold Coast",lat:-28.0438,lng:153.4218},{s:"Highland Park",c:"Gold Coast",lat:-28.0138,lng:153.3208},
  // Sunshine Coast
  {s:"Maroochydore",c:"Sunshine Coast",lat:-26.6548,lng:153.0998},{s:"Mooloolaba",c:"Sunshine Coast",lat:-26.6838,lng:153.1188},{s:"Caloundra",c:"Sunshine Coast",lat:-26.7978,lng:153.1298},{s:"Nambour",c:"Sunshine Coast",lat:-26.6278,lng:152.9598},{s:"Buderim",c:"Sunshine Coast",lat:-26.6838,lng:153.0558},{s:"Sippy Downs",c:"Sunshine Coast",lat:-26.7188,lng:153.0578},{s:"Noosa Heads",c:"Sunshine Coast",lat:-26.3908,lng:153.0918},{s:"Noosaville",c:"Sunshine Coast",lat:-26.3988,lng:153.0668},{s:"Coolum Beach",c:"Sunshine Coast",lat:-26.5278,lng:153.0868},{s:"Bli Bli",c:"Sunshine Coast",lat:-26.6248,lng:153.0348},{s:"Palmwoods",c:"Sunshine Coast",lat:-26.6878,lng:152.9618},{s:"Beerwah",c:"Sunshine Coast",lat:-26.8548,lng:152.9568},{s:"Landsborough",c:"Sunshine Coast",lat:-26.8078,lng:152.9598},{s:"Maleny",c:"Sunshine Coast",lat:-26.7518,lng:152.8498},{s:"Kawana",c:"Sunshine Coast",lat:-26.7288,lng:153.1228},{s:"Mountain Creek",c:"Sunshine Coast",lat:-26.7128,lng:153.0978},
  // Logan City
  {s:"Springwood",c:"Logan City",lat:-27.5988,lng:153.1228},{s:"Shailer Park",c:"Logan City",lat:-27.6268,lng:153.1588},{s:"Daisy Hill",c:"Logan City",lat:-27.6348,lng:153.1548},{s:"Woodridge",c:"Logan City",lat:-27.6278,lng:153.1078},{s:"Marsden",c:"Logan City",lat:-27.6668,lng:153.0948},{s:"Browns Plains",c:"Logan City",lat:-27.6638,lng:153.0518},{s:"Beenleigh",c:"Logan City",lat:-27.7108,lng:153.1908},{s:"Eagleby",c:"Logan City",lat:-27.7098,lng:153.2138},{s:"Yarrabilba",c:"Logan City",lat:-27.7558,lng:153.1078},{s:"Jimboomba",c:"Logan City",lat:-27.8328,lng:153.0268},{s:"Park Ridge",c:"Logan City",lat:-27.7058,lng:153.0438},{s:"Logan Central",c:"Logan City",lat:-27.6388,lng:153.1078},{s:"Waterford",c:"Logan City",lat:-27.6928,lng:153.1608},{s:"Kingston",c:"Logan City",lat:-27.6638,lng:153.1208},{s:"Loganholme",c:"Logan City",lat:-27.6538,lng:153.1688},
  // Ipswich City
  {s:"Springfield",c:"Ipswich City",lat:-27.6588,lng:152.9078},{s:"Springfield Lakes",c:"Ipswich City",lat:-27.6738,lng:152.9078},{s:"Redbank Plains",c:"Ipswich City",lat:-27.6518,lng:152.8628},{s:"Goodna",c:"Ipswich City",lat:-27.6068,lng:152.8928},{s:"Bellbird Park",c:"Ipswich City",lat:-27.6408,lng:152.8708},{s:"Brassall",c:"Ipswich City",lat:-27.5828,lng:152.7408},{s:"Ipswich CBD",c:"Ipswich City",lat:-27.6148,lng:152.7608},{s:"Booval",c:"Ipswich City",lat:-27.6158,lng:152.7878},{s:"Bundamba",c:"Ipswich City",lat:-27.6098,lng:152.8178},{s:"Yamanto",c:"Ipswich City",lat:-27.6568,lng:152.7408},{s:"Rosewood",c:"Ipswich City",lat:-27.6328,lng:152.5928},{s:"Walloon",c:"Ipswich City",lat:-27.6028,lng:152.6678},{s:"Ripley",c:"Ipswich City",lat:-27.6968,lng:152.8098},
  // Moreton Bay
  {s:"Caboolture",c:"Moreton Bay",lat:-27.0818,lng:152.9508},{s:"Morayfield",c:"Moreton Bay",lat:-27.1068,lng:152.9508},{s:"North Lakes",c:"Moreton Bay",lat:-27.2218,lng:153.0088},{s:"Mango Hill",c:"Moreton Bay",lat:-27.2388,lng:153.0168},{s:"Kallangur",c:"Moreton Bay",lat:-27.2518,lng:152.9918},{s:"Petrie",c:"Moreton Bay",lat:-27.2638,lng:152.9718},{s:"Strathpine",c:"Moreton Bay",lat:-27.3028,lng:152.9898},{s:"Brendale",c:"Moreton Bay",lat:-27.3208,lng:152.9748},{s:"Warner",c:"Moreton Bay",lat:-27.3148,lng:152.9518},{s:"Albany Creek",c:"Moreton Bay",lat:-27.3508,lng:152.9688},{s:"Redcliffe",c:"Moreton Bay",lat:-27.2278,lng:153.1108},{s:"Scarborough",c:"Moreton Bay",lat:-27.2028,lng:153.1058},{s:"Deception Bay",c:"Moreton Bay",lat:-27.1868,lng:153.0278},{s:"Bribie Island",c:"Moreton Bay",lat:-27.0558,lng:153.1458},{s:"Burpengary",c:"Moreton Bay",lat:-27.1548,lng:152.9628},{s:"Narangba",c:"Moreton Bay",lat:-27.2008,lng:152.9588},{s:"Samford",c:"Moreton Bay",lat:-27.3738,lng:152.8718},{s:"Dayboro",c:"Moreton Bay",lat:-27.1968,lng:152.8228},{s:"Griffin",c:"Moreton Bay",lat:-27.2618,lng:153.0378},{s:"Murrumba Downs",c:"Moreton Bay",lat:-27.2618,lng:153.0088},
  // Redland City
  {s:"Cleveland",c:"Redland City",lat:-27.5278,lng:153.2648},{s:"Thornlands",c:"Redland City",lat:-27.5588,lng:153.2638},{s:"Victoria Point",c:"Redland City",lat:-27.5838,lng:153.2838},{s:"Redland Bay",c:"Redland City",lat:-27.6108,lng:153.2948},{s:"Capalaba",c:"Redland City",lat:-27.5268,lng:153.1948},{s:"Alexandra Hills",c:"Redland City",lat:-27.5428,lng:153.2238},{s:"Birkdale",c:"Redland City",lat:-27.5058,lng:153.2168},{s:"Wellington Point",c:"Redland City",lat:-27.4838,lng:153.2398},{s:"Ormiston",c:"Redland City",lat:-27.5148,lng:153.2558},{s:"Mount Cotton",c:"Redland City",lat:-27.6168,lng:153.2328},{s:"Sheldon",c:"Redland City",lat:-27.5808,lng:153.2048},
  // Toowoomba
  {s:"Toowoomba CBD",c:"Toowoomba",lat:-27.5598,lng:151.9538},{s:"Rangeville",c:"Toowoomba",lat:-27.5788,lng:151.9788},{s:"East Toowoomba",c:"Toowoomba",lat:-27.5538,lng:151.9798},{s:"Darling Heights",c:"Toowoomba",lat:-27.5858,lng:151.9448},{s:"Highfields",c:"Toowoomba",lat:-27.4618,lng:151.9478},{s:"Kearneys Spring",c:"Toowoomba",lat:-27.5858,lng:151.9298},
  // Cairns
  {s:"Cairns CBD",c:"Cairns",lat:-16.9186,lng:145.7781},{s:"Edge Hill",c:"Cairns",lat:-16.9058,lng:145.7478},{s:"Redlynch",c:"Cairns",lat:-16.8778,lng:145.6978},{s:"Smithfield",c:"Cairns",lat:-16.8328,lng:145.6928},{s:"Trinity Beach",c:"Cairns",lat:-16.7878,lng:145.6948},{s:"Palm Cove",c:"Cairns",lat:-16.7478,lng:145.6728},{s:"Earlville",c:"Cairns",lat:-16.9448,lng:145.7368},{s:"Gordonvale",c:"Cairns",lat:-17.0958,lng:145.7848},{s:"Edmonton",c:"Cairns",lat:-17.0178,lng:145.7448},{s:"Mount Sheridan",c:"Cairns",lat:-16.9898,lng:145.7358},{s:"Freshwater",c:"Cairns",lat:-16.8928,lng:145.7188},{s:"Whitfield",c:"Cairns",lat:-16.8978,lng:145.7348},
  // Townsville
  {s:"Townsville CBD",c:"Townsville",lat:-19.2578,lng:146.8168},{s:"North Ward",c:"Townsville",lat:-19.2478,lng:146.7978},{s:"Aitkenvale",c:"Townsville",lat:-19.2998,lng:146.7818},{s:"Kirwan",c:"Townsville",lat:-19.3128,lng:146.7298},{s:"Annandale",c:"Townsville",lat:-19.3258,lng:146.7878},{s:"Douglas",c:"Townsville",lat:-19.3298,lng:146.7568},{s:"Bushland Beach",c:"Townsville",lat:-19.1858,lng:146.6798},{s:"Belgian Gardens",c:"Townsville",lat:-19.2468,lng:146.7808},{s:"Mundingburra",c:"Townsville",lat:-19.2788,lng:146.7788},{s:"Hermit Park",c:"Townsville",lat:-19.2718,lng:146.7698},
];

function findSuburb(query) {
  const q = query.toLowerCase().trim();
  // Exact match first
  let match = SUBURB_DB.find(s => q.includes(s.s.toLowerCase()));
  if (match) return match;
  // Try partial / fuzzy
  const words = q.split(/[\s,]+/).filter(w => w.length > 2);
  for (const word of words) {
    match = SUBURB_DB.find(s => s.s.toLowerCase().includes(word) || word.includes(s.s.toLowerCase()));
    if (match) return match;
  }
  return null;
}

// Haversine-based polygon area calculation (Shoelace on projected coords)
function calcPolygonAreaSqm(points) {
  if (points.length < 3) return 0;
  const toRad = d => d * Math.PI / 180;
  const R = 6371000;
  const refLat = points[0].lat;
  const projected = points.map(p => ({
    x: R * toRad(p.lng - points[0].lng) * Math.cos(toRad(refLat)),
    y: R * toRad(p.lat - points[0].lat),
  }));
  let area = 0;
  for (let i = 0; i < projected.length; i++) {
    const j = (i + 1) % projected.length;
    area += projected[i].x * projected[j].y;
    area -= projected[j].x * projected[i].y;
  }
  return Math.abs(area / 2);
}

const MATERIALS = {
  timber: { label: "Timber Frame", costPerSqm: 2200, durability: "Good", buildTime: 1.0, sustainability: "High", description: "Classic Australian building method. Warm, natural aesthetic with good insulation." },
  steel: { label: "Steel Frame", costPerSqm: 2500, durability: "Excellent", buildTime: 0.85, sustainability: "Medium", description: "Strong, termite-proof, and fire-resistant. Modern and durable." },
  modular: { label: "Modular / Prefab", costPerSqm: 2800, durability: "Excellent", buildTime: 0.5, sustainability: "High", description: "Factory-built sections assembled on-site. Fastest build time and less waste." },
  brick: { label: "Brick Veneer", costPerSqm: 2900, durability: "Excellent", buildTime: 1.2, sustainability: "Medium", description: "Traditional, solid feel. Great thermal mass for QLD climate." },
  container: { label: "Shipping Container", costPerSqm: 1800, durability: "Good", buildTime: 0.6, sustainability: "High", description: "Recycled containers converted to living spaces. Budget-friendly and eco-conscious." },
  kitHome: { label: "Kit Home / Flat Pack", costPerSqm: 1500, durability: "Good", buildTime: 0.7, sustainability: "Medium", description: "Pre-designed components for self-assembly. Most affordable option." },
};

const FINISH_LEVELS = {
  basic: { label: "Basic", multiplier: 0.8, description: "Standard fittings, laminate surfaces, vinyl flooring" },
  mid: { label: "Mid-Range", multiplier: 1.0, description: "Quality fixtures, timber-look flooring, stone benchtops" },
  high: { label: "High-End", multiplier: 1.35, description: "Premium finishes, custom joinery, designer fixtures" },
};

const BEDROOMS = [
  { value: 0, label: "Studio", sqmRange: [25, 35] },
  { value: 1, label: "1 Bedroom", sqmRange: [35, 50] },
  { value: 2, label: "2 Bedrooms", sqmRange: [50, 80] },
];

function generatePlan(data) {
  const council = QLD_COUNCILS[data.council] || QLD_COUNCILS["Other QLD Council"];
  const material = MATERIALS[data.material];
  const finish = FINISH_LEVELS[data.finishLevel];
  const bedroom = BEDROOMS.find(b => b.value === data.bedrooms);
  const requestedSize = parseInt(data.constructionSize) || bedroom.sqmRange[1];
  const maxAllowed = council.maxGFA;
  const finalSize = Math.min(requestedSize, maxAllowed);
  const sizeWarning = requestedSize > maxAllowed;
  const baseCost = finalSize * material.costPerSqm * finish.multiplier;
  const sitePrep = data.siteCondition === "flat" ? 8000 : data.siteCondition === "slight" ? 15000 : 25000;
  const approvals = 5500;
  const plumbing = 12000;
  const electrical = 9000;
  const connections = 8000;
  const landscaping = 5000;
  const contingency = baseCost * 0.1;
  const totalCost = baseCost + sitePrep + approvals + plumbing + electrical + connections + landscaping + contingency;
  const budget = parseInt(data.budget) || 0;
  const budgetDiff = budget - totalCost;
  const baseWeeks = finalSize <= 40 ? 12 : finalSize <= 60 ? 16 : 20;
  const adjustedWeeks = Math.ceil(baseWeeks * material.buildTime);
  const needsDA = finalSize > maxAllowed || data.hasOverlays === "yes";
  const approvalPath = needsDA ? "Code Assessable (DA Required)" : "Accepted Development (No DA)";
  const alternatives = [];

  if (budgetDiff < -5000) {
    const kitCost = finalSize * MATERIALS.kitHome.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * MATERIALS.kitHome.costPerSqm * finish.multiplier * 0.1);
    if (kitCost <= budget) alternatives.push({ title: "Kit Home Option", desc: `Switch to a kit/flat-pack build to fit within your $${budget.toLocaleString()} budget`, cost: kitCost, size: finalSize, material: "Kit Home", weeks: Math.ceil(baseWeeks * MATERIALS.kitHome.buildTime) });
    const smallerSize = Math.max(25, finalSize - 15);
    const smallerCost = smallerSize * material.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (smallerSize * material.costPerSqm * finish.multiplier * 0.1);
    if (smallerCost <= budget) alternatives.push({ title: "Smaller Footprint", desc: `Reduce to ${smallerSize}m² to stay within budget with your preferred materials`, cost: smallerCost, size: smallerSize, material: material.label, weeks: Math.ceil((smallerSize <= 40 ? 12 : 16) * material.buildTime) });
    const basicCost = finalSize * material.costPerSqm * FINISH_LEVELS.basic.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * material.costPerSqm * FINISH_LEVELS.basic.multiplier * 0.1);
    if (basicCost <= budget && data.finishLevel !== "basic") alternatives.push({ title: "Basic Finish", desc: `Keep your ${finalSize}m² size with basic finishes—upgrade later when funds allow`, cost: basicCost, size: finalSize, material: material.label, weeks: adjustedWeeks });
    const containerCost = finalSize * MATERIALS.container.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * MATERIALS.container.costPerSqm * finish.multiplier * 0.1);
    if (containerCost <= budget && data.material !== "container") alternatives.push({ title: "Container Conversion", desc: "A shipping container build is eco-friendly and budget-conscious", cost: containerCost, size: finalSize, material: "Shipping Container", weeks: Math.ceil(baseWeeks * MATERIALS.container.buildTime) });
  }
  if (budgetDiff >= 5000) {
    if (data.finishLevel !== "high") {
      const highCost = finalSize * material.costPerSqm * FINISH_LEVELS.high.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * material.costPerSqm * FINISH_LEVELS.high.multiplier * 0.1);
      if (highCost <= budget) alternatives.push({ title: "Premium Upgrade", desc: "Your budget allows for high-end finishes—custom joinery, designer fixtures", cost: highCost, size: finalSize, material: material.label, weeks: adjustedWeeks + 2 });
    }
    if (finalSize < maxAllowed) {
      const biggerSize = Math.min(finalSize + 15, maxAllowed);
      const biggerCost = biggerSize * material.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (biggerSize * material.costPerSqm * finish.multiplier * 0.1);
      if (biggerCost <= budget) alternatives.push({ title: "Larger Build", desc: `Expand to ${biggerSize}m² and still stay within budget`, cost: biggerCost, size: biggerSize, material: material.label, weeks: Math.ceil((biggerSize <= 40 ? 12 : biggerSize <= 60 ? 16 : 20) * material.buildTime) });
    }
  }
  if (data.material !== "modular") {
    const modCost = finalSize * MATERIALS.modular.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * MATERIALS.modular.costPerSqm * finish.multiplier * 0.1);
    alternatives.push({ title: "Modular Speed Build", desc: `Factory-built in ~${Math.ceil(baseWeeks * MATERIALS.modular.buildTime)} weeks vs ${adjustedWeeks} weeks—less disruption`, cost: modCost, size: finalSize, material: "Modular / Prefab", weeks: Math.ceil(baseWeeks * MATERIALS.modular.buildTime) });
  }

  const schedule = [
    { phase: "Planning & Design", weeks: "Weeks 1–3", tasks: ["Engage designer/architect", "Site survey & soil test", "Create floor plans", "Select materials & finishes"] },
    { phase: "Approvals", weeks: needsDA ? "Weeks 4–12" : "Weeks 4–6", tasks: needsDA ? ["Submit DA to council", "Building approval application", "Plumbing & drainage approval", "Wait for council assessment"] : ["Private building certifier review", "Building approval application", "Plumbing & drainage approval"] },
    { phase: "Site Preparation", weeks: needsDA ? "Weeks 13–15" : "Weeks 7–9", tasks: ["Clear & level site", "Install temporary fencing", "Set up services access", "Pour footings & slab"] },
    { phase: "Construction", weeks: needsDA ? `Weeks 16–${15 + adjustedWeeks}` : `Weeks 10–${9 + adjustedWeeks}`, tasks: ["Frame & roof", "Windows & external cladding", "Internal walls & insulation", "Plumbing & electrical rough-in"] },
    { phase: "Fit-Out", weeks: needsDA ? `Weeks ${16 + adjustedWeeks}–${18 + adjustedWeeks}` : `Weeks ${10 + adjustedWeeks}–${12 + adjustedWeeks}`, tasks: ["Kitchen & bathroom install", "Flooring & painting", "Fixtures & fittings", "External landscaping"] },
    { phase: "Completion", weeks: needsDA ? `Weeks ${19 + adjustedWeeks}–${20 + adjustedWeeks}` : `Weeks ${13 + adjustedWeeks}–${14 + adjustedWeeks}`, tasks: ["Final inspections", "Certifier sign-off", "Defects rectification", "Handover & keys"] },
  ];
  const permits = [
    { name: "Building Approval", required: true, cost: "$2,500 – $4,000", who: "Private Building Certifier", notes: "Always required. Certifier assesses NCC compliance." },
    { name: "Plumbing & Drainage", required: true, cost: "$800 – $1,500", who: "Licensed Plumber + Council", notes: "Required for all new plumbing connections." },
    { name: "Development Approval (DA)", required: needsDA, cost: "$2,000 – $5,000+", who: "Local Council", notes: needsDA ? "Required due to overlays or size exceeding accepted limits." : "Not required if within accepted development parameters." },
    { name: "Electrical Safety", required: true, cost: "Included in electrical", who: "Licensed Electrician", notes: "Certificate of compliance for all electrical work." },
    { name: "Fire Safety Certificate", required: data.purpose === "rental", cost: "$500 – $1,500", who: "Building Certifier", notes: "Required if renting out—fire separation & smoke alarms." },
    { name: "Soil & Site Report", required: true, cost: "$500 – $1,000", who: "Geotechnical Engineer", notes: "Determines foundation requirements." },
    { name: "Energy Efficiency Report", required: true, cost: "$300 – $600", who: "Energy Assessor", notes: "Must meet minimum 6-star energy rating." },
  ];
  const budgetBreakdown = { "Construction (structure)": baseCost, "Site Preparation": sitePrep, "Plumbing": plumbing, "Electrical": electrical, "Utility Connections": connections, "Approvals & Permits": approvals, "Landscaping": landscaping, "Contingency (10%)": contingency };
  const weeklyRent = data.council === "Brisbane City" ? [350, 500] : data.council === "Gold Coast" ? [380, 520] : data.council === "Sunshine Coast" ? [340, 480] : [300, 450];
  const annualRent = weeklyRent.map(r => r * 52);
  const roi = annualRent.map(r => ((r / totalCost) * 100).toFixed(1));
  return { finalSize, sizeWarning, maxAllowed, totalCost, budgetDiff, adjustedWeeks, needsDA, approvalPath, alternatives, schedule, permits, budgetBreakdown, council, material, finish, weeklyRent, annualRent, roi };
}

const css = `
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeIn 0.4s ease-out; }
  .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; }
  .input-field { width: 100%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #e8ede8; font-size: 14px; font-family: inherit; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
  .input-field:focus { border-color: #22c55e; }
  .input-field option { background: #1a2a3a; color: #e8ede8; }
  .error-text { font-size: 12px; color: #f87171; margin-top: 6px; }
  .address-search-wrap { display: flex; gap: 8px; }
  .search-btn { background: linear-gradient(135deg, #22c55e, #059669); border: none; border-radius: 10px; padding: 0 16px; color: #fff; cursor: pointer; display: flex; align-items: center; font-size: 16px; }
  .search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .map-container { position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
  .badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
  .badge-green { background: rgba(34,197,94,0.15); color: #4ade80; }
  .badge-amber { background: rgba(245,158,11,0.15); color: #fbbf24; }
  @keyframes pulseGreen { 0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); } 50% { box-shadow: 0 0 0 6px rgba(34,197,94,0); } }
  .pulse-green { animation: pulseGreen 2s infinite; border-radius: 6px; }
  .finish-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 20px; color: #e8ede8; cursor: pointer; font-family: inherit; text-align: left; transition: all 0.2s; }
  .finish-btn:hover { border-color: rgba(34,197,94,0.3); }
  .finish-btn.selected { border-color: #22c55e; background: rgba(34,197,94,0.08); }
  .material-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 16px; cursor: pointer; transition: all 0.2s; }
  .material-card:hover { border-color: rgba(34,197,94,0.3); }
  .material-card.selected { border-color: #22c55e; background: rgba(34,197,94,0.06); }
  .btn-primary { background: linear-gradient(135deg, #22c55e, #059669); border: none; border-radius: 12px; padding: 14px 28px; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 4px; transition: transform 0.2s, box-shadow 0.2s; }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(34,197,94,0.3); }
  .btn-secondary { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px 28px; color: #e8ede8; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 4px; transition: all 0.2s; }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.2); }
  .tab-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 10px; padding: 10px 18px; color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; white-space: nowrap; }
  .tab-btn:hover { color: #e8ede8; border-color: rgba(255,255,255,0.15); }
  .tab-btn.active { background: rgba(34,197,94,0.12); border-color: rgba(34,197,94,0.3); color: #4ade80; }
  .card-hover { transition: all 0.2s; }
  .card-hover:hover { border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.06); }
  @media (max-width: 640px) {
    .grid-2 { grid-template-columns: 1fr !important; }
  }
`;

const STEPS = ["Location & Land", "Design & Materials", "Budget & Purpose", "Your Plan"];
const STEP_ICONS = ["fa-map-location-dot", "fa-hammer", "fa-wallet", "fa-clipboard-check"];

function TinyHousePlanner() {
  const [step, setStep] = useState(0);
  const [resultTab, setResultTab] = useState("overview");
  const [formData, setFormData] = useState({ council: "", suburb: "", landSize: "", bedrooms: 1, constructionSize: "", material: "", finishLevel: "mid", siteCondition: "flat", hasOverlays: "no", budget: "", purpose: "family" });
  const [plan, setPlan] = useState(null);
  const [errors, setErrors] = useState({});

  // Address & Map state
  const [address, setAddress] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressResult, setAddressResult] = useState(null); // { lat, lng, formatted }
  const [polyPoints, setPolyPoints] = useState([]); // [{lat,lng}]
  const [measuredArea, setMeasuredArea] = useState(null);
  const mapDivRef = useRef(null);
  const gMapRef = useRef(null);       // google.maps.Map instance
  const gPinRef = useRef(null);       // address pin marker
  const gPolyRef = useRef(null);      // polygon/polyline shape
  const gOverlays = useRef([]);       // vertex + label markers
  const polyPtsRef = useRef([]);      // always-current polygon points

  // Helper: remove polygon overlays from map
  const clearOverlays = () => {
    try {
      if (gPolyRef.current) { gPolyRef.current.setMap(null); gPolyRef.current = null; }
      gOverlays.current.forEach(m => { try { m.setMap(null); } catch(e){} });
      gOverlays.current = [];
    } catch(e){}
  };

  // Redraw polygon + vertex markers + distance labels on the Google Map
  const redrawPolygon = (points) => {
    if (!gMapRef.current || !window.google) return;
    clearOverlays();
    if (!points.length) return;
    try {
      const gm = google.maps;
      // Vertex markers
      points.forEach((pt, i) => {
        const m = new gm.Marker({
          map: gMapRef.current, position: pt, zIndex: 10,
          label: { text: String(i+1), color: "#000", fontWeight: "bold", fontSize: "10px" },
          icon: { path: gm.SymbolPath.CIRCLE, scale: 9, fillColor: i===0 ? "#4ade80" : "#fff", fillOpacity: 1, strokeColor: "#22c55e", strokeWeight: 2 },
        });
        gOverlays.current.push(m);
      });
      // Shape
      const path = points.map(p => new gm.LatLng(p.lat, p.lng));
      if (points.length >= 3) {
        gPolyRef.current = new gm.Polygon({ paths: path, strokeColor: "#22c55e", strokeWeight: 3, fillColor: "#22c55e", fillOpacity: 0.15, map: gMapRef.current });
      } else if (points.length === 2) {
        gPolyRef.current = new gm.Polyline({ path: path, strokeColor: "#22c55e", strokeWeight: 3, map: gMapRef.current });
      }
      // Edge distance labels
      const R = 6371000, toRad = d => d * Math.PI / 180;
      for (let i = 0; i < points.length; i++) {
        const j = (i+1) % points.length;
        if (j === 0 && points.length < 3) continue;
        const p1 = points[i], p2 = points[j];
        const dlat = toRad(p2.lat-p1.lat), dlng = toRad(p2.lng-p1.lng);
        const a = Math.sin(dlat/2)**2 + Math.cos(toRad(p1.lat))*Math.cos(toRad(p2.lat))*Math.sin(dlng/2)**2;
        const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const txt = dist >= 100 ? dist.toFixed(0)+"m" : dist.toFixed(1)+"m";
        const lm = new gm.Marker({
          map: gMapRef.current, position: { lat:(p1.lat+p2.lat)/2, lng:(p1.lng+p2.lng)/2 }, zIndex: 5, clickable: false,
          icon: { path: "M 0,0", scale: 0 },
          label: { text: txt, color: "#4ade80", fontWeight: "bold", fontSize: "11px", className: "map-dist-label" },
        });
        gOverlays.current.push(lm);
      }
    } catch(e) { console.warn("polygon draw error:", e); }
  };

  // Geocode address using local suburb database
  const geocodeAddress = useCallback(() => {
    if (!address.trim()) return;
    setAddressLoading(true);
    setTimeout(() => {
      const match = findSuburb(address);
      if (match) {
        const lat = match.lat + (Math.random()-0.5)*0.002;
        const lng = match.lng + (Math.random()-0.5)*0.002;
        const formatted = `${address.trim()}, ${match.s}, ${match.c}, Queensland`;
        setAddressResult({ lat, lng, formatted });
        setPolyPoints([]); polyPtsRef.current = [];
        setMeasuredArea(null);
        clearOverlays();
        update("council", match.c);
        update("suburb", match.s);
      } else {
        setAddressResult({ error: true });
      }
      setAddressLoading(false);
    }, 400);
  }, [address]);

  // Initialize / update Google Map when addressResult changes
  useEffect(() => {
    if (!addressResult || addressResult.error || !mapDivRef.current) return;
    const center = { lat: addressResult.lat, lng: addressResult.lng };
    let cancelled = false;

    (async () => {
      // Wait for Google Maps API to load
      try { await window.__gmapsReady; } catch(e) { return; }
      if (cancelled || !window.google || !google.maps) return;
      const gm = google.maps;

      // Detect stale map (div was unmounted/remounted by React)
      if (gMapRef.current && mapDivRef.current && !mapDivRef.current.querySelector(".gm-style")) {
        gMapRef.current = null;
      }

      if (!gMapRef.current) {
        gMapRef.current = new gm.Map(mapDivRef.current, {
          center, zoom: 19, mapTypeId: "satellite",
          disableDefaultUI: true, zoomControl: true,
          gestureHandling: "greedy", tilt: 0,
        });
        // Click listener — uses polyPtsRef so it always has latest points
        gMapRef.current.addListener("click", (e) => {
          const pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          const newPts = [...polyPtsRef.current, pt];
          polyPtsRef.current = newPts;
          setPolyPoints([...newPts]);
          if (newPts.length >= 3) {
            const area = Math.round(calcPolygonAreaSqm(newPts));
            setMeasuredArea(area);
            setFormData(prev => ({ ...prev, landSize: String(area) }));
            setErrors(prev => ({ ...prev, landSize: undefined }));
          }
          redrawPolygon(newPts);
        });
      } else {
        gMapRef.current.setCenter(center);
        gMapRef.current.setZoom(19);
      }

      // Address pin
      try {
        if (gPinRef.current) gPinRef.current.setMap(null);
        gPinRef.current = new gm.Marker({
          map: gMapRef.current, position: center, zIndex: 20,
          icon: { path: gm.SymbolPath.CIRCLE, scale: 12, fillColor: "#ef4444", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 3 },
        });
      } catch(e) { console.warn("pin error:", e); }
    })();
    return () => { cancelled = true; };
  }, [addressResult]);

  const update = (key, value) => { setFormData(prev => ({ ...prev, [key]: value })); setErrors(prev => ({ ...prev, [key]: undefined })); };
  const validateStep = (s) => {
    const e = {};
    if (s === 0) { if (!formData.council) e.council = "Select your council area"; if (!formData.landSize || parseInt(formData.landSize) < 200) e.landSize = "Enter a valid land size (min 200m²)"; }
    if (s === 1) { if (!formData.material) e.material = "Select a construction material"; }
    if (s === 2) { if (!formData.budget || parseInt(formData.budget) < 20000) e.budget = "Enter a realistic budget (min $20,000)"; }
    setErrors(e); return Object.keys(e).length === 0;
  };
  const nextStep = () => { if (validateStep(step)) { if (step === 2) { setPlan(generatePlan(formData)); setStep(3); } else { setStep(s => s + 1); } } };
  const prevStep = () => setStep(s => Math.max(0, s - 1));
  const resetAll = () => { setStep(0); setPlan(null); setResultTab("overview"); setFormData({ council: "", suburb: "", landSize: "", bedrooms: 1, constructionSize: "", material: "", finishLevel: "mid", siteCondition: "flat", hasOverlays: "no", budget: "", purpose: "family" }); setAddress(""); setAddressResult(null); setPolyPoints([]); polyPtsRef.current = []; setMeasuredArea(null); clearOverlays(); if (gPinRef.current) { try { gPinRef.current.setMap(null); } catch(e){} gPinRef.current = null; } gMapRef.current = null; };
  const fmt = (n) => "$" + Math.round(n).toLocaleString();
  const pf = "'Playfair Display', Georgia, serif";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0a1628 0%, #132238 40%, #1a3a2a 100%)", fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif", color: "#e8ede8", padding: "16px" }}>
      <style>{css}</style>

      {/* Header */}
      <div style={{ maxWidth: 900, margin: "0 auto 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 6 }}>
          <div style={{ background: "linear-gradient(135deg, #22c55e, #059669)", borderRadius: 14, padding: 10, display: "flex" }}><HouseIcon /></div>
          <div>
            <h1 style={{ fontFamily: pf, fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", lineHeight: 1.2 }}>QLD Tiny House Planner</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 2 }}>Secondary dwelling & granny flat planning tool for Queensland</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 20, padding: "0 4px" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 3 ? 1 : "none" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, minWidth: 60 }}>
                <div style={{ width: i === step ? 14 : 12, height: i === step ? 14 : 12, borderRadius: "50%", background: i < step ? "#22c55e" : i === step ? "linear-gradient(135deg, #22c55e, #059669)" : "rgba(255,255,255,0.1)", border: i === step ? "2px solid #4ade80" : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
                  {i < step && <div style={{ width: 6, height: 6, borderRadius: 3, background: "#fff" }} />}
                </div>
                <span style={{ fontSize: 11, color: i <= step ? "#4ade80" : "rgba(255,255,255,0.3)", fontWeight: i === step ? 600 : 400, textAlign: "center" }}>{s}</span>
              </div>
              {i < 3 && <div style={{ flex: 1, height: 2, background: i < step ? "#22c55e" : "rgba(255,255,255,0.08)", margin: "0 8px", marginBottom: 22, borderRadius: 1 }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto" }} className="fade-in" key={step}>

        {/* Step 0: Location */}
        {step === 0 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <MapIcon /><h2 style={{ fontFamily: pf, fontSize: 22, fontWeight: 700 }}>Location & Land Details</h2>
            </div>

            {/* ADDRESS SEARCH */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>
                Property Address <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.35)" }}>— search to auto-fill council & view satellite map</span>
              </label>
              <div className="address-search-wrap" style={{ maxWidth: 600 }}>
                <input
                  className="input-field"
                  placeholder="e.g. 42 Smith Street, Paddington or just Paddington"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") geocodeAddress(); }}
                />
                <button className="search-btn" onClick={geocodeAddress} disabled={addressLoading || !address.trim()}>
                  {addressLoading ? <span style={{ fontSize: 14 }}>...</span> : <SearchIcon />}
                </button>
              </div>
              {addressResult && addressResult.error && (
                <p style={{ fontSize: 12, color: "#f87171", marginTop: 6 }}>Suburb not found. Try a QLD suburb name like "Paddington", "Southport", or "Maroochydore".</p>
              )}
              {addressResult && !addressResult.error && (
                <p style={{ fontSize: 12, color: "#4ade80", marginTop: 6, lineHeight: 1.5 }}>
                  Found: {addressResult.formatted.substring(0, 90)}{addressResult.formatted.length > 90 ? "..." : ""}
                </p>
              )}
            </div>

            {/* INTERACTIVE MAP */}
            {addressResult && !addressResult.error && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
                    <CrosshairIcon /> Click on the map to mark your property corners
                  </label>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {polyPoints.length > 0 && (
                      <button
                        onClick={() => { const newP = polyPoints.slice(0, -1); polyPtsRef.current = newP; setPolyPoints(newP); if (newP.length >= 3) { const a = Math.round(calcPolygonAreaSqm(newP)); setMeasuredArea(a); update("landSize", String(a)); } else { setMeasuredArea(null); } redrawPolygon(newP); }}
                        style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "4px 10px", color: "#f87171", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}
                      >Undo</button>
                    )}
                    {polyPoints.length > 0 && (
                      <button
                        onClick={() => { polyPtsRef.current = []; setPolyPoints([]); setMeasuredArea(null); clearOverlays(); }}
                        style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "4px 10px", color: "#f87171", fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}
                      ><TrashIcon /> Clear</button>
                    )}
                  </div>
                </div>
                <div className="map-container" style={{ height: 420 }}>
                  <div
                    ref={mapDivRef}
                    style={{ width: "100%", height: "100%" }}
                  />
                  {measuredArea && (
                    <div className="map-overlay-badge">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
                      Measured: {measuredArea.toLocaleString()}m²
                    </div>
                  )}
                  <div className="map-instructions">
                    {polyPoints.length === 0 ? "Click on the satellite map to place property corners" :
                     polyPoints.length < 3 ? `${polyPoints.length} point${polyPoints.length > 1 ? "s" : ""} placed — add ${3 - polyPoints.length} more to measure area` :
                     `${polyPoints.length} points · ${measuredArea?.toLocaleString()}m² · Click to add more precision`}
                  </div>
                </div>
                {measuredArea && (
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span className="badge badge-green pulse-green" style={{ fontSize: 13, padding: "6px 14px" }}>
                      Land area: ~{measuredArea.toLocaleString()}m² (auto-filled below)
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Approximate — verify with your title or survey</span>
                  </div>
                )}
              </div>
            )}

            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Council Area *</label>
                <select className="input-field" value={formData.council} onChange={e => update("council", e.target.value)}>
                  <option value="">Select your council...</option>
                  {Object.keys(QLD_COUNCILS).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.council && <p className="error-text">{errors.council}</p>}
                {formData.council && <p style={{ fontSize: 12, color: "#4ade80", marginTop: 6 }}>Max GFA: {QLD_COUNCILS[formData.council].maxGFA}m² · Min lot: {QLD_COUNCILS[formData.council].minLot}m²</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Suburb</label>
                <input className="input-field" placeholder="e.g. Paddington" value={formData.suburb} onChange={e => update("suburb", e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Total Land Size (m²) *</label>
                <input className="input-field" type="number" placeholder="e.g. 600" value={formData.landSize} onChange={e => update("landSize", e.target.value)} />
                {errors.landSize && <p className="error-text">{errors.landSize}</p>}
                {formData.landSize && formData.council && parseInt(formData.landSize) < QLD_COUNCILS[formData.council].minLot && (
                  <p style={{ fontSize: 12, color: "#fbbf24", marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}><AlertIcon /> Below minimum lot size for {formData.council}</p>
                )}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Site Condition</label>
                <select className="input-field" value={formData.siteCondition} onChange={e => update("siteCondition", e.target.value)}>
                  <option value="flat">Flat & Clear</option>
                  <option value="slight">Slight Slope / Some Clearing</option>
                  <option value="steep">Steep / Heavy Clearing Required</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Any Known Overlays? (flood, heritage, bushfire, koala habitat, etc.)</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["no", "yes", "unsure"].map(v => (
                    <button key={v} className={`finish-btn ${formData.hasOverlays === v ? "selected" : ""}`} onClick={() => update("hasOverlays", v)} style={{ flex: "none", padding: "10px 24px", textTransform: "capitalize" }}>
                      {v === "unsure" ? "Not Sure" : v === "yes" ? "Yes" : "None"}
                    </button>
                  ))}
                </div>
                {formData.hasOverlays === "unsure" && <p style={{ fontSize: 12, color: "#fbbf24", marginTop: 8 }}>Tip: Check your council's online mapping tool or contact them to confirm overlays on your property.</p>}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
              <button className="btn-primary" onClick={nextStep}>Next: Design & Materials <ChevronRight /></button>
            </div>
          </div>
        )}

        {/* Step 1: Design */}
        {step === 1 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <RulerIcon /><h2 style={{ fontFamily: pf, fontSize: 22, fontWeight: 700 }}>Design & Materials</h2>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 10 }}>Bedrooms</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {BEDROOMS.map(b => (
                  <button key={b.value} className={`finish-btn ${formData.bedrooms === b.value ? "selected" : ""}`} onClick={() => { update("bedrooms", b.value); if (!formData.constructionSize) update("constructionSize", String(b.sqmRange[1])); }}>
                    <div style={{ fontWeight: 600 }}>{b.label}</div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>{b.sqmRange[0]}–{b.sqmRange[1]}m²</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>
                Desired Size (m²){formData.council && <span style={{ color: "#4ade80" }}> · Max {QLD_COUNCILS[formData.council].maxGFA}m² for {formData.council}</span>}
              </label>
              <input className="input-field" type="number" placeholder={`e.g. ${BEDROOMS.find(b => b.value === formData.bedrooms)?.sqmRange[1]}`} value={formData.constructionSize} onChange={e => update("constructionSize", e.target.value)} style={{ maxWidth: 200 }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 10 }}>Construction Material *</label>
              {errors.material && <p className="error-text" style={{ marginBottom: 8 }}>{errors.material}</p>}
              <div className="mat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
                {Object.entries(MATERIALS).map(([key, m]) => (
                  <div key={key} className={`material-card ${formData.material === key ? "selected" : ""}`} onClick={() => update("material", key)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                      <span style={{ fontWeight: 700, fontSize: 15 }}>{m.label}</span>
                      {formData.material === key && <span style={{ color: "#22c55e" }}><CheckIcon /></span>}
                    </div>
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5, marginBottom: 8 }}>{m.description}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span className="badge badge-green">~${m.costPerSqm}/m²</span>
                      <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>{m.buildTime <= 0.6 ? "Fast" : m.buildTime <= 0.85 ? "Quick" : m.buildTime <= 1.0 ? "Standard" : "Slower"} build</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 10 }}>Finish Level</label>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {Object.entries(FINISH_LEVELS).map(([key, f]) => (
                  <button key={key} className={`finish-btn ${formData.finishLevel === key ? "selected" : ""}`} onClick={() => update("finishLevel", key)} style={{ minWidth: 140 }}>
                    <div style={{ fontWeight: 600 }}>{f.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{f.description}</div>
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
              <button className="btn-secondary" onClick={prevStep}><ChevronLeft /> Back</button>
              <button className="btn-primary" onClick={nextStep}>Next: Budget <ChevronRight /></button>
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <DollarIcon /><h2 style={{ fontFamily: pf, fontSize: 22, fontWeight: 700 }}>Budget & Purpose</h2>
            </div>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Total Budget (AUD) *</label>
                <input className="input-field" type="number" placeholder="e.g. 150000" value={formData.budget} onChange={e => update("budget", e.target.value)} />
                {errors.budget && <p className="error-text">{errors.budget}</p>}
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", marginBottom: 6 }}>Primary Purpose</label>
                <select className="input-field" value={formData.purpose} onChange={e => update("purpose", e.target.value)}>
                  <option value="family">Family / Elderly Relative</option>
                  <option value="rental">Rental Income</option>
                  <option value="office">Home Office / Studio</option>
                  <option value="teens">Teen Retreat / Adult Children</option>
                  <option value="guest">Guest Accommodation</option>
                </select>
              </div>
            </div>
            {formData.purpose === "rental" && (
              <div className="card" style={{ background: "rgba(34,197,94,0.06)", borderColor: "rgba(34,197,94,0.2)", marginBottom: 20, padding: 16 }}>
                <p style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginBottom: 4 }}>Rental Tip</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>Since September 2022, QLD allows renting granny flats to anyone—not just family. You'll need fire separation compliance and a building certifier sign-off for rental use.</p>
              </div>
            )}
            <div className="card" style={{ background: "rgba(255,255,255,0.02)", padding: 16, marginBottom: 4 }}>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "rgba(255,255,255,0.7)" }}>Your Selections Summary</p>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                {[["Council", formData.council || "—"], ["Land Size", formData.landSize ? `${formData.landSize}m²` : "—"], ...(addressResult && !addressResult.error ? [["Address", addressResult.formatted.split(",").slice(0, 2).join(",")]] : []), ["Bedrooms", BEDROOMS.find(b => b.value === formData.bedrooms)?.label], ["Size", formData.constructionSize ? `${formData.constructionSize}m²` : "Auto"], ["Material", formData.material ? MATERIALS[formData.material].label : "—"], ["Finish", FINISH_LEVELS[formData.finishLevel].label]].map(([label, val], i) => (
                  <div key={i} style={{ fontSize: 13 }}><span style={{ color: "rgba(255,255,255,0.4)" }}>{label}: </span><span style={{ fontWeight: 500 }}>{val}</span></div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
              <button className="btn-secondary" onClick={prevStep}><ChevronLeft /> Back</button>
              <button className="btn-primary" onClick={nextStep}>Generate My Plan <ChevronRight /></button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && plan && (
          <div className="fade-in">
            <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
              {[["overview", "Overview"], ["budget", "Budget"], ["schedule", "Schedule"], ["permits", "Permits"], ["alternatives", `Alternatives (${plan.alternatives.length})`]].map(([key, label]) => (
                <button key={key} className={`tab-btn ${resultTab === key ? "active" : ""}`} onClick={() => setResultTab(key)}>{label}</button>
              ))}
            </div>

            {resultTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
                  {[{ label: "Total Estimated Cost", value: fmt(plan.totalCost), color: "#22c55e" }, { label: "Build Size", value: `${plan.finalSize}m²`, color: "#3b82f6" }, { label: "Build Time", value: `~${plan.adjustedWeeks} weeks`, color: "#a855f7" }, { label: "Approval Path", value: plan.approvalPath.split("(")[0].trim(), color: plan.needsDA ? "#f59e0b" : "#22c55e" }].map((stat, i) => (
                    <div key={i} className="card" style={{ textAlign: "center", padding: 20 }}>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 6, fontWeight: 600 }}>{stat.label}</p>
                      <p style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: pf }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                {plan.sizeWarning && (
                  <div className="card" style={{ background: "rgba(245,158,11,0.08)", borderColor: "rgba(245,158,11,0.3)", padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fbbf24" }}><AlertIcon /><span style={{ fontWeight: 600, fontSize: 14 }}>Size Adjusted</span></div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 6 }}>Your requested size exceeded the {plan.maxAllowed}m² maximum for {formData.council}. We've adjusted to {plan.finalSize}m².</p>
                  </div>
                )}
                <div className="card" style={{ background: plan.budgetDiff >= 0 ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.06)", borderColor: plan.budgetDiff >= 0 ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)", padding: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: plan.budgetDiff >= 0 ? "#4ade80" : "#f87171" }}>{plan.budgetDiff >= 0 ? "Within Budget" : "Over Budget"}</p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>Your budget: {fmt(parseInt(formData.budget))} · Estimated: {fmt(plan.totalCost)}</p>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: plan.budgetDiff >= 0 ? "#4ade80" : "#f87171", fontFamily: pf }}>{plan.budgetDiff >= 0 ? "+" : ""}{fmt(plan.budgetDiff)}</div>
                  </div>
                </div>
                <div className="card" style={{ padding: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 16, fontFamily: pf }}>Key Details</h3>
                  <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Material", plan.material.label], ["Finish", plan.finish.label], ["Max Distance from House", `${plan.council.proximityRule}m`], ["Min Fire Separation", "2m (or 1.8m some councils)"], ["Parking Required", "1 additional space"], ["Height Limit", "8.5m (4.5m near road)"], ["Energy Rating", "Minimum 6-star"], ["Can Rent Out", "Yes (since Sept 2022)"]].map(([label, val], i) => (
                      <div key={i} style={{ fontSize: 13, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{label}</span>
                        <div style={{ fontWeight: 500, marginTop: 2 }}>{val}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {formData.purpose === "rental" && (
                  <div className="card" style={{ padding: 20 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, fontFamily: pf }}>Rental Income Potential</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                      <div><p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Weekly Rent</p><p style={{ fontSize: 18, fontWeight: 700, color: "#4ade80" }}>${plan.weeklyRent[0]}–${plan.weeklyRent[1]}</p></div>
                      <div><p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Annual Income</p><p style={{ fontSize: 18, fontWeight: 700, color: "#4ade80" }}>{fmt(plan.annualRent[0])}–{fmt(plan.annualRent[1])}</p></div>
                      <div><p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Gross ROI</p><p style={{ fontSize: 18, fontWeight: 700, color: "#4ade80" }}>{plan.roi[0]}–{plan.roi[1]}%</p></div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {resultTab === "budget" && (
              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}><DollarIcon /><h3 style={{ fontWeight: 700, fontSize: 18, fontFamily: pf }}>Detailed Budget Breakdown</h3></div>
                <div style={{ marginBottom: 24 }}>
                  {Object.entries(plan.budgetBreakdown).map(([item, cost], i) => {
                    const pct = (cost / plan.totalCost) * 100;
                    return (<div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>{item}</span><span style={{ fontSize: 14, fontWeight: 600 }}>{fmt(cost)}</span></div>
                      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3 }}><div style={{ height: 6, borderRadius: 3, background: "linear-gradient(90deg, #22c55e, #059669)", width: `${pct}%`, transition: "width 0.6s ease" }} /></div>
                    </div>);
                  })}
                </div>
                <div style={{ borderTop: "2px solid rgba(255,255,255,0.1)", paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 700 }}>Total Estimated Cost</span>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "#4ade80", fontFamily: pf }}>{fmt(plan.totalCost)}</span>
                </div>
                <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Financing Options</p>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    <p>Home equity loan — borrow against existing property equity</p>
                    <p>Construction loan — staged drawdowns as work progresses</p>
                    <p>Mortgage refinance — top up your existing home loan</p>
                    <p>Personal loan — for smaller builds under $100K</p>
                    <p>Savings / offset — avoid interest costs entirely</p>
                  </div>
                </div>
              </div>
            )}

            {resultTab === "schedule" && (
              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}><CalendarIcon /><h3 style={{ fontWeight: 700, fontSize: 18, fontFamily: pf }}>Build Schedule</h3></div>
                <div style={{ position: "relative" }}>
                  {plan.schedule.map((phase, i) => (
                    <div key={i} style={{ display: "flex", gap: 20, marginBottom: 24, position: "relative" }}>
                      <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", minWidth: 32 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", zIndex: 1 }}>{i + 1}</div>
                        {i < plan.schedule.length - 1 && <div style={{ width: 2, flex: 1, background: "rgba(34,197,94,0.2)", marginTop: 4 }} />}
                      </div>
                      <div style={{ flex: 1, paddingBottom: 4 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                          <h4 style={{ fontWeight: 700, fontSize: 15 }}>{phase.phase}</h4>
                          <span className="badge badge-green">{phase.weeks}</span>
                        </div>
                        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                          {phase.tasks.map((task, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />{task}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 8, padding: 16, background: "rgba(34,197,94,0.06)", borderRadius: 12, border: "1px solid rgba(34,197,94,0.15)" }}>
                  <p style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>Estimated Total: {plan.needsDA ? `${20 + plan.adjustedWeeks}` : `${14 + plan.adjustedWeeks}`} weeks from start to handover</p>
                </div>
              </div>
            )}

            {resultTab === "permits" && (
              <div className="card">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}><ClipboardIcon /><h3 style={{ fontWeight: 700, fontSize: 18, fontFamily: pf }}>Permits & Approvals</h3></div>
                <div className="card" style={{ background: "rgba(59,130,246,0.06)", borderColor: "rgba(59,130,246,0.2)", padding: 16, marginBottom: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#60a5fa" }}>Your Approval Pathway: {plan.approvalPath}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{plan.needsDA ? "A Development Application (DA) is likely required. This adds time and cost but gives formal council approval." : "Your build likely qualifies as Accepted Development—no DA needed, just building approval via a private certifier."}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.permits.map((p, i) => (
                    <div key={i} className="card card-hover" style={{ padding: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span className={`badge ${p.required ? "badge-green" : "badge-amber"}`}>{p.required ? "Required" : "Not Required"}</span>
                          <span style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</span>
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#4ade80" }}>{p.cost}</span>
                      </div>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Issued by: {p.who}</p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{p.notes}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>Important QLD Regulations</p>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                    <p>• Secondary dwelling must be subordinate to the primary dwelling</p>
                    <p>• Cannot be separately titled or sold independently</p>
                    <p>• Must share the same driveway access as primary dwelling</p>
                    <p>• Maximum height 8.5m (4.5m if within 5m of road frontage)</p>
                    <p>• Minimum 2m fire separation from primary dwelling</p>
                    <p>• One additional parking space required</p>
                    <p>• Since Sept 2022: can be rented to anyone (state-wide)</p>
                  </div>
                </div>
              </div>
            )}

            {resultTab === "alternatives" && (
              <div>
                <div className="card" style={{ marginBottom: 16, padding: 20 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, fontFamily: pf, marginBottom: 8 }}>Alternative Approaches</h3>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Based on your inputs, here are different ways to approach your build:</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div className="card" style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.04)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <span className="badge badge-green" style={{ marginBottom: 8 }}>Your Current Plan</span>
                        <h4 style={{ fontWeight: 700, fontSize: 16, marginTop: 4 }}>{plan.finalSize}m² {plan.material.label} — {plan.finish.label} Finish</h4>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ fontSize: 22, fontWeight: 700, color: "#4ade80", fontFamily: pf }}>{fmt(plan.totalCost)}</p>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>~{plan.adjustedWeeks} weeks</p>
                      </div>
                    </div>
                  </div>
                  {plan.alternatives.length === 0 && <div className="card" style={{ textAlign: "center", padding: 40 }}><p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)" }}>Your current plan is well-optimised for your budget and requirements.</p></div>}
                  {plan.alternatives.map((alt, i) => (
                    <div key={i} className="card card-hover">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", flexWrap: "wrap", gap: 12 }}>
                        <div>
                          <h4 style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{alt.title}</h4>
                          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", maxWidth: 400 }}>{alt.desc}</p>
                          <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                            <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>{alt.size}m²</span>
                            <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>{alt.material}</span>
                            <span className="badge" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>~{alt.weeks} weeks</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <p style={{ fontSize: 20, fontWeight: 700, color: "#e8ede8", fontFamily: pf }}>{fmt(alt.cost)}</p>
                          <p style={{ fontSize: 12, color: alt.cost <= parseInt(formData.budget) ? "#4ade80" : "#f87171", fontWeight: 600 }}>{alt.cost <= parseInt(formData.budget) ? "Within budget" : `${fmt(alt.cost - parseInt(formData.budget))} over`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: 24, marginBottom: 16 }}>
              <button className="btn-secondary" onClick={resetAll} style={{ fontSize: 13 }}>Start New Plan</button>
            </div>
          </div>
        )}
      </div>

      <div style={{ maxWidth: 900, margin: "24px auto 0", textAlign: "center", padding: "16px 0" }}>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", lineHeight: 1.6 }}>Estimates are indicative only. Costs, regulations, and timelines vary by council and project specifics. Always consult your local council, a private building certifier, and licensed professionals before proceeding. Data reflects QLD regulations as of early 2026.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TinyHousePlanner />);
