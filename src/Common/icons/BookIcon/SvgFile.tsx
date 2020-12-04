import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 18 14'
         {...other}
      >
         <path
            stroke={fill}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.3}
            d='M9 2.055V13M9 2.055C7.962 1.402 6.552 1 5 1s-2.962.402-4 1.055V13c1.038-.653 2.448-1.055 4-1.055s2.962.402 4 1.055M9 2.055C10.038 1.402 11.448 1 13 1c1.553 0 2.962.402 4 1.055V13c-1.038-.653-2.447-1.055-4-1.055-1.552 0-2.962.402-4 1.055'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 18,
   height: 14,
   fill: '#fff'
}

export default SvgComponent
