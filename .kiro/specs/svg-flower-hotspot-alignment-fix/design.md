# SVG Flower Hotspot Alignment Fix Bugfix Design

## Overview

The garden renders flowers in a `390 × 680` SVG user coordinate system but currently renders each flower's invisible hotspot as a separate absolutely positioned HTML element. The SVG derives its displayed height from its width, while the HTML layer computes vertical percentages against the full available garden container height. Whenever that container is not exactly the SVG's `390:680` aspect ratio, the two layers apply different transforms and the hotspot moves away from the flower. The current hotspot is also centered near the plot baseline rather than around the complete rendered plant.

The fix will emit each flower's transparent interaction target inside the same SVG group as the visible flower. The visible geometry and target will then share the SVG coordinate system and the browser's complete user-space-to-screen transform, including scale, clipping, and positioning. `Garden` will use delegated click handling on the SVG host to resolve the generated flower index and navigate to the existing `/flower/:videoId` route. This is a focused interaction-layer change: plot assignment, flower rendering, completion data, detail routing, empty-state rendering, and review-reminder behavior remain unchanged.

## Glossary

- **Bug_Condition (C)**: A completed item has a visible flower, and a click or tap within that flower's intended selectable region is outside the separately transformed legacy HTML hotspot.
- **Property (P)**: A flower target remains coincident with its visible flower after rendering, and selecting it navigates to the detail route for the same completed item.
- **Preservation**: Existing flower count, seeded plot assignment, flower identity, background behavior, empty state, and review-reminder navigation that must remain unchanged.
- **SVG_User_Space**: The fixed `390 × 680` coordinate system declared by the garden SVG `viewBox`.
- **SVG_Transform**: The browser-computed transform from SVG user coordinates to screen coordinates, including responsive scaling and any viewport offset.
- **Legacy_Overlay_Transform**: The current percentage conversion in `Garden.jsx`, which maps `x` against `390` and `y` against `680` but applies those percentages to an independently sized HTML container.
- **Plot**: An `{x, y}` coordinate from `PLOT_POSITIONS` in `gardenScene.js` assigned to one completed learning item by the existing seeded shuffle.
- **Flower_Target**: A transparent SVG hit region centered around the rendered plant and tagged with its position in the `flowers` array.
- **Flower_Identity**: The completed video's `videoId`, used by the existing `/flower/:videoId` route and `FlowerDetail` screen.
- **`buildGardenSVG`**: The function in `pressplay-app/src/gardenScene.js` that creates the garden scene and planted-flower SVG markup.
- **`Garden`**: The component in `pressplay-app/src/screens/Garden.jsx` that builds flower data, assigns plots, renders the SVG, and initiates flower or review navigation.

## Bug Details

### Bug Condition

The bug manifests when the garden host's available height differs from the height produced by the SVG's width and `390:680` aspect ratio, or when other layout positioning produces a transform not represented by the legacy percentage overlay. A user can then select a point on the visible plant that does not intersect its displaced fixed-pixel HTML hotspot. Even at the reference aspect ratio, the legacy center at `plot.y - 5` is biased toward the plot baseline while a bloomed flower's head is centered near `plot.y - 24` and a sprout extends upward from `plot.y - 3`.

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input containing supportedViewport, completedItems, assignedPlots,
         flowerIndex, and pointerScreenPoint
  OUTPUT: boolean

  IF flowerIndex is not an occupied index THEN
    RETURN false
  END IF

  plot := assignedPlots[flowerIndex]
  intendedRegion := SVG_Transform(
    flowerTargetRegion(plot),
    input.supportedViewport
  )
  legacyRegion := Legacy_Overlay_Transform(
    legacyHotspotRegion(plot.x, plot.y - 5, 38, 38),
    input.supportedViewport
  )

  RETURN pointerScreenPoint IN intendedRegion
         AND pointerScreenPoint NOT IN legacyRegion
