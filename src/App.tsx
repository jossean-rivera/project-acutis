import { useEffect, useRef, useState } from 'react'

type Detail = { title: string; text: string }
const steps: { label: string; title: string; description: string; details: Detail[] }[] = [
  {
    label: 'Premise one', title: 'Socrates is a man.',
    description: 'Begin with a particular person. This premise places Socrates within the category of human beings.',
    details: [
      { title: 'What do we mean by “man”?', text: 'Here, “man” means a human being. The argument uses a traditional wording; being male plays no role in the inference. We could equally say, “Socrates is human.”' },
      { title: 'What does this premise establish?', text: 'It identifies Socrates as a member of a group. On its own, it does not tell us that he is mortal. We need another premise connecting human beings with mortality.' },
      { title: 'What are we taking as given?', text: 'For this introductory example, we accept that Socrates is human. The demo illustrates how an inference works; it does not independently establish the truth of each premise.' },
    ],
  },
  {
    label: 'Premise two', title: 'All men are mortal.',
    description: 'Now consider the whole category. This premise says that every human being is subject to death.',
    details: [
      { title: 'What does “mortal” mean?', text: 'Mortal means subject to death. It does not specify when or how someone will die, or settle questions about what, if anything, continues after death.' },
      { title: 'Why does “all” matter?', text: '“All” makes a claim about every member of the category. “Some humans are mortal” would not be enough: Socrates might not be among those humans.' },
      { title: 'Is this premise proved here?', text: 'No. We take this universal claim as a premise for the demo. Asking whether a premise is true is different from asking whether a conclusion follows from it. A sound argument needs both true premises and a valid inference.' },
    ],
  },
  {
    label: 'The conclusion', title: 'Socrates is mortal.',
    description: 'The two premises meet here. If Socrates is human, and every human is mortal, then Socrates must be mortal too.',
    details: [
      { title: 'How does the conclusion follow?', text: 'The first premise puts Socrates in the human category. The second includes the entire human category within the mortal category. Together, they place Socrates within the mortal category. Both premises are needed; neither alone establishes this conclusion.' },
      { title: 'Do I have to agree?', text: 'Understanding the inference does not commit you to accepting the premises. You can recognize that the conclusion follows while still questioning a starting claim. If both premises are true, however, this conclusion cannot be false.' },
      { title: 'What have I just explored?', text: 'A categorical syllogism: two premises connect categories to support a conclusion. The first two screens were premises; this third statement is their conclusion. The screen order guides your reading, while the connections below show the logical dependencies.' },
    ],
  },
]

