import * as React from 'react'

interface Props {
   width: number
   height: number
   fill: string
}

class OutlineCheckmarkCircle extends React.Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16,
      //TODO:
      // fill: colors.primary500Default
      fill: 'red'
   }
   render() {
      const { width, height, fill, ...props } = this.props
      return (
         <svg width={width} height={height} viewBox='0 0 16 16' {...props}>
            <path
               fill={fill}
               fillRule='evenodd'
               d='M9.803 5.596L7.28 8.91 6.192 7.52a.666.666 0 10-1.05.821l1.62 2.071c.127.161.32.255.526.255h.004a.664.664 0 00.526-.262l3.046-4a.666.666 0 00-1.061-.808zM8 13.333A5.34 5.34 0 012.667 8 5.34 5.34 0 018 2.667 5.34 5.34 0 0113.333 8 5.34 5.34 0 018 13.333zm0-12a6.668 6.668 0 10.001 13.333A6.668 6.668 0 008 1.333z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default OutlineCheckmarkCircle
