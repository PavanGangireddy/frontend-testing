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
      fill: Colors.darkBlueGrey
   }

   render(): React.ReactNode {
      const { width, height, fill } = this.props

      return (
         <svg
            {...this.props}
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 16 16'
         >
            <path
               fill={fill}
               fillRule='evenodd'
               d='M10.059 6.78a3.28 3.28 0 11-6.56-.002 3.28 3.28 0 016.56.002zm-.472 3.868a4.756 4.756 0 01-2.808.91 4.78 4.78 0 113.869-1.971L14 12.94l-1.06 1.061-3.354-3.353z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SvgComponent
