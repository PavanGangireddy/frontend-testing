import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={24} height={24} fill='none' viewBox='0 0 24 24' {...props}>
         <circle
            cx={12}
            cy={12}
            r={12}
            fill='#D7DFE9'
            fillOpacity={0.4}
            transform='rotate(-180 12 12)'
         />
         <path
            fill='#616E7C'
            fillRule='evenodd'
            d='M13.951 5.373l4.828 6a1 1 0 01-.01 1.267l-5 6a1.003 1.003 0 01-1.409.128.998.998 0 01-.128-1.408l4.476-5.371-4.316-5.362a1 1 0 111.559-1.254zm-8.406-.152a1 1 0 011.406.152l4.828 6c.298.371.294.901-.01 1.267l-5 6a1.003 1.003 0 01-1.409.128.998.998 0 01-.128-1.408l4.475-5.371-4.315-5.362a1 1 0 01.153-1.406z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent
