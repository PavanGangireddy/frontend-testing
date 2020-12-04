import React, { Component } from 'react'

interface Props {
   width: number
   height: number
   fill: string
   className?: string
}

class SvgComponent extends Component<Props> {
   static defaultProps = {
      width: 7,
      height: 12,
      fill: '#ffffff'
   }

   render(): React.ReactNode {
      const { width, height, fill, className } = this.props

      return (
         <svg
            width={width}
            height={height}
            fill={fill}
            className={className}
            viewBox='0 0 7 12'
         >
            <path
               fill={fill}
               fillRule='evenodd'
               d='M1.126 12L0 10.85 4.747 6 0 1.15 1.126 0l5.19 5.3c.38.39.38 1.01 0 1.4L1.125 12z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SvgComponent
