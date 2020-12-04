import * as React from 'react'

interface Props {
   width: number
   height: number
   fill: string
}

class FilledCheckmarkCircle extends React.Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16,
      fill: 'green'
   }
   render() {
      const { width, height, fill, ...props } = this.props
      return (
         <svg width={width} height={height} viewBox='0 0 16 16' {...props}>
            <path
               fill={fill}
               fillRule='evenodd'
               d='M10.864 6.404l-3.046 4a.667.667 0 01-.526.263h-.004a.67.67 0 01-.525-.256L5.142 8.34a.667.667 0 111.05-.822L7.28 8.91l2.523-3.313a.667.667 0 011.061.808zM8 1.334a6.666 6.666 0 100 13.333A6.666 6.666 0 008 1.334z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default FilledCheckmarkCircle
