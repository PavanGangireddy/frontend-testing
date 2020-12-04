import * as React from 'react'

import BaseSvg from '../BaseSvg'
import SvgComponent from './SvgFile'

export default function ReactSelectDropDownArrow(props): JSX.Element {
   return <BaseSvg renderComponent={SvgComponent} {...props} />
}
