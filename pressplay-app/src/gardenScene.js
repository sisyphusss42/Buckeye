// Procedural Garden Scene SVG Generator
// Now accepts a list of flowers to plant based on user's completed videos

const PETAL_COLORS = ['#F08DAA', '#F6C453', '#6FA8FF', '#B38AF5', '#7BC98A'];
const FLOWER_TARGET_CENTER_Y_OFFSET = -16;
const FLOWER_TARGET_RADIUS = 24;

function flowerTargetG(plot, flowerIndex) {
  return `<circle cx="${plot.x}" cy="${plot.y + FLOWER_TARGET_CENTER_Y_OFFSET}" r="${FLOWER_TARGET_RADIUS}" fill="transparent" pointer-events="all" cursor="pointer" data-flower-index="${flowerIndex}"/>`;
}

function shadow(cx, cy, rx) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.28}" fill="#3E5C36" opacity="0.14"/>`;
}

export function treeG(cx, baseY, s, kind) {
  let g = `<g style="transform-origin:${cx}px ${baseY}px">`;
  g += shadow(cx, baseY + 2, 22 * s);

  const trunk = (w, h) =>
    `<rect x="${cx - w / 2}" y="${baseY - h}" width="${w}" height="${h}" rx="${w / 2}" fill="url(#gTrunk)"/>` +
    `<rect x="${cx - w / 2 + w * 0.28}" y="${baseY - h + 3}" width="${w * 0.22}" height="${h - 8}" rx="${w * 0.11}" fill="#fff" opacity="0.18"/>`;

  const blob = (x, y, r, grad) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${grad})"/>`;

  if (kind === 'sprout') {
    const h = 18 * s;
    g += `<path d="M${cx} ${baseY} C ${cx} ${baseY - h * 0.5} ${cx} ${baseY - h * 0.8} ${cx} ${baseY - h}" stroke="#6DBE6F" stroke-width="${3 * s}" stroke-linecap="round" fill="none"/>`;
    g += `<ellipse cx="${cx - 7 * s}" cy="${baseY - h * 0.75}" rx="${7 * s}" ry="${4 * s}" fill="url(#gLeaf)" transform="rotate(-28 ${cx - 7 * s} ${baseY - h * 0.75})"/>`;
    g += `<ellipse cx="${cx + 7 * s}" cy="${baseY - h}" rx="${7 * s}" ry="${4 * s}" fill="url(#gLeaf)" transform="rotate(28 ${cx + 7 * s} ${baseY - h})"/>`;
  } else if (kind === 'young') {
    const h = 30 * s;
    g += trunk(9 * s, h);
    const cy = baseY - h - 10 * s;
    g += blob(cx - 11 * s, cy + 6 * s, 15 * s, 'gLeafD');
    g += blob(cx + 11 * s, cy + 6 * s, 15 * s, 'gLeafD');
    g += blob(cx, cy - 4 * s, 20 * s, 'gLeaf');
    g += `<circle cx="${cx - 6 * s}" cy="${cy - 8 * s}" r="${6 * s}" fill="#fff" opacity="0.22"/>`;
  } else if (kind === 'large') {
    const h = 44 * s;
    g += trunk(14 * s, h);
    const cy = baseY - h - 16 * s;
    g += blob(cx - 20 * s, cy + 8 * s, 20 * s, 'gLeafD');
    g += blob(cx + 20 * s, cy + 8 * s, 20 * s, 'gLeafD');
    g += blob(cx - 9 * s, cy + 2 * s, 23 * s, 'gLeaf');
    g += blob(cx + 11 * s, cy - 2 * s, 24 * s, 'gLeaf');
    g += blob(cx, cy - 14 * s, 22 * s, 'gLeaf');
    g += `<circle cx="${cx - 8 * s}" cy="${cy - 16 * s}" r="${8 * s}" fill="#fff" opacity="0.22"/>`;
  } else {
    const h = 58 * s;
    g += trunk(22 * s, h);
    g += `<ellipse cx="${cx - 11 * s}" cy="${baseY - 2 * s}" rx="${9 * s}" ry="${5 * s}" fill="url(#gTrunk)"/>`;
    g += `<ellipse cx="${cx + 11 * s}" cy="${baseY - 2 * s}" rx="${9 * s}" ry="${5 * s}" fill="url(#gTrunk)"/>`;
    const cy = baseY - h - 20 * s;
    g += blob(cx - 28 * s, cy + 12 * s, 24 * s, 'gLeafD');
    g += blob(cx + 28 * s, cy + 12 * s, 24 * s, 'gLeafD');
    g += blob(cx - 14 * s, cy + 6 * s, 27 * s, 'gLeaf');
    g += blob(cx + 16 * s, cy + 2 * s, 28 * s, 'gLeaf');
    g += blob(cx, cy - 16 * s, 27 * s, 'gLeaf');
    g += blob(cx - 2 * s, cy - 2 * s, 24 * s, 'gLeaf');
    g += `<circle cx="${cx - 12 * s}" cy="${cy - 18 * s}" r="${9 * s}" fill="#fff" opacity="0.2"/>`;
  }
  g += `</g>`;
  return g;
}