END FUNCTION
```

The transform mismatch is explicit for the current markup. Given host width `Cw` and host height `Ch`, the SVG's uniform scale is `Cw / 390` and its rendered height is `680 × Cw / 390`; the legacy hotspot instead maps vertical coordinates with `Ch / 680`. The vertical mappings agree only when `Ch = 680 × Cw / 390`, before accounting for the hotspot's baseline-biased center.

### Examples

- With a `390 × 760` garden host and a flower at plot `(195, 402)`, the SVG remains `390 × 680` at the host's top. A visible bloom is around screen `y = 378–399`, while the legacy hotspot is centered near `y = 444`; clicking the bloom can therefore do nothing. The fixed target is transformed with the bloom and opens `/flower/{videoId}`.
- With a `390 × 600` garden host and a flower at plot `(335, 490)`, the SVG retains its intrinsic `680px` rendered height and is clipped by the host, while the HTML hotspot maps its center to approximately `428px`. The visible plant remains around SVG `y = 451–487`, so a click on it can miss. The fixed target occupies the same clipped SVG space as the visible plant.
- At `390 × 680`, a mature flower's head is centered near `plot.y - 24`, but the legacy `38px` hotspot is centered at `plot.y - 5`; parts of the petals are at or outside the upper edge of the hotspot. The fixed SVG target is centered around the whole plant rather than the soil baseline.
- When no completed videos exist, `buildGardenSVG` renders the existing empty-garden message and emits no flower target. Clicking the scene does not navigate.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- The garden continues to derive one flower from each entry in `completedVideos` and render it at the same seeded assigned plot.
- Flower visuals, petal state, color ordering, plot soil, scene artwork, and the empty-garden message remain unchanged.
- Selecting a flower continues to navigate through `/flower/:videoId`, with the selected completed item's exact `videoId` reaching `FlowerDetail`.
- Clicking or tapping garden background that is outside every flower target does not initiate flower-detail navigation.
- The review reminder remains a separate sibling interaction and continues to navigate to `/review-session` when due reviews exist.

**Scope:**
All inputs that do not select a rendered flower target are unaffected by this fix. This includes:
- Garden background, unoccupied plots, and decorative SVG elements
- The empty garden with no completed learning items
- Bottom navigation and the review reminder
- Flower generation, seeded plot assignment, detail-page rendering, quiz navigation, and review-state calculations

## Hypothesized Root Cause

Code inspection confirms the primary root cause and identifies one contributing geometry issue:

1. **Two Independent Coordinate Systems**: `Garden.jsx` positions HTML hotspots over SVG markup rather than placing targets in the SVG.
   - Visible flowers use `viewBox="0 0 390 680"` and are transformed by the SVG viewport.
   - Hotspots use `left: plot.x / 390` and `top: (plot.y - 5) / 680` as percentages of the full flex container.

2. **Different Vertical Sizing Rules**: `buildGardenSVG` emits `width="100%"` with no explicit height, so SVG height follows its intrinsic aspect ratio. The containing garden area uses `height: 100%` and is also constrained by the bottom navigation and viewport height.
   - The SVG and HTML overlay share a width but generally do not share a height.
   - `overflow: hidden` can clip the SVG without changing the overlay's percentage basis.

3. **Baseline-Biased Hit Geometry**: The legacy hotspot is centered at `plot.y - 5`, while `plantedFlowerG` draws from `baseY = plot.y - 3` upward.
   - A bloomed head is centered at `plot.y - 24` at scale `0.7` and petals extend farther upward.
   - A sprout has different geometry but is likewise primarily above the plot baseline.

4. **Fixed CSS-Pixel Hit Size**: The `38 × 38` HTML region does not participate in SVG scaling, so target size and visual size can diverge if the scene width is scaled.

5. **Navigation Is Not the Failure Source**: The existing route `/flower/:videoId`, `navigate(`/flower/${flower.id}`)`, and `FlowerDetail` parameter lookup are internally consistent. The defect occurs before navigation because the intended pointer event does not reach the associated HTML hotspot.

## Correctness Properties

Property 1: Bug Condition - Responsive Flower Target Alignment and Selection

_For any_ supported garden viewport, occupied assigned plot, flower growth state, and click or tap point within that flower's intended selectable region, the fixed scene SHALL transform the visible flower and its target through the same SVG transform and SHALL navigate to `/flower/{videoId}` for that exact flower.

```
FUNCTION expectedBehavior(result)
  INPUT: result containing renderedFlower, renderedTarget, selectedFlower,
         navigationPath, and pointerScreenPoint
  OUTPUT: boolean

  RETURN renderedFlower.svgTransform = renderedTarget.svgTransform
         AND pointerScreenPoint IN renderedTarget.screenRegion
         AND selectedFlower.videoId = renderedFlower.videoId
         AND navigationPath = "/flower/" + renderedFlower.videoId
