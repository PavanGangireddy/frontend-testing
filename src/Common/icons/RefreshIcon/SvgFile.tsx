import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         <path
            fill={fill}
            fillRule='evenodd'
            d='M6.948 1c3.536-.027 6.377 2.361 6.95 5.84a8.295 8.295 0 01-.236 3.774l1.691-.732.647 1.421-3.425 1.484a1 1 0 01-1.294-.475L9.828 9.376l1.436-.676.815 1.647a6.795 6.795 0 00.245-3.26c-.452-2.744-2.64-4.551-5.364-4.53C4.016 2.578 1.594 4.973 1.594 8c0 3.007 2.722 5.444 5.36 5.444.44 0 .797.349.797.778 0 .43-.357.778-.797.778C3.436 15 0 11.866 0 8a6.994 6.994 0 016.948-7z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
