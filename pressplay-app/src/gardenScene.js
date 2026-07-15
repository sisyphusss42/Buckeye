// Procedural Garden Scene SVG Generator
// Now accepts a list of flowers to plant based on user's completed videos

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

/**
 * Build the garden SVG.
 * @param {Array} flowers — array of { title, petals, colorIndex } for each completed video
 *   If empty, shows an empty garden with a "plant your first flower" message.
 */
export function buildGardenSVG(flowers = []) {
  const W = 390, H = 420;
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
  s += `<rect x="0" y="0" width="${W}" height="200" fill="url(#gSky)"/>`;
  s += `<circle cx="322" cy="52" r="46" fill="#FFE9A8" opacity="0.35"/><circle cx="322" cy="52" r="30" fill="url(#gSun)"/>`;

  const cloud = (x, y, k) =>
    `<g fill="#ffffff" opacity="0.9"><circle cx="${x}" cy="${y}" r="${13 * k}"/><circle cx="${x + 16 * k}" cy="${y + 3 * k}" r="${16 * k}"/><circle cx="${x + 34 * k}" cy="${y}" r="${12 * k}"/><rect x="${x - 4 * k}" y="${y}" width="${44 * k}" height="${14 * k}" rx="${7 * k}"/></g>`;
  s += cloud(60, 58, 1) + cloud(190, 38, 0.8);

  // Rolling hills
  s += `<path d="M0 180 Q 90 140 190 170 T 390 155 V 210 H0 Z" fill="#BFE5A6"/>`;
  s += `<path d="M0 195 Q 120 160 240 190 T 390 180 V 230 H0 Z" fill="#A7DB92"/>`;

  // Grass ground
  s += `<rect x="0" y="185" width="${W}" height="${H - 185}" fill="url(#gGrass)"/>`;

  // Picket fence
  const fenceTop = 218, fenceBot = 255, railY1 = 228, railY2 = 245;
  s += `<rect x="0" y="${railY1}" width="${W}" height="5" rx="2.5" fill="#F2E4CC"/>`;
  s += `<rect x="0" y="${railY2}" width="${W}" height="5" rx="2.5" fill="#EAD9BA"/>`;
  for (let x = 6; x < W; x += 34) {
    s += `<path d="M${x} ${fenceBot} V ${fenceTop} l 7 -9 l 7 9 V ${fenceBot} Z" fill="#FBF1DD" stroke="#E4D2B0" stroke-width="1.5"/>`;
  }
  s += `<rect x="0" y="${railY1}" width="${W}" height="4" rx="2" fill="#fff" opacity="0.55"/>`;

  // Soil planting bed
  const bedY = 340, bedH = 50, bedX = 30, bedW = 330;
  s += `<rect x="${bedX}" y="${bedY - bedH}" width="${bedW}" height="${bedH + 60}" rx="${bedH * 0.6}" fill="url(#gSoil)"/>`;
  s += `<rect x="${bedX + 4}" y="${bedY - bedH}" width="${bedW - 8}" height="10" rx="5" fill="#C99361" opacity="0.7"/>`;

  // Soil dots
  for (let i = 0; i < 20; i++) {
    const dx = bedX + 10 + Math.random() * (bedW - 20);
    const dy = bedY - bedH + 8 + Math.random() * (bedH + 30);
    s += `<circle cx="${dx.toFixed(0)}" cy="${dy.toFixed(0)}" r="${(1 + Math.random() * 1.5).toFixed(1)}" fill="#5E3C22" opacity="0.3"/>`;
  }

  if (flowers.length === 0) {
    // Empty garden message
    s += `<text x="${W / 2}" y="${bedY - 10}" text-anchor="middle" font-size="14" font-family="'Noto Sans TC', sans-serif" fill="#8A5E38">🌱 完成課程來種下你的第一朵花</text>`;
  } else {
    // Plant user's flowers evenly spaced in the bed
    const n = flowers.length;
    const scale = n <= 2 ? 1.3 : n <= 4 ? 1.1 : 0.9;
    flowers.forEach((flower, i) => {
      const cx = bedX + bedW * ((i + 0.5) / n);
      const baseY = bedY - bedH + 12;
      s += plantedFlowerG(cx, baseY, flower.petals, scale, false, flower.colorIndex);
    });
  }

  // Foreground grass tufts
  const tuft = (x, y, k) =>
    `<g stroke="#4E9558" stroke-width="${2.4 * k}" stroke-linecap="round" fill="none"><path d="M${x} ${y} q -3 -${9 * k} -6 -${13 * k}"/><path d="M${x} ${y} q 0 -${11 * k} 0 -${15 * k}"/><path d="M${x} ${y} q 3 -${9 * k} 6 -${13 * k}"/></g>`;
  s += tuft(20, 410, 1.0) + tuft(130, 412, 0.9) + tuft(300, 410, 1.0) + tuft(370, 408, 0.8);

  s += `</svg>`;
  return s;
}
