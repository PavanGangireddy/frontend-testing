import React from 'react'

import colors from '../../themes/Colors'

interface Props {
   width: string
   height: string
   fillColor: string
}

export default function SvgComponent(props: Props): JSX.Element {
   const { width, height, fillColor } = props

   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         fill='none'
         viewBox='0 0 16 17'
         {...props}
      >
         <path
            fill={fillColor}
            fillRule='evenodd'
            d='M1 7.676a1.5 1.5 0 103.001-.001A1.5 1.5 0 001 7.676zm5.5 0a1.5 1.5 0 103.001-.001 1.5 1.5 0 00-3.001.001zm7 1.5a1.5 1.5 0 11.001-3.001 1.5 1.5 0 01-.001 3.001z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: '16',
   height: '17',
   fillColor: colors.steel
}
