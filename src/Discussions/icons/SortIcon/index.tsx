import * as React from 'react'

interface Props {
   width: number
   height: number
}

class SortIcon extends React.Component<Props> {
   static defaultProps = {
      width: 24,
      height: 24
   }
   render() {
      const { width, height, ...props } = this.props
      return (
         <svg
            width={width}
            height={width}
            fill='none'
            viewBox='0 0 24 24'
            {...props}
         >
            <path
               fill='#616E7C'
               fillRule='evenodd'
               d='M5 7a1 1 0 011-1h12a1 1 0 010 2H6a1 1 0 01-1-1zm3 5a1 1 0 011-1h9a1 1 0 010 2H9a1 1 0 01-1-1zm4 4a1 1 0 000 2h6a1 1 0 000-2h-6z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default SortIcon
