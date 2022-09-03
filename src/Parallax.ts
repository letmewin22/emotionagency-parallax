import {raf, resize, lerp, matrixTransform} from '@emotionagency/utils'

interface IOpts {
  inViewDetection?: boolean
  mobile?: boolean
  breakpoint?: number
}

export class Parallax {
  $els: NodeListOf<HTMLElement>

  constructor(protected opts?: IOpts) {
    this.opts = {
      inViewDetection: opts.inViewDetection ?? true,
      mobile: opts.mobile ?? true,
      breakpoint: opts.breakpoint ?? 960,
    }

    this.update()
    this.init()
  }

  init(): void {
    this.bounds()
    resize.on(this.resize)
  }

  bounds(): void {
    const m = ['animate', 'resize']
    m.forEach(fn => {
      this[fn] = this[fn].bind(this)
    })
  }

  isInView($el: HTMLElement): boolean {
    const target = $el
    const parent = target.closest('.js-in-view')

    return Boolean(target.classList.contains('js-in-view') || parent)
  }

  getPosition($el: HTMLElement): number {
    const b = $el.getBoundingClientRect()
    const position = window.innerHeight / 2 - b.top - b.height / 2
    return position
  }

  move($el: HTMLElement, distance: number, scale = 1): void {
    const transformOpts = {
      scale: {x: scale, y: scale},
      move: {y: distance, x: undefined, z: undefined},
    }

    const t = matrixTransform(transformOpts)
    $el.style.transform = t
    $el.style.willChange = 'transform'
  }

  animate(): void {
    if (!this.$els.length) {
      return
    }

    this.$els.forEach($el => {
      if (!this.isInView($el) && this.opts.inViewDetection) {
        return
      }

      const coef = +$el.dataset.parallax
      const direction = +$el.dataset.parallaxDir || 1
      const scale = +$el.dataset.scale || 1

      const pos = this.getPosition($el) * direction

      let to = 0
      let toScale = scale
      to = lerp(to, pos, coef)
      if ($el.dataset.scaleAnimation) {
        toScale = lerp(toScale, 1 + toScale * Math.abs(pos) * 0.0025, coef)
      }
      this.move($el, to, toScale)
    })
  }

  off(): void {
    raf.off(this.animate)
    this.reset()
  }

  resize(): void {
    if (this.opts.mobile) {
      raf.on(this.animate)
      return
    }
    window.innerWidth > this.opts.breakpoint ? raf.on(this.animate) : this.off()
  }

  update(): void {
    this.$els = document.querySelectorAll('[data-parallax]')
  }

  reset(): void {
    this.$els.length &&
      this.$els.forEach($el => {
        this.move($el, 0)
      })
  }

  destroy(): void {
    resize.off(this.resize)
    raf.off(this.animate)
    this.reset()
  }
}
