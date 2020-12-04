import * as React from 'react'

interface Props {
   width: number
   height: number
}

class FilterIcon extends React.Component<Props> {
   static defaultProps = {
      width: 24,
      height: 24
   }
   render() {
      const { width, height, ...props } = this.props
      return (
         <svg
            width={width}
            height={height}
            fill='none'
            viewBox='0 0 24 24'
            {...props}
         >
            <path
               fill='#616E7C'
               fillRule='evenodd'
               d='M10.877 17.457l2.026 1.533v-4.553c0-.166.042-.329.12-.475L17.323 6H6.643l4.122 7.978c.074.142.112.3.112.459v3.02zM13.903 22a.994.994 0 01-.603-.203l-4.026-3.045a1 1 0 01-.397-.797v-3.274L4.112 5.459A1 1 0 015 4h14a1 1 0 01.88 1.475l-4.977 9.215V21a1 1 0 01-1 1z'
               clipRule='evenodd'
            />
         </svg>
      )
   }
}

export default FilterIcon
