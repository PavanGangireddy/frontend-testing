import * as React from 'react'

import BaseSvg from '../BaseSvg'

import SvgComponent from './SvgFile'

export default function MoveToIcon(props): JSX.Element {
   return <BaseSvg renderComponent={SvgComponent} {...props} />
}
