const { useState, useEffect, useRef, useCallback } = React;

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

const SUBURB_DB = [
  {s:"Paddington",c:"Brisbane City",lat:-27.4598,lng:152.9988},{s:"Toowong",c:"Brisbane City",lat:-27.4838,lng:152.9838},{s:"Indooroopilly",c:"Brisbane City",lat:-27.4998,lng:152.9728},{s:"New Farm",c:"Brisbane City",lat:-27.4678,lng:153.0488},{s:"Fortitude Valley",c:"Brisbane City",lat:-27.4568,lng:153.0348},{s:"West End",c:"Brisbane City",lat:-27.4818,lng:153.0058},{s:"South Brisbane",c:"Brisbane City",lat:-27.4788,lng:153.0208},{s:"Woolloongabba",c:"Brisbane City",lat:-27.4878,lng:153.0368},{s:"Coorparoo",c:"Brisbane City",lat:-27.4958,lng:153.0488},{s:"Camp Hill",c:"Brisbane City",lat:-27.4928,lng:153.0618},{s:"Carindale",c:"Brisbane City",lat:-27.5058,lng:153.1008},{s:"Mt Gravatt",c:"Brisbane City",lat:-27.5328,lng:153.0808},{s:"Sunnybank",c:"Brisbane City",lat:-27.5788,lng:153.0588},{s:"Eight Mile Plains",c:"Brisbane City",lat:-27.5818,lng:153.0948},{s:"Chermside",c:"Brisbane City",lat:-27.3868,lng:153.0318},{s:"Nundah",c:"Brisbane City",lat:-27.3978,lng:153.0598},{s:"Hamilton",c:"Brisbane City",lat:-27.4378,lng:153.0618},{s:"Ascot",c:"Brisbane City",lat:-27.4288,lng:153.0618},{s:"Bulimba",c:"Brisbane City",lat:-27.4538,lng:153.0618},{s:"Hawthorne",c:"Brisbane City",lat:-27.4618,lng:153.0568},{s:"Kangaroo Point",c:"Brisbane City",lat:-27.4768,lng:153.0358},{s:"Spring Hill",c:"Brisbane City",lat:-27.4578,lng:153.0188},{s:"Milton",c:"Brisbane City",lat:-27.4678,lng:153.0008},{s:"Auchenflower",c:"Brisbane City",lat:-27.4748,lng:152.9918},{s:"St Lucia",c:"Brisbane City",lat:-27.4968,lng:153.0008},{s:"Taringa",c:"Brisbane City",lat:-27.4878,lng:152.9818},{s:"Kenmore",c:"Brisbane City",lat:-27.5108,lng:152.9408},{s:"Chapel Hill",c:"Brisbane City",lat:-27.5008,lng:152.9518},{s:"The Gap",c:"Brisbane City",lat:-27.4388,lng:152.9478},{s:"Ashgrove",c:"Brisbane City",lat:-27.4438,lng:152.9788},{s:"Bardon",c:"Brisbane City",lat:-27.4558,lng:152.9728},{s:"Brisbane CBD",c:"Brisbane City",lat:-27.4698,lng:153.0251},{s:"Forest Lake",c:"Brisbane City",lat:-27.6248,lng:152.9688},
  {s:"Southport",c:"Gold Coast",lat:-27.9668,lng:153.3998},{s:"Surfers Paradise",c:"Gold Coast",lat:-28.0028,lng:153.4298},{s:"Broadbeach",c:"Gold Coast",lat:-28.0268,lng:153.4308},{s:"Burleigh Heads",c:"Gold Coast",lat:-28.0868,lng:153.4478},{s:"Palm Beach",c:"Gold Coast",lat:-28.1118,lng:153.4598},{s:"Robina",c:"Gold Coast",lat:-28.0768,lng:153.3858},{s:"Nerang",c:"Gold Coast",lat:-28.0058,lng:153.3368},{s:"Coomera",c:"Gold Coast",lat:-27.8628,lng:153.3328},{s:"Mudgeeraba",c:"Gold Coast",lat:-28.0818,lng:153.3658},{s:"Helensvale",c:"Gold Coast",lat:-27.9028,lng:153.3408},
  {s:"Maroochydore",c:"Sunshine Coast",lat:-26.6548,lng:153.0998},{s:"Mooloolaba",c:"Sunshine Coast",lat:-26.6838,lng:153.1188},{s:"Caloundra",c:"Sunshine Coast",lat:-26.7978,lng:153.1298},{s:"Nambour",c:"Sunshine Coast",lat:-26.6278,lng:152.9598},{s:"Buderim",c:"Sunshine Coast",lat:-26.6838,lng:153.0558},{s:"Noosa Heads",c:"Sunshine Coast",lat:-26.3908,lng:153.0918},
  {s:"Springwood",c:"Logan City",lat:-27.5988,lng:153.1228},{s:"Shailer Park",c:"Logan City",lat:-27.6268,lng:153.1588},{s:"Browns Plains",c:"Logan City",lat:-27.6638,lng:153.0518},{s:"Beenleigh",c:"Logan City",lat:-27.7108,lng:153.1908},{s:"Jimboomba",c:"Logan City",lat:-27.8328,lng:153.0268},
  {s:"Springfield",c:"Ipswich City",lat:-27.6588,lng:152.9078},{s:"Redbank Plains",c:"Ipswich City",lat:-27.6518,lng:152.8628},{s:"Ipswich CBD",c:"Ipswich City",lat:-27.6148,lng:152.7608},{s:"Ripley",c:"Ipswich City",lat:-27.6968,lng:152.8098},
  {s:"Caboolture",c:"Moreton Bay",lat:-27.0818,lng:152.9508},{s:"North Lakes",c:"Moreton Bay",lat:-27.2218,lng:153.0088},{s:"Redcliffe",c:"Moreton Bay",lat:-27.2278,lng:153.1108},{s:"Strathpine",c:"Moreton Bay",lat:-27.3028,lng:152.9898},{s:"Albany Creek",c:"Moreton Bay",lat:-27.3508,lng:152.9688},
  {s:"Cleveland",c:"Redland City",lat:-27.5278,lng:153.2648},{s:"Victoria Point",c:"Redland City",lat:-27.5838,lng:153.2838},{s:"Capalaba",c:"Redland City",lat:-27.5268,lng:153.1948},
  {s:"Toowoomba CBD",c:"Toowoomba",lat:-27.5598,lng:151.9538},{s:"Highfields",c:"Toowoomba",lat:-27.4618,lng:151.9478},
  {s:"Cairns CBD",c:"Cairns",lat:-16.9186,lng:145.7781},{s:"Smithfield",c:"Cairns",lat:-16.8328,lng:145.6928},{s:"Palm Cove",c:"Cairns",lat:-16.7478,lng:145.6728},
  {s:"Townsville CBD",c:"Townsville",lat:-19.2578,lng:146.8168},{s:"Aitkenvale",c:"Townsville",lat:-19.2998,lng:146.7818},
];

