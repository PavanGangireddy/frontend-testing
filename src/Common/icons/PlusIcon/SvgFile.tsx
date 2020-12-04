import React from 'react'

interface Props {
   width: string
   height: string
   fill: string
   className: string
}

export default function SvgComponent(props: Props): JSX.Element {
   const { width, height, fill } = props
   return (
      <svg
         xmlns='http://www.w3.org/2000/svg'
         {...props}
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 16 17'
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M7.25 7.426v-5.25h1.5v5.25H14v1.5H8.75v5.25h-1.5v-5.25H2v-1.5h5.25z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: '16',
   height: '16',
   fill: '#171F46'
}
