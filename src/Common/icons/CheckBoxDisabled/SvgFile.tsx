import React from 'react'

interface Props {
   width: number
   height: number
   className?: string
}

const SvgComponent = (props: Props): JSX.Element => (
   <svg width={props.width} height={props.height} {...props}>
      <defs>
         <path id='disabled_check_svg__a' d='M0 0h20v20H0z' />
      </defs>
      <g fill='none' fillRule='evenodd' transform='translate(-2 -2)'>
         <mask id='disabled_check_svg__b' fill='#fff'>
            <use xlinkHref='#disabled_check_svg__a' />
         </mask>
         <rect
            width={15}
            height={15}
            x={2.5}
            y={2.5}
            fill='#F5F6F7'
            stroke='#DFE1E6'
            mask='url(#disabled_check_svg__b)'
            rx={3}
         />
      </g>
   </svg>
)

SvgComponent.defaultProps = {
   width: 16,
   height: 16
}

export default SvgComponent
