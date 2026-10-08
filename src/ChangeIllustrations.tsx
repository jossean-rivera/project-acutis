import { useEffect, useId, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

// Keep the reader's example position when following a deeper route and returning.
// Playback itself always stops when its illustration leaves the page.
const examplePositions = { introduction: 0, coffee: 0, mind: 0 }

function useIllustration(example: keyof typeof examplePositions, reducedBehavior: 'complete' | 'pause' = 'complete') {
  const [progress, setProgress] = useState(() => examplePositions[example])
  const [playing, setPlaying] = useState(false)
  const reduced = useReducedMotion()
  useEffect(() => { examplePositions[example] = progress }, [example, progress])
  useEffect(() => {
    if (!playing) return
    if (reduced) {
      if (reducedBehavior === 'complete') setProgress(100)
      setPlaying(false)
      return
    }
    let frame: number
    let last = 0
    const animate = (time: number) => {
      if (last) setProgress(value => Math.min(100, value + Math.min(time - last, 100) / 30))
      last = time
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [playing, reduced, reducedBehavior])
  useEffect(() => { if (progress >= 100) setPlaying(false) }, [progress])
  const toggle = () => {
    if (playing) { setPlaying(false); return }
    if (reduced) { setProgress(progress >= 100 ? 0 : 100); return }
    if (progress >= 100) setProgress(0)
    setPlaying(true)
  }
  const scrub = (value: number) => { setPlaying(false); setProgress(value) }
  return { progress, playing, reduced, toggle, scrub }
}

function Mug({ x, y, scale = 1, variant = 'hot', steam = 1 }: { x: number; y: number; scale?: number; variant?: 'hot' | 'frozen' | 'boiling' | 'cool'; steam?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <g>
      <path d="M-33-18 Q-36 8-29 29 Q-26 37-2 37 Q22 37 26 28 L31-18" />
      <ellipse cx="-1" cy="-18" rx="32" ry="8" />
      <path d="M32-12 C61-18 62 24 28 22 M-42 45 Q-1 53 41 45" />
      {variant !== 'frozen' && variant !== 'cool' && <g className="coffee-steam" opacity={steam}><path d="M-18-37 C-29-49-9-52-17-65 M2-34 C-10-49 13-54 3-72 M20-39 C10-51 31-57 21-67" /></g>}
      {variant === 'frozen' && <g><path d="M-1-37 V6 M-20-27 L18-5 M-20-5 L18-27 M-7-33 L-1-27 5-33 M-7 2 L-1-4 5 2" /><path d="M-22 15 L-10 11-7 23-19 27 Z M4 12 L17 14 14 27 1 24 Z" /></g>}
      {variant === 'boiling' && <g><circle cx="-16" cy="0" r="3" /><circle cx="5" cy="9" r="4" /><circle cx="14" cy="-3" r="2" /></g>}
    </g>
  </g>
}

const coffeeStages = [
  { id: 'before', label: 'Before', caption: 'The coffee is hot now, but it can become cold.', steam: 1 },
  { id: 'during', label: 'During', caption: 'The coffee is cooling.', steam: .35 },
  { id: 'after', label: 'After', caption: 'The coffee is cold now. Its potential to be cold has become actual.', steam: 0 },
] as const

export function CoffeeIntroduction() {
  const { progress, playing, reduced, toggle, scrub } = useIllustration('introduction', 'pause')
  const id = useId()
  const stageIndex = progress >= 100 ? 2 : progress > 0 ? 1 : 0
  const currentStage = coffeeStages[stageIndex]
  const advanceStage = () => scrub(stageIndex === 2 ? 0 : stageIndex === 1 ? 100 : 50)
  const playbackLabel = playing ? 'Pause' : progress >= 100 ? 'Replay' : progress > 0 ? 'Resume' : 'Play'

  return <figure className={`change-lab coffee-introduction ${playing ? 'is-playing' : ''}`} aria-labelledby={`${id}-title`}>
    <figcaption className="lab-heading coffee-introduction-heading">
      <div><span className="mini-label">A familiar change</span><h3 id={`${id}-title`}>The same coffee at different times.</h3></div>
    </figcaption>
    <ol className="coffee-storyboard">
      {coffeeStages.map((stage, index) => <li key={stage.id} className={`coffee-stage ${stageIndex === index ? 'is-current' : ''}`} data-stage={stage.id} aria-current={stageIndex === index ? 'step' : undefined}>
        <div className="coffee-stage-heading"><h4><button className="coffee-stage-select" aria-pressed={stageIndex === index} onClick={() => scrub(index === 0 ? 0 : index === 1 ? 50 : 100)}>{stage.label}</button></h4><span className="coffee-stage-current" aria-hidden="true">{stageIndex === index ? 'Current stage' : ''}</span></div>
        <svg className="coffee-stage-drawing" viewBox="0 0 200 150" aria-hidden="true" focusable="false">
          <Mug x={96} y={87} steam={stage.id === 'during' ? 1 - progress / 100 : stage.steam} variant={stage.id === 'after' ? 'cool' : 'hot'} />
        </svg>
        <p className="coffee-stage-caption">{stage.caption}</p>
      </li>)}
    </ol>
    <div className="animation-controls">
      <button type="button" className="play-button" onClick={reduced ? advanceStage : toggle}>{reduced ? stageIndex === 2 ? 'Reset example' : 'Next stage' : playbackLabel}</button>
      <label className="time-slider">Hot <input aria-label="Introductory coffee cooling progress" aria-valuetext={`${currentStage.label}: ${currentStage.caption}`} type="range" min="0" max="100" step="1" value={progress} onChange={event => scrub(Number(event.target.value))} /> Cold</label>
    </div>
    <p className="lab-status" role="status" aria-atomic="true">Current stage: {currentStage.label}.</p>
  </figure>
}

const possibilities = [
  { id: 'boiling', label: 'Boiled and evaporated', text: 'The coffee could be boiled and evaporated.' },
  { id: 'frozen', label: 'Frozen', text: 'The coffee could be frozen.' },
  { id: 'spoiled', label: 'Spoiled', text: 'The coffee could be spoiled.' },
  { id: 'consumed', label: 'Consumed', text: 'The coffee could be consumed.' },
  { id: 'cool', label: 'Room temperature', text: 'Under the actual circumstances, however, one of these potentials is realized: the coffee cools.' },
] as const
type Possibility = typeof possibilities[number]['id']

export function CoffeeExplorer() {
  const { progress, playing, reduced, toggle, scrub } = useIllustration('coffee')
  const [selected, setSelected] = useState<Possibility>('cool')
  const id = useId()
  const chosen = possibilities.find(item => item.id === selected)!
  const t = progress / 100
  const color = `rgb(${Math.round(226 - t * 66)}, ${Math.round(169 + t * 35)}, ${Math.round(125 + t * 96)})`
  return <section className={`change-lab ${playing ? 'is-playing' : ''}`} aria-label="Interactive coffee example">
    <div className="lab-heading"><div><span className="mini-label">Everyday experience</span><h4>The coffee cools.</h4></div><span className="lab-number" aria-hidden="true">01</span></div>
    <div className="coffee-map">
      <svg viewBox="0 0 760 350" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Hot coffee and its possible changes</title>
        <desc id={`${id}-desc`}>Dotted paths lead to frozen, boiled and evaporated, spoiled, consumed, and room-temperature coffee. {progress === 100 ? 'The room-temperature path is now solid: this capacity has been actualized.' : progress > 0 ? 'The room-temperature path is becoming solid as the coffee cools.' : 'The coffee is hot; the paths show its potential states.'}</desc>
        <g className="possibility-lines" fill="none" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round">
          <path className={selected === 'frozen' ? 'selected-path' : ''} d="M240 176 C330 176 298 64 442 64" />
          <path className={selected === 'boiling' ? 'selected-path' : ''} d="M245 176 C405 176 462 113 610 113" />
          <path className={selected === 'spoiled' ? 'selected-path' : ''} d="M241 191 C367 191 470 275 604 275" />
          <path className={selected === 'consumed' ? 'selected-path' : ''} d="M245 185 C390 185 472 205 620 205" />
          <path className={selected === 'cool' ? 'selected-path' : ''} d="M238 203 C301 203 297 277 406 277" />
        </g>
        <path className="actual-path" d="M238 203 C301 203 297 277 406 277" fill="none" strokeWidth="2.5" pathLength="100" strokeDasharray="100" strokeDashoffset={100 - progress} />
        <circle cx="185" cy="177" r="77" fill="currentColor" className="cup-halo" style={{ color }} />
        <g style={{ color }}><Mug x={179} y={182} scale={1.2} steam={1 - t} /></g>
        <text x="180" y="278" className="map-caption" textAnchor="middle">{progress === 100 ? 'Cool coffee' : progress > 0 ? 'Coffee cooling' : 'Hot coffee'}</text>
        <text x="180" y="301" className="map-status" textAnchor="middle">{progress === 100 ? 'ACTUAL NOW · ROOM TEMPERATURE' : progress > 0 ? 'A CAPACITY BEING REALIZED' : 'ACTUAL NOW · HOT'}</text>
        <g className={`potential-drawing ${selected === 'frozen' ? 'selected' : ''}`}><Mug x={480} y={56} scale={.67} variant="frozen" /><text x="480" y="108" textAnchor="middle">Frozen</text></g>
        <g className={`potential-drawing ${selected === 'boiling' ? 'selected' : ''}`}><Mug x={647} y={111} scale={.67} variant="boiling" /><text x="647" y="158" textAnchor="middle">Boiled and evaporated</text></g>
        <g className={`potential-drawing ${selected === 'spoiled' ? 'selected' : ''}`}><Mug x={651} y={262} scale={.67} variant="cool" /><text x="651" y="319" textAnchor="middle">Spoiled</text></g>
        <g className={`potential-drawing ${selected === 'consumed' ? 'selected' : ''}`}><circle cx="625" cy="205" r="3" fill="currentColor" /><text x="640" y="210">Consumed</text></g>
        <g className="cool-drawing" style={{ opacity: .45 + t * .55 }}><circle cx="448" cy="266" r="47" className="actual-halo" style={{ opacity: t }} /><Mug x={441} y={260} scale={.67} variant="cool" /><text x="445" y="318" textAnchor="middle">Room temperature</text><text x="445" y="338" className="map-status" textAnchor="middle">{progress === 100 ? 'ACTUALIZED' : 'POTENTIAL'}</text></g>
      </svg>
    </div>
    <div className="map-key"><span><i className="dotted-key" /> Could become</span><span><i className="solid-key" /> Becoming actual</span><span>Illustration · time compressed</span></div>
    <div className="animation-controls">
      <button className="play-button" onClick={toggle}>{playing ? 'Ⅱ Pause' : reduced ? progress >= 100 ? 'Reset example' : 'Show cooled coffee' : progress >= 100 ? '↻ Replay cooling' : progress > 0 ? '▶ Resume cooling' : '▶ Watch the coffee cool'}</button>
      <label className="time-slider">Hot <input aria-label="Coffee cooling progress" aria-valuetext={progress === 100 ? 'Coffee at room temperature' : progress === 0 ? 'Hot coffee' : 'Coffee cooling'} type="range" min="0" max="100" value={progress} onChange={event => scrub(Number(event.target.value))} /> Cool</label>
    </div>
    <p className="lab-status" role="status">{progress >= 100 ? 'The coffee has reached room temperature. Its potential has been actualized.' : progress > 0 ? 'One of these potentials is being realized: the coffee cools.' : 'At one moment, the coffee is hot. Press play or move the slider.'}</p>
    <div className="potential-picker" aria-label="Inspect a possible change">{possibilities.map(item => <button key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span>{item.label}</span></button>)}</div>
    <p className="potential-note"><strong>{chosen.label}.</strong> {chosen.text}</p>
  </section>
}

export function MindExplorer() {
  const { progress, playing, reduced, toggle, scrub } = useIllustration('mind')
  const t = progress / 100
  const id = useId()
  return <section className={`change-lab mind-lab ${playing ? 'is-playing' : ''}`} aria-label="Interactive inner experience example">
    <div className="lab-heading"><div><span className="mini-label">Inner experience</span><h4>From anger to peace.</h4></div><span className="lab-number" aria-hidden="true">02</span></div>
    <svg className="mind-drawing" viewBox="0 0 700 270" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{progress === 100 ? 'The same person, now peaceful' : progress > 0 ? 'A person moving from anger toward peace' : 'A person feeling angry, with the capacity to feel peace'}</title>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="350" cy="115" r="89" className="mind-halo" style={{ opacity: .15 + t * .25 }} />
        <path d="M288 249 Q285 187 316 183 M383 183 Q418 187 411 249 M328 166 L327 187 Q350 204 371 187 L371 166" />
        <path d="M307 100 Q305 44 350 47 Q397 46 393 100 L392 136 Q381 174 350 177 Q316 173 307 135 Z" />
        <path d="M307 93 Q320 88 326 69 Q346 85 364 68 Q379 79 393 92" />
        <path d={`M321 ${101 - t * 4} L336 ${108 - t * 11} M365 ${108 - t * 11} L380 ${101 - t * 4}`} />
        <path d={`M323 115 Q329 ${115 + t * 6} 335 115 M366 115 Q372 ${115 + t * 6} 378 115 M350 116 L345 134 352 134`} />
        <path d={`M333 150 Q350 ${137 + t * 26} 367 150`} />
        <g opacity={1 - t} className="anger-marks"><path d="M270 70 L258 57 272 52 263 39 M421 73 L436 62 426 51 440 40 M269 106 L254 109 M430 106 L445 109" /></g>
        <g opacity={t} className="peace-marks"><path d="M256 99 Q239 86 244 70 Q263 74 256 99 Q278 96 276 81 Q261 79 256 99 M439 98 Q427 81 438 69 Q453 82 439 98 Q460 98 461 85 Q447 79 439 98" /></g>
        <path d="M102 185 Q175 160 241 183 M462 183 Q530 160 600 185" strokeDasharray="3 7" opacity=".4" />
      </g>
      <text x="154" y="143" textAnchor="middle">Anger</text><text x="549" y="143" textAnchor="middle">Peace</text>
      <text x="350" y="265" className="map-status" textAnchor="middle">THE SAME PERSON · A DIFFERENT STATE</text>
    </svg>
    <div className="animation-controls"><button className="play-button" onClick={toggle}>{playing ? 'Ⅱ Pause' : reduced ? progress >= 100 ? 'Reset example' : 'Show peace' : progress >= 100 ? '↻ Replay transition' : progress > 0 ? '▶ Resume transition' : '▶ From anger to peace'}</button><label className="time-slider">Anger <input aria-label="Emotion transition progress" aria-valuetext={progress === 100 ? 'Peace' : progress === 0 ? 'Anger' : 'Moving toward peace'} type="range" min="0" max="100" value={progress} onChange={event => scrub(Number(event.target.value))} /> Peace</label></div>
    <p className="lab-status" role="status">{progress === 100 ? 'We can recognize within our own minds that our emotions have changed.' : 'We can move from anger to peace. Press play or move the slider.'}</p>
  </section>
}
