import * as React from 'react'
import ReactLoader from 'react-loader-spinner'

import colors from '../../themes/Colors'

interface LoaderProps {
   height?: number
   width?: number
   type?: string
   color?: string
   loaderTestId?: string

   [x: string]: any
}

class Loader extends React.Component<LoaderProps> {
   static defaultProps = {
      type: 'Oval',
      color: colors.primaryColor,
      height: 30,
      width: 30,
      loaderTestId: 'loader'
   }

   render() {
      const { height, width, type, color, loaderTestId, ...other } = this.props
      return (
         <ReactLoader
            type={type}
            color={color}
            height={height}
            width={width}
            data-testid={loaderTestId}
            {...other}
         />
      )
   }
}

export default Loader
