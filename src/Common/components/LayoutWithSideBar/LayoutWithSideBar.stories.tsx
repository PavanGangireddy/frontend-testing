import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import tw from 'twin.macro'
import { API_SUCCESS } from '@ib/api-constants'

import MobileIcon from '../../icons/MobileIcon'
import CorrectIcon from '../../icons/CorrectIcon'
import DeleteIcon from '../../icons/DeleteIcon'
import RightArrowIcon from '../../icons/RightArrowIcon'
import PlainFolderIcon from '../../icons/PlainFolderIcon'
import TwoPersonsGroupIcon from '../../icons/TwoPersonsGroupIcon'
import ClockIcon from '../../icons/ClockIcon'
import {
   Typo15WhiteHKGroteskRegular,
   Typo13BrightBlueHKGroteskRegular,
   Typo14WhiteHKGroteskRegular
} from '../../styleGuide/Typos'
import Colors from '../../themes/Colors'

import Image from '../Image'

import LayoutWithSideBar from '.'

const SideBarSectionItemContainer = styled.div`
   ${tw`
      h-8 px-8 my-2 cursor-pointer flex items-center
    `}
`

const SideBarItemIconContainer = styled.div``

const SideBarSectionItemLabel = styled.span`
   ${tw`
      text-white ml-2
   `}
`

const MainSection = styled.div`
   ${tw`
      flex
   `}
`

const MainSectionContentContainer = styled.pre`
   ${tw`
      m-0 p-0
   `}
`

const UserProfileLayoutContainer = styled.div`
   ${tw`flex items-center px-24px`}
`

const UserProfilePic = styled(Image)`
   ${tw`h-35px object-contain mr-16px `}
`

const UserNameAndLogoutContainer = styled.div`
   ${tw`flex flex-col flex-grow`}
`

const UserName = styled(Typo15WhiteHKGroteskRegular)`
   ${tw`pb-4px leading-1.47`}
`

const LogoutText = styled(Typo13BrightBlueHKGroteskRegular)`
   ${tw`leading-1.46 cursor-pointer`}
`

const RightArrowContainer = styled.div`
   ${tw``}
`

const MenuItemWithIconContainer = styled.div`
   ${tw`flex items-center px-24px mt-8px cursor-pointer hover:bg-brightBlue`}
`

const IconContainer = styled.div`
   ${tw`flex items-center mr-6px py-8px`}
`

const MenuText = styled(Typo14WhiteHKGroteskRegular)`
   ${tw`leading-1.71 whitespace-no-wrap`}
`

const MenuItemsContainer = styled.div`
   ${tw`flex flex-col`}
`

const data = [
   { iconName: 'PlainFolder', itemName: 'Home' },
   { iconName: 'TwoPersonsGroup', itemName: 'Shared with me' },
   { iconName: 'Clock', itemName: 'Recent' },
   { iconName: 'Delete', itemName: 'Trash' }
]

const renderIcon = name => {
   switch (name) {
      case 'PlainFolder':
         return <PlainFolderIcon />
      case 'TwoPersonsGroup':
         return <TwoPersonsGroupIcon />
      case 'Clock':
         return <ClockIcon />
      case 'Delete':
         return <DeleteIcon fill={Colors.white} />
   }
}

const renderMenuItems = () => (
   <MenuItemsContainer>
      {data.map(item => (
         <MenuItemWithIconContainer key={item.itemName}>
            <IconContainer>{renderIcon(item.iconName)}</IconContainer>
            <MenuText>{item.itemName}</MenuText>
         </MenuItemWithIconContainer>
      ))}
   </MenuItemsContainer>
)

const UserProfileLayout = (
   <UserProfileLayoutContainer>
      <UserProfilePic
         src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/e207a623-4134-4bc2-8549-89403db01481@3x.png'
         alt='dp'
      />
      <UserNameAndLogoutContainer>
         <UserName>Steve Rodgers</UserName>
         <LogoutText>Log out</LogoutText>
      </UserNameAndLogoutContainer>
      <RightArrowContainer>
         <RightArrowIcon />
      </RightArrowContainer>
   </UserProfileLayoutContainer>
)

