import * as React from 'react'

interface Props {
   width: number
   height: number
}

class MessageSquare extends React.Component<Props> {
   static defaultProps = {
      width: 16,
      height: 16
   }
   render() {
      const { width, height, ...props } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 16 16'
            {...props}
         >
            <path
               fill='#0967D2'
               fillRule='evenodd'
               d='M4.667 6.667a.667.667 0 111.333 0 .667.667 0 01-1.333 0zM8 6a.667.667 0 10.001 1.335A.667.667 0 008 6zm2.667 0a.667.667 0 10.001 1.335A.667.667 0 0010.667 6zm2.666 4a.668.668 0 01-.666.667H5.703c-.362 0-.718.098-1.03.285l-2.006 1.204V3.333c0-.367.299-.666.666-.666h9.334c.367 0 .666.299.666.666V10zm-.666-8.667H3.333c-1.102 0-2 .898-2 2v10a.668.668 0 001.01.572l3.016-1.81A.672.672 0 015.703 12h6.964c1.102 0 2-.897 2-2V3.333c0-1.102-.898-2-2-2z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default MessageSquare
