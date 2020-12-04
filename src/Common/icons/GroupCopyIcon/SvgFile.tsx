import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 10 12'
         {...other}
      >
         <path
            fill={fill}
            d='M6.793 2.099H.987c-.544 0-.987.425-.987.948v8.004c0 .524.443.949.987.949h5.806c.545 0 .987-.425.987-.949V3.047c-.002-.523-.445-.948-.987-.948zm.294 8.95a.291.291 0 01-.297.285H.985a.291.291 0 01-.297-.285V3.047c0-.157.133-.285.297-.285H6.79c.164 0 .297.128.297.285v8.002z'
         />
         <path
            fill={fill}
            d='M9.013 0H3.207c-.544 0-.987.425-.987.949 0 .184.154.331.345.331a.337.337 0 00.346-.331.29.29 0 01.296-.285h5.806a.29.29 0 01.297.285v8.004a.291.291 0 01-.297.285.337.337 0 00-.345.332c0 .184.153.331.345.331.545 0 .987-.425.987-.948V.949C10 .425 9.558 0 9.013 0z'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 10,
   height: 12,
   fill: '#fff'
}

export default SvgComponent
