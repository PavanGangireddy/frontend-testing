import * as React from 'react'

import colors from '../../../Common/themes/Colors'

interface Props {
   width: number
   height: number
   fill: string
}

class PlusIcon extends React.Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16,
      fill: colors.white
   }
   render() {
      const { width, height, fill, ...props } = this.props
      return (
         <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
            <path
               fill={fill}
               fillRule='evenodd'
               d='M12.667 7.333h-4v-4a.667.667 0 00-1.334 0v4h-4a.666.666 0 100 1.334h4v4a.667.667 0 001.334 0v-4h4a.666.666 0 100-1.334'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default PlusIcon
