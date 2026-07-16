# Bugfix Requirements Document

## Introduction

The garden presents completed learning items as rendered flowers that users can select to open the corresponding flower detail page. The invisible interactive area can be displaced from its rendered flower when the garden is displayed at dimensions that scale or position the scene differently from the interaction layer. This bugfix ensures that every flower remains reliably selectable through an interaction area aligned with that flower, without changing garden content, flower identity, or unrelated interactions.

## Bug Analysis

### Current Behavior (Defect)

The interactive area and the visible flower can occupy different on-screen positions.

1.1 WHEN the rendered garden is scaled or positioned differently because of the available display dimensions THEN the system places an interactive flower hotspot offset from its corresponding visible flower.

1.2 WHEN a user clicks or taps the intended selectable area of a visible flower while its hotspot is offset THEN the system fails to open the detail page for that flower.

### Expected Behavior (Correct)

Each flower's selectable area must track the flower's actual rendered position.

2.1 WHEN the rendered garden is scaled or positioned for any supported display dimensions THEN the system SHALL align each interactive flower hotspot with its corresponding visible flower.

2.2 WHEN a user clicks or taps the intended selectable area of any visible flower THEN the system SHALL open the detail page associated with that specific flower.

### Unchanged Behavior (Regression Prevention)

Garden content and interactions outside the alignment defect must remain stable.

3.1 WHEN completed learning items are shown in the garden THEN the system SHALL CONTINUE TO render one corresponding flower for each item at its assigned garden plot.

3.2 WHEN a user selects a flower through its aligned hotspot THEN the system SHALL CONTINUE TO preserve that flower's identity and open the detail page for the same completed learning item.

3.3 WHEN a user interacts with garden areas that contain no flower hotspot THEN the system SHALL CONTINUE TO avoid initiating flower-detail navigation.

3.4 WHEN the garden has no completed learning items THEN the system SHALL CONTINUE TO display the empty-garden state without flower hotspots.

3.5 WHEN the review reminder is available and the user selects it THEN the system SHALL CONTINUE TO open the review session independently of flower selection.
