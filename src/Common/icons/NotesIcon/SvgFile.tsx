import React from 'react'

import colors from '../../themes/Colors'

interface Props {
   width: number
   height: number
   fillColor: string
}

export default function SvgComponent(props: Props): JSX.Element {
   const { width, height, fillColor, ...other } = props

   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 12 12'
         {...other}
      >
         <path
            fill={fillColor}
            fillRule='evenodd'
            d='M0 1.2A1.2 1.2 0 011.2 0h9.6a1.2 1.2 0 110 2.4H1.2A1.2 1.2 0 010 1.2zM0 6a1.2 1.2 0 011.2-1.2h9.6a1.2 1.2 0 110 2.4H1.2A1.2 1.2 0 010 6zm1.2 3.6a1.2 1.2 0 100 2.4h3.6a1.2 1.2 0 100-2.4H1.2z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 12,
   height: 12,
   fillColor: colors.battleshipGrey
}