END FUNCTION
```

**Validates: Requirements 2.1, 2.2**

Property 2: Preservation - Garden Content and Non-Flower Interactions

_For any_ garden state or interaction where the bug condition does not hold, the fixed garden SHALL preserve the original completed-item-to-flower and seeded-plot mapping, preserve selection identity for already working flower selections, emit no flower targets for an empty garden, avoid flower navigation from non-target areas, and keep review-reminder navigation independent.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**

## Fix Implementation

### Changes Required

Assuming the confirmed root cause remains representative when exploratory tests are run:

**File**: `pressplay-app/src/gardenScene.js`

**Functions**: `buildGardenSVG`, plus a small private target-geometry helper

**Specific Changes**:
1. **Co-locate Visual and Interactive Geometry**: For each occupied `flowers[i]` / `assignedPlots[i]` pair, emit the visible flower and its transparent target in one SVG group.
   - Tag the group or hit shape with `data-flower-index="i"`; do not interpolate `videoId` into raw SVG markup.
   - Keep the existing flower order and `assignedPlots` lookup unchanged so the index remains the authoritative bridge to React-owned flower data.

2. **Define Target Geometry in SVG User Units**: Add one named helper/constant set for the target region, centered around the plant rather than the soil baseline.
   - At the existing flower scale `0.7`, use a center approximately at `(plot.x, plot.y - 16)` and a radius of `24` SVG units, covering the sprout and mature bloom extents while retaining a practical reference-size hit area.
   - Keep target geometry in the same `390 × 680` user space as `plantedFlowerG`; do not convert to percentages or CSS pixels.
   - Emit `fill="transparent"` with an explicit pointer-events value that makes the transparent shape selectable, and a pointer cursor without altering the scene visually.

3. **Preserve Scene Semantics**: Emit a target only when the corresponding plot exists. Emit no target in the zero-flower path. Do not modify `PLOT_POSITIONS`, seeded assignment, flower drawing parameters, or empty-state text.

**File**: `pressplay-app/src/screens/Garden.jsx`

**Component**: `Garden`

**Specific Changes**:
1. **Remove the Legacy Overlay**: Delete the separate mapped absolutely positioned `<div>` hotspots and the duplicate `W`/`H` conversion constants.

2. **Delegate SVG Selection**: Attach one click handler to the element that directly hosts `gardenHTML`.
   - Resolve the nearest `data-flower-index` from the event target.
   - Reject missing, non-integer, negative, or out-of-range indices.
   - Read `flowers[index].id` from React-owned data and navigate to the existing `/flower/${id}` route.
   - Rely on the browser's normal synthesized click for tap input, avoiding separate touch and click handlers that could navigate twice.

3. **Keep Other Navigation Isolated**: Leave the review reminder outside the delegated SVG host and retain its existing `/review-session` handler. Leave `BottomNav` unchanged.

**Files with no behavioral changes required**:
- `pressplay-app/src/App.jsx`: The `/flower/:videoId` route is already correct.
- `pressplay-app/src/screens/FlowerDetail.jsx`: Existing `useParams()` identity lookup is already correct.
- `pressplay-app/src/components.css` and `pressplay-app/src/screens.css`: The robust fix does not depend on reproducing SVG layout calculations in CSS.

### Interaction and Coordinate Flow

```
completedVideos
  -> flowers[i] with id
  -> seeded assignedPlots[i]
  -> buildGardenSVG renders visible flower and target at assignedPlots[i]
  -> browser applies one SVG user-space-to-screen transform to both
  -> click/tap target exposes data-flower-index=i
  -> Garden validates i and reads flowers[i].id
  -> navigate("/flower/" + flowers[i].id)
