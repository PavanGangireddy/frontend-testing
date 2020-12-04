import React from 'react'

interface Props {
   fill: string
   className: string
}
export default function SvgComponent(props: Props): JSX.Element {
   const { fill } = props
   return (
      <svg
         {...props}
         xmlns='http://www.w3.org/2000/svg'
         width='14'
         height='8'
         fill='none'
         viewBox='0 0 14 8'
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M0 1.143C0 .512.448 0 1 0h12c.552 0 1 .512 1 1.143s-.448 1.143-1 1.143H1c-.552 0-1-.512-1-1.143zm0 5.714c0-.631.448-1.143 1-1.143h12c.552 0 1 .512 1 1.143S13.552 8 13 8H1c-.552 0-1-.512-1-1.143z'
            clipRule='evenodd'
         ></path>
      </svg>
   )
}

SvgComponent.defaultProps = {
   fill: '#7E858E'
}
