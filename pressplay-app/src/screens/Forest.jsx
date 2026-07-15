import { useState } from 'react'
import BottomNav from '../components/BottomNav'
import courses from '../data/courses'
import { buildForestSVG, FULL_GROWTH_TARGET } from '../forestScene'

const CREATOR_COURSE_IDS = ['astronomy', 'geology', 'atmosphere', 'ocean']

const DEMO_CORRECT_ANSWERS = {
  astronomy: 1000,
  geology: 742,
  atmosphere: 486,
  ocean: 218,
}

export default function Forest() {
  const [selectedTree, setSelectedTree] = useState(null)

  const trees = CREATOR_COURSE_IDS
    .map(courseId => courses.find(course => course.id === courseId))
    .filter(Boolean)
    .map(course => ({
      ...course,
      correctAnswers: DEMO_CORRECT_ANSWERS[course.id],
    }))

  const forestHTML = buildForestSVG(trees)

  const selectTreeFromTarget = (target) => {
    const hitbox = target.closest?.('[data-tree-index]')
    if (!hitbox) return false

    const rawIndex = hitbox.getAttribute('data-tree-index')
    if (!/^(0|[1-9]\d*)$/.test(rawIndex ?? '')) return false

    const index = Number(rawIndex)
    if (!Number.isSafeInteger(index) || index >= trees.length) return false

    setSelectedTree(trees[index])
    return true
  }

  const handleForestClick = (event) => {
    selectTreeFromTarget(event.target)
  }

  const handleForestKeyDown = (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    if (selectTreeFromTarget(event.target)) event.preventDefault()
  }

  const selectedProgress = selectedTree
    ? Math.min((selectedTree.correctAnswers / FULL_GROWTH_TARGET) * 100, 100)
    : 0

  return (
    <div className="screen">
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <div
          aria-label="均一創作者森林"
          onClick={handleForestClick}
          onKeyDown={handleForestKeyDown}
          style={{ width: '100%', height: '100%' }}
          dangerouslySetInnerHTML={{ __html: forestHTML }}
        />

        {selectedTree && (
          <div
            role="dialog"
            aria-label={`${selectedTree.title}課程樹資訊`}
            style={{
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: 16,
              padding: 16,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.97)',
              boxShadow: '0 8px 28px rgba(35,73,42,0.2)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <button
              type="button"
              aria-label="關閉課程樹資訊"
              onClick={() => setSelectedTree(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 12,
                width: 30,
                height: 30,
                border: 0,
                borderRadius: '50%',
                background: 'var(--gray-100)',
                cursor: 'pointer',
                fontSize: 18,
              }}
            >
              ×
            </button>

            <div className="flex items-center gap-12" style={{ paddingRight: 32 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: selectedTree.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                {selectedTree.icon}
              </div>
              <div className="flex-1">
                <div className="text-small">均一教育 · 課程樹</div>
                <div className="text-title">{selectedTree.title}</div>
                <div className="text-caption">{selectedTree.subtitle}</div>
              </div>
            </div>

            <div className="flex items-center justify-between" style={{ marginTop: 14 }}>
              <span className="text-caption">延伸問題答對次數</span>
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                {selectedTree.correctAnswers.toLocaleString()} / {FULL_GROWTH_TARGET.toLocaleString()} 次
              </span>
            </div>
            <div className="progress-bar mt-8" style={{ height: 8 }}>
              <div className="fill green" style={{ width: `${selectedProgress}%` }} />
            </div>
            <div className="text-small" style={{ margin: '8px 0 14px' }}>
              修課者答對延伸問題，就能一起支持均一並讓這棵樹成長。
            </div>

            <button
              type="button"
              className="btn btn-primary"
              disabled
              aria-disabled="true"
              style={{ width: '100%', opacity: 0.55, cursor: 'not-allowed' }}
            >
              延伸問題（即將開放）
            </button>
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  )
}
