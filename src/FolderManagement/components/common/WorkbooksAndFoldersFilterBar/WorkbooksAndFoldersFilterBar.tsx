import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import SelectField from '../../../../Common/components/SelectField'
import SortIcon from '../../../../Common/icons/SortIcon'
import BreadCrumb from '../../../../Common/components/BreadCrumb'
import RightArrowIcon from '../../../../Common/icons/RightArrowIcon'
import Colors from '../../../../Common/themes/Colors'
import GridViewIcon from '../../../../Common/icons/GridViewIcon'
import ListViewIcon from '../../../../Common/icons/ListViewIcon'
import Button from '../../../../Common/components/Button'
import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'
import ProjectIcon from '../../../../Common/icons/ProjectIcon'

import {
   SHARED_WITH_ME,
   TRASH,
   HOME,
   itemsViewOptions,
   PUBLISH,
   home
} from '../../../constants/UIConstants'
import PathInfoItem from '../../../stores/models/PathInfoItem'

import {
   FilterBarContainer,
   Section,
   SelectContainerCSS,
   SelectFieldCSS,
   VerticalLine,
   IconContainer,
   IconsContainer,
   SortIconAndLabelContainer,
   SortLabel,
   Title,
   HomeTitleContainer,
   Home,
   Separator,
   TitleSection,
   SharedWithMeSortContainerCSS,
   ButtonWrapper,
   TextContainer,
   HomeProjectContainer,
   ProjectName,
   BreadCrumbContainer,
   ProjectTitleBarContainer,
   ProjectsTitle
} from './styledComponents'

// FIXME: Need to fix WithTranslation
interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

interface OrderByProps {
   label: string
   value: string
}

interface WorkbooksAndFoldersFilterBarProps extends WithTranslationProps {
   pathInfo: Array<PathInfoItem>
   itemsView: string
   orderBy: OrderByProps
   orderOptions: Array<OrderByProps>
   onClickGridViewButton: () => void
   onClickListViewButton: () => void
   onChangeOrder: (order: string) => void
   onDoubleClickFolder: (folderId: string) => void
   isSharedWithMe: boolean
   currentRoute?: string
   isEmptyTrash?: boolean
   onClickEmptyTrash?: () => void
}

@observer
class WorkbooksAndFoldersFilterBar extends Component<
   WorkbooksAndFoldersFilterBarProps
