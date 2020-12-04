import React, { Component } from 'react'

import Colors from '../../themes/Colors'

interface Props {
   width: number
   height: number
   fill: string
}
class SvgComponent extends Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16,
      fill: Colors.white
   }

   render(): React.ReactNode {
      const { width, height, fill } = this.props

      return (
         <svg width={width} height={height} fill='none' viewBox='0 0 16 16'>
            <path
               fill={fill}
               d='M14.316 4.21a.667.667 0 00-.31.89A6.674 6.674 0 018 14.667 6.675 6.675 0 011.333 8 6.675 6.675 0 018 1.333a6.59 6.59 0 014.139 1.439.666.666 0 10.829-1.044A8.014 8.014 0 008 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8a7.921 7.921 0 00-.793-3.48.666.666 0 00-.89-.31z'
            />
            <path
               fill={fill}
               d='M7.999 2.667a.667.667 0 00-.667.667V8c0 .368.299.667.667.667h3.333a.667.667 0 000-1.333H8.665v-4a.667.667 0 00-.666-.667z'
            />
         </svg>
      )
   }
}

export default SvgComponent
