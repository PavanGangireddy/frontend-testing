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
      height: 12,
      fill: Colors.darkBlueGrey
   }

   render(): React.ReactNode {
      const { width, height, fill } = this.props

      return (
         <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 16 12'
         >
            <path
               fill={fill}
               fillRule='evenodd'
               d='M1.56 5.82L0 7.167l3.953 4.482c.392.444 1.08.47 1.506.057L16 1.462 14.55 0 4.79 9.483 1.561 5.82z'
               clipRule='evenodd'
            ></path>
         </svg>
      )
   }
}

export default SvgComponent