function plantedFlowerG(cx, baseY, petals, s, wilted, idx) {
  let g = '<g>';
  g += shadow(cx, baseY + 1, 12 * s);
  const headY = baseY - 30 * s;

  if (wilted) {
    g += `<path d="M${cx} ${baseY} C ${cx - 2 * s} ${baseY - 14 * s} ${cx + 6 * s} ${baseY - 20 * s} ${cx + 10 * s} ${baseY - 24 * s}" stroke="#9DB06E" stroke-width="${3 * s}" fill="none" stroke-linecap="round"/>`;
    g += `<ellipse cx="${cx + 13 * s}" cy="${baseY - 24 * s}" rx="${6 * s}" ry="${8 * s}" fill="#C9C3A6" transform="rotate(60 ${cx + 13 * s} ${baseY - 24 * s})"/>`;
    g += `<ellipse cx="${cx + 18 * s}" cy="${baseY - 19 * s}" rx="${5 * s}" ry="${7 * s}" fill="#BDB79A" transform="rotate(90 ${cx + 18 * s} ${baseY - 19 * s})"/>`;
    g += `<circle cx="${cx + 15 * s}" cy="${baseY - 22 * s}" r="${4 * s}" fill="#A99A6E"/>`;
    g += `<path d="M${cx - 8 * s} ${baseY - 24 * s} l ${3 * s} ${5 * s}" stroke="#B5A876" stroke-width="${1.5 * s}" fill="none"/>`;
    g += '</g>';
    return g;
  }

  // Sprout stage: petals <= 2 (just planted, hasn't bloomed yet)
  if (petals <= 2) {
    const h = 18 * s;
    g += `<path d="M${cx} ${baseY} C ${cx} ${baseY - h * 0.5} ${cx} ${baseY - h * 0.8} ${cx} ${baseY - h}" stroke="#6DBE6F" stroke-width="${3 * s}" stroke-linecap="round" fill="none"/>`;
    g += `<ellipse cx="${cx - 7 * s}" cy="${baseY - h * 0.75}" rx="${7 * s}" ry="${4 * s}" fill="url(#gLeaf)" transform="rotate(-28 ${cx - 7 * s} ${baseY - h * 0.75})"/>`;
    g += `<ellipse cx="${cx + 7 * s}" cy="${baseY - h}" rx="${7 * s}" ry="${4 * s}" fill="url(#gLeaf)" transform="rotate(28 ${cx + 7 * s} ${baseY - h})"/>`;
    g += '</g>';
    return g;
  }

  const color = PETAL_COLORS[idx % PETAL_COLORS.length];
  g += `<path d="M${cx} ${baseY} Q ${cx - 3 * s} ${baseY - 16 * s} ${cx} ${headY + 6 * s}" stroke="#5FAF6A" stroke-width="${3.4 * s}" fill="none" stroke-linecap="round"/>`;
  g += `<ellipse cx="${cx - 8 * s}" cy="${baseY - 14 * s}" rx="${7 * s}" ry="${3.6 * s}" fill="url(#gLeaf)" transform="rotate(-30 ${cx - 8 * s} ${baseY - 14 * s})"/>`;
  const r = 10 * s;
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const px = +(cx + Math.cos(a) * r).toFixed(1);
    const py = +(headY + Math.sin(a) * r).toFixed(1);
    const rot = +(((a * 180 / Math.PI) + 90) % 360).toFixed(1);
    g += `<ellipse cx="${px}" cy="${py}" rx="${(5.4 * s).toFixed(1)}" ry="${(8 * s).toFixed(1)}" fill="${color}" opacity="0.94" transform="rotate(${rot} ${px} ${py})"/>`;
  }
  g += `<circle cx="${cx}" cy="${headY}" r="${6 * s}" fill="#F6C453"/>`;
  g += `<circle cx="${cx}" cy="${headY}" r="${3.4 * s}" fill="#E8A93B"/>`;
  g += '</g>';
  return g;
}