function readStep() {
  const match = window.location.hash.match(/^#socrates\/([1-3])$/)
  return match ? Number(match[1]) - 1 : null
}

function App() {
  const [step, setStep] = useState<number | null>(readStep)
  const [deeperOpen, setDeeperOpen] = useState<Record<number, boolean>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const heading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const onHashChange = () => setStep(readStep())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (step !== null) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      heading.current?.focus({ preventScroll: true })
    } else {
      requestAnimationFrame(() => {
        const destination = document.getElementById(window.location.hash === '#arguments' ? 'arguments' : 'page-title')
        destination?.scrollIntoView()
        destination?.focus({ preventScroll: true })
      })
    }
  }, [step])

  function selectArguments() {
    document.getElementById('arguments')?.focus({ preventScroll: true })
  }

  return (
    <div className="app-shell">
      <div className="night-sky" aria-hidden="true" />
      <a className="skip-link" href={step === null ? '#page-title' : '#step-title'} onClick={event => {
        event.preventDefault()
        const target = document.getElementById(step === null ? 'page-title' : 'step-title')
        target?.focus()
        target?.scrollIntoView()
      }}>Skip to content</a>
      <header className="topline">
        <a className="brand" href="#" aria-label="Project Acutis home"><span className="mark">A</span><span>Project Acutis</span></a>
        <span className="topline-label">An inquiry into reason</span>
        {step !== null && <a className="back-link" href="#arguments">← All arguments</a>}
      </header>

      {step === null ? (
        <main>
          <section className="landing-hero" aria-labelledby="page-title">
            <div className="orbits" aria-hidden="true"><span /><span /><i /></div>
            <div className="hero-copy">
              <p className="eyebrow">Philosophy, made explorable</p>
              <h1 id="page-title" tabIndex={-1}>Big questions.<br /><em>One idea at a time.</em></h1>
              <p className="intro">Explore the reasoning behind philosophical arguments, including arguments for the existence of God. Follow each premise, uncover its meaning, and see how a conclusion takes shape.</p>
              <p className="hero-note">Take your time. Understanding comes before agreement.</p>
              <a className="primary-button" href="#arguments" onClick={selectArguments}>Next: choose an argument <span aria-hidden="true">↓</span></a>
            </div>
            <span className="hero-caption">A little curiosity. A clearer view.</span>
          </section>

          <section className="arguments-section" id="arguments" tabIndex={-1} aria-labelledby="arguments-title">
            <div className="section-heading"><p className="eyebrow">Choose a starting point</p><h2 id="arguments-title">Every inquiry begins<br />with <em>a first step.</em></h2><p>Start with a short demonstration. More paths into the big questions are on the horizon.</p></div>
            <div className="argument-grid">
              <a className="argument-card available" href="#socrates/1">
                <div className="card-top"><span className="card-number">01</span><span className="badge">Interactive demo</span></div>
                <div className="constellation" aria-hidden="true">○<span />○<span />✧</div>
                <h3>The Socrates case</h3><p>A person, a universal claim, and a conclusion. Discover how a simple argument fits together.</p>
                <div className="card-bottom"><span>3 steps · At your own pace</span><span className="card-cta">Explore <span aria-hidden="true">↗</span></span></div>
              </a>
              <article className="argument-card unavailable" aria-labelledby="aristotle-title">
                <div className="card-top"><span className="card-number">02</span><span className="badge muted">Coming soon</span></div>
                <div className="card-symbol" aria-hidden="true">◎</div><h3 id="aristotle-title">The Aristotelian proof</h3><p>An inquiry beginning with change, and the question of what makes change possible.</p>
                <button className="disabled-option" disabled>Not yet available <span aria-hidden="true">↗</span></button>
              </article>
              <article className="argument-card unavailable" aria-labelledby="thomas-title">
                <div className="card-top"><span className="card-number">03</span><span className="badge muted">Coming soon</span></div>
                <div className="card-symbol" aria-hidden="true">✧</div><h3 id="thomas-title">Saint Thomas Aquinas’ proof</h3><p>An inquiry into essence and existence: what a thing is, and that it is.</p>
                <button className="disabled-option" disabled>Not yet available <span aria-hidden="true">↗</span></button>
              </article>
            </div>
          </section>
          <footer className="footer"><span>Curiosity before conclusion</span><span>Project Acutis · A work in progress</span></footer>
        </main>
      ) : (
        <main className="explorer">
          <nav className="step-nav" aria-label="Argument steps">
            {steps.map((item, index) => <a key={item.label} href={`#socrates/${index + 1}`} aria-current={index === step ? 'step' : undefined}><span className="step-dot">{index + 1}</span><span>{item.label}</span></a>)}
          </nav>
          <section className="premise-stage" key={step} aria-labelledby="step-title">
            <div className="premise-copy">
              <p className="eyebrow">The Socrates case <span className="eyebrow-divider">/</span> {steps[step].label}</p>
              <h1 id="step-title" ref={heading} tabIndex={-1}>{steps[step].title}</h1>
              <p className="premise-description">{steps[step].description}</p>
            </div>
            {step === 2 && <div className="logic-map" aria-label="Both premises together support the conclusion">
              <div className="logic-inputs"><a href="#socrates/1"><small>Premise 1</small>Socrates is a man.</a><span className="logic-plus" aria-hidden="true">+</span><a href="#socrates/2"><small>Premise 2</small>All men are mortal.</a></div>
              <div className="logic-connector">Together, therefore <span aria-hidden="true">↓</span></div><div className="logic-result">Socrates is mortal.</div>
            </div>}
            <div className="deeper">
              <button className="deeper-toggle" aria-expanded={!!deeperOpen[step]} aria-controls={`deeper-${step}`} onClick={() => setDeeperOpen(current => ({ ...current, [step]: !current[step] }))}>
                {deeperOpen[step] ? 'Close deeper exploration' : 'Dig deeper'} <span aria-hidden="true">{deeperOpen[step] ? '−' : '+'}</span>
              </button>
              <div className={`deeper-panel ${deeperOpen[step] ? 'is-open' : ''}`} id={`deeper-${step}`} inert={!deeperOpen[step]}>
                <div>
              {steps[step].details.map((detail, index) => {
                const id = `${step}-${index}`
                const open = !!expanded[id]
                return <div className={`detail ${open ? 'is-open' : ''}`} key={id}>
                  <h2><button aria-expanded={open} aria-controls={`detail-${id}`} onClick={() => setExpanded(current => ({ ...current, [id]: !current[id] }))}>{detail.title}<span className="detail-icon" aria-hidden="true">{open ? '−' : '+'}</span></button></h2>
                  <div className="detail-expansion" id={`detail-${id}`} inert={!open}><div><p>{detail.text}</p></div></div>
                </div>
              })}
                </div>
              </div>
            </div>
          </section>
          <div className="journey-controls"><a className="back-link" href={step === 0 ? '#arguments' : `#socrates/${step}`}>← {step === 0 ? 'All arguments' : 'Previous step'}</a><a className="primary-button" href={step < 2 ? `#socrates/${step + 2}` : '#arguments'}>{step < 2 ? 'Continue' : 'Finish exploration'}<span aria-hidden="true">→</span></a></div>
          <footer className="explorer-footer"><span>A small argument. A way into bigger questions.</span><span>0{step + 1} / 03</span></footer>
        </main>
      )}
    </div>
  )
}

export default App
