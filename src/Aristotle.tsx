import { useEffect, useRef, useState } from 'react'
import { CoffeeExplorer, CoffeeIntroduction, MindExplorer, useReducedMotion } from './ChangeIllustrations'
import { actualizerNeeds, conclusionNeeds, deepPoints, researchSources, sources } from './aristotle-content'

const root = '#aristotle/1'
const deeper = `${root}/deeper`
const knownRoutes = [root, deeper, `${deeper}/potential`, ...deepPoints.map(point => `${deeper}/${point.id}`), '#aristotle/2', '#aristotle/conclusion']

function SourceNotes({ compact = false }: { compact?: boolean }) {
  return <aside className={`source-notes ${compact ? 'compact' : ''}`} aria-label="References">
    <p className="mini-label">Read more</p>
    <div>{Object.values(sources).map(source => <a href={source.url} key={source.title} target="_blank" rel="noreferrer"><span>{source.title} ↗</span><small>{source.detail}</small></a>)}</div>
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

function Definitions() {
  return <section className="premise-definitions" aria-labelledby="exploration-title">
    <h2 id="exploration-title" tabIndex={-1}>What is change?</h2>
    <p className="section-introduction coffee-orientation">Consider a cup of hot coffee left on a table. At first, it is hot. As time passes, it cools until it reaches room temperature. Let’s follow the same coffee through that change.</p>
    <CoffeeIntroduction />
    <p className="coffee-clarification">Here, “cold” means cooled to room temperature. The illustration speeds up time.</p>
    <div className="reading-prose coffee-explanation">
      <p>Before cooling, the coffee already exists and is hot: being hot is its <strong>actual</strong> state. It is not cold yet, but it can become cold. That capacity is a <strong>potential</strong> of the coffee, not a separate object.</p>
      <p>As the coffee cools, its potential to be cold becomes actual. Afterward, being cold is its actual state: the potential has been <strong>actualized</strong>. The same coffee has gone from being hot to being cold.</p>
    </div>
    <dl className="definition-cards">
      <div id="premise-potential" tabIndex={-1}>
        <dt>Potential</dt>
        <dd><p>What something can be.</p><p className="definition-example">Can become cold</p></dd>
      </div>
      <div id="premise-actual" tabIndex={-1}>
        <dt>Actual</dt>
        <dd><p>What something is.</p><p className="definition-example">Hot before; cold afterward</p></dd>
      </div>
    </dl>
    <p className="definition-summary">Change is <strong>the actualization of a potential</strong>: a potential becoming actual.</p>
  </section>
}

function ExperienceContent() {
  return <>
    <div className="reading-prose"><p>We directly experience change in everyday life.</p><p>For example, a cup of hot coffee left on a table becomes cold or reaches room temperature over time. At one moment, the coffee is hot; later, it is cold. The same thing has moved from one state to another, so change is encountered through our senses.</p><p>Actually, the coffee has several possible states it could undergo: it could be boiled and evaporated, frozen, spoiled, or consumed. Under the actual circumstances, however, one of these potentials is realized: the coffee cools.</p></div>
    <CoffeeExplorer />
    <Note level="h4" title="A note on our senses">
      <p>This example assumes our senses are generally reliable. We do not need to prove that assumption before considering the next two points: inner experience and the argument from denying change.</p>
      <details className="sensory-note-details">
        <summary>More about this assumption</summary>
        <div><p>This argument uses the provisional premise that our senses are generally reliable sources of knowledge: although the senses can sometimes mislead us, ordinary perception gives us reasonable access to changes occurring in the world around us.</p><p>This sensory premise does not need to carry the entire argument or be established first, because the reality of change can also be supported independently through inner experience—our changing thoughts and emotions—and through the proof by contradiction, which are explained as follows.</p></div>
      </details>
    </Note>
  </>
}

function MindContent() {
  return <>
    <div className="reading-prose"><p>Even if we doubt the external world and mainly our senses, the existence of the thinking mind remains undeniable in the Cartesian sense: if I am thinking, I exist as a thinker (or more commonly known as “I think, therefore I am”).</p><p>Within conscious experience, we encounter changing thoughts, judgments, and emotions.</p><p>We can recognize within our own minds that our emotions have changed—for example, that we have moved from happiness to sadness, from anxiety to calm, or from anger to peace.</p></div>
    <MindExplorer />
    <div className="reading-prose"><p>Our ability to recognize these emotional and intellectual transitions provides direct evidence that change is real.</p></div>
    <p className="argument-takeaway">Therefore, we know change is real by our conscious experience, even if someone questions whether the external world is exactly as it appears (something like a Matrix objection).</p>
  </>
}

function DenialContent() {
  const [revealed, setRevealed] = useState(false)
  return <>
    <p className="section-introduction">Change can still be proven by contradiction:</p>
    <ol className="reasoning-sequence"><li><span>Suppose</span><h4>Uncertainty</h4><p>Suppose someone is initially uncertain whether change is real.</p></li><li><span>Then</span><h4>Certainty</h4><p>Through whatever reasoning they choose, such as conducting some scientific research, they eventually become certain that change is not real.</p></li><li><span>Notice</span><h4>A real transition</h4><p>But their mental state has changed from uncertainty to certainty. Their conclusion was reached through a real transition in thought.</p></li></ol>
    <div className="reading-prose"><p>Therefore, the denial of change depends upon the very reality it attempts to reject.</p></div>
    <div className="thought-question"><h4>Can we acknowledge a transition from uncertainty to certainty and deny change at the same time?</h4><button className="secondary-button" aria-expanded={revealed} aria-controls="denial-reply" onClick={() => setRevealed(value => !value)}>{revealed ? 'Hide the explanation −' : 'Show the explanation +'}</button><div id="denial-reply" className="reason-reveal" hidden={!revealed}><p>No. Before thinking it through, you were unsure whether change exists. Now you are convinced that nothing changes. Being unsure and being convinced are different states of mind. If you acknowledge that you moved from one to the other, you acknowledge a change in your own thinking—even if your conclusion denies change.</p></div></div>
    <p className="argument-takeaway">This establishes that someone cannot coherently move from uncertainty to certainty while denying that any change has occurred.</p>
    <p className="argument-conclusion">Therefore, change must be real.</p>
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
  const main = useRef<HTMLElement>(null)
  const exploration = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isFirstPremise = hash === root || knownRoutes.includes(hash) && hash.startsWith(deeper)
  const valid = knownRoutes.includes(hash)
  const isPending = hash === '#aristotle/2' || hash === '#aristotle/conclusion'
  const point = hash.slice(`${deeper}/`.length)
  const legacySection = hash === deeper ? 'reasons' : hash === `${deeper}/potential` ? 'potential' : deepPoints.some(item => item.id === point) ? point : null

  useEffect(() => {
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

  function explorePremise() {
    const heading = exploration.current?.querySelector<HTMLHeadingElement>('#exploration-title')
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })
  }

  const outline = <>
    <div className="path-banner"><a href={root}>The Aristotelian proof</a><span className="badge in-progress">In progress</span><span className="path-note">First premise open · Further reasoning under development</span></div>
    <nav className="aristotle-path" aria-label="Argument outline, reading order only"><a href={root} aria-current={!isPending && valid ? 'step' : undefined}><span className="path-dot">1</span><span>Change is real<small>Explore the premise</small></span></a><span className="outline-gap" aria-hidden="true">···</span><a href="#aristotle/2" aria-current={hash === '#aristotle/2' ? 'step' : undefined}><span className="path-dot">2</span><span>An actualizer<small>In progress</small></span></a><span className="outline-gap" aria-hidden="true">···</span><a href="#aristotle/conclusion" aria-current={hash === '#aristotle/conclusion' ? 'step' : undefined}><span className="path-dot">?</span><span>Conclusion<small>Further premises needed</small></span></a></nav>
    <p className="outline-caption">Reading outline · The missing steps are not a completed chain of inference.</p>
  </>

  return <main className={`aristotle-explorer${isFirstPremise || hash === '#aristotle/2' ? ' premise-landing' : ''}`} ref={main}>
    {!isFirstPremise && hash !== '#aristotle/2' && outline}
    {!valid ? <section className="reading-page"><h1 id="aristotle-title" tabIndex={-1}>This page is not here yet.</h1><a className="primary-button" href={root}>Return to the first premise →</a></section> : hash === '#aristotle/2' ? <ActualizerPage outline={outline} /> : isPending ? <section className="reading-page" key={hash}><PendingPage conclusion /></section> : <section className="first-premise notes-premise" key="first-premise">
      <div className="premise-intro premise-hero">
        <div className="premise-hero-copy">
          <p className="eyebrow">The Aristotelian proof · Premise one</p>
          <h1 id="aristotle-title" tabIndex={-1}>Change is <em>real.</em></h1>
          <p className="change-definition">Hot coffee becomes cold. Anger becomes peace. What could be becomes what is.</p>
          <div className="premise-hero-actions">
            <div className="premise-hero-buttons">
              <button className="primary-button" onClick={explorePremise} aria-controls="premise-exploration">Explore why <span aria-hidden="true">↓</span></button>
              <a className="secondary-button" href="#aristotle/2" aria-describedby="next-premise-description">Next premise <span aria-hidden="true">→</span></a>
            </div>
            <small id="next-premise-description">Next: Change requires an actualizer · In progress</small>
          </div>
        </div>
      </div>
      <section className="premise-exploration" id="premise-exploration" ref={exploration} tabIndex={-1} aria-labelledby="exploration-title">
        <Definitions />
        <div className="premise-reasons">
          <h2 id="premise-reasons" tabIndex={-1}>How do we know change is real?</h2>
          {deepPoints.map((item, index) => <section className="argument-section" key={item.id} aria-labelledby={`premise-${item.id}`}>
            <h3 id={`premise-${item.id}`} tabIndex={-1}><span className="argument-number" aria-hidden="true">{item.number}</span><span><span className="sr-only">{index + 1}. </span>{item.title}</span></h3>
            {item.id === 'experience' ? <ExperienceContent /> : item.id === 'mind' ? <MindContent /> : <DenialContent />}
          </section>)}
        </div>
      <div className="understanding"><a className="text-link" href="#aristotle/2">See what comes next <span aria-hidden="true">→</span><small>Actualizer premise · In progress</small></a></div>
      <SourceNotes />
      <div className="premise-outline">{outline}</div>
      </section>
    </section>}
    <footer className="aristotle-footer"><span>Understanding comes before agreement.</span><a href="#arguments">All arguments ↗</a></footer>
  </main>
}
