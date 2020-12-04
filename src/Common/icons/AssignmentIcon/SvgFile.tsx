import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
   return (
      <svg width={17} height={21} fill='none' viewBox='0 0 17 21' {...props}>
         <path
            stroke='#fff'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={1.3}
            d='M5.286 3.111H3.143c-.568 0-1.114.223-1.515.618A2.096 2.096 0 001 5.222V17.89c0 .56.226 1.097.628 1.493.401.396.947.618 1.515.618h10.714c.569 0 1.114-.222 1.515-.618.402-.396.628-.933.628-1.493V5.222c0-.56-.226-1.097-.628-1.493a2.163 2.163 0 00-1.515-.618h-2.143m-6.428 0c0 .56.225 1.097.627 1.493a2.16 2.16 0 001.516.618H9.57a2.16 2.16 0 001.516-.618c.402-.396.627-.933.627-1.493m-6.428 0c0-.56.225-1.097.627-1.493A2.164 2.164 0 017.43 1h2.14a2.16 2.16 0 011.516.618c.402.396.627.933.627 1.493M8.5 10.5h3.214M8.5 14.722h3.214M5.286 10.5h.01m-.01 4.222h.01'
         />
      </svg>
   )
}

export default SvgComponent