```

This avoids manually reconstructing `preserveAspectRatio`, rendered bounds, clipping, offsets, or future CSS transforms. Any supported scaling or positioning applied to the SVG necessarily applies identically to the target.

## Testing Strategy

### Validation Approach

Validation follows two phases: first capture counterexamples against the unfixed separate-overlay implementation, then run the same scenarios against the SVG-integrated target implementation and add preservation checks. The project currently defines only Vite build/preview scripts and no test runner, so implementation should add or use an approved single-run DOM-capable test harness before these automated checks are written; tests must not rely on a watch process.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples before changing production code, quantify the coordinate divergence, and confirm that the delegated navigation route itself is not defective. If the failures do not track the independent transforms, revisit the root-cause hypothesis before implementation.

**Test Plan**: Render `Garden` with controlled `completedVideos`, deterministic plot assignments, a mocked `getDueReviews`, and a navigation-capable memory router. Set multiple garden-host bounds, inspect the SVG/client geometry and legacy hotspot geometry, and dispatch clicks at visible flower coordinates.

**Test Cases**:
1. **Tall Host Counterexample**: At `390 × 760`, click the visible flower assigned near `(195, 402)` and demonstrate that the unfixed hotspot is lower and navigation is absent.
2. **Short Host Counterexample**: At `390 × 600`, click a lower visible flower and demonstrate that the unfixed hotspot is above the flower.
3. **Baseline Geometry Counterexample**: At the reference `390 × 680` ratio, click the upper petal area of a mature bloom that lies outside the baseline-centered legacy target.
4. **Edge Plot Counterexample**: Select flowers at leftmost/rightmost plots and confirm clipping and viewport positioning do not create a second coordinate basis.

**Expected Counterexamples**:
- A point inside the transformed visual/intended flower region is outside the legacy HTML hotspot.
- A dispatched click at that point does not change the route, while directly clicking the displaced legacy hotspot does.
- Offset magnitude changes with host height, supporting the independent-transform diagnosis.

### Fix Checking

**Goal**: Verify that every input satisfying the bug condition produces aligned interaction geometry and exact flower navigation.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := renderAndSelectFixedGarden(input)
  ASSERT expectedBehavior(result)
END FOR
```

Generate supported viewport sizes, occupied plots (including boundary plots), sprout/mature petal counts, and flower indices. Assert that both visual and target inherit the same SVG transform, a click in the target resolves the expected index, and the route ends in the corresponding `videoId`.

### Preservation Checking

**Goal**: Verify that inputs outside the bug condition retain the observable behavior of the unfixed garden.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  original := observePreservedGardenBehavior(input)
  fixed := observeFixedGardenBehavior(input)
  ASSERT preservedProjection(original) = preservedProjection(fixed)
END FOR
```

`preservedProjection` compares flower count, flower-to-plot assignment, visible scene markup excluding the intentionally changed target markup, selected identity for previously working selections, navigation outcome for background/review actions, and empty-state output.

**Testing Approach**: Property-based generation is appropriate because viewport dimensions, plot positions, flower counts, growth states, and pointer locations form a broad cross-product. Constrain generated flower counts to available plots and generate background points outside the union of target circles.

**Test Cases**:
1. **Rendering Preservation**: For generated completed-item arrays, compare visible flower count, petal/color inputs, and seeded assigned plots before and after the fix.
2. **Identity Preservation**: Select every generated occupied target and assert its index resolves to the same `videoId`, including shuffled plot assignments.
3. **Background Preservation**: Click decorative regions and unoccupied plots outside all target circles and assert no `/flower/` navigation.
4. **Empty-State Preservation**: With no completed items, assert the existing prompt remains, there are zero `data-flower-index` targets, and scene clicks do not navigate.
5. **Review Preservation**: With due reviews, click the reminder and assert exactly one navigation to `/review-session`, never a flower route.

### Unit Tests

- Test the target-geometry helper for representative sprout and mature flower bounds, including left/right edge plots.
- Test `buildGardenSVG` emits exactly one valid indexed target per rendered flower and none for missing plots or an empty flower list.
- Test delegated index parsing rejects background targets and malformed/out-of-range values, while valid values navigate to the exact flower route.

### Property-Based Tests

- Generate host dimensions and assigned plots; verify each visible flower and target share one SVG transform and the target contains the intended plant selection region after transformation.
- Generate distinct flower IDs, flower counts within plot capacity, and seeded assignments; verify one-to-one rendering and exact selected identity.
- Generate pointer points outside all target regions; verify no flower-detail navigation, including in empty-garden states.

### Integration Tests

- Render `Garden` through a memory router at short, reference, and tall viewport heights; click/tap visible sprout and mature flowers and assert `FlowerDetail` receives the selected `videoId`.
- Exercise multiple flowers after the seeded shuffle to ensure adjacent and edge targets never route to the wrong completed item.
- Verify the full empty-garden and due-review flows: no flower targets when empty, background inertness, and independent `/review-session` navigation.

### Build Validation

After implementation and tests, run the test suite once (non-watch mode) and run `npm run build` in `pressplay-app` to catch JSX, SVG-string, and bundling regressions.