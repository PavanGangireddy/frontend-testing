import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         <path
            fill={fill}
            fillRule='evenodd'
            d='M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm1 4a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V7a1 1 0 00-1-1H2zm0 5a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 00-1-1H2zm6-9a1 1 0 000 2h6a1 1 0 000-2H8zM7 8a1 1 0 011-1h6a1 1 0 010 2H8a1 1 0 01-1-1zm1 4a1 1 0 000 2h6a1 1 0 000-2H8z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
