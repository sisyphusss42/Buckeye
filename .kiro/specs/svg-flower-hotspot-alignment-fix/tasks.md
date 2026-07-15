# Implementation Plan

- [x] 1. Write the bug condition exploration property test
  - **Property 1: Bug Condition** - Responsive Flower Target Alignment and Selection
  - **CRITICAL**: Write and run this property-based test before changing `gardenScene.js` or `Garden.jsx`; it MUST fail on the unfixed code, and the failure confirms the bug exists.
  - Establish an approved DOM-capable, property-based test harness and a single-run test script because the project currently has no test runner; do not configure or invoke watch mode.
  - Model `isBugCondition(input)` from the design: the flower index is occupied, the pointer point is inside `SVG_Transform(flowerTargetRegion(plot), supportedViewport)`, and the same point is outside `Legacy_Overlay_Transform(legacyHotspotRegion(plot.x, plot.y - 5, 38, 38), supportedViewport)`.
  - Generate supported host dimensions, occupied flower indices, assigned plots including edge plots, sprout and mature growth states, and selectable points within the intended target region.
  - Scope deterministic regressions to the documented `390 × 760`, `390 × 600`, and `390 × 680` counterexamples so the unfixed failure is reproducible even if broader generated cases are minimized.
  - Assert the expected behavior from the design: the visible flower and target share the same SVG transform, the selected flower keeps the rendered flower's `videoId`, and selection navigates to `/flower/{videoId}`.
  - Where DOM hit-testing cannot be represented reliably, use focused markup/geometry assertions to prove the target is inside the flower's SVG group and a routed component test to prove exact identity navigation.
  - Run the test once on the unfixed code, expect FAILURE, and document minimized counterexamples and observed transform/geometry offsets; do not fix the test or production code in this task.
  - _Requirements: 1.1, 1.2, 2.1, 2.2_

- [x] 2. Write preservation property and focused regression tests before the fix
  - **Property 2: Preservation** - Garden Content and Non-Flower Interactions
  - **IMPORTANT**: Follow the observation-first methodology on the unfixed code and complete this standalone task before implementation.
  - Observe and record the current visible flower count, seeded completed-item-to-plot mapping, petal/color inputs, successful existing hotspot-to-`videoId` navigation, background behavior, empty-garden output, and review-reminder navigation.
  - Generate completed-item arrays up to plot capacity, distinct flower IDs, growth states, seeded assignments, and pointer locations outside selectable regions; compare the observed preservation projection across these cases.
  - Add focused checks that `buildGardenSVG` renders one visible flower per valid occupied plot without changing visual inputs, preserves the existing empty-state prompt, and renders no flower interaction targets for an empty or missing-plot entry.
  - Add routed `Garden` checks that previously working flower selections resolve to the same completed item's exact `videoId`, malformed/background selections do not produce a `/flower/` navigation, and the review reminder produces exactly one `/review-session` navigation independently of the garden host.
  - Run these tests once on the unfixed code and confirm they PASS, establishing the baseline that the fix must preserve.
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ] 3. Replace the detached hotspot layer with validated SVG-integrated flower selection

  - [x] 3.1 Emit flower interaction targets in SVG user space
    - In `pressplay-app/src/gardenScene.js`, add a small named target-geometry helper or constants using SVG user units, centered approximately at `(plot.x, plot.y - 16)` with radius `24` so the target covers sprout and mature plant extents.
    - For each valid `flowers[i]` and `assignedPlots[i]` pair, emit the visible flower and one transparent selectable shape in the same SVG group, with `data-flower-index="i"`, explicit pointer-event behavior, and a pointer cursor.
    - Keep the index as the bridge to React-owned flower data; do not interpolate `videoId` into raw SVG markup.
    - Preserve flower order, seeded plot lookup, visual flower geometry, scene artwork, and empty-state text; emit no target when the plot is missing or the garden is empty.
    - _Bug_Condition: `isBugCondition(input)` where an occupied flower's intended SVG-transformed region is not covered by the independently transformed legacy HTML hotspot_
    - _Expected_Behavior: `expectedBehavior(result)` requires the visible flower and target to share the SVG transform and the target to contain the intended pointer point_
    - _Preservation: Preserve completed-item count and seeded plot mapping, flower visuals, empty-state behavior, and non-target scene behavior from the design_
    - _Requirements: 1.1, 1.2, 2.1, 3.1, 3.3, 3.4_

  - [x] 3.2 Delegate validated target navigation from the SVG host
    - In `pressplay-app/src/screens/Garden.jsx`, remove the mapped absolute HTML hotspots and the duplicate `W`/`H` percentage conversion constants.
    - Attach one click handler to the element that directly hosts `gardenHTML`; resolve the nearest `data-flower-index` from the event target.
    - Reject missing, malformed, non-integer, negative, and out-of-range indices before reading flower data or navigating.
    - For a valid index, read `flowers[index].id` from React-owned data and navigate exactly once to `/flower/${flowers[index].id}`; rely on the browser's synthesized click for tap support rather than adding a duplicate touch handler.
    - Keep the review reminder outside the delegated SVG host and leave its `/review-session` behavior and `BottomNav` unchanged.
    - _Bug_Condition: `isBugCondition(input)` where a click or tap lands on an occupied flower's intended SVG region but misses the detached legacy hotspot_
    - _Expected_Behavior: `expectedBehavior(result)` requires `selectedFlower.videoId = renderedFlower.videoId` and `navigationPath = "/flower/" + renderedFlower.videoId`_
    - _Preservation: Preserve exact flower identity, inert background/unoccupied plots, empty-garden behavior, and independent review navigation from the design_
    - _Requirements: 1.2, 2.1, 2.2, 3.2, 3.3, 3.4, 3.5_

  - [x] 3.3 Verify the original bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Responsive Flower Target Alignment and Selection
    - **IMPORTANT**: Re-run the same property test and deterministic counterexamples from task 1; do not replace them with a new test.
    - Confirm short, reference, tall, and edge-plot cases use one SVG transform for visual and target geometry and route to the exact selected `videoId`.
    - **EXPECTED OUTCOME**: The test PASSES, confirming all exercised bug-condition inputs now satisfy the expected behavior.
    - _Requirements: 2.1, 2.2_

  - [~] 3.4 Verify the preservation property tests still pass
    - **Property 2: Preservation** - Garden Content and Non-Flower Interactions
    - **IMPORTANT**: Re-run the same observation-based tests from task 2; do not replace them with new post-fix assumptions.
    - Confirm flower count and seeded plot identity remain stable, valid selection preserves `videoId`, background and malformed targets remain inert, the empty garden emits no targets, and the review reminder still navigates exactly once to `/review-session`.
    - **EXPECTED OUTCOME**: The tests PASS, confirming the fix introduces no regressions in preserved behavior.
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [~] 4. Checkpoint - run all validation once without watch mode
  - Run the configured test suite in explicit single-run mode (for example, `npm test -- --run` when the selected runner supports `--run`); do not start a development server, preview server, or test watcher.
  - Run `npm run build` from `pressplay-app` to validate JSX, generated SVG markup, and production bundling.
  - Ensure the complete test suite and build pass; if any failures remain, resolve them before marking the checkpoint complete and ask the user if specification questions arise.
  - _Requirements: 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5_
