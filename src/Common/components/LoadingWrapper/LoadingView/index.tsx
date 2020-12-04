import React from 'react'

import Loader from '../../Loader'
import { isMobileDevice } from '../../../utils/responsiveUtils'

interface LoadingViewProps {
   loaderTestId?: string
   height?: number
   width?: number
}

function LoadingView(props: LoadingViewProps) {
   const { loaderTestId, width, height } = props
   return <Loader width={width} height={height} data-testid={loaderTestId} />
}

LoadingView.defaultProps = {
   loaderTestId: 'loader',
   width: isMobileDevice ? 30 : 70,
   height: isMobileDevice ? 30 : 70
}

export default LoadingView
