import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { width, height } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 32 32'
         {...props}
      >
         <path
            fill='#0058E3'
            d='M12.19 0a.76.76 0 01.476.167l3.601 2.88h11.924A3.81 3.81 0 0132 6.857v21.334a3.81 3.81 0 01-3.644 3.806L28.19 32H3.81A3.81 3.81 0 010 28.19V3.81A3.81 3.81 0 013.81 0h8.38zm16 9.905H3.81a2.285 2.285 0 00-2.286 2.286v16a2.285 2.285 0 002.286 2.285h24.38a2.285 2.285 0 002.286-2.285v-16a2.285 2.285 0 00-2.285-2.286zM11.924 1.524H3.81A2.285 2.285 0 001.524 3.81v5.333a3.786 3.786 0 012.286-.762h24.38c.858 0 1.65.284 2.287.762V6.857a2.287 2.287 0 00-2.287-2.286H16a.759.759 0 01-.476-.167l-3.6-2.88z'
         />
         <path
            fill='#0B69FF'
            fillOpacity={0.1}
            fillRule='evenodd'
            d='M5.333 12.19h21.334c.841 0 1.523.683 1.523 1.524v12.953c0 .841-.682 1.523-1.523 1.523H5.333a1.523 1.523 0 01-1.523-1.523V13.714c0-.841.682-1.524 1.523-1.524z'
            clipRule='evenodd'
         />
         <path
            fill='#B0CDFA'
            d='M14.477 24.38a.763.763 0 010 1.525h-7.62a.762.762 0 01.001-1.524h7.619zm0-3.809a.762.762 0 010 1.524h-7.62a.762.762 0 01.001-1.524h7.619z'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   width: 32,
   height: 32
}
