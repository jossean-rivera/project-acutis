function App() {
  return (
    <main className="title-page">
      <div className="topline" aria-hidden="true">
        <span className="mark">A</span>
        <span className="topline-label">An inquiry into reason</span>
      </div>

      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">Philosophy, made explorable</p>
        <h1 id="page-title">Project <em>Acutis</em></h1>
        <p className="intro">
          Follow the shape of an argument. Explore its premises, see how its ideas
          connect, and take the time to understand each step.
        </p>
        <div className="coming-soon">
          <span className="coming-soon-dot" aria-hidden="true" />
          <span>A space for clear thinking is taking shape.</span>
        </div>
      </section>

      <footer className="footer">
        <span>Curiosity before conclusion</span>
        <span className="footer-rule" aria-hidden="true" />
        <span>Est. MMXXVI</span>
      </footer>
    </main>
  )
}

export default App
