import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         <path
            fill={fill}
            fillRule='evenodd'
            d='M2 1a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V2a1 1 0 00-1-1H2zm8 0a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V2a1 1 0 00-1-1h-4zm-9 9a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1v-4zm9-1a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1v-4a1 1 0 00-1-1h-4z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#171F46' //TODO:need to add in color constants
}
