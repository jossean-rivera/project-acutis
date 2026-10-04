# Aristotelian path: content and completion plan

Implemented October 4, 2026. The path remains **in progress**. Only “Change is real” has an explorable explanation. Understanding and acceptance are recorded separately. The app records acceptance only when the visitor explicitly selects “I accept”; it never infers agreement from a visit, animation, or understanding control.

## First-premise presentation

The opening fills the first viewport with “Change is real” and the subtitle “Change is the actualization of a potential.” Selecting “I accept” saves acceptance in this browser and changes the same button to “Continue.” Continuing is a separate action that opens the unfinished actualizer screen. An Undo control withdraws acceptance, without changing the separate understanding state. If storage is unavailable, acceptance remains usable for the current visit and the page explains that limitation.

“Go deeper” scrolls to collapsible definitions of potential and actual, followed by “How we know this premise is true?” Expanding that section reveals three independently expandable supporting routes. Everyday experience contains the coffee animation; inner experience contains the feelings animation; denying change contains the Suppose / Then / Notice sequence and its conditional challenge. Everything stays on the premise page. The argument outline and its in-progress status remain below the exploration and on the subsequent pages.

## Source provenance

Read from the Project Acutis Notion workspace:

- [Aristotelian Proof](https://www.notion.so/3ee1393f430a80b898ebf7bd4bdb2062), last edited October 3, 2026: lists the first and second premises.
- [1) Change is real](https://www.notion.so/3ee1393f430a8062b361e1a3c59a4fd2), last edited October 3, 2026: potential/actuality definitions, cooling coffee, inner experience, and an argument from moving from uncertainty to denial.
- [2) Change requires an actualizer](https://www.notion.so/3ee1393f430a8069844cc1ec47c71518), last edited October 3, 2026: blank. No explanation to import. No conclusion appeared in the parent page.

The app uses edited paraphrases, not purported quotations. Coffee and emotion examples are contemporary project illustrations. The spilled-coffee branch comes from the implementation request. Notion pages were read, not modified.

Primary texts read for definitions:

- Aristotle, [Physics III.1](https://classics.mit.edu/Aristotle/physics.3.iii.html), 201a10–201b15; R. P. Hardie and R. K. Gaye translation. Distinguishes the process of actualization from its completed result.
- Aristotle, [Metaphysics IX.6](https://classics.mit.edu/Aristotle/metaphysics.9.ix.html), 1048a25–1048b9; W. D. Ross translation. Explains actuality and potentiality by examples and analogy.

## Editorial qualifications

- The premise is existential: **at least some change occurs**, not “everything changes.”
- “A potential becoming actual” is introductory shorthand. The actuality section explains the significance of the process itself in Aristotle's fuller account.
- A real capacity is not just any imaginable possibility. The dotted branches describe different conditions; they are not probabilities, simultaneous promises, or mutually exclusive outcomes.
- Coffee left in a cooler room approaches room temperature. “Cold” here is everyday language relative to its initial heat, not freezing. The animation compresses time and uses a schematic endpoint; it is not a numerical heat-transfer simulation.
- The external-world route provisionally trusts perception and memory.
- The inner-experience route still requires recognizing an actual succession of states. The existence of a thinker alone does not prove mental change. The app does not attribute the notes' mental-change reasoning to Descartes or invent a Cartesian citation.
- The denial route is conditional: granting a real transition from uncertainty to certainty conflicts with denying all change. It does not refute a skeptic who also denies that transition, nor does it settle every theory of time.
- These three routes support the starting premise. They are not three jointly necessary premises, and their presentation order is not a dependency claim.

## Unfinished screens and release gate

Premise two uses the same full-viewport title, subtitle, “Go deeper” scroll control, and disclosure styling as premise one. Its opening explicitly marks the explanation as in progress. Below it, the existing research requirements and primary-source starting points are expandable; the argument outline follows them. Desktop/mobile layout and keyboard disclosure operation were checked, and the build passed.

The actualizer and conclusion screens expose the content checklist below. Their primary links are explicitly research starting points, not citations for a completed argument. Do not remove the in-progress label until a reviewed explanation, objection treatment, and passage-level source mapping exist for each inference.

### Actualizer premise

1. Formulate the principle with its “in the same respect” qualification. Define actualizer without implying consciousness, an external push, or merely a temporal predecessor.
2. Supply a reason why potentiality as such cannot actualize itself; explain what is already actual in a worked case. The coffee observation alone is insufficient for a universal principle.
3. Address self-motion, internal causes, spontaneous processes, and objections to universal causal claims. Do not substitute outdated physics for metaphysical argument.
4. Assess Aristotle's [Physics VIII.4–5](https://classics.mit.edu/Aristotle/physics.8.viii.html) and [Metaphysics IX.8](https://classics.mit.edu/Aristotle/metaphysics.9.ix.html), alongside Aquinas's [Summa theologiae I, q. 2, a. 3, First Way](https://www.newadvent.org/summa/1002.htm#article3). Identify the exact supporting passages and the reconstruction's departures from them.

### Conclusion and intervening argument

1. Choose the formulation: Aristotle's own argument, Aquinas's First Way, or a modern Aristotelian reconstruction. This is unresolved.
2. Add all intervening premises, distinguish the type of causal series involved, and argue for any restriction on regress. Do not infer God from only the initial two premises.
3. Justify the proposed first actualizer and, separately, each attribute claimed of it. The identification with God needs an explicit argument.
4. Examine regress and explanatory objections charitably; mark contested premises.
5. Assess [Physics VIII.5–6](https://classics.mit.edu/Aristotle/physics.8.viii.html), [Metaphysics XII.6–7](https://classics.mit.edu/Aristotle/metaphysics.12.xii.html), and Aquinas's First Way. Build a dependency map tied to passages, rather than treating reading order as a proof.

## Implementation and verification guide

- Hash routes support static hosting, direct links, refresh, and browser history without server rewrites.
- Older `/1/deeper` links render the premise page and expand/focus the corresponding section. New exploration uses disclosure buttons without changing the URL.
- Sections begin collapsed. Closing a section returns focus to its trigger. Nested expansion choices survive closing/reopening the parent during the visit. Hidden illustrations unmount, stopping playback while retaining their progress. Understanding persists separately from acceptance in local storage, with a graceful fallback when storage is unavailable.
- Both animations are initiated by the visitor, run once, can be paused/replayed, and have keyboard-operable range controls. Reduced-motion users receive immediate state changes, and the existing global media query disables decorative animation.
- The SVGs use accessible titles/descriptions; text repeats the essential state and labels. Color is not the only signal: dotted/solid paths and written labels distinguish potential and actual.
- Check: build; disclosure keyboard operation; definitions and all three supporting routes; both illustration controls; legacy deep links; closing/reopening sections; pending screens; narrow-screen layout; reduced-motion behavior.

### Initial verification on October 4, 2026 (before the collapsible redesign)

- `npm run build` and `git diff --check` passed.
- Browser checks passed for catalog entry, all deeper routes, both pending screens, a direct-route reload, back/forward navigation, return focus, and the existing Socrates expansion.
- Both animations started and paused; keyboard End selected their final states. The coffee outcome buttons updated the explanation. Understanding persisted across reload and was then reset after testing.
- Inspected 390px and 320px layouts; document width matched viewport width at both sizes. Section navigation scrolls horizontally on narrow screens.
- No browser warning/error logs were reported during the checked flows.
- Reduced-motion branching and the global CSS media rule were reviewed in code; the browser's operating-system motion preference was not changed during testing.

### Collapsible redesign verification

- Build and whitespace checks passed. Browser warning/error log was empty.
- Reload starts with collapsed definitions and reasons. Keyboard Enter expanded the potential definition; all three supporting sections expanded in place without changing the URL.
- Coffee and emotion sliders accepted keyboard End. Closing/reopening the inner route retained its final illustration state. The denial sequence and expandable reply rendered correctly.
- An older `/1/deeper/mind` link expanded and focused the inner-experience section on the premise page.
- Checked a 390px viewport override (354 CSS pixels at the browser's current zoom); document width matched viewport width. Restored the normal viewport and visually checked the final section layout.
