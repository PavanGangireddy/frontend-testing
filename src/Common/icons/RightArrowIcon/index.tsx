import React from 'react'

import BaseSvg from '../BaseSvg'

import SvgComponent from './SvgFile'

export default function RightArrowIcon(props): JSX.Element {
   return <BaseSvg renderComponent={SvgComponent} {...props} />
}
