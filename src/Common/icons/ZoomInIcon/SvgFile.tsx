import React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { width, height } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fill='#fff'
            fillRule='evenodd'
            d='M5.941 6.78a3.28 3.28 0 106.56-.002 3.28 3.28 0 00-6.56.002zm.472 3.868c.788.573 1.758.91 2.808.91a4.78 4.78 0 10-3.868-1.971L2 12.94l1.06 1.061 3.354-3.353z'
            clipRule='evenodd'
         />
         <path stroke='#fff' d='M7 7h4M9 9V5' />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 16,
   height: 16
}

export default SvgComponent
