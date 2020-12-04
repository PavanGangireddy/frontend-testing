import React from 'react'

import colors from '../../themes/Colors'

interface Props {
   width: number
   height: number
   fill: string
}

function SvgComponent(props: Props): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 10 10'
         {...other}
      >
         <path fill={fill} d='M7 9V1L3 5l4 4z' />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 12,
   height: 12,
   fill: colors.darkBlueGrey
}

export default SvgComponent