function findSuburb(query) {
  var q = query.toLowerCase().trim();
  var match = SUBURB_DB.find(function(s) { return q.includes(s.s.toLowerCase()); });
  if (match) return match;
  var words = q.split(/[\s,]+/).filter(function(w) { return w.length > 2; });
  for (var i = 0; i < words.length; i++) {
    match = SUBURB_DB.find(function(s) { return s.s.toLowerCase().includes(words[i]) || words[i].includes(s.s.toLowerCase()); });
    if (match) return match;
  }
  return null;
}

function calcPolygonAreaSqm(points) {
  if (points.length < 3) return 0;
  var toRad = function(d) { return d * Math.PI / 180; };
  var R = 6371000;
  var refLat = points[0].lat;
  var projected = points.map(function(p) {
    return { x: R * toRad(p.lng - points[0].lng) * Math.cos(toRad(refLat)), y: R * toRad(p.lat - points[0].lat) };
  });
  var area = 0;
  for (var i = 0; i < projected.length; i++) {
    var j = (i + 1) % projected.length;
    area += projected[i].x * projected[j].y;
    area -= projected[j].x * projected[i].y;
  }
  return Math.abs(area / 2);
}

const MATERIALS = {
  timber: { label: "Timber Frame", costPerSqm: 2200, durability: "Good", buildTime: 1.0, icon: "\u{1F332}", description: "Classic Australian method. Warm, natural aesthetic.", termiteRisk: "High" },
  steel: { label: "Steel Frame", costPerSqm: 2500, durability: "Excellent", buildTime: 0.85, icon: "\u{1F529}", description: "Termite-proof, fire-resistant. Modern and durable.", recommended: true, termiteRisk: "None" },
  modular: { label: "Modular / Prefab", costPerSqm: 2800, durability: "Excellent", buildTime: 0.5, icon: "\u{1F3D7}", description: "Factory-built, fastest build time, less waste.", termiteRisk: "None" },
  brick: { label: "Brick Veneer", costPerSqm: 2900, durability: "Excellent", buildTime: 1.2, icon: "\u{1F9F1}", description: "Traditional, solid feel. Great thermal mass for QLD.", termiteRisk: "Low" },
  container: { label: "Shipping Container", costPerSqm: 1800, durability: "Good", buildTime: 0.6, icon: "\u{1F4E6}", description: "Recycled containers. Budget-friendly and eco-conscious.", termiteRisk: "None" },
  kitHome: { label: "Kit Home / Flat Pack", costPerSqm: 1500, durability: "Good", buildTime: 0.7, icon: "\u{1F3E0}", description: "Pre-designed for self-assembly. Most affordable.", termiteRisk: "Medium" },
};

const FINISH_LEVELS = {
  basic: { label: "Basic", multiplier: 0.8, description: "Standard fittings, laminate, vinyl flooring" },
  mid: { label: "Mid-Range", multiplier: 1.0, description: "Quality fixtures, timber-look flooring, stone benchtops" },
  high: { label: "High-End", multiplier: 1.35, description: "Premium finishes, custom joinery, designer fixtures" },
};

const BEDROOMS = [
  { value: 0, label: "Studio", sqmRange: [25, 35] },
  { value: 1, label: "1 Bedroom", sqmRange: [35, 50] },
  { value: 2, label: "2 Bedrooms", sqmRange: [50, 80] },
];

