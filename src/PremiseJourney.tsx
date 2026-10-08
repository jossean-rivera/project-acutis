import { useEffect, useRef } from 'react'
import { useReducedMotion } from './ChangeIllustrations'

export function SectionContinue({ href, title }: { href: string; title: string }) {
  return <div className="section-bridge">
    <span className="bridge-line" aria-hidden="true" />
    <a className="section-continue" href={href}>
      <span><small>Continue</small>{title}</span><span aria-hidden="true">↓</span>
    </a>
  </div>
}

export function PremiseScreen({ heading, step, backHref, children }: {
  heading: string; step: number; backHref: string; children: React.ReactNode
}) {
  const panel = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const scope = panel.current
    if (!scope || reduced) return
    const animations = new Map<Element, Animation>()
    // Content stays visible and accessible even if observation/animation fails.
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        observer.unobserve(entry.target)
        if (entry.target.getBoundingClientRect().top < 0 || entry.target.contains(document.activeElement)) return
        animations.set(entry.target, entry.target.animate([
          { opacity: .45, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 650, easing: 'cubic-bezier(.2,.65,.25,1)' }))
      })
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' })
    scope.querySelectorAll('.premise-definitions > h2, .coffee-orientation, .change-lab, .coffee-explanation, .definition-cards, .definition-summary, .premise-reasons > h2, .argument-section > h3, .argument-section > .reading-prose, .reason-note, .argument-takeaway, .reasoning-sequence li, .thought-question, .argument-conclusion').forEach(element => observer.observe(element))
    const onFocus = (event: FocusEvent) => {
      animations.forEach((animation, element) => {
        if (event.target instanceof Node && element.contains(event.target)) animation.cancel()
      })
    }
    scope.addEventListener('focusin', onFocus as EventListener)
    return () => {
      observer.disconnect()
      animations.forEach(animation => animation.cancel())
      scope.removeEventListener('focusin', onFocus as EventListener)
    }
  }, [reduced])


  return <section className="premise-exploration premise-screen" id="premise-exploration" ref={panel} aria-labelledby={heading}>
    <div className="screen-toolbar">
      <a className="screen-back" href={backHref}><span aria-hidden="true">↑</span> Back</a>
      <span className="screen-position" aria-label={`Reading section ${step + 1} of 4`}>{String(step + 1).padStart(2, '0')} <span aria-hidden="true">/</span> 04</span>
    </div>
    <div className="screen-content">{children}</div>
  </section>
}
