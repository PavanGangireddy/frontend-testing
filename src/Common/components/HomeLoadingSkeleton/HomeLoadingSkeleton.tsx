import React, { Component, ReactNode, CSSProperties } from 'react'
import { GridItemWrapper } from './styledComponents'

interface LoadingSkeletonProps {
   count: number
   skeletongridItem: ReactNode

   WrapperCss?: CSSProperties
}
class HomeLoadingSkeleton extends Component<LoadingSkeletonProps> {
   static defaultProps = {
      count: 8
   }

   get listOfGridItems() {
      const listOfGridItems: Array<{ id; gridItem }> = []
      const { count, skeletongridItem } = this.props
      for (let i = 0; i < count; i++) {
         listOfGridItems.push({ id: i, gridItem: skeletongridItem })
      }
      return listOfGridItems
   }
   render() {
      const { WrapperCss } = this.props
      return (
         <>
            {this.listOfGridItems.map(item => (
               <GridItemWrapper key={item.id} {...this.props} css={WrapperCss}>
                  {item.gridItem}
               </GridItemWrapper>
            ))}
         </>
      )
   }
}

export default HomeLoadingSkeleton
