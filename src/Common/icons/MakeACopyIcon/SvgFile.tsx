import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   const { fill } = props
   return (
      <svg width={16} height={16} fill='none' viewBox='0 0 16 16' {...props}>
         <path
            fill={fill}
            fillRule='evenodd'
            d='M2.58 1C1.709 1 1 1.708 1 2.58v6.323c0 .873.708 1.58 1.58 1.58h.96a.67.67 0 00.67-.677.67.67 0 00-.67-.677h-.96a.226.226 0 01-.225-.226V2.581c0-.125.1-.226.226-.226h6.322c.125 0 .226.1.226.226v.959c0 .374.303.67.677.67a.671.671 0 00.678-.67v-.959c0-.873-.708-1.581-1.58-1.581H2.58zm4.517 4.516a1.58 1.58 0 00-1.58 1.58v6.323A1.58 1.58 0 007.097 15h6.322c.873 0 1.581-.708 1.581-1.58V7.096a1.58 1.58 0 00-1.58-1.58H7.096zm-.226 1.58c0-.124.101-.225.226-.225h6.322c.125 0 .226.101.226.226v6.322c0 .125-.1.226-.226.226H7.097a.225.225 0 01-.226-.226V7.097z'
            clipRule='evenodd'
         />
      </svg>
   )
}

export default SvgComponent

SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
