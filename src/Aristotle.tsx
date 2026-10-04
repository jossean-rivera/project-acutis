import { useEffect, useRef, useState } from 'react'
import { CoffeeExplorer, MindExplorer, useReducedMotion } from './ChangeIllustrations'
import { actualizerNeeds, conclusionNeeds, deepPoints, premiseNotes, researchSources, sources } from './aristotle-content'

const root = '#aristotle/1'
const deeper = `${root}/deeper`
const storageKey = 'acutis.aristotle.understanding.v1'
const acceptanceKey = 'acutis.aristotle.acceptance.v1'
const knownRoutes = [root, deeper, `${deeper}/potential`, ...deepPoints.map(point => `${deeper}/${point.id}`), '#aristotle/2', '#aristotle/conclusion']

function readUnderstanding(): boolean {
  try { return localStorage.getItem(storageKey) === 'true' } catch { return false }
}

function readAcceptance(): boolean {
  try { return localStorage.getItem(acceptanceKey) === 'true' } catch { return false }
}

function SourceNotes({ compact = false }: { compact?: boolean }) {
  return <aside className={`source-notes ${compact ? 'compact' : ''}`} aria-label="Sources and editorial notes">
    <p className="mini-label">Read the primary texts</p>
    <div>{Object.values(sources).map(source => <a href={source.url} key={source.title} target="_blank" rel="noreferrer"><span>{source.title} ↗</span><small>{source.detail}</small></a>)}</div>
    <p>The examples and three routes of exploration adapt the <a href={premiseNotes} target="_blank" rel="noreferrer">Project Acutis notes of October 3, 2026 ↗</a>. They are modern illustrations, not Aristotle’s examples or quotations. The reflection on mental change and the denial argument are project reasoning, not passages from these texts.</p>
  </aside>
}

function Note({ title, children, level = 'h5' }: { title: string; children: React.ReactNode; level?: 'h4' | 'h5' }) {
  const Heading = level
  return <aside className="reason-note"><Heading>{title}</Heading><div>{children}</div></aside>
}

function Disclosure({ id, title, open, onToggle, nested = false, children }: {
  id: string; title: string; open: boolean; onToggle: () => void; nested?: boolean; children: React.ReactNode
}) {
  const trigger = useRef<HTMLButtonElement>(null)
  const Heading = nested ? 'h4' : 'h3'
  return <section className={`premise-disclosure${nested ? ' nested-disclosure' : ''}${open ? ' is-expanded' : ''}`}>
    <Heading><button ref={trigger} id={`premise-${id}`} aria-expanded={open} aria-controls={`content-${id}`} onClick={onToggle}>
      <span>{title}</span><span className="disclosure-symbol" aria-hidden="true">{open ? '−' : '+'}</span>
    </button></Heading>
    <div id={`content-${id}`} hidden={!open} role="region" aria-labelledby={`premise-${id}`}>
      {open && <div className="disclosure-content">{children}<button className="close-disclosure" onClick={() => { onToggle(); trigger.current?.focus() }} aria-label={`Close ${title}`}>Close section <span aria-hidden="true">↑</span></button></div>}
    </div>
  </section>
}

function PotentialDefinition() {
  return <div className="reading-prose">
    <p>A potential is a real capacity in something to be otherwise or to perform an activity, under appropriate conditions. Hot coffee can become cooler; a person can come to understand an unfamiliar idea.</p>
    <p>Calling something potential does not mean that anything whatsoever could happen to it. Nor does having a capacity guarantee that it will be realized.</p>
  </div>
}

function ActualDefinition() {
  return <>
    <div className="reading-prose">
      <p>An actual is a realized state or activity: what a thing is or does in reality. The coffee is actually hot now. If it becomes cool, being cool is then actual. This is what we mean by actuality.</p>
      <p>The coffee does not have to become “real” for the first time: it was already real, with an unrealized capacity to be cooler.</p>
    </div>
    <div className="concept-equation"><div><small>Actually hot</small><strong>Can be cooler</strong></div><span aria-hidden="true">→</span><div><small>Changing</small><strong>Cooling</strong></div><span aria-hidden="true">→</span><div><small>Actually cooler</small><strong>Capacity realized</strong></div></div>
    <Note level="h4" title="The process matters, too"><p>“A potential becoming actual” is our introductory shorthand. In <a href={sources.physics.url} target="_blank" rel="noreferrer">Physics III.1</a>, Aristotle defines motion through the actuality of what is potential, insofar as it is potential. Cooling is the unfolding process; the cooler state is its result. The definition is subtler than a jump between two still images.</p></Note>
    <div className="reading-prose"><h4>In the same respect</h4><p>Coffee can be actually hot and potentially cool at the same moment. That does not say it is already both hot and cold in the same respect.</p><h4>Occurrence and explanation are different questions</h4><p>We can first recognize that the coffee changes, then ask whether potential and actuality provide the right account of that change. Someone may grant the occurrence while questioning this philosophical framework.</p></div>
  </>
}

