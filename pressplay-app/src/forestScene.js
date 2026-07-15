import { treeG } from './gardenScene.js'

const SCENE_WIDTH = 390
const SCENE_HEIGHT = 680
const FULL_GROWTH_TARGET = 1000

const TREE_POSITIONS = [
  { x: 98, y: 335 },
  { x: 292, y: 335 },
  { x: 98, y: 555 },
  { x: 292, y: 555 },
]

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function getTreeStage(correctAnswers) {
  if (correctAnswers >= FULL_GROWTH_TARGET) return { kind: 'mature', scale: 1 }
  if (correctAnswers >= 667) return { kind: 'large', scale: 1.08 }
  if (correctAnswers >= 334) return { kind: 'young', scale: 1.2 }
  return { kind: 'sprout', scale: 1.35 }
}

function treeTarget(position, tree, index) {
  const title = escapeXml(tree.title)
  return `<rect
    x="${position.x - 66}"
    y="${position.y - 145}"
    width="132"
    height="174"
    rx="24"
    fill="transparent"
    stroke="none"
    pointer-events="all"
    cursor="pointer"
    tabindex="0"
    role="button"
    aria-label="查看${title}課程樹"
    data-tree-index="${index}"
    style="outline:none"
  />`
}

/**
 * Build the creator forest scene.
 * @param {Array} trees - array of { title, icon, color, correctAnswers }
 */
export function buildForestSVG(trees = []) {
  let svg = `<svg viewBox="0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" style="display:block">`

  svg += `<defs>
    <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#D8EEFF"/><stop offset="1" stop-color="#F4FAE9"/></linearGradient>
    <linearGradient id="gGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A8DC93"/><stop offset="1" stop-color="#62AC66"/></linearGradient>
    <linearGradient id="gTrunk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#B5835A"/><stop offset="1" stop-color="#8A5E38"/></linearGradient>
    <radialGradient id="gLeaf" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#8FD693"/><stop offset="1" stop-color="#4E9558"/></radialGradient>
    <radialGradient id="gLeafD" cx="0.4" cy="0.35" r="0.8"><stop offset="0" stop-color="#5FAF6A"/><stop offset="1" stop-color="#3B7A48"/></radialGradient>
    <radialGradient id="forestSun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE8A9"/><stop offset="1" stop-color="#F6C453"/></radialGradient>
  </defs>`

  svg += `<rect width="${SCENE_WIDTH}" height="${SCENE_HEIGHT}" fill="url(#gSky)"/>`
  svg += `<circle cx="330" cy="55" r="39" fill="#FFE9A8" opacity="0.35"/><circle cx="330" cy="55" r="25" fill="url(#forestSun)"/>`
  svg += `<g fill="#fff" opacity="0.88"><circle cx="45" cy="58" r="12"/><circle cx="61" cy="60" r="16"/><circle cx="80" cy="57" r="11"/><rect x="34" y="58" width="57" height="14" rx="7"/></g>`
  svg += `<path d="M0 155 Q85 105 185 145 T390 125 V205 H0Z" fill="#BDE3A7"/>`
  svg += `<path d="M0 180 Q120 135 245 170 T390 155 V225 H0Z" fill="#9ED287"/>`
  svg += `<rect x="0" y="185" width="${SCENE_WIDTH}" height="${SCENE_HEIGHT - 185}" fill="url(#gGrass)"/>`

  svg += `<g font-family="'Noto Sans TC', sans-serif" fill="#33523A">`
  svg += `<text x="34" y="42" font-size="22" font-weight="700">均一創作者森林</text>`
  svg += `<text x="34" y="66" font-size="12" opacity="0.78">每一次答對，都讓創作者的知識之樹成長</text>`
  svg += `</g>`

  trees.slice(0, TREE_POSITIONS.length).forEach((tree, index) => {
    const position = TREE_POSITIONS[index]
    const correctAnswers = Math.max(0, Number(tree.correctAnswers) || 0)
    const progress = Math.min(correctAnswers / FULL_GROWTH_TARGET, 1)
    const { kind, scale } = getTreeStage(correctAnswers)
    const title = escapeXml(tree.title)
    const icon = escapeXml(tree.icon)
    const color = escapeXml(tree.color)

    svg += `<g>`
    svg += `<ellipse cx="${position.x}" cy="${position.y + 2}" rx="53" ry="15" fill="#527B43" opacity="0.12"/>`
    svg += treeG(position.x, position.y, scale, kind)
    svg += `<rect x="${position.x - 61}" y="${position.y + 16}" width="122" height="54" rx="15" fill="#FFFFFF" opacity="0.92"/>`
    svg += `<circle cx="${position.x - 42}" cy="${position.y + 35}" r="12" fill="${color}" opacity="0.18"/>`
    svg += `<text x="${position.x - 42}" y="${position.y + 40}" text-anchor="middle" font-size="14">${icon}</text>`
    svg += `<text x="${position.x - 24}" y="${position.y + 34}" font-size="13" font-weight="700" font-family="'Noto Sans TC', sans-serif" fill="#33523A">${title}</text>`
    svg += `<rect x="${position.x - 24}" y="${position.y + 44}" width="72" height="6" rx="3" fill="#DCE8D8"/>`
    svg += `<rect x="${position.x - 24}" y="${position.y + 44}" width="${(72 * progress).toFixed(1)}" height="6" rx="3" fill="${color}"/>`
    svg += `<text x="${position.x + 48}" y="${position.y + 61}" text-anchor="end" font-size="9" font-family="'Noto Sans TC', sans-serif" fill="#607267">${correctAnswers.toLocaleString()} / 1,000</text>`
    svg += treeTarget(position, tree, index)
    svg += `</g>`
  })

  const tuft = (x, y, scale) => `<g stroke="#4E9558" stroke-width="${2.4 * scale}" stroke-linecap="round" fill="none"><path d="M${x} ${y}q-3 -${9 * scale} -6 -${13 * scale}"/><path d="M${x} ${y}q0 -${11 * scale} 0 -${15 * scale}"/><path d="M${x} ${y}q3 -${9 * scale} 6 -${13 * scale}"/></g>`
  svg += tuft(20, 655, 1.1) + tuft(120, 665, 0.9) + tuft(280, 658, 1) + tuft(370, 650, 0.8)
  svg += `</svg>`

  return svg
}

export { FULL_GROWTH_TARGET }
