import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={21} height={16} fill='none' viewBox='0 0 21 16'>
         <path
            stroke={fill}
            d='M16.5 4.444v-.5h-2.278a.389.389 0 11.001-.778H16.5V.89a.389.389 0 11.778 0v2.278h2.277a.39.39 0 110 .777h-2.277v2.278a.39.39 0 11-.778 0V4.444zM8 6.611A3.056 3.056 0 117.999.502 3.056 3.056 0 018 6.61zM.602 15.394a.826.826 0 01-.097-.13c.174-1.949 1.046-3.395 2.343-4.366 1.322-.99 3.12-1.51 5.137-1.51 2.055 0 3.88.494 5.21 1.469 1.314.963 2.182 2.424 2.304 4.462a.384.384 0 01-.02.152c-.002.004-.002.005-.005.006 0 0 0 0 0 0-.006.003-.044.023-.144.023H.72a.851.851 0 01-.117-.106z'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
