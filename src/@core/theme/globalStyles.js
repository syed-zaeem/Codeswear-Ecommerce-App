const GlobalStyles = theme => {
  return {
    '.ps__rail-y': {
      zIndex: 1,
      right: '0 !important',
      left: 'auto !important',
      '&:hover, &:focus, &.ps--clicking': {
        backgroundColor: theme.palette.mode === 'light' ? '#f745c2 !important' : '#b0388c !important'
      },
      '& .ps__thumb-y': {
        right: '3px !important',
        left: 'auto !important',
        backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#703960 !important'
      },
      '.layout-vertical-nav &': {
        '& .ps__thumb-y': {
          width: 4,
          backgroundColor: theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#703960 !important'
        },
        '&:hover, &:focus, &.ps--clicking': {
          backgroundColor: 'transparent !important',
          '& .ps__thumb-y': {
            width: 6
          }
        }
      }
    },
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        left: 0,
        top: 0,
        height: 3,
        width: '100%',
        zIndex: 2000,
        position: 'fixed',
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}

export default GlobalStyles
