export default {
    keyframes: {
        slideDown: {
            from: { height: 0 },
            to: { height: 100 },
        },
        slideUp: {
            from: { height:  0},
            to: { height: 0 },
        },
    },
    animation: {
        slideDown: 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
        slideUp: 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
    }
}
