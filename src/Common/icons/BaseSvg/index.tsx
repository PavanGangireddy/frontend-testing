import * as React from 'react'

interface Props {
   renderComponent
   className?: string
   [x: string]: any
}

export default function BaseSvg(props: Props): JSX.Element {
   const { renderComponent: Component, className, ...other } = props
   return <Component className={className} {...other} />
}
