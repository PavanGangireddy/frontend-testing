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
      const { width, height, fill } = this.props

      return (
         <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 16 16'
         >
            <path
               fill={fill}
               fillRule='evenodd'
               d='M4.25 2c0-.966.784-1.75 1.75-1.75h4c.966 0 1.75.784 1.75 1.75v1.5h2.5a.75.75 0 010 1.5h-.5v9A1.75 1.75 0 0112 15.75H4A1.75 1.75 0 012.25 14V5h-.5a.75.75 0 010-1.5h2.5V2zM6 1.75a.25.25 0 00-.25.25v1.25h4.5V2a.25.25 0 00-.25-.25H6zm-2.25 3.5V14c0 .138.112.25.25.25h1.5v-9H3.75zm5.25 9H7v-9h2v9zm1.5 0H12a.25.25 0 00.25-.25V5.25H10.5v9z'
               clipRule='evenodd'
            ></path>
         </svg>
      )
   }
}

export default SvgComponent
