import * as React from 'react'

import Colors from '../../themes/Colors'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <path
            fill={fill}
            d='M3.162 12.143c.14-1.608 1.374-2.824 2.984-2.947C7.51 9.091 9.436 9 12 9c2.565 0 4.49.091 5.854.196 1.61.123 2.845 1.339 2.984 2.947.09 1.032.162 2.336.162 3.857 0 1.52-.072 2.825-.162 3.857-.14 1.608-1.374 2.823-2.984 2.947-1.364.105-3.29.196-5.854.196-2.565 0-4.49-.091-5.854-.196-1.61-.123-2.845-1.339-2.984-2.947A44.62 44.62 0 013 16c0-1.52.072-2.825.162-3.857z'
            opacity={0.25}
         />
         <path
            fill={fill}
            fillRule='evenodd'
            d='M9.207 6.207a1 1 0 01-1.414-1.414l3.5-3.5a1 1 0 011.414 0l3.5 3.5a1 1 0 01-1.414 1.414L13 4.414V14a1 1 0 01-2 0V4.414L9.207 6.207z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: Colors.steel
}
