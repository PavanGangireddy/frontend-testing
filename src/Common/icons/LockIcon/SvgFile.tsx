import * as React from 'react'

interface Props {
   width: number
   height: number
}

function SvgComponent(props: Props): JSX.Element {
   const { width, height, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 64 64'
         {...other}
      >
         <path
            stroke='#424A60'
            strokeLinecap='round'
            strokeMiterlimit={10}
            strokeWidth={4}
            d='M18.526 31.44V14.148c0-6.547 5.81-11.903 12.913-11.903 7.101 0 12.912 5.356 12.912 11.903v17.29H18.526z'
         />
         <path fill='#EBBA16' d='M55.579 28.07H8.42V64h47.158V28.07z' />
         <path
            fill='#424A60'
            d='M32 50.526a3.378 3.378 0 01-3.368-3.368v-6.737A3.378 3.378 0 0132 37.053a3.379 3.379 0 013.369 3.368v6.737A3.378 3.378 0 0132 50.526z'
         />
         <path fill='#38454F' d='M55.579 57.264H8.42V64h47.158v-6.736z' />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 64,
   height: 64
}

export default SvgComponent