function ExperienceContent() {
  return <>
    <p className="section-introduction">Set a hot cup of coffee on a table in a cooler room. Later, it is no longer hot. The same coffee has become different.</p>
    <CoffeeExplorer />
    <div className="reading-prose"><h5>What does this establish?</h5><p>We encounter a difference across time in a persisting thing: the coffee was hot, and is later cooler. If that observation is reliable, at least one real change has occurred. We do not need to show that everything changes to support this premise.</p><h5>What are we relying on?</h5><p>This route provisionally trusts ordinary perception and memory. Our senses sometimes mislead us, so one appearance need not settle a case. Repeated observation and measurement can strengthen the example, but they do not answer every radical doubt about the external world.</p></div>
    <Note title="What if our senses mislead us?"><p>That is a reason to examine this route’s assumption. It need not end the exploration: the next route asks about a transition in experience itself, such as moving from anger to peace.</p></Note>
    <div className="reading-prose"><h5>What has not been proved?</h5><p>The example illustrates change; it does not yet demonstrate that every change requires an actualizer, rule out a causal regress, or establish a divine cause. Those claims require their own explanations.</p></div>
  </>
}

function MindContent() {
  return <>
    <p className="section-introduction">Consider a moment when anger settled into peace, or an unfamiliar idea began to make sense.</p>
    <MindExplorer />
    <div className="reading-prose"><h5>What changes within experience?</h5><p>A person who was angry may later feel peaceful. Someone who was confused may come to understand. If these are real transitions, then change occurs at least within conscious experience, whatever account we give of the mind.</p><h5>Does this depend on the coffee being real?</h5><p>The route does not begin by assuming that the world is exactly as it appears. Even if an external event is misperceived, there can still be a change in how it is experienced. The key claim is that experience itself undergoes a transition.</p></div>
    <Note title="The scope of this argument"><p>Being aware now does not, on its own, prove that any earlier mental state existed. Recognizing a transition also involves awareness of succession or memory. A skeptic may challenge that recognition. The notes’ appeal to the thinking mind motivates this route; the existence of thought alone is not enough to establish change.</p></Note>
    <div className="reading-prose"><h5>Keep the conclusion modest</h5><p>If an actual transition in thought or feeling is acknowledged, “no change occurs anywhere” cannot be true. This does not yet settle the nature of time, the relation of mind and body, or the cause of that transition.</p></div>
  </>
}

function DenialContent() {
  const [revealed, setRevealed] = useState(false)
  return <>
    <p className="section-introduction">Change can be proven by contradiction. Suppose someone moves from uncertainty about change to certainty that no change ever occurs.</p>
    <ol className="reasoning-sequence"><li><span>Suppose</span><h5>“I am unsure whether change is real.”</h5><p>The person begins in a state of uncertainty.</p></li><li><span>Then</span><h5>“I have concluded that change is unreal.”</h5><p>They reason toward a different judgment.</p></li><li><span>Notice</span><h5>Uncertainty has become certainty.</h5><p>If this transition actually occurred, it is itself a case of change.</p></li></ol>
    <div className="thought-question"><h5>Can both claims be true?</h5><p>“My thought really changed” and “nothing ever changes.”</p><button className="secondary-button" aria-expanded={revealed} aria-controls="denial-reply" onClick={() => setRevealed(value => !value)}>{revealed ? 'Hide the reasoning −' : 'Examine the tension +'}</button>{revealed && <div id="denial-reply" className="reason-reveal"><p>No. A single real transition contradicts the universal denial. Granting the transition undercuts the denial.</p></div>}</div>
    <Note title="A conditional challenge, not a shortcut"><p>A skeptic who also denies that reasoning involved any real transition has not conceded the starting point. This argument therefore does not refute every account of changeless reality or every view of time. It shows that acknowledging an actual transition while denying all change is inconsistent.</p></Note>
    <div className="reading-prose"><h5>What can we take back?</h5><p>The modest result is that some change is real, if a transition in experience is granted. The next task is to ask what makes change possible. That is a further argument, not something established by the act of denying change.</p></div>
  </>
}

