import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed, observable } from 'mobx'
import 'styled-components/macro'
import { withTranslation } from 'react-i18next'

import { MORE_PAGES_TEXT } from '../../constants/PaginationNavigationConstants'
import Colors from '../../themes/Colors'
import { WithTranslation } from '../../types'
import {
   Container,
   PageContainer,
   LeftArrowButton,
   RightArrowButton,
   PageText,
   LeftArrowIcon,
   RightArrowIcon,
   LeftArrowContainer,
   MainContainer,
   ItemsCountText
} from './styledComponents'

interface Props extends WithTranslation {
   totalNoOfItems: number
   itemsPerPage: number
   currentPage: number
   maxDisplayPagesCount: number
   onPagePress: (page: number) => void
   className?: string
   paginationContainerCSS?: React.CSSProperties
   leftArrowId?: string
   rightArrowId?: string
}

@observer
class PaginationNavigation extends Component<Props> {
   @observable currentPageNumber: number

   constructor(props) {
      super(props)
      const { currentPage } = this.props
      this.currentPageNumber = currentPage
   }

   static defaultProps = {
      leftArrowId: 'paginationLeftArrow',
      rightArrowId: 'paginationRightArrow'
   }

   setCurrentPageNumber = (page: number): void => {
      this.currentPageNumber = page
   }

   @computed get isRightArrowDisabled(): boolean {
      const { currentPage } = this.props
      return currentPage === this.getTotalPagesCount()
   }

   renderRightArrow = (): React.ReactNode => {
      const { rightArrowId } = this.props
      if (this.getTotalPagesCount() <= 1) {
         return null
      }
      return (
         <RightArrowButton
            data-testid={rightArrowId}
            isEnabled={!this.isRightArrowDisabled}
            onClick={this.onPressRightArrow}
         >
            <RightArrowIcon width={8} height={10} fill={Colors.cobaltTwo} />
         </RightArrowButton>
      )
   }

   isActivePage = (page): boolean => {
      const { currentPage } = this.props
      return page === currentPage
   }

   onPressPage = (page: number): void => {
      const { onPagePress } = this.props
      this.setCurrentPageNumber(page)
      onPagePress(page)
   }

   isEnabledPage = (page): boolean => page !== MORE_PAGES_TEXT

   @computed get displayPages(): Array<string | number> {
      const { currentPage, maxDisplayPagesCount } = this.props
      const totalPagesCount = this.getTotalPagesCount()
      const pages: Array<string | number> = []
      if (maxDisplayPagesCount >= totalPagesCount) {
         for (let i = 1; i <= totalPagesCount; i += 1) {
            pages.push(i)
         }
         return pages
      }

      if (currentPage < maxDisplayPagesCount - 2) {
         for (let i = 0; i < maxDisplayPagesCount; i++) {
            if (i === maxDisplayPagesCount - 2) {
               pages.push(MORE_PAGES_TEXT)
            } else if (i === maxDisplayPagesCount - 1) {
               pages.push(totalPagesCount)
            } else {
               pages.push(i + 1)
            }
         }
         return pages
      }

      if (currentPage > totalPagesCount - maxDisplayPagesCount + 3) {
         for (let i = 0; i < maxDisplayPagesCount; i++) {
            if (i === 1) {
               pages.push(MORE_PAGES_TEXT)
            } else if (i === 0) {
               pages.push(i + 1)
            } else {
               pages.push(totalPagesCount - maxDisplayPagesCount + i + 1)
            }
         }
         return pages
      }

      for (let i = 0; i < maxDisplayPagesCount; i++) {
         const midValue =
            maxDisplayPagesCount % 2 === 0
               ? Math.round(maxDisplayPagesCount / 2)
               : Math.round(maxDisplayPagesCount / 2) - 1

         if (i === 1 || i === maxDisplayPagesCount - 2) {
            pages.push(MORE_PAGES_TEXT)
         } else if (i === 0) {
            pages.push(i + 1)
         } else if (i === maxDisplayPagesCount - 1) {
            pages.push(totalPagesCount)
         } else if (i === midValue) {
            pages.push(currentPage)
         } else {
            pages.push(currentPage - midValue + i)
         }
      }

      return pages
   }

   renderPages = (): React.ReactNode => {
      if (this.getTotalPagesCount() <= 1) {
         return null
      }
      return this.displayPages.map(page => (
         <PageContainer
            key={page}
            onClick={() => {
               if (this.isEnabledPage(page))
                  this.onPressPage(parseInt(page.toString()))
            }}
            isEnabled={this.isEnabledPage(page)}
            isActive={this.isActivePage(page)}
            data-testid={`page${page}`}
         >
            <PageText isActive={this.isActivePage(page)}>{page}</PageText>
         </PageContainer>
      ))
   }

   onPressRightArrow = (): void => {
      const { currentPage, onPagePress } = this.props
      if (!this.isRightArrowDisabled) {
         this.setCurrentPageNumber(currentPage + 1)
         onPagePress(currentPage + 1)
      }
   }

   @computed get itemCount(): string {
      const { itemsPerPage, totalNoOfItems, currentPage, t } = this.props
      const totalItems = currentPage * itemsPerPage
      const itemsCompleted = (currentPage - 1) * itemsPerPage + 1
      if (totalItems >= totalNoOfItems) {
         return `${itemsCompleted}  ${t(
            'common:paginationNavigation.to'
         )} ${totalNoOfItems} ${t(
            'common:paginationNavigation.of'
         )} ${totalNoOfItems}`
      }
      return `${itemsCompleted} ${t(
         'common:paginationNavigation.to'
      )} ${totalItems} ${t('common:paginationNavigation.of')} ${totalNoOfItems}`
   }

   onPressLeftArrow = (): void => {
      const { currentPage, onPagePress } = this.props
      if (!this.isLeftArrowDisabled) {
         this.setCurrentPageNumber(currentPage - 1)
         onPagePress(currentPage - 1)
      }
   }

   @computed get isLeftArrowDisabled(): boolean {
      const { currentPage } = this.props
      return currentPage === 1
   }

   getTotalPagesCount = (): number => {
      const { totalNoOfItems, itemsPerPage } = this.props
      return Math.ceil(totalNoOfItems / itemsPerPage)
   }

   renderLeftArrow = (): React.ReactNode => {
      const { leftArrowId } = this.props
      if (this.getTotalPagesCount() <= 1) {
         return null
      }
      return (
         <LeftArrowButton
            data-testid={leftArrowId}
            isEnabled={!this.isLeftArrowDisabled}
            onClick={this.onPressLeftArrow}
         >
            <LeftArrowContainer>
               <LeftArrowIcon width={8} height={10} fill={Colors.black} />
            </LeftArrowContainer>
         </LeftArrowButton>
      )
   }

   render(): React.ReactNode {
      const {
         className,
         itemsPerPage,
         totalNoOfItems,
         paginationContainerCSS
      } = this.props
      if (!totalNoOfItems || itemsPerPage >= totalNoOfItems) {
         return null
      }

      return (
         <MainContainer className={className} css={paginationContainerCSS}>
            <ItemsCountText>{this.itemCount}</ItemsCountText>
            <Container>
               {this.renderLeftArrow()}
               {this.renderPages()}
               {this.renderRightArrow()}
            </Container>
         </MainContainer>
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   PaginationNavigation
)