> {
   @observable isGridViewActive

   constructor(props) {
      super(props)
      const { itemsView } = props
      if (itemsView === itemsViewOptions.GRID) {
         this.isGridViewActive = true
      } else {
         this.isGridViewActive = false
      }
   }

   onDoubleClickFolder = (folderId: string): void => {
      const { onDoubleClickFolder } = this.props
      onDoubleClickFolder(folderId)
   }

   onClickHomeFolder = (): void => {
      const { onDoubleClickFolder } = this.props
      const { isSharedWithMe } = this.props
      const routeConstant = isSharedWithMe ? SHARED_WITH_ME : HOME
      onDoubleClickFolder(routeConstant)
   }

   renderTitle = (): string => {
      const { isSharedWithMe, t, currentRoute } = this.props
      return isSharedWithMe
         ? t('folderManagement:sharedWithMe.sharedWithMe')
         : currentRoute === TRASH
         ? t('folderManagement:trash:trash')
         : currentRoute === home
         ? t('folderManagement:home.yourProjects')
         : t('folderManagement:home.all')
   }

   renderRootPath = (): string => {
      const { isSharedWithMe, t, pathInfo } = this.props
      return isSharedWithMe
         ? t('folderManagement:sharedWithMe.sharedWithMe')
         : pathInfo[0].name
   }

   renderHomePath = (): ReactNode => {
      const { isSharedWithMe, pathInfo } = this.props
      return isSharedWithMe ? (
         <Home data-testid={'routePath'}>{this.renderRootPath()}</Home>
      ) : (
         <HomeProjectContainer
            onClick={(): void => this.onDoubleClickFolder(pathInfo[0].id)}
         >
            <ProjectIcon />
            <ProjectName>{this.renderRootPath()}</ProjectName>
         </HomeProjectContainer>
      )
   }

   renderSeparator = (): ReactNode => {
      const { isSharedWithMe, pathInfo } = this.props
      return isSharedWithMe || pathInfo.length !== 1 ? (
         <Separator>
            <RightArrowIcon fill={Colors.black} />
         </Separator>
      ) : null
   }

   renderSection = () => {
      const { pathInfo, isSharedWithMe } = this.props
      if (pathInfo) {
         if (pathInfo.length === 0) {
            return <Title>{this.renderTitle()}</Title>
         }
         return (
            <BreadCrumbContainer>
               <BreadCrumb
                  crumbs={isSharedWithMe ? pathInfo : pathInfo.slice(1)}
                  onClickBreadCrumbItem={(selectedBreadCrumbId): any =>
                     this.onDoubleClickFolder(selectedBreadCrumbId)
                  }
                  selectedBreadCrumbId={pathInfo[pathInfo.length - 1].id}
               />
            </BreadCrumbContainer>
         )
      }
   }

   getSelectContainerCSS = () =>
      this.props.isSharedWithMe
         ? SharedWithMeSortContainerCSS
         : SelectContainerCSS

   renderSortOption = () => {
      const {
         isSharedWithMe,
         orderBy,
         orderOptions,
         onChangeOrder,
         t
      } = this.props
      return isSharedWithMe ? null : (
         <>
            <SortIconAndLabelContainer>
               <SortIcon />
               <SortLabel>{t('folderManagement:home.sortBy')}</SortLabel>
            </SortIconAndLabelContainer>
            <SelectField
               containerCSS={this.getSelectContainerCSS()}
               selectFieldCSS={SelectFieldCSS}
               options={orderOptions}
               onChange={onChangeOrder}
               defaultValue={orderBy}
               data-testid={'orderBySelectField'}
               isSearchable={false}
            />
         </>
      )
   }
   //TODO:remove the unusedCode
   onClickGridViewButton = (): void => {
      const { onClickGridViewButton } = this.props
      this.isGridViewActive = true
      onClickGridViewButton()
   }

   onClickListViewButton = (): void => {
      const { onClickListViewButton } = this.props
      this.isGridViewActive = false
      onClickListViewButton()
   }

   isPublishRoute = () => {
      const { currentRoute } = this.props
      return currentRoute === PUBLISH
   }

   onClickEmptyTrash = (): void => {
      const { onClickEmptyTrash } = this.props
      if (onClickEmptyTrash) {
         if (onClickEmptyTrash) {
            onClickEmptyTrash()
         }
      }
   }

   renderEmptyFolderButton = (): ReactNode => {
      const { currentRoute, isEmptyTrash, t } = this.props
      if (currentRoute === TRASH) {
         return (
            <ButtonWrapper
               variant={Button.variants.secondary}
               onClick={this.onClickEmptyTrash}
               disabled={isEmptyTrash}
               id={'emptyTrash'}
            >
               <TextContainer>
                  {t('folderManagement:trash.emptyTrash')}
               </TextContainer>
            </ButtonWrapper>
         )
      }
      return null
   }

   renderHomeTitleBar = (): ReactNode => (
      <ProjectTitleBarContainer data-testid={'homeFilterBar'}>
         <ProjectsTitle>{this.renderTitle()}</ProjectsTitle>
      </ProjectTitleBarContainer>
   )

   isHomeRoute = (): boolean => {
      const { currentRoute } = this.props
      return currentRoute === HOME
   }

   renderFilterBar = (): ReactNode => {
      const {
         props: { currentRoute, isSharedWithMe, pathInfo }
      } = this
      if (isMobileDevice) {
         if (
            isSharedWithMe ||
            currentRoute === TRASH ||
            pathInfo.length !== 0
         ) {
            return (
               <FilterBarContainer
                  data-testid={'filterBar'}
                  pathInfo={pathInfo}
               >
                  <TitleSection>{this.renderSection()}</TitleSection>
                  {this.renderEmptyFolderButton()}
               </FilterBarContainer>
            )
         }
         return null
      }
      return this.isHomeRoute() ? (
         this.renderHomeTitleBar()
      ) : (
         <FilterBarContainer data-testid={'filterBar'} pathInfo={pathInfo}>
            <TitleSection>{this.renderSection()}</TitleSection>
            <Section>{this.renderSortOption()}</Section>
         </FilterBarContainer>
      )
   }

   render(): ReactNode {
      return this.renderFilterBar()
   }
}

export default withTranslation()(WorkbooksAndFoldersFilterBar)