function ActualizerPage({ outline }: { outline: React.ReactNode }) {
  const exploration = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  function explore() {
    exploration.current?.focus({ preventScroll: true })
    exploration.current?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }
  return <section className="first-premise actualizer-premise">
    <div className="premise-intro premise-hero">
      <div className="premise-hero-copy">
        <p className="eyebrow">The Aristotelian proof · Premise two</p>
        <h1 id="aristotle-title" tabIndex={-1}>Change requires<br />an <em>actualizer.</em></h1>
        <p className="change-definition">What brings a potential into actuality?</p>
        <div className="premise-hero-actions">
          <span className="badge in-progress">In progress</span>
          <small>The explanation of this premise is still being developed.</small>
        </div>
      </div>
      <button className="premise-scroll" onClick={explore} aria-controls="actualizer-exploration"><span>Go deeper</span><span aria-hidden="true">↓</span></button>
    </div>
    <section className="premise-exploration" id="actualizer-exploration" ref={exploration} tabIndex={-1} aria-labelledby="actualizer-exploration-title">
      <p className="eyebrow">Take a closer look</p><h2 id="actualizer-exploration-title">Explore this premise.</h2>
      <p className="actualizer-introduction section-introduction">This is the next claim in the project notes. Its explanation is not written yet, so it is a question to investigate here, not an established result.</p>
      <div className="premise-sections">
        <p className="mini-label">What this premise still needs</p>
        {actualizerNeeds.map((need, index) => {
          const id = `actualizer-${index}`
          return <Disclosure key={id} id={id} title={need.title} open={!!expanded[id]} onToggle={() => setExpanded(current => ({ ...current, [id]: !current[id] }))}><div className="reading-prose"><p>{need.text}</p></div></Disclosure>
        })}
        <Disclosure id="actualizer-sources" title="Primary sources to explore" open={!!expanded.sources} onToggle={() => setExpanded(current => ({ ...current, sources: !current.sources }))}>
          <aside className="source-notes"><p>These are starting points to assess, not citations that establish the unwritten explanations.</p><div>{researchSources.filter(source => !source.title.includes('XII')).map(source => <a href={source.url} key={source.title} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div></aside>
        </Disclosure>
      </div>
      <div className="pending-actions"><a className="primary-button" href={root}>Return to “Change is real” <span aria-hidden="true">↩</span></a><a className="text-link" href="#aristotle/conclusion">See what the conclusion still needs →</a></div>
      <div className="premise-outline">{outline}</div>
    </section>
  </section>
}

function PendingPage({ conclusion }: { conclusion: boolean }) {
  const needs = conclusion ? conclusionNeeds : actualizerNeeds
  return <>
    <div className="reading-intro pending-intro"><p className="eyebrow">The Aristotelian proof · {conclusion ? 'Conclusion' : 'Premise two'}</p><span className="badge in-progress">In progress · Explanation not yet available</span><h1 id="aristotle-title" tabIndex={-1}>{conclusion ? <>The conclusion<br />is <em>still ahead.</em></> : <>Change requires<br />an <em>actualizer.</em></>}</h1><p>{conclusion ? 'The path from change to God needs further premises and careful argument. This screen does not yet present a completed proof.' : 'This is the next claim in the project notes. Its explanation is not written yet, so it is a question to investigate here, not an established result.'}</p></div>
    <section className="content-needed" aria-labelledby="needed-title"><span className="mini-label">What this screen still needs</span><h2 id="needed-title">Before we continue the proof</h2><ol>{needs.map(need => <li key={need.title}><h3>{need.title}</h3><p>{need.text}</p></li>)}</ol></section>
    <aside className="source-notes"><p className="mini-label">Primary texts for the next research pass</p><p>These are starting points to assess, not citations that establish the unwritten explanations.</p><div>{researchSources.filter(source => conclusion || !source.title.includes('XII')).map(source => <a href={source.url} key={source.title} target="_blank" rel="noreferrer">{source.title} ↗</a>)}</div></aside>
    <div className="pending-actions"><a className="primary-button" href={root}>Return to “Change is real” <span aria-hidden="true">↩</span></a>{!conclusion && <a className="text-link" href="#aristotle/conclusion">See what the conclusion still needs →</a>}</div>
  </>
}

export function Aristotle({ hash, scrollPositions, focusPositions }: { hash: string; scrollPositions: Record<string, number>; focusPositions: Record<string, { href: string; text: string }> }) {
  const [understood, setUnderstood] = useState(readUnderstanding)
  const [storageFailed, setStorageFailed] = useState(false)
  const [accepted, setAccepted] = useState(readAcceptance)
  const [acceptanceStorageFailed, setAcceptanceStorageFailed] = useState(false)
  const main = useRef<HTMLElement>(null)
  const exploration = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const isFirstPremise = hash === root || knownRoutes.includes(hash) && hash.startsWith(deeper)
  const valid = knownRoutes.includes(hash)
  const isPending = hash === '#aristotle/2' || hash === '#aristotle/conclusion'
  const point = hash.slice(`${deeper}/`.length)
  const legacySection = hash === deeper ? 'reasons' : hash === `${deeper}/potential` ? 'potential' : deepPoints.some(item => item.id === point) ? point : null

  useEffect(() => {
    if (legacySection) setExpanded(current => ({ ...current, reasons: legacySection !== 'potential' || !!current.reasons, [legacySection]: true }))
    const frame = requestAnimationFrame(() => {
      if (legacySection) {
        const section = document.getElementById(`premise-${legacySection}`)
        section?.focus({ preventScroll: true })
        section?.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
      const savedFocus = focusPositions[hash]
      const previousLink = savedFocus && Array.from(main.current?.querySelectorAll('a') ?? []).find(link => link.getAttribute('href') === savedFocus.href && link.textContent === savedFocus.text)
      const destination = previousLink || main.current?.querySelector<HTMLHeadingElement>('h1')
      destination?.focus({ preventScroll: true })
      window.scrollTo({ top: scrollPositions[hash] ?? 0, behavior: 'instant' })
    })
    document.title = `${isPending ? hash.endsWith('conclusion') ? 'Conclusion · In progress' : 'Actualizer · In progress' : valid ? 'Change is real' : 'Page not found'} · Project Acutis`
    return () => { cancelAnimationFrame(frame); document.title = 'Project Acutis' }
  }, [hash, legacySection, isPending, valid, scrollPositions, focusPositions])

  function markUnderstanding() {
    setUnderstood(value => !value)
    try { localStorage.setItem(storageKey, String(!understood)); setStorageFailed(false) } catch { setStorageFailed(true) }
  }

  function explorePremise() {
    exploration.current?.focus({ preventScroll: true })
    exploration.current?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }

  function setAcceptance(value: boolean) {
    setAccepted(value)
    try { localStorage.setItem(acceptanceKey, String(value)); setAcceptanceStorageFailed(false) } catch { setAcceptanceStorageFailed(true) }
  }

  const outline = <>
    <div className="path-banner"><a href={root}>The Aristotelian proof</a><span className="badge in-progress">In progress</span><span className="path-note">First premise open · Further reasoning under development</span></div>
    <nav className="aristotle-path" aria-label="Argument outline, reading order only"><a href={root} aria-current={!isPending && valid ? 'step' : undefined}><span className="path-dot">1</span><span>Change is real<small>{understood ? 'Marked understood' : 'Explore the premise'}</small></span></a><span className="outline-gap" aria-hidden="true">···</span><a href="#aristotle/2" aria-current={hash === '#aristotle/2' ? 'step' : undefined}><span className="path-dot">2</span><span>An actualizer<small>In progress</small></span></a><span className="outline-gap" aria-hidden="true">···</span><a href="#aristotle/conclusion" aria-current={hash === '#aristotle/conclusion' ? 'step' : undefined}><span className="path-dot">?</span><span>Conclusion<small>Further premises needed</small></span></a></nav>
    <p className="outline-caption">Reading outline · The missing steps are not a completed chain of inference.</p>
  </>

  return <main className={`aristotle-explorer${isFirstPremise || hash === '#aristotle/2' ? ' premise-landing' : ''}`} ref={main}>
    {!isFirstPremise && hash !== '#aristotle/2' && outline}
    {!valid ? <section className="reading-page"><h1 id="aristotle-title" tabIndex={-1}>This page is not here yet.</h1><a className="primary-button" href={root}>Return to the first premise →</a></section> : hash === '#aristotle/2' ? <ActualizerPage outline={outline} /> : isPending ? <section className="reading-page" key={hash}><PendingPage conclusion /></section> : <section className="first-premise" key="first-premise">
      <div className="premise-intro premise-hero">
        <div className="premise-hero-copy">
          <p className="eyebrow">The Aristotelian proof · Premise one</p>
          <h1 id="aristotle-title" tabIndex={-1}>Change is <em>real.</em></h1>
          <p className="change-definition">Change is the actualization of a potential.</p>
          <div className="premise-hero-actions">
            <button className="primary-button acceptance-button" onClick={() => accepted ? window.location.hash = '#aristotle/2' : setAcceptance(true)}>{accepted ? 'Continue' : 'I accept'} <span aria-hidden="true">{accepted ? '→' : '✓'}</span></button>
            {accepted && <div className="acceptance-state"><span role="status">Accepted</span><button onClick={() => setAcceptance(false)} aria-label="Undo acceptance of this premise">Undo</button></div>}
            {acceptanceStorageFailed && <small role="status">Remembered for this visit; browser storage is unavailable.</small>}
          </div>
        </div>
        <button className="premise-scroll" onClick={explorePremise} aria-controls="premise-exploration"><span>Go deeper</span><span aria-hidden="true">↓</span></button>
      </div>
      <section className="premise-exploration" id="premise-exploration" ref={exploration} tabIndex={-1} aria-labelledby="exploration-title">
        <p className="eyebrow">Take a closer look</p><h2 id="exploration-title">Explore this premise.</h2>
        <div className="premise-sections">
          <p className="mini-label">Definitions</p>
          <Disclosure id="potential" title="What is a potential?" open={!!expanded.potential} onToggle={() => setExpanded(current => ({ ...current, potential: !current.potential }))}><PotentialDefinition /></Disclosure>
          <Disclosure id="actual" title="What is an actual?" open={!!expanded.actual} onToggle={() => setExpanded(current => ({ ...current, actual: !current.actual }))}><ActualDefinition /></Disclosure>
          <Disclosure id="reasons" title="How we know this premise is true?" open={!!expanded.reasons} onToggle={() => setExpanded(current => ({ ...current, reasons: !current.reasons }))}>
            <p className="section-introduction">Explore three ways of recognizing change. Choose any one to open its explanation.</p>
            {deepPoints.map((item, index) => <Disclosure key={item.id} id={item.id} title={`${index + 1}. ${item.title}`} nested open={!!expanded[item.id]} onToggle={() => setExpanded(current => ({ ...current, [item.id]: !current[item.id] }))}>
              {item.id === 'experience' ? <ExperienceContent /> : item.id === 'mind' ? <MindContent /> : <DenialContent />}
            </Disclosure>)}
            <p className="routes-note">These are supporting considerations, not three premises that must all be accepted together. The mental routes can be considered while doubting ordinary perception, but still depend on recognizing a real transition in experience. This establishes neither the cause of every change nor God's existence.</p>
          </Disclosure>
        </div>
      <div className="understanding"><div><button className={`understanding-button ${understood ? 'is-understood' : ''}`} aria-pressed={understood} onClick={markUnderstanding}><span aria-hidden="true">{understood ? '✓' : '○'}</span> {understood ? 'Marked as understood' : 'I understand this premise'}</button><p>{storageFailed ? 'Remembered for this visit; browser storage is unavailable.' : 'Saved in this browser. This records understanding, not agreement.'}</p></div><a className="text-link" href="#aristotle/2">See what comes next <span aria-hidden="true">→</span><small>Actualizer premise · In progress</small></a></div>
      <SourceNotes />
      <div className="premise-outline">{outline}</div>
      </section>
    </section>}
    <footer className="aristotle-footer"><span>Understanding comes before agreement.</span><a href="#arguments">All arguments ↗</a></footer>
  </main>
}
