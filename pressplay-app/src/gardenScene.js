// Procedural Garden Scene SVG Generator
// Ported from design system — generates cartoon trees, fence, soil beds, planted flowers

const PETAL_COLORS = ['#F08DAA', '#F6C453', '#6FA8FF', '#B38AF5', '#7BC98A'];

function shadow(cx, cy, rx) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.28}" fill="#3E5C36" opacity="0.14"/>`;
}

function treeG(cx, baseY, s, kind) {
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
    // ancient
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

  const color = PETAL_COLORS[idx % PETAL_COLORS.length];
  // stem
  g += `<path d="M${cx} ${baseY} Q ${cx - 3 * s} ${baseY - 16 * s} ${cx} ${headY + 6 * s}" stroke="#5FAF6A" stroke-width="${3.4 * s}" fill="none" stroke-linecap="round"/>`;
  // leaf
  g += `<ellipse cx="${cx - 8 * s}" cy="${baseY - 14 * s}" rx="${7 * s}" ry="${3.6 * s}" fill="url(#gLeaf)" transform="rotate(-30 ${cx - 8 * s} ${baseY - 14 * s})"/>`;
  // head petals
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

export function buildGardenSVG() {
  const W = 390, H = 470;
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
  s += `<rect x="0" y="0" width="${W}" height="220" fill="url(#gSky)"/>`;
  s += `<circle cx="322" cy="52" r="46" fill="#FFE9A8" opacity="0.35"/><circle cx="322" cy="52" r="30" fill="url(#gSun)"/>`;

  const cloud = (x, y, k) =>
    `<g fill="#ffffff" opacity="0.9"><circle cx="${x}" cy="${y}" r="${13 * k}"/><circle cx="${x + 16 * k}" cy="${y + 3 * k}" r="${16 * k}"/><circle cx="${x + 34 * k}" cy="${y}" r="${12 * k}"/><rect x="${x - 4 * k}" y="${y}" width="${44 * k}" height="${14 * k}" rx="${7 * k}"/></g>`;
  s += cloud(60, 58, 1) + cloud(190, 38, 0.8);

  // Rolling hills
  s += `<path d="M0 200 Q 90 150 190 190 T 390 175 V 230 H0 Z" fill="#BFE5A6"/>`;
  s += `<path d="M0 215 Q 120 178 240 210 T 390 200 V 260 H0 Z" fill="#A7DB92"/>`;

  // Grass ground
  s += `<rect x="0" y="205" width="${W}" height="${H - 205}" fill="url(#gGrass)"/>`;

  // Trees (behind fence)
  s += treeG(70, 250, 1.15, 'large');
  s += treeG(200, 244, 1.35, 'ancient');
  s += treeG(320, 252, 1.0, 'young');
  s += treeG(360, 256, 0.7, 'sprout');

  // Picket fence
  const fenceTop = 258, fenceBot = 300, railY1 = 270, railY2 = 288;
  s += `<rect x="0" y="${railY1}" width="${W}" height="6" rx="3" fill="#F2E4CC"/>`;
  s += `<rect x="0" y="${railY2}" width="${W}" height="6" rx="3" fill="#EAD9BA"/>`;
  for (let x = 6; x < W; x += 34) {
    s += `<path d="M${x} ${fenceBot} V ${fenceTop} l 7 -9 l 7 9 V ${fenceBot} Z" fill="#FBF1DD" stroke="#E4D2B0" stroke-width="1.5"/>`;
  }
  s += `<rect x="0" y="${railY1}" width="${W}" height="5" rx="2.5" fill="#fff" opacity="0.55"/>`;

  // Soil planting beds
  const beds = [
    { y: 322, h: 26, x: 34, w: 322, s: 0.9, list: [{ p: 8, c: 0 }, { p: 10, c: 1 }, { p: 6, c: 2 }, { p: 9, c: 3 }, { p: 7, c: 4 }] },
    { y: 378, h: 30, x: 22, w: 346, s: 1.0, list: [{ p: 6, c: 1 }, { w: 1 }, { p: 8, c: 3 }, { p: 5, c: 0 }, { p: 10, c: 4 }] },
    { y: 438, h: 34, x: 10, w: 370, s: 1.15, list: [{ p: 7, c: 2 }, { p: 9, c: 4 }, { p: 6, c: 0 }, { p: 8, c: 1 }, { p: 4, c: 3 }] },
  ];

  beds.forEach(bed => {
    // Mound
    s += `<rect x="${bed.x}" y="${bed.y - bed.h}" width="${bed.w}" height="${bed.h + 40}" rx="${bed.h * 0.7}" fill="url(#gSoil)"/>`;
    // Lighter tilled top
    s += `<rect x="${bed.x + 4}" y="${bed.y - bed.h}" width="${bed.w - 8}" height="10" rx="5" fill="#C99361" opacity="0.7"/>`;
    // Soil texture dots
    let dots = '';
    for (let i = 0; i < 18; i++) {
      const dx = bed.x + 8 + Math.random() * (bed.w - 16);
      const dy = bed.y - bed.h + 6 + Math.random() * (bed.h + 22);
      dots += `<circle cx="${dx.toFixed(0)}" cy="${dy.toFixed(0)}" r="${(1 + Math.random() * 1.6).toFixed(1)}" fill="#5E3C22" opacity="0.35"/>`;
    }
    s += dots;
    // Plant flowers
    const n = bed.list.length;
    bed.list.forEach((f, i) => {
      const cx = bed.x + bed.w * ((i + 0.5) / n);
      const baseY = bed.y - bed.h + 9;
      if (f.w) {
        s += plantedFlowerG(cx, baseY, 0, bed.s, true, i);
      } else {
        s += plantedFlowerG(cx, baseY, f.p, bed.s, false, f.c);
      }
    });
  });

  // Foreground grass tufts
  const tuft = (x, y, k) =>
    `<g stroke="#4E9558" stroke-width="${2.4 * k}" stroke-linecap="round" fill="none"><path d="M${x} ${y} q -3 -${9 * k} -6 -${13 * k}"/><path d="M${x} ${y} q 0 -${11 * k} 0 -${15 * k}"/><path d="M${x} ${y} q 3 -${9 * k} 6 -${13 * k}"/></g>`;
  s += tuft(20, 466, 1.1) + tuft(120, 468, 0.9) + tuft(300, 466, 1.0) + tuft(370, 464, 0.8);

  s += `</svg>`;
  return s;
}
