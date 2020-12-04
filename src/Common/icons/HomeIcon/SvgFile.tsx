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
            d='M10.182 21.091a.91.91 0 01-.909.909H4.27a2.277 2.277 0 01-1.607-.667A2.268 2.268 0 012 19.725v-7.728c0-1.017.582-2.276 1.36-2.936l8.05-6.844a.912.912 0 011.178 0l8.053 6.844c.777.662 1.36 1.917 1.36 2.937v7.727A2.277 2.277 0 0119.727 22h-5a.91.91 0 01-.909-.909v-5.454h-3.636v5.454zm9.545-.909a.455.455 0 00.455-.458v-7.727c0-.485-.347-1.235-.718-1.55L12 4.102l-7.464 6.345c-.37.314-.718 1.066-.718 1.55v7.727a.454.454 0 00.452.458h4.094v-5.454a.912.912 0 01.909-.91h5.454a.907.907 0 01.909.909v5.455h4.09z'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 24,
   height: 24,
   fill: colors.white
}

export default SvgComponent
