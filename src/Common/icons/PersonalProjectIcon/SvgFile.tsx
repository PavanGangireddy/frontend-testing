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
            d='M19.5 20.5h-15A2.5 2.5 0 012 18V8.833a2.498 2.498 0 012.5-2.5h15a2.501 2.501 0 012.5 2.5v1.084a1.667 1.667 0 01-1.1 1.567l-8 2.908c-.598.218-1.257.2-1.842-.05L5.842 12.1a.833.833 0 01.019-1.541.828.828 0 01.639.008l5.225 2.241a.829.829 0 00.608 0l8-2.891V8.833A.83.83 0 0019.5 8h-15a.833.833 0 00-.833.834V18a.833.833 0 00.833.833h15a.833.833 0 00.833-.833v-4.167a.835.835 0 011.423-.589.834.834 0 01.244.59V18a2.5 2.5 0 01-2.5 2.5zM16.167 3.833A.835.835 0 0015.333 3H8.667a.834.834 0 100 1.667h6.666a.837.837 0 00.59-.244.837.837 0 00.244-.59z'
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