// Label text under a flower
function flowerLabel(cx, baseY, text, s) {
  const labelY = baseY + 14 * s;
  return `<text x="${cx}" y="${labelY}" text-anchor="middle" font-size="${9 * s}" font-family="'Noto Sans TC', sans-serif" fill="#5E3C22" opacity="0.85">${text}</text>`;
}

// Plot positions — exported so Garden.jsx can overlay click targets
const PLOT_POSITIONS = [
  {x:45,y:220},{x:120,y:215},{x:195,y:222},{x:270,y:218},{x:345,y:224},
  {x:30,y:265},{x:85,y:270},{x:155,y:262},{x:225,y:268},{x:295,y:264},{x:365,y:270},
  {x:50,y:310},{x:115,y:315},{x:180,y:308},{x:250,y:312},{x:320,y:306},{x:375,y:314},
  {x:35,y:355},{x:95,y:360},{x:165,y:352},{x:235,y:358},{x:305,y:354},{x:370,y:360},
  {x:55,y:400},{x:125,y:395},{x:195,y:402},{x:265,y:398},{x:340,y:404},
  {x:30,y:445},{x:90,y:450},{x:160,y:442},{x:230,y:448},{x:300,y:444},{x:365,y:450},
  {x:50,y:490},{x:120,y:495},{x:190,y:488},{x:260,y:494},{x:335,y:490},
  {x:35,y:535},{x:100,y:540},{x:170,y:532},{x:240,y:538},{x:310,y:534},{x:375,y:540},
  {x:55,y:580},{x:130,y:575},{x:205,y:582},{x:295,y:578},{x:360,y:584},
];

export function getPlotPositions() {
  return PLOT_POSITIONS;
}

/**
 * Build the garden SVG.
 * @param {Array} flowers — array of { title, petals, colorIndex } for each completed video
 * @param {Array} assignedPlots — optional array of {x, y} positions for each flower (if not provided, uses sequential order)
 */
