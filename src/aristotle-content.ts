export const premiseNotes = 'https://www.notion.so/3ee1393f430a8062b361e1a3c59a4fd2'

export const sources = {
  physics: { title: 'Aristotle · Physics III.1', detail: '201a10–201b15 · Motion, potentiality, and the process of actualization. Trans. R. P. Hardie & R. K. Gaye.', url: 'https://classics.mit.edu/Aristotle/physics.3.iii.html' },
  metaphysics: { title: 'Aristotle · Metaphysics IX.6', detail: '1048a25–1048b9 · Actuality and potentiality explained through examples. Trans. W. D. Ross.', url: 'https://classics.mit.edu/Aristotle/metaphysics.9.ix.html' },
}

export const deepPoints = [
  { id: 'experience', number: '01', title: 'Everyday experience', subtitle: 'A cup of coffee does not stay hot.', kind: 'Observation', summary: 'Begin with a familiar thing becoming different, and examine the trust we place in perception.' },
  { id: 'mind', number: '02', title: 'Our inner experience', subtitle: 'Anger gives way to peace.', kind: 'Reflection', summary: 'Consider changes in thought and emotion, even while questioning the world outside the mind.' },
  { id: 'denial', number: '03', title: 'Can we deny change?', subtitle: 'What happens when we reach a conclusion?', kind: 'Reasoning', summary: 'Test the tension between a transition in thought and the claim that nothing ever changes.' },
] as const

export const actualizerNeeds = [
  { title: 'State the principle precisely', text: 'Explain why a potential, precisely as potential, cannot actualize itself; specify “in the same respect.” Distinguish an actualizer from a conscious agent and from something merely earlier in time.' },
  { title: 'Give the missing argument', text: 'Explain why an actual factor is required, using a worked example. Observing coffee cool does not, by itself, establish a universal causal principle.' },
  { title: 'Address the contested cases', text: 'Treat apparent self-motion, internal causes, spontaneous processes, and objections to universal causal claims. Separate the metaphysical proposal from any particular physical model.' },
  { title: 'Attach passage-level references', text: 'Read and assess Aristotle’s Physics VIII.4–5 and Metaphysics IX.8; compare Aquinas’s Summa theologiae I, q. 2, a. 3 (First Way). Explain where the chosen formulation follows or develops these texts.' },
]

export const conclusionNeeds = [
  { title: 'Supply the intervening premises', text: 'Specify the relevant kind of causal dependence and argue for any restriction on regress. Explain how the proposed first actualizer follows. The first two premises alone do not establish God’s existence.' },
  { title: 'Distinguish the traditions', text: 'Choose and state the argument’s formulation. Aristotle’s unmoved mover, Aquinas’s First Way, and a modern Aristotelian reconstruction should not be presented as an identical argument.' },
  { title: 'Justify each further attribute', text: 'If the conclusion claims pure actuality, unity, immateriality, intellect, or identification with God, provide the separate reasoning needed for each claim and engage objections.' },
  { title: 'Build a sourced dependency map', text: 'Review Physics VIII.5–6, Metaphysics XII.6–7, and Summa theologiae I, q. 2, a. 3. Tie each inference to its premises and relevant passages; distinguish logical dependence from reading order.' },
]

export const researchSources = [
  { title: 'Aristotle · Physics VIII.4–6', url: 'https://classics.mit.edu/Aristotle/physics.8.viii.html' },
  { title: 'Aristotle · Metaphysics IX.8', url: sources.metaphysics.url },
  { title: 'Aristotle · Metaphysics XII.6–7', url: 'https://classics.mit.edu/Aristotle/metaphysics.12.xii.html' },
  { title: 'Aquinas · Summa theologiae I, q. 2, a. 3', url: 'https://www.newadvent.org/summa/1002.htm#article3' },
]
