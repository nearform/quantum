export default {
  keyframes: {
    slideDown: {
      from: { height: '0' },
      to: { height: 'var(--radix-accordion-content-height)' }
    },
    slideUp: {
      from: { height: 'var(--radix-accordion-content-height)' },
      to: { height: '0' }
    },
    progressIndeterminate: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(250%)' }
    }
  },
  animation: {
    slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    progressIndeterminate:
      'progressIndeterminate 1.5s cubic-bezier(0.65, 0, 0.35, 1) infinite'
  }
}
