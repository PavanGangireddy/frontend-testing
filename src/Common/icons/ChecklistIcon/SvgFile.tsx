import React, { Component } from 'react'

import Colors from '../../themes/Colors'

interface Props {
   width: number
   height: number
   fill: string
}
class SvgComponent extends Component<Props> {
   static defaultProps = {
      width: 24,
      height: 24,
      fill: Colors.tabBarIcon
   }

   render(): React.ReactNode {
      const { width, height, fill, ...other } = this.props
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
               fillRule='evenodd'
               d='M8 3H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-2v.5A1.5 1.5 0 0114.5 5h-5A1.5 1.5 0 018 3.5V3z'
               clipRule='evenodd'
               opacity={0.3}
            />
            <path
               fill={fill}
               fillRule='evenodd'
               d='M10.875 15.75a.943.943 0 01-.67-.287l-1.918-1.917a.927.927 0 010-1.342c.384-.383 1.007-.383 1.342 0l1.246 1.246 3.162-3.162a.926.926 0 011.342 0 .926.926 0 010 1.341l-3.833 3.834a.948.948 0 01-.671.287zM13 2h1.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5H11a1 1 0 012 0z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SvgComponent