function generatePlan(data) {
  var council = QLD_COUNCILS[data.council] || QLD_COUNCILS["Other QLD Council"];
  var material = MATERIALS[data.material];
  var finish = FINISH_LEVELS[data.finishLevel];
  var bedroom = BEDROOMS.find(function(b) { return b.value === data.bedrooms; });
  var requestedSize = parseInt(data.constructionSize) || bedroom.sqmRange[1];
  var maxAllowed = council.maxGFA;
  var finalSize = Math.min(requestedSize, maxAllowed);
  var sizeWarning = requestedSize > maxAllowed;
  var baseCost = finalSize * material.costPerSqm * finish.multiplier;
  var sitePrep = data.siteCondition === "flat" ? 8000 : data.siteCondition === "slight" ? 15000 : 25000;
  var approvals = 5500, plumbing = 12000, electrical = 9000, connections = 8000, landscaping = 5000;
  var contingency = baseCost * 0.1;
  var totalCost = baseCost + sitePrep + approvals + plumbing + electrical + connections + landscaping + contingency;
  var budget = parseInt(data.budget) || 0;
  var budgetDiff = budget - totalCost;
  var baseWeeks = finalSize <= 40 ? 12 : finalSize <= 60 ? 16 : 20;
  var adjustedWeeks = Math.ceil(baseWeeks * material.buildTime);
  var needsDA = finalSize > maxAllowed || data.hasOverlays === "yes";
  var approvalPath = needsDA ? "Code Assessable (DA Required)" : "Accepted Development (No DA)";
  var alternatives = [];
  if (budgetDiff < -5000) {
    var kitCost = finalSize * MATERIALS.kitHome.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * MATERIALS.kitHome.costPerSqm * finish.multiplier * 0.1);
    if (kitCost <= budget) alternatives.push({ title: "Kit Home Option", desc: "Switch to kit/flat-pack to fit budget", cost: kitCost, size: finalSize, material: "Kit Home", weeks: Math.ceil(baseWeeks * MATERIALS.kitHome.buildTime) });
    var smallerSize = Math.max(25, finalSize - 15);
    var smallerCost = smallerSize * material.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (smallerSize * material.costPerSqm * finish.multiplier * 0.1);
    if (smallerCost <= budget) alternatives.push({ title: "Smaller Footprint", desc: "Reduce to " + smallerSize + "m\u00B2 to stay within budget", cost: smallerCost, size: smallerSize, material: material.label, weeks: Math.ceil((smallerSize <= 40 ? 12 : 16) * material.buildTime) });
    var basicCost = finalSize * material.costPerSqm * FINISH_LEVELS.basic.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * material.costPerSqm * FINISH_LEVELS.basic.multiplier * 0.1);
    if (basicCost <= budget && data.finishLevel !== "basic") alternatives.push({ title: "Basic Finish", desc: "Keep size with basic finishes, upgrade later", cost: basicCost, size: finalSize, material: material.label, weeks: adjustedWeeks });
  }
  if (budgetDiff >= 5000) {
    if (data.finishLevel !== "high") {
      var highCost = finalSize * material.costPerSqm * FINISH_LEVELS.high.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * material.costPerSqm * FINISH_LEVELS.high.multiplier * 0.1);
      if (highCost <= budget) alternatives.push({ title: "Premium Upgrade", desc: "Budget allows high-end finishes", cost: highCost, size: finalSize, material: material.label, weeks: adjustedWeeks + 2 });
    }
    if (finalSize < maxAllowed) {
      var biggerSize = Math.min(finalSize + 15, maxAllowed);
      var biggerCost = biggerSize * material.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (biggerSize * material.costPerSqm * finish.multiplier * 0.1);
      if (biggerCost <= budget) alternatives.push({ title: "Larger Build", desc: "Expand to " + biggerSize + "m\u00B2 within budget", cost: biggerCost, size: biggerSize, material: material.label, weeks: Math.ceil((biggerSize <= 40 ? 12 : biggerSize <= 60 ? 16 : 20) * material.buildTime) });
    }
  }
  if (data.material !== "modular") {
    var modCost = finalSize * MATERIALS.modular.costPerSqm * finish.multiplier + sitePrep + approvals + plumbing + electrical + connections + landscaping + (finalSize * MATERIALS.modular.costPerSqm * finish.multiplier * 0.1);
    alternatives.push({ title: "Modular Speed Build", desc: "Factory-built in ~" + Math.ceil(baseWeeks * MATERIALS.modular.buildTime) + " weeks", cost: modCost, size: finalSize, material: "Modular / Prefab", weeks: Math.ceil(baseWeeks * MATERIALS.modular.buildTime) });
  }
  var schedule = [
    { phase: "Planning & Design", weeks: "Weeks 1-3", tasks: ["Engage designer/architect", "Site survey & soil test", "Create floor plans", "Select materials & finishes"] },
    { phase: "Approvals", weeks: needsDA ? "Weeks 4-12" : "Weeks 4-6", tasks: needsDA ? ["Submit DA to council", "Building approval application", "Plumbing & drainage approval", "Wait for council assessment"] : ["Private building certifier review", "Building approval application", "Plumbing & drainage approval"] },
    { phase: "Site Preparation", weeks: needsDA ? "Weeks 13-15" : "Weeks 7-9", tasks: ["Clear & level site", "Install temporary fencing", "Set up services access", "Pour footings & slab"] },
    { phase: "Construction", weeks: needsDA ? "Weeks 16-" + (15 + adjustedWeeks) : "Weeks 10-" + (9 + adjustedWeeks), tasks: ["Frame & roof", "Windows & external cladding", "Internal walls & insulation", "Plumbing & electrical rough-in"] },
    { phase: "Fit-Out", weeks: needsDA ? "Weeks " + (16+adjustedWeeks) + "-" + (18+adjustedWeeks) : "Weeks " + (10+adjustedWeeks) + "-" + (12+adjustedWeeks), tasks: ["Kitchen & bathroom install", "Flooring & painting", "Fixtures & fittings", "External landscaping"] },
    { phase: "Completion", weeks: needsDA ? "Weeks " + (19+adjustedWeeks) + "-" + (20+adjustedWeeks) : "Weeks " + (13+adjustedWeeks) + "-" + (14+adjustedWeeks), tasks: ["Final inspections", "Certifier sign-off", "Defects rectification", "Handover & keys"] },
  ];
  var permits = [
    { name: "Building Approval", required: true, cost: "$2,500 - $4,000", who: "Private Building Certifier", notes: "Always required. Certifier assesses NCC compliance." },
    { name: "Plumbing & Drainage", required: true, cost: "$800 - $1,500", who: "Licensed Plumber + Council", notes: "Required for all new plumbing connections." },
    { name: "Development Approval (DA)", required: needsDA, cost: "$2,000 - $5,000+", who: "Local Council", notes: needsDA ? "Required due to overlays or exceeding accepted limits." : "Not required if within accepted development parameters." },
    { name: "Electrical Safety", required: true, cost: "Included in electrical", who: "Licensed Electrician", notes: "Certificate of compliance for all electrical work." },
    { name: "Fire Safety Certificate", required: data.purpose === "rental", cost: "$500 - $1,500", who: "Building Certifier", notes: "Required if renting out." },
    { name: "Soil & Site Report", required: true, cost: "$500 - $1,000", who: "Geotechnical Engineer", notes: "Determines foundation requirements." },
    { name: "Energy Efficiency Report", required: true, cost: "$300 - $600", who: "Energy Assessor", notes: "Must meet minimum 6-star energy rating." },
  ];
  var budgetBreakdown = { "Construction (structure)": baseCost, "Site Preparation": sitePrep, "Plumbing": plumbing, "Electrical": electrical, "Utility Connections": connections, "Approvals & Permits": approvals, "Landscaping": landscaping, "Contingency (10%)": contingency };
  var weeklyRent = data.council === "Brisbane City" ? [350, 500] : data.council === "Gold Coast" ? [380, 520] : data.council === "Sunshine Coast" ? [340, 480] : [300, 450];
  var annualRent = weeklyRent.map(function(r) { return r * 52; });
  var roi = annualRent.map(function(r) { return ((r / totalCost) * 100).toFixed(1); });
  return { finalSize: finalSize, sizeWarning: sizeWarning, maxAllowed: maxAllowed, totalCost: totalCost, budgetDiff: budgetDiff, adjustedWeeks: adjustedWeeks, needsDA: needsDA, approvalPath: approvalPath, alternatives: alternatives, schedule: schedule, permits: permits, budgetBreakdown: budgetBreakdown, council: council, material: material, finish: finish, weeklyRent: weeklyRent, annualRent: annualRent, roi: roi };
}

