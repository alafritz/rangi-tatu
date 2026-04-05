---
name: design-fidelity-check
description: >-
  Validates visual fidelity after implementing UI from any design source.
  Use when building UI from Figma screenshots, design mockups, wireframes,
  or any visual reference — triggers on "implement design", "build from
  Figma", "match this design", "prototype from design", "port this design",
  "build this UI", or whenever a design screenshot or Figma URL is provided.
  Automatically runs a screenshot-and-compare loop via sub-agent to catch
  and fix visual discrepancies.
---

# Design Fidelity Check

After building UI from a design reference (Figma screenshot, mockup, wireframe,
or any visual), run an iterative screenshot-and-compare loop to ensure the
implementation matches the original design.

## When This Applies

Activates whenever UI is implemented from a visual reference:
- User provides a Figma screenshot or URL
- User provides any design image, mockup, or wireframe
- User asks to "build", "implement", "port", or "prototype" a design
- User asks to match a visual reference

## Workflow

### 1. Build the Implementation

Implement the design as requested. Once functionally complete and ready for
visual review, proceed to step 2.

### 2. Save the Original Design Reference

Ensure the original design image is accessible on disk before launching the
comparison sub-agent. If the user provided an image inline, save it to a known
path (e.g., `/tmp/design-reference.png`). If a Figma URL was provided, use the
Figma MCP screenshot as the reference.

### 3. Launch a Fidelity Check Sub-Agent

**CRITICAL**: Always run the comparison in a sub-agent (using the `Task` tool)
to preserve the main context window.

Launch with `subagent_type="generalPurpose"` and include:
- The prototype URL (start the dev server first if needed)
- The path to the design reference image
- Instructions to use `agent-browser` to screenshot the prototype
- A comparison checklist: layout/spacing, typography, colors, component
  structure, icons/images, border-radius/shadows
- A structured report format with severity levels (Critical / Medium / Minor)

The sub-agent returns a text fidelity report — it does not fix anything itself.

### 4. Apply Fixes from the Report

Read the report. Fix each issue by severity: Critical → Medium → Minor.

### 5. Repeat Until Matched

After fixing, launch a **new** fidelity check sub-agent to verify.

**Exit conditions:**
- Report says "Overall Match: Excellent"
- OR all remaining issues are Minor and pixel-perfection wasn't requested
- OR 3 iterations completed — present the latest report and ask the user