export function buildGardenSVG(flowers = [], assignedPlots = null) {
  const W = 390, H = 680;
  let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg" style="display:block">`;

  // Defs
  s += `<defs>
    <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCEEFF"/><stop offset="1" stop-color="#EEF8E6"/></linearGradient>
    <linearGradient id="gGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CD98F"/><stop offset="1" stop-color="#6FBF6E"/></linearGradient>
    <linearGradient id="gSoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#B77F4E"/><stop offset="1" stop-color="#7E5230"/></linearGradient>
    <linearGradient id="gTrunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B5835A"/><stop offset="1" stop-color="#8A5E38"/></linearGradient>
    <radialGradient id="gLeaf" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#8FD693"/><stop offset="1" stop-color="#4E9558"/></radialGradient>
    <radialGradient id="gLeafD" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#5FAF6A"/><stop offset="1" stop-color="#3B7A48"/></radialGradient>
    <radialGradient id="gSun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE7A8"/><stop offset="1" stop-color="#FBD46A"/></radialGradient>
  </defs>`;

  // Sky + sun + clouds
  s += `<rect x="0" y="0" width="${W}" height="150" fill="url(#gSky)"/>`;
  s += `<circle cx="322" cy="40" r="40" fill="#FFE9A8" opacity="0.35"/><circle cx="322" cy="40" r="26" fill="url(#gSun)"/>`;

  const cloud = (x, y, k) =>
    `<g fill="#ffffff" opacity="0.9"><circle cx="${x}" cy="${y}" r="${13 * k}"/><circle cx="${x + 16 * k}" cy="${y + 3 * k}" r="${16 * k}"/><circle cx="${x + 34 * k}" cy="${y}" r="${12 * k}"/><rect x="${x - 4 * k}" y="${y}" width="${44 * k}" height="${14 * k}" rx="${7 * k}"/></g>`;
  s += cloud(60, 40, 0.9) + cloud(190, 28, 0.7) + cloud(300, 50, 0.6);

  // Rolling hills
  s += `<path d="M0 130 Q 90 100 190 125 T 390 110 V 170 H0 Z" fill="#BFE5A6"/>`;
  s += `<path d="M0 150 Q 120 120 240 145 T 390 135 V 190 H0 Z" fill="#A7DB92"/>`;

  // Grass ground
  s += `<rect x="0" y="140" width="${W}" height="${H - 140}" fill="url(#gGrass)"/>`;

  // Picket fence
  const fenceTop = 168, fenceBot = 200, railY1 = 176, railY2 = 190;
  s += `<rect x="0" y="${railY1}" width="${W}" height="5" rx="2.5" fill="#F2E4CC"/>`;
  s += `<rect x="0" y="${railY2}" width="${W}" height="5" rx="2.5" fill="#EAD9BA"/>`;
  for (let x = 6; x < W; x += 34) {
    s += `<path d="M${x} ${fenceBot} V ${fenceTop} l 7 -9 l 7 9 V ${fenceBot} Z" fill="#FBF1DD" stroke="#E4D2B0" stroke-width="1.5"/>`;
  }
  s += `<rect x="0" y="${railY1}" width="${W}" height="4" rx="2" fill="#fff" opacity="0.55"/>`;

  // Generate fixed plot positions scattered across grassland
  const plots = PLOT_POSITIONS;

  // Draw all plots as small soil ovals
  plots.forEach((plot) => {
    s += `<ellipse cx="${plot.x}" cy="${plot.y}" rx="16" ry="7" fill="#8B6B4A" opacity="0.3"/>`;
    s += `<ellipse cx="${plot.x}" cy="${plot.y - 1}" rx="14" ry="6" fill="#A0784C" opacity="0.2"/>`;
  });

  // Plant flowers in occupied plots
  flowers.forEach((flower, i) => {
    const plot = assignedPlots ? assignedPlots[i] : plots[i];
    if (plot) {
      s += '<g>';
      s += plantedFlowerG(plot.x, plot.y - 3, flower.petals, 0.7, false, flower.colorIndex);
      s += flowerTargetG(plot, i);
      s += '</g>';
    }
  });

  if (flowers.length === 0) {
    s += `<text x="${W / 2}" y="420" text-anchor="middle" font-size="14" font-family="'Noto Sans TC', sans-serif" fill="#5E3C22" opacity="0.7">🌱 完成課程來種下你的第一朵花</text>`;
  }

  // Foreground grass tufts
  const tuft = (x, y, k) =>
    `<g stroke="#4E9558" stroke-width="${2.4 * k}" stroke-linecap="round" fill="none"><path d="M${x} ${y} q -3 -${9 * k} -6 -${13 * k}"/><path d="M${x} ${y} q 0 -${11 * k} 0 -${15 * k}"/><path d="M${x} ${y} q 3 -${9 * k} 6 -${13 * k}"/></g>`;
  s += tuft(20, 650, 1.1) + tuft(130, 655, 0.9) + tuft(260, 652, 1.0) + tuft(370, 648, 0.8);

  s += `</svg>`;
  return s;
}