const collapsedHeader = (
   <>
      <MenuItemWithIconContainer>
         <IconContainer>
            <PlainFolderIcon />
         </IconContainer>
      </MenuItemWithIconContainer>
      <MenuItemWithIconContainer>
         <IconContainer>
            <TwoPersonsGroupIcon />
         </IconContainer>
      </MenuItemWithIconContainer>
      <MenuItemWithIconContainer>
         <IconContainer>
            <ClockIcon />
         </IconContainer>
      </MenuItemWithIconContainer>
      <MenuItemWithIconContainer>
         <IconContainer>
            <DeleteIcon fill={Colors.white} />
         </IconContainer>
      </MenuItemWithIconContainer>
   </>
)

const expandedHeader = (
   <>
      <SideBarSectionItemContainer>
         <SideBarItemIconContainer>
            <CorrectIcon />
         </SideBarItemIconContainer>
         <SideBarSectionItemLabel>Sample 1</SideBarSectionItemLabel>
      </SideBarSectionItemContainer>
      <SideBarSectionItemContainer>
         <SideBarItemIconContainer>
            <CorrectIcon />
         </SideBarItemIconContainer>
         <SideBarSectionItemLabel>Sample 2</SideBarSectionItemLabel>
      </SideBarSectionItemContainer>
      <SideBarSectionItemContainer>
         <SideBarItemIconContainer>
            <CorrectIcon />
         </SideBarItemIconContainer>
         <SideBarSectionItemLabel>Sample 3</SideBarSectionItemLabel>
      </SideBarSectionItemContainer>
      <SideBarSectionItemContainer>
         <SideBarItemIconContainer>
            <CorrectIcon />
         </SideBarItemIconContainer>
         <SideBarSectionItemLabel>Sample 4</SideBarSectionItemLabel>
      </SideBarSectionItemContainer>
   </>
)

const collapsedFooter = (
   <UserProfileLayoutContainer>
      <UserProfilePic
         src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/e207a623-4134-4bc2-8549-89403db01481@3x.png'
         alt='dp'
      />
   </UserProfileLayoutContainer>
)

const expandedFooter = (
   <SideBarSectionItemContainer>
      <SideBarItemIconContainer>
         <MobileIcon />
      </SideBarItemIconContainer>
      <SideBarSectionItemLabel>Sample Footer 5</SideBarSectionItemLabel>
   </SideBarSectionItemContainer>
)

storiesOf('Surfaces/SideBar Stories', module)
   .add('LayoutWithSideBar Component Vertical Scroll', () => (
      <LayoutWithSideBar
         collapsedHeaderView={collapsedHeader}
         expandedHeaderView={renderMenuItems()}
         collapsedFooterView={collapsedFooter}
         expandedFooterView={UserProfileLayout}
         status={API_SUCCESS}
         error={null}
         retryFunction={() => {}}
         searchBar={() => <div>searchBar</div>}
      >
         <MainSection>
            <MainSectionContentContainer>
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
               Main Section Main Section Main Section Main Section Main Section
               <br />
            </MainSectionContentContainer>
         </MainSection>
      </LayoutWithSideBar>
   ))
   .add('LayoutWithSideBar Component Horizontal Scroll', () => (
      <LayoutWithSideBar
         collapsedHeaderView={collapsedHeader}
         expandedHeaderView={expandedHeader}
         collapsedFooterView={collapsedFooter}
         expandedFooterView={expandedFooter}
         status={API_SUCCESS}
         error={null}
         retryFunction={() => {}}
         searchBar={() => <div>searchBar</div>}
      >
         <MainSection>
            <MainSectionContentContainer>
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
               Main Section Main Section Main Section Main Section Main Section
            </MainSectionContentContainer>
         </MainSection>
      </LayoutWithSideBar>
   ))
