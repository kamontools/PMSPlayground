// Height + fade for content revealed by a button (use on <Transition :css="false" @enter="expandEnter">).
export function expandEnter(el, done) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return done()
  const target = el.scrollHeight
  Object.assign(el.style, { overflow: 'hidden', height: '0px', opacity: '0' })
  void el.offsetHeight // apply the start state before transitioning
  Object.assign(el.style, { transition: 'height .3s ease, opacity .3s ease', height: `${target}px`, opacity: '1' })
  let finished = false
  const finish = e => {
    if (finished || (e && (e.target !== el || e.propertyName !== 'height'))) return
    finished = true
    el.removeEventListener('transitionend', finish)
    Object.assign(el.style, { overflow: '', height: '', opacity: '', transition: '' })
    done()
  }
  el.addEventListener('transitionend', finish)
  setTimeout(() => finish(), 400) // transitionend never fires in a hidden tab
}
