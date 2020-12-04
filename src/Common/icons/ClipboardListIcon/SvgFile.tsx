import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 68 68'
         {...other}
      >
         <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={3.5}
            d='M25.5 13.104h-5.667a5.668 5.668 0 00-5.667 5.667v34a5.67 5.67 0 005.667 5.667h28.334a5.67 5.67 0 005.667-5.667v-34a5.67 5.67 0 00-5.667-5.667H42.5m-17 0a5.666 5.666 0 005.667 5.667h5.666a5.664 5.664 0 005.667-5.667m-17 0a5.666 5.666 0 015.667-5.667h5.666a5.669 5.669 0 015.667 5.667M34 32.938h8.5M34 44.27h8.5m-17-11.334h.028M25.5 44.272h.028'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 68,
   height: 68,
   fill: '#171F46'
}

export default SvgComponent