const STEPS = ["Location & Land", "Design & Materials", "Budget & Purpose", "Your Plan"];

function TinyHousePlanner() {
  const [step, setStep] = useState(0);
  const [resultTab, setResultTab] = useState("overview");
  const [formData, setFormData] = useState({ council: "", suburb: "", landSize: "", bedrooms: 1, constructionSize: "50", material: "", finishLevel: "mid", siteCondition: "flat", hasOverlays: "no", budget: "150000", purpose: "family" });
  const [plan, setPlan] = useState(null);
  const [errors, setErrors] = useState({});
  const [address, setAddress] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressResult, setAddressResult] = useState(null);
  const [polyPoints, setPolyPoints] = useState([]);
  const [measuredArea, setMeasuredArea] = useState(null);
  const mapDivRef = useRef(null);
  const gMapRef = useRef(null);
  const gPinRef = useRef(null);
  const gPolyRef = useRef(null);
  const gOverlays = useRef([]);
  const polyPtsRef = useRef([]);

  const clearOverlays = () => {
    try {
      if (gPolyRef.current) { gPolyRef.current.setMap(null); gPolyRef.current = null; }
      gOverlays.current.forEach(function(m) { try { m.setMap(null); } catch(e){} });
      gOverlays.current = [];
    } catch(e){}
  };

  const redrawPolygon = (points) => {
    if (!gMapRef.current || !window.google) return;
    clearOverlays();
    if (!points.length) return;
    try {
      var gm = google.maps;
      points.forEach(function(pt, i) {
        var m = new gm.Marker({ map: gMapRef.current, position: pt, zIndex: 10,
          label: { text: String(i+1), color: "#000", fontWeight: "bold", fontSize: "10px" },
          icon: { path: gm.SymbolPath.CIRCLE, scale: 9, fillColor: i===0 ? "#667eea" : "#fff", fillOpacity: 1, strokeColor: "#667eea", strokeWeight: 2 },
        });
        gOverlays.current.push(m);
      });
      var path = points.map(function(p) { return new gm.LatLng(p.lat, p.lng); });
      if (points.length >= 3) {
        gPolyRef.current = new gm.Polygon({ paths: path, strokeColor: "#667eea", strokeWeight: 3, fillColor: "#667eea", fillOpacity: 0.15, map: gMapRef.current });
      } else if (points.length === 2) {
        gPolyRef.current = new gm.Polyline({ path: path, strokeColor: "#667eea", strokeWeight: 3, map: gMapRef.current });
      }
      var R = 6371000, toRad = function(d) { return d * Math.PI / 180; };
      for (var i = 0; i < points.length; i++) {
        var j = (i+1) % points.length;
        if (j === 0 && points.length < 3) continue;
        var p1 = points[i], p2 = points[j];
        var dlat = toRad(p2.lat-p1.lat), dlng = toRad(p2.lng-p1.lng);
        var a = Math.pow(Math.sin(dlat/2),2) + Math.cos(toRad(p1.lat))*Math.cos(toRad(p2.lat))*Math.pow(Math.sin(dlng/2),2);
        var dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var txt = dist >= 100 ? dist.toFixed(0)+"m" : dist.toFixed(1)+"m";
        var lm = new gm.Marker({
          map: gMapRef.current, position: { lat:(p1.lat+p2.lat)/2, lng:(p1.lng+p2.lng)/2 }, zIndex: 5, clickable: false,
          icon: { path: "M 0,0", scale: 0 },
          label: { text: txt, color: "#667eea", fontWeight: "bold", fontSize: "11px", className: "map-dist-label" },
        });
        gOverlays.current.push(lm);
      }
    } catch(e) { console.warn("polygon draw error:", e); }
  };

  const geocodeAddress = useCallback(function() {
    if (!address.trim()) return;
    setAddressLoading(true);
    setTimeout(function() {
      var match = findSuburb(address);
      if (match) {
        var lat = match.lat + (Math.random()-0.5)*0.002;
        var lng = match.lng + (Math.random()-0.5)*0.002;
        var formatted = address.trim() + ", " + match.s + ", " + match.c + ", Queensland";
        setAddressResult({ lat: lat, lng: lng, formatted: formatted });
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

  useEffect(function() {
    if (!addressResult || addressResult.error || !mapDivRef.current) return;
    var center = { lat: addressResult.lat, lng: addressResult.lng };
    var cancelled = false;
    window.__gmapsReady.then(function() {
      if (cancelled || !window.google || !google.maps) return;
      var gm = google.maps;
      if (gMapRef.current && mapDivRef.current && !mapDivRef.current.querySelector(".gm-style")) {
        gMapRef.current = null;
      }
      if (!gMapRef.current) {
        gMapRef.current = new gm.Map(mapDivRef.current, {
          center: center, zoom: 19, mapTypeId: "satellite",
          disableDefaultUI: true, zoomControl: true,
          gestureHandling: "greedy", tilt: 0,
        });
        gMapRef.current.addListener("click", function(e) {
          var pt = { lat: e.latLng.lat(), lng: e.latLng.lng() };
          var newPts = polyPtsRef.current.concat([pt]);
          polyPtsRef.current = newPts;
          setPolyPoints(newPts.slice());
          if (newPts.length >= 3) {
            var area = Math.round(calcPolygonAreaSqm(newPts));
            setMeasuredArea(area);
            setFormData(function(prev) { return Object.assign({}, prev, { landSize: String(area) }); });
            setErrors(function(prev) { return Object.assign({}, prev, { landSize: undefined }); });
          }
          redrawPolygon(newPts);
        });
      } else {
        gMapRef.current.setCenter(center);
        gMapRef.current.setZoom(19);
      }
      try {
        if (gPinRef.current) gPinRef.current.setMap(null);
        gPinRef.current = new gm.Marker({
          map: gMapRef.current, position: center, zIndex: 20,
          icon: { path: gm.SymbolPath.CIRCLE, scale: 12, fillColor: "#ef4444", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 3 },
        });
      } catch(e) {}
    }).catch(function(){});
    return function() { cancelled = true; };
  }, [addressResult]);

  const update = (key, value) => { setFormData(function(prev) { return Object.assign({}, prev, { [key]: value }); }); setErrors(function(prev) { return Object.assign({}, prev, { [key]: undefined }); }); };

  const validateStep = (s) => {
    var e = {};
    if (s === 0) { if (!formData.council) e.council = "Select your council area"; if (!formData.landSize || parseInt(formData.landSize) < 200) e.landSize = "Enter a valid land size (min 200m\u00B2)"; }
    if (s === 1) { if (!formData.material) e.material = "Select a construction material"; }
    if (s === 2) { if (!formData.budget || parseInt(formData.budget) < 20000) e.budget = "Enter a realistic budget (min $20,000)"; }
    setErrors(e); return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep(step)) { if (step === 2) { setPlan(generatePlan(formData)); setStep(3); } else { setStep(function(s) { return s + 1; }); } } };
  const prevStep = () => setStep(function(s) { return Math.max(0, s - 1); });
  const resetAll = () => { setStep(0); setPlan(null); setResultTab("overview"); setFormData({ council: "", suburb: "", landSize: "", bedrooms: 1, constructionSize: "50", material: "", finishLevel: "mid", siteCondition: "flat", hasOverlays: "no", budget: "150000", purpose: "family" }); setAddress(""); setAddressResult(null); setPolyPoints([]); polyPtsRef.current = []; setMeasuredArea(null); clearOverlays(); if (gPinRef.current) { try { gPinRef.current.setMap(null); } catch(e){} gPinRef.current = null; } gMapRef.current = null; };
  const fmt = (n) => "$" + Math.round(n).toLocaleString();

  var estCost = formData.material && formData.constructionSize ? Math.round((parseInt(formData.constructionSize) || 50) * (MATERIALS[formData.material] || { costPerSqm: 2200 }).costPerSqm * (FINISH_LEVELS[formData.finishLevel] || { multiplier: 1 }).multiplier * 1.35) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="gradient-bg text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <i className="fa-solid fa-house"></i> QLD Tiny House Planner
              </h1>
              <p className="text-purple-200 mt-1 text-sm">Secondary dwelling & granny flat planning tool for Queensland</p>
            </div>
            {estCost && <div className="text-right hidden sm:block">
              <div className="text-3xl font-bold">{fmt(estCost)}</div>
              <div className="text-purple-200 text-sm">Estimated total</div>
            </div>}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center">
          {STEPS.map(function(s, i) {
            return <div key={i} className="flex items-center" style={{ flex: i < 3 ? 1 : "none" }}>
              <div className="flex flex-col items-center gap-1" style={{ minWidth: 60 }}>
                <div className={"w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all " + (i < step ? "bg-green-500 text-white" : i === step ? "gradient-bg text-white shadow-md" : "bg-gray-200 text-gray-400")}>
                  {i < step ? <i className="fa-solid fa-check text-xs"></i> : i + 1}
                </div>
                <span className={"text-xs font-medium text-center " + (i <= step ? "text-purple-600" : "text-gray-400")}>{s}</span>
              </div>
              {i < 3 && <div className={"flex-1 h-1 mx-2 mb-5 rounded " + (i < step ? "bg-green-500" : "bg-gray-200")} />}
            </div>;
          })}
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 pb-8">
        {step === 0 && (
          <div className="animate-slide">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center gap-2">
                <i className="fa-solid fa-map-location-dot text-purple-500"></i> Location & Land Details
              </h2>
              <p className="text-gray-500 text-sm mb-6">Search your address to auto-fill council and view satellite imagery</p>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Property Address</label>
                <div className="relative" style={{ maxWidth: 550 }}>
                  <input className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 pr-12 text-gray-800 focus:border-purple-500 focus:outline-none transition" placeholder="e.g. 42 Smith Street, Paddington" value={address} onChange={function(e) { setAddress(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter") geocodeAddress(); }} />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 gradient-bg text-white rounded-lg w-9 h-9 flex items-center justify-center" onClick={geocodeAddress} disabled={addressLoading || !address.trim()}>
                    {addressLoading ? "..." : <i className="fa-solid fa-magnifying-glass text-sm"></i>}
                  </button>
                </div>
                {addressResult && addressResult.error && <p className="text-red-500 text-sm mt-2">Suburb not found. Try a QLD suburb like "Paddington" or "Southport".</p>}
                {addressResult && !addressResult.error && <p className="text-green-600 text-sm mt-2 font-medium">Found: {addressResult.formatted}</p>}
              </div>

              {addressResult && !addressResult.error && (
                <div className="mb-5">
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
                    <label className="text-sm font-semibold text-gray-700"><i className="fa-solid fa-crosshairs text-purple-500 text-xs mr-1"></i>Click map to mark property corners</label>
                    <div className="flex gap-2">
                      {polyPoints.length > 0 && <button onClick={function() { var newP = polyPoints.slice(0,-1); polyPtsRef.current = newP; setPolyPoints(newP); if(newP.length>=3){var a=Math.round(calcPolygonAreaSqm(newP));setMeasuredArea(a);update("landSize",String(a));}else{setMeasuredArea(null);} redrawPolygon(newP); }} className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-medium">Undo</button>}
                      {polyPoints.length > 0 && <button onClick={function() { polyPtsRef.current=[]; setPolyPoints([]); setMeasuredArea(null); clearOverlays(); }} className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-medium"><i className="fa-solid fa-trash text-xs mr-1"></i>Clear</button>}
                    </div>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border-2 border-gray-200" style={{ height: 400 }}>
                    <div ref={mapDivRef} style={{ width: "100%", height: "100%" }} />
                    {measuredArea && <div className="map-overlay-badge"><i className="fa-solid fa-ruler text-xs"></i> Measured: {measuredArea.toLocaleString()}m&sup2;</div>}
                    <div className="map-instructions">
                      {polyPoints.length === 0 ? "Click on the satellite map to place property corners" : polyPoints.length < 3 ? polyPoints.length + " point(s) placed - add " + (3-polyPoints.length) + " more to measure area" : polyPoints.length + " points - " + (measuredArea ? measuredArea.toLocaleString() : "") + "m\u00B2 - Click to refine"}
                    </div>
                  </div>
                  {measuredArea && <div className="mt-2"><span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold"><i className="fa-solid fa-check text-xs"></i> ~{measuredArea.toLocaleString()}m&sup2; (auto-filled)</span></div>}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Council Area *</label>
                  <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-800 bg-white focus:border-purple-500 focus:outline-none" value={formData.council} onChange={function(e){update("council",e.target.value);}}>
                    <option value="">Select your council...</option>
                    {Object.keys(QLD_COUNCILS).map(function(c){return <option key={c} value={c}>{c}</option>;})}
                  </select>
                  {errors.council && <p className="text-red-500 text-sm mt-1">{errors.council}</p>}
                  {formData.council && <p className="text-purple-600 text-xs mt-1 font-medium">Max GFA: {QLD_COUNCILS[formData.council].maxGFA}m&sup2; | Min lot: {QLD_COUNCILS[formData.council].minLot}m&sup2;</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Suburb</label>
                  <input className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-purple-500 focus:outline-none" placeholder="e.g. Paddington" value={formData.suburb} onChange={function(e){update("suburb",e.target.value);}} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Total Land Size (m&sup2;) *</label>
                  <input className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:border-purple-500 focus:outline-none" type="number" placeholder="e.g. 600" value={formData.landSize} onChange={function(e){update("landSize",e.target.value);}} />
                  {errors.landSize && <p className="text-red-500 text-sm mt-1">{errors.landSize}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Site Condition</label>
                  <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-800 bg-white focus:border-purple-500 focus:outline-none" value={formData.siteCondition} onChange={function(e){update("siteCondition",e.target.value);}}>
                    <option value="flat">Flat & Clear</option>
                    <option value="slight">Slight Slope / Some Clearing</option>
                    <option value="steep">Steep / Heavy Clearing Required</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Any Known Overlays?</label>
                  <div className="flex gap-3">
                    {["no","yes","unsure"].map(function(v){return <button key={v} className={"finish-btn px-6 py-3 bg-white font-medium text-sm text-gray-700 cursor-pointer " + (formData.hasOverlays===v?"selected":"")} onClick={function(){update("hasOverlays",v);}}>{v==="unsure"?"Not Sure":v==="yes"?"Yes":"None"}</button>;})}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2" onClick={nextStep}>Next: Design & Materials <i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-slide">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><i className="fa-solid fa-ruler text-purple-500"></i> Design & Materials</h2>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Bedrooms</label>
                <div className="flex gap-3 flex-wrap">
                  {BEDROOMS.map(function(b){return <button key={b.value} className={"finish-btn px-5 py-3 bg-white cursor-pointer text-left text-gray-700 " + (formData.bedrooms===b.value?"selected":"")} onClick={function(){update("bedrooms",b.value);}}><div className="font-semibold">{b.label}</div><div className="text-xs text-gray-500">{b.sqmRange[0]}-{b.sqmRange[1]}m&sup2;</div></button>;})}
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Construction Size: <span className="text-2xl font-bold text-purple-600">{formData.constructionSize||50}m&sup2;</span></label>
                <input type="range" min="25" max="80" value={parseInt(formData.constructionSize)||50} onChange={function(e){update("constructionSize",e.target.value);}} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>25m&sup2;</span><span>50m&sup2; (typical)</span><span>80m&sup2; (max)</span></div>
                {parseInt(formData.constructionSize) > 60 && <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700"><i className="fa-solid fa-triangle-exclamation mr-1"></i> Over 60m&sup2; may require Development Approval</div>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Construction Material *</label>
                {errors.material && <p className="text-red-500 text-sm mb-2">{errors.material}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(MATERIALS).map(function(entry){var key=entry[0],m=entry[1];return <div key={key} className={"material-card p-4 cursor-pointer bg-white " + (formData.material===key?"selected":"")} onClick={function(){update("material",key);}}>
                    <div className="text-3xl mb-2">{m.icon}</div>
                    <h4 className="font-bold text-gray-800 mb-1">{m.label}</h4>
                    <p className="text-xs text-gray-500 mb-3">{m.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-gray-500">Cost/m&sup2;:</span><span className="font-semibold text-gray-700">${m.costPerSqm.toLocaleString()}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Termites:</span><span className="font-semibold text-gray-700">{m.termiteRisk}</span></div>
                    </div>
                    {m.recommended && <div className="mt-2 bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded text-center">RECOMMENDED FOR QLD</div>}
                  </div>;})}
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Finish Level</label>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(FINISH_LEVELS).map(function(entry){var key=entry[0],f=entry[1];return <button key={key} className={"finish-btn px-5 py-3 bg-white cursor-pointer text-left text-gray-700 " + (formData.finishLevel===key?"selected":"")} onClick={function(){update("finishLevel",key);}} style={{minWidth:160}}><div className="font-semibold">{f.label}</div><div className="text-xs text-gray-500 mt-1">{f.description}</div></button>;})}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button className="px-8 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition flex items-center gap-2" onClick={prevStep}><i className="fa-solid fa-chevron-left text-xs"></i> Back</button>
                <button className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2" onClick={nextStep}>Next: Budget <i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-slide">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><i className="fa-solid fa-dollar-sign text-purple-500"></i> Budget & Purpose</h2>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Budget: <span className="text-3xl font-bold text-purple-600">${parseInt(formData.budget||150000).toLocaleString()}</span> <span className="text-gray-400 text-sm font-normal">AUD</span></label>
                <input type="range" min="50000" max="350000" step="5000" value={parseInt(formData.budget)||150000} onChange={function(e){update("budget",e.target.value);}} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$50k</span><span>$150k</span><span>$250k</span><span>$350k</span></div>
                {errors.budget && <p className="text-red-500 text-sm mt-2">{errors.budget}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Purpose</label>
                <select className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 text-gray-800 bg-white focus:border-purple-500 focus:outline-none" style={{maxWidth:350}} value={formData.purpose} onChange={function(e){update("purpose",e.target.value);}}>
                  <option value="family">Family / Elderly Relative</option>
                  <option value="rental">Rental Income</option>
                  <option value="office">Home Office / Studio</option>
                  <option value="teens">Teen Retreat / Adult Children</option>
                  <option value="guest">Guest Accommodation</option>
                </select>
              </div>
              {formData.purpose === "rental" && <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"><p className="text-green-700 text-sm font-semibold mb-1">Rental Tip</p><p className="text-green-600 text-sm">Since September 2022, QLD allows renting granny flats to anyone. You'll need fire separation compliance and a certifier sign-off.</p></div>}
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <p className="text-sm font-semibold text-gray-600 mb-3">Your Selections</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  {[["Council",formData.council||"-"],["Land",formData.landSize?formData.landSize+"m\u00B2":"-"],["Bedrooms",(BEDROOMS.find(function(b){return b.value===formData.bedrooms;})||{}).label],["Size",(formData.constructionSize||"50")+"m\u00B2"],["Material",formData.material?MATERIALS[formData.material].label:"-"],["Finish",FINISH_LEVELS[formData.finishLevel].label]].map(function(p,i){return <div key={i}><span className="text-gray-400">{p[0]}: </span><span className="font-medium text-gray-700">{p[1]}</span></div>;})}
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button className="px-8 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition flex items-center gap-2" onClick={prevStep}><i className="fa-solid fa-chevron-left text-xs"></i> Back</button>
                <button className="gradient-bg text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2" onClick={nextStep}>Generate My Plan <i className="fa-solid fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && plan && (
          <div className="animate-slide">
            <div className="bg-white shadow-md rounded-xl mb-6">
              <div className="flex gap-1 overflow-x-auto px-2">
                {[["overview","Overview"],["budget","Budget"],["schedule","Schedule"],["permits","Permits"],["alternatives","Alternatives ("+plan.alternatives.length+")"]].map(function(p){return <button key={p[0]} className={"px-5 py-4 font-semibold whitespace-nowrap text-sm transition-all " + (resultTab===p[0]?"tab-active":"text-gray-500 hover:text-gray-800")} onClick={function(){setResultTab(p[0]);}}>{p[1]}</button>;})}
              </div>
            </div>

            {resultTab === "overview" && (
              <div className="space-y-5">
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-xl p-8 text-white">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div><div className="text-purple-200 text-xs">TOTAL COST</div><div className="text-3xl font-bold mt-1">{fmt(plan.totalCost)}</div></div>
                    <div><div className="text-purple-200 text-xs">BUILD SIZE</div><div className="text-3xl font-bold mt-1">{plan.finalSize}m&sup2;</div></div>
                    <div><div className="text-purple-200 text-xs">BUILD TIME</div><div className="text-3xl font-bold mt-1">~{plan.adjustedWeeks}wk</div></div>
                    <div><div className="text-purple-200 text-xs">APPROVAL</div><div className="text-lg font-bold mt-1">{plan.needsDA?"DA Required":"No DA"}</div></div>
                  </div>
                </div>
                {plan.sizeWarning && <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg"><p className="font-semibold text-amber-800 text-sm">Size Adjusted</p><p className="text-amber-700 text-sm mt-1">Exceeded {plan.maxAllowed}m&sup2; max for {formData.council}. Adjusted to {plan.finalSize}m&sup2;.</p></div>}
                <div className={"bg-white rounded-xl shadow-lg p-6 border-l-4 " + (plan.budgetDiff>=0?"border-green-500":"border-red-500")}>
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <div><p className={"font-bold "+(plan.budgetDiff>=0?"text-green-600":"text-red-600")}>{plan.budgetDiff>=0?"Within Budget":"Over Budget"}</p><p className="text-gray-500 text-sm mt-1">Budget: {fmt(parseInt(formData.budget))} | Estimated: {fmt(plan.totalCost)}</p></div>
                    <div className={"text-3xl font-bold "+(plan.budgetDiff>=0?"text-green-600":"text-red-600")}>{plan.budgetDiff>=0?"+":""}{fmt(plan.budgetDiff)}</div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="font-bold text-gray-800 text-lg mb-4">Key Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[["Material",plan.material.label],["Finish",plan.finish.label],["Fire Separation","2m minimum"],["Parking","1 additional space"],["Height Limit","8.5m"],["Energy Rating","6-star minimum"],["Can Rent Out","Yes (since Sept 2022)"]].map(function(p,i){return <div key={i} className="flex justify-between p-2 bg-gray-50 rounded text-sm"><span className="text-gray-500">{p[0]}</span><span className="font-semibold text-gray-800">{p[1]}</span></div>;})}
                  </div>
                </div>
                {formData.purpose==="rental" && <div className="bg-white rounded-xl shadow-lg p-6"><h3 className="font-bold text-gray-800 text-lg mb-4">Rental Income Potential</h3><div className="grid grid-cols-3 gap-4"><div><p className="text-xs text-gray-500">Weekly Rent</p><p className="text-xl font-bold text-purple-600">${plan.weeklyRent[0]}-${plan.weeklyRent[1]}</p></div><div><p className="text-xs text-gray-500">Annual Income</p><p className="text-xl font-bold text-purple-600">{fmt(plan.annualRent[0])}-{fmt(plan.annualRent[1])}</p></div><div><p className="text-xs text-gray-500">Gross ROI</p><p className="text-xl font-bold text-purple-600">{plan.roi[0]}-{plan.roi[1]}%</p></div></div></div>}
              </div>
            )}

            {resultTab === "budget" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-5"><i className="fa-solid fa-dollar-sign text-purple-500 mr-2"></i>Budget Breakdown</h3>
                <div className="space-y-4 mb-6">
                  {Object.entries(plan.budgetBreakdown).map(function(entry,i){var item=entry[0],cost=entry[1],pct=(cost/plan.totalCost)*100;return <div key={i}><div className="flex justify-between mb-1"><span className="text-sm text-gray-600">{item}</span><span className="text-sm font-semibold text-gray-800">{fmt(cost)}</span></div><div className="h-2 bg-gray-100 rounded-full"><div className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" style={{width:pct+"%"}} /></div></div>;})}
                </div>
                <div className="border-t-2 border-gray-100 pt-4 flex justify-between items-center"><span className="text-lg font-bold text-gray-800">Total</span><span className="text-3xl font-bold text-purple-600">{fmt(plan.totalCost)}</span></div>
              </div>
            )}

            {resultTab === "schedule" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-5"><i className="fa-solid fa-calendar text-purple-500 mr-2"></i>Build Schedule</h3>
                {plan.schedule.map(function(phase,i){return <div key={i} className="flex gap-4 mb-6"><div className="flex flex-col items-center" style={{minWidth:36}}><div className="w-9 h-9 rounded-full gradient-bg text-white flex items-center justify-center text-sm font-bold">{i+1}</div>{i<plan.schedule.length-1 && <div className="w-0.5 flex-1 bg-purple-200 mt-1" />}</div><div className="flex-1 pb-2"><div className="flex justify-between items-start mb-2 flex-wrap gap-2"><h4 className="font-bold text-gray-800">{phase.phase}</h4><span className="bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full">{phase.weeks}</span></div><div className="grid grid-cols-1 md:grid-cols-2 gap-1">{phase.tasks.map(function(task,j){return <div key={j} className="flex items-center gap-2 text-sm text-gray-600"><div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />{task}</div>;})}</div></div></div>;})}
                <div className="mt-4 bg-purple-50 border border-purple-200 rounded-lg p-4"><p className="text-purple-700 text-sm font-semibold">Total: ~{plan.needsDA?(20+plan.adjustedWeeks):(14+plan.adjustedWeeks)} weeks</p></div>
              </div>
            )}

            {resultTab === "permits" && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 text-lg mb-5"><i className="fa-solid fa-clipboard text-purple-500 mr-2"></i>Permits & Approvals</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-5"><p className="font-semibold text-blue-800 text-sm">{plan.approvalPath}</p><p className="text-blue-600 text-sm mt-1">{plan.needsDA?"DA required. Adds time and cost.":"No DA needed - just building approval via private certifier."}</p></div>
                <div className="space-y-3">
                  {plan.permits.map(function(p,i){return <div key={i} className="bg-gray-50 rounded-lg p-4"><div className="flex justify-between items-start mb-2 flex-wrap gap-2"><div className="flex items-center gap-2"><span className={"text-xs font-bold px-2 py-1 rounded "+(p.required?"bg-green-100 text-green-700":"bg-gray-200 text-gray-500")}>{p.required?"Required":"Not Required"}</span><span className="font-bold text-gray-800 text-sm">{p.name}</span></div><span className="text-sm font-semibold text-purple-600">{p.cost}</span></div><p className="text-xs text-gray-400">By: {p.who}</p><p className="text-sm text-gray-600 mt-1">{p.notes}</p></div>;})}
                </div>
              </div>
            )}

            {resultTab === "alternatives" && (
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-lg p-5 border-2 border-purple-300">
                  <div className="flex justify-between items-start flex-wrap gap-4"><div><span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded">Current Plan</span><h4 className="font-bold text-gray-800 mt-2">{plan.finalSize}m&sup2; {plan.material.label} - {plan.finish.label}</h4></div><div className="text-right"><p className="text-2xl font-bold text-purple-600">{fmt(plan.totalCost)}</p><p className="text-xs text-gray-400">~{plan.adjustedWeeks} weeks</p></div></div>
                </div>
                {plan.alternatives.length === 0 && <div className="bg-white rounded-xl shadow-lg p-10 text-center"><p className="text-gray-400">Your plan is well-optimised.</p></div>}
                {plan.alternatives.map(function(alt,i){return <div key={i} className="bg-white rounded-xl shadow-lg p-5 card-hover"><div className="flex justify-between items-start flex-wrap gap-4"><div><h4 className="font-bold text-gray-800 mb-1">{alt.title}</h4><p className="text-sm text-gray-500">{alt.desc}</p><div className="flex gap-2 mt-2"><span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{alt.size}m&sup2;</span><span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">{alt.material}</span><span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">~{alt.weeks}wk</span></div></div><div className="text-right"><p className="text-xl font-bold text-gray-800">{fmt(alt.cost)}</p><p className={"text-xs font-semibold "+(alt.cost<=parseInt(formData.budget)?"text-green-600":"text-red-500")}>{alt.cost<=parseInt(formData.budget)?"Within budget":fmt(alt.cost-parseInt(formData.budget))+" over"}</p></div></div></div>;})}
              </div>
            )}

            <div className="flex justify-center mt-6 mb-4">
              <button className="px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-500 hover:bg-white transition text-sm" onClick={resetAll}>Start New Plan</button>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">Estimates are indicative only. Consult your local council and licensed professionals.</p>
          <p className="text-gray-500 text-xs mt-2">QLD regulations as of early 2026</p>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TinyHousePlanner />);
