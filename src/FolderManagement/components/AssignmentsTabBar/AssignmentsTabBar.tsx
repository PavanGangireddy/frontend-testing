import { observer } from 'mobx-react'
import React, { Component, CSSProperties, ReactElement } from 'react'

import TabBar from '../../../Common/components/TabBar'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { assignmentsTabsList } from '../../constants/UIConstants'

import { itemCSS } from '../Assignments/styledComponents'

import {
   AssignmentsTabBarContainer,
   DesktopTabBarContainerCss,
   MobileTabBarContainerCss,
   MobileTabCss
} from './styledComponents'

interface AssignmentsTabBarProps {
   selectedTab: string
   onClickAssignmentsTab: (updatedTab: string) => void
}

@observer
class AssignmentsTabBar extends Component<AssignmentsTabBarProps> {
   getTabBarCss = (): CSSProperties =>
      isMobileDevice ? MobileTabBarContainerCss : DesktopTabBarContainerCss

   getTabContainerCss = (): CSSProperties =>
      isMobileDevice ? MobileTabCss : ''

   render(): ReactElement {
      const { selectedTab, onClickAssignmentsTab } = this.props
      return (
         <AssignmentsTabBarContainer>
            <TabBar
               tabsList={assignmentsTabsList}
               defaultSelectedTab={selectedTab}
               onClickTab={onClickAssignmentsTab}
               containerCSS={this.getTabBarCss()}
               tabContainerCSS={this.getTabContainerCss()}
               itemCSS={itemCSS}
            />
         </AssignmentsTabBarContainer>
      )
   }
}

export default AssignmentsTabBar
