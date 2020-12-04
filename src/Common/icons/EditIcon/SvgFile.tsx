import React from 'react'

export default function SvgComponent(
   props: React.SVGProps<SVGSVGElement>
): JSX.Element {
   const { fill } = props
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         width='16'
         height='16'
         fill='none'
         viewBox='0 0 16 16'
         {...props}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M11.598 1.228a.777.777 0 011.1 0l2.074 2.074a.777.777 0 010 1.1l-10.37 10.37a.778.778 0 01-.55.228H1.778A.778.778 0 011 14.222v-2.074c0-.206.082-.404.228-.55l10.37-10.37zm-.943 3.142l.975.974 1.492-1.492-.974-.974-1.492 1.492zm-.125 2.074l-.974-.974-7 7v.974h.974l7-7z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

SvgComponent.defaultProps = {
   fill: '#7E858E' //TODO:need to add in color constants
}
