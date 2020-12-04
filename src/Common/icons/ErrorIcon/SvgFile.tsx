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
      fill: Colors.steel
   }

   render(): React.ReactNode {
      const { width, height, fill, ...other } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 16 16'
            {...other}
         >
            <path
               fillRule='evenodd'
               fill={fill}
               d='M8 14.75a6.75 6.75 0 100-13.5 6.75 6.75 0 000 13.5zM8 16A8 8 0 108 0a8 8 0 000 16zM7.04 4a.96.96 0 111.92 0l-.18 4.5a.78.78 0 01-1.56 0L7.04 4zm.935 6.5a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SvgComponent
