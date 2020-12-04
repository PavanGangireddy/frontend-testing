import * as React from 'react'

import colors from '../../themes/Colors'

interface Props {
   width: number
   height: number
   fill: string
}

function SvgComponent(props: Props): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 24 24'
         {...other}
      >
         <path
            fill={fill}
            d='M7.5 12.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 3a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z'
         />
         <path
            fill={fill}
            fillRule='evenodd'
            d='M12 1.5c-.853 0-1.594.475-1.975 1.17-.071.131-.149.23-.216.287A.22.22 0 019.745 3H8.25a1.5 1.5 0 00-1.324.794A3.75 3.75 0 003.75 7.5v11.25A3.75 3.75 0 007.5 22.5h9a3.75 3.75 0 003.75-3.75V7.5a3.75 3.75 0 00-3.176-3.706A1.5 1.5 0 0015.75 3h-1.495a.208.208 0 01-.064-.043 1.04 1.04 0 01-.216-.286A2.25 2.25 0 0012 1.5zm-.659 1.89a.75.75 0 011.318 0c.127.234.309.495.555.706.25.214.6.404 1.036.404h1.5V6h-7.5V4.5h1.5c.435 0 .786-.19 1.036-.404a2.52 2.52 0 00.555-.705zm5.909 1.988V6a1.5 1.5 0 01-1.5 1.5h-7.5A1.5 1.5 0 016.75 6v-.622A2.25 2.25 0 005.25 7.5v11.25A2.25 2.25 0 007.5 21h9a2.25 2.25 0 002.25-2.25V7.5a2.25 2.25 0 00-1.5-2.122z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 24,
   height: 24,
   fill: colors.lightBlueGrey
}

export default SvgComponent
