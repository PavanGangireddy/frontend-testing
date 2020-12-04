import * as React from 'react'

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
         viewBox='0 0 24 24'
         {...other}
      >
         <path
            fill={fill}
            d='M7 3H5.498a.488.488 0 00-.354.148.507.507 0 00-.144.355v16.994a.5.5 0 00.498.503H17c.53 0 1.04-.21 1.414-.586C18.79 20.04 19 19.53 19 19V5c0-.53-.21-1.04-.586-1.414A1.995 1.995 0 0017 3h-3v9a1 1 0 01-1.514.857L10.5 11.666l-1.986 1.191A1 1 0 017 12V3zm-4 .503A2.497 2.497 0 015.498 1H17a4 4 0 014 4v14a4 4 0 01-4 4H5.498a2.495 2.495 0 01-2.309-1.546A2.5 2.5 0 013 20.497V3.503zm6 6.73l.986-.59a.991.991 0 011.028 0l.986.591V3H9v7.234z'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 24,
   height: 24,
   fill: colors.lightBlueGrey
}

export default SvgComponent
