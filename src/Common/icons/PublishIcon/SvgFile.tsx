import * as React from 'react'

function SvgComponent(props: React.SVGProps<SVGSVGElement>): JSX.Element {
   const { width, height, fill, ...other } = props
   return (
      <svg
         width={width}
         height={height}
         fill='none'
         viewBox='0 0 16 16'
         {...other}
      >
         <path
            fill={fill}
            fillRule='evenodd'
            d='M15.78 1.218a.69.69 0 01.155.796l-5.87 12.552a.77.77 0 01-.571.422.81.81 0 01-.693-.206l-1.803-1.728-2.172 1.4a.816.816 0 01-.738.071.735.735 0 01-.463-.541l-.848-4.485L.324 7.861a.706.706 0 01-.319-.672.735.735 0 01.475-.587l14.452-5.548a.814.814 0 01.848.164zM4.594 10.793l.18.13 1.127 1.08-.961.62-.346-1.83zm1.804-.388l2.708 2.596 3.912-8.364-6.62 5.768zm5.191-6.502L2.364 7.444 3.944 8.5l1.298.933 6.347-5.53z'
            clipRule='evenodd'
         />
      </svg>
   )
}

SvgComponent.defaultProps = {
   width: 16,
   height: 16,
   fill: '#fff'
}

export default SvgComponent
