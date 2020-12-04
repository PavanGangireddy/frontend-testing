import React, { Component, ReactNode } from 'react'
import 'styled-components/macro'

import { TabContainerCSS } from '../../../FolderManagement/components/FolderManagementDashboard/styledComponents'

import { LabelValueType } from '../../stores/types'

import {
   TabBarContainer,
   TabTextContainer,
   TabContainer,
   IconContainer
} from './styledComponents'

interface TabBarProps {
   tabsList: Array<LabelValueType>
   defaultSelectedTab?: string
   onClickTab: Function
   containerCSS?: React.CSSProperties
   itemCSS?: React.CSSProperties
   tabContainerCSS?: React.CSSProperties
}

interface State {
   selectedTab: string
}

class TabBar extends Component<TabBarProps, State> {
   constructor(props: TabBarProps) {
      super(props)
      const { tabsList, defaultSelectedTab } = this.props
      this.state = {
         selectedTab: defaultSelectedTab
            ? defaultSelectedTab
            : tabsList[0].value
      }
   }

   onClickTab = (value: string): void => {
      const { onClickTab } = this.props
      this.setState({ selectedTab: value })
      onClickTab(value)
   }

   isActive = (value: string): boolean => {
      const { selectedTab } = this.state
      return value === selectedTab
   }

   renderIcon = (tab: LabelValueType): ReactNode =>
      tab.icon ? <IconContainer>{tab.icon}</IconContainer> : null

   renderTabs = (): React.ReactNode => {
      const { tabsList, itemCSS, tabContainerCSS } = this.props
      return tabsList.map(tab => {
         const onClickTabItem = (): void => this.onClickTab(tab.value)
         return (
            <TabContainer
               key={tab.value}
               onClick={onClickTabItem}
               isActive={this.isActive(tab.value)}
               data-testid={tab.value}
               css={tabContainerCSS}
            >
               {this.renderIcon(tab)}
               <TabTextContainer
                  isActive={this.isActive(tab.value)}
                  css={itemCSS}
               >
                  {tab.label}
               </TabTextContainer>
            </TabContainer>
         )
      })
   }

   render(): React.ReactNode {
      const { containerCSS } = this.props
      return (
         <TabBarContainer css={containerCSS}>
            {this.renderTabs()}
         </TabBarContainer>
      )
   }
}

export default TabBar
