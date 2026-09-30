# Critical review prompts

Use these prompts with the project source and rendered frames. A review is evidence-led: cite exact scene and timestamp for each finding, distinguish visible defects from source-code concerns, and do not claim a render or measurement was performed unless it was.

## Storyboard review prompt

Review the seven-scene storyboard as one short typographic film. Pull and inspect frames across every scene, especially each handoff. Evaluate whether the narrative develops clearly, pacing and contrast vary intentionally, the type hierarchy reads at presentation size, and each transition carries visual or semantic continuity into the next scene. Return ranked problems, each with scene and timestamp, observable evidence, impact, and a concrete proposed correction. Also note important strengths and any uncertainty. Do not infer unseen frames or unverified output.

## Component review prompt

Review the seven scene components and their shared tokens, styles, and timeline integration. Inspect the actual source and pull frames at representative times, including entry, middle, exit, and handoff states. Check legibility, alignment, spacing, motion, clipping, contrast, consistent brand language, deterministic time behavior, and whether each component hands off cleanly. Rank only actionable problems, citing scene and timestamp/frame evidence; distinguish visual findings from code risks. Do not claim a fix or test succeeded without evidence.

## Full-film review prompt

Pull and inspect frames from the complete assembled film from beginning to end, including all seven scenes and every transition. Assess the film as a whole: opening, narrative arc, rhythm, coherence, visual variety, typography, continuity, ending, and any technical defects visible in the frames. Rank problems by severity and include exact timestamps, evidence, and a specific next action. Report strengths and remaining uncertainties separately. Do not rely on a summary or inspect only selected scenes; do not invent what is not visible.

## Fresh-critic verification protocol

1. Start a fresh, independent critic with the current project/revision and the review scope. Never tell the critic what was fixed, what changed, or what findings to expect; do not provide a change list or prior ledger as priming.
2. The critic pulls and inspects their own frames from the current render/source. Do not select frames for them or substitute descriptions for visual inspection. If a render is unavailable, label the review blocked/unverified rather than pretending it was inspected.
3. Require a ranked list of problems with exact scene and timestamp, evidence, severity, and a concrete recommendation. Record strengths and uncertainty separately.
4. Compare the fresh findings against prior ledger entries only after the blind review is complete. For each prior finding, mark fixed, partial, or still-there and record measurable before/after values when available; use “not measured” rather than inventing numbers.
5. End the review with exactly one disposition: **ship** or **one more pass**. If unresolved ranked problems remain, say what the next pass must address.

## Review ledger

| round | finding (timestamp) | verdict (fixed/partial/still-there) | numbers before | numbers after |
|---|---|---|---|---|
