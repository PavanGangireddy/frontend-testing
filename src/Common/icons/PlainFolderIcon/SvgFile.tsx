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
      height: 14,
      fill: Colors.white
   }

   render(): React.ReactNode {
      const { width, height, fill } = this.props

      return (
         <svg width={width} height={height} fill='none' viewBox='0 0 16 14'>
            <path
               fill={fill}
               d='M14.029 2.55H8.965a.753.753 0 01-.545-.236L6.84.593C6.46.2 5.94-.003 5.413 0H1.97C.884 0 0 .914 0 2.038v9.924C0 13.086.884 14 1.971 14h12.067c1.086-.005 1.967-.924 1.962-2.044V4.588c0-1.124-.884-2.039-1.971-2.039zm.765 9.408c.002.436-.34.793-.76.795H1.972a.78.78 0 01-.765-.791V2.038a.78.78 0 01.765-.792H5.45c.202 0 .397.083.528.218L7.55 3.176c.369.394.885.62 1.416.62h5.064a.78.78 0 01.765.792v7.37z'
            />
         </svg>
      )
   }
}

export default SvgComponent
