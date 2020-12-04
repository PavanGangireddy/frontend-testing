import React from 'react'
import { APIStatus } from '@ib/api-constants'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { WithTranslation, withTranslation } from 'react-i18next' //eslint-disable-line

import DeleteIcon from '../../../Common/icons/DeleteIcon'
import ClockIcon from '../../../Common/icons/ClockIcon'
import IbHubsVerticalLogo from '../../../Common/icons/IbHubsVerticalLogo'
import Avatar from '../../../Common/components/Avatar'
import SendIcon from '../../../Common/icons/SendIcon'
import AssignmentSingleFillIcon from '../../../Common/icons/AssignmentSingleFillIcon'
import {
   isTabletDevice,
   isMobileDevice
} from '../../../Common/utils/responsiveUtils'
import IDMLogoWithTitle from '../../../Common/icons/IDMLogoWithTitle'
import HomeIcon from '../../../Common/icons/HomeIcon'
import LearningIcon from '../../../Common/icons/LearningIcon'
import PersonalProjectIcon from '../../../Common/icons/PersonalProjectIcon'
import colors from '../../../Common/themes/Colors'

import AchievementsInfoCard from '../AchievementsInfoCard'

import { goToPage } from '../../utils/NavigationUtils.ts'
import { LEARNER } from '../../constants/UIConstants'
import WelcomeMessageUIStore from '../../stores/WelcomeMessageUIStore'

import {
   sideNavbarDataForLearner,
   PLAIN_FOLDER,
   CLOCK,
   DELETE,
   AVATAR,
   ASSIGNMENTS_ICON,
   sideNavbarDataForCreator,
   BOOK,
   SEND,
   PERSONAL_PROJECT
} from './constants'
import {
   UserProfileLayoutContainer,
   AvatarContainer,
   MenuItemsContainer,
   MenuItemWithIconContainer,
   IconContainer,
   MenuText,
   UserNameAndArrowContainer,
   CollapsedHeaderIBHubsIconContainer,
   CollapsedHeaderIconContainer,
   CollapsedFooterIconContainer,
   LogoAndMenuItemsContainer,
   LogoContainer,
   UserName,
   UserLearningPointsText
} from './styledComponents'

interface UserProfileProps {
   userName: string
   userProfilePic?: string
}

const UserProfile = (props: UserProfileProps): React.ReactElement => {
   const { userName } = props
   return (
      <CollapsedFooterIconContainer>
         {/**TODO: need to integrate profile-pic from backend */}
         <Avatar
            name={userName}
            size={AVATAR.extraSmall}
            variant={AVATAR.circle}
            type={AVATAR.outline}
            alt={AVATAR.alt}
         />
      </CollapsedFooterIconContainer>
   )
}

export const CollapsedFooterWithProfilePic = UserProfile

UserProfile.defaultProps = {
   userName: 'Steve Rodgers'
}

const renderIcon = (name, isActive) => {
   switch (name) {
      case PLAIN_FOLDER:
         return (
            <HomeIcon fill={isActive ? colors.white : colors.lightBlueGrey} />
         )
      case CLOCK:
         return (
            <ClockIcon fill={isActive ? colors.white : colors.lightBlueGrey} />
         )
      case DELETE:
         return (
            <DeleteIcon
               width={24}
               height={24}
               fill={isActive ? colors.white : colors.lightBlueGrey}
            />
         )
      case ASSIGNMENTS_ICON:
         return (
            <AssignmentSingleFillIcon
               fill={isActive ? colors.white : colors.lightBlueGrey}
            />
         )
      case BOOK:
         return (
            <LearningIcon
               fill={isActive ? colors.white : colors.lightBlueGrey}
            />
         )
      case SEND:
         return (
            <SendIcon fill={isActive ? colors.white : colors.lightBlueGrey} />
         )
      case PERSONAL_PROJECT:
         return (
            <PersonalProjectIcon
               fill={isActive ? colors.white : colors.lightBlueGrey}
            />
         )
   }
}

const onClickMenuItem = (
   history,
   currentRoute,
   hideWelcomeMessage = (): void => {}
) => {
   hideWelcomeMessage()
   goToPage(history, currentRoute)
}

interface UserOrCreatorDataType {
   iconName: string
   itemName: string
   hiddenInMobile?: boolean
   currentRoute: string
}

const getSideNavbarMenuItemsData = (
   role: string
): Array<UserOrCreatorDataType> => {
   if (role === LEARNER) {
      return sideNavbarDataForLearner
   }
   return sideNavbarDataForCreator
}

interface RenderMenuItemsProps extends RouteComponentProps {
   role: string
   history: any
   hideWelcomeMessage: () => void
}

function renderMenuItems(props: RenderMenuItemsProps): React.ReactNode {
   const { history, role, hideWelcomeMessage } = props
   const sideNavbarMenuItemsData = getSideNavbarMenuItemsData(role)
   return (
      <LogoAndMenuItemsContainer>
         <LogoContainer>
            <IDMLogoWithTitle />
         </LogoContainer>
         <MenuItemsContainer>
            {sideNavbarMenuItemsData.map(item => (
               <MenuItemWithIconContainer
                  key={item.itemName}
                  onClick={() =>
                     onClickMenuItem(
                        history,
                        item.currentRoute,
                        hideWelcomeMessage
                     )
                  }
                  data-testid={`sideBarMenuItem`}
                  hiddenInMobile={item.hiddenInMobile}
                  isActive={item.currentRoute === history.location.pathname}
               >
                  <IconContainer>
                     {renderIcon(
                        item.iconName,
                        item.currentRoute === history.location.pathname
                     )}
                  </IconContainer>
                  <MenuText
                     isActive={item.currentRoute === history.location.pathname}
                  >
                     {item.itemName}
                  </MenuText>
               </MenuItemWithIconContainer>
            ))}
         </MenuItemsContainer>
         <AchievementsInfoCard />
      </LogoAndMenuItemsContainer>
   )
}

export const RenderMenuItems = withRouter(renderMenuItems)

//TODO: Need to remove logout related props
interface UserProfileLayoutProps extends WithTranslation, RouteComponentProps {
   userName: string
   userProfilePic?: string
   logoutAPI?: Function
   history?: History
   logoutAPIStatus: APIStatus
}

const getAvatarSize = (): string => {
   if (isTabletDevice || isMobileDevice) {
      return Avatar.sizes.medium
   }
   return Avatar.sizes.large
}

function userProfileLayout(props: UserProfileLayoutProps): React.ReactElement {
   const { userName, t } = props
   return (
      <UserProfileLayoutContainer>
         {/**TODO: need to integrate profile-pic from backend */}
         <AvatarContainer>
            <Avatar
               name={userName}
               size={getAvatarSize()}
               variant={Avatar.variants.circle}
               type={Avatar.types.outline}
               alt={t('common:avatar.alt')}
            />
         </AvatarContainer>
         <UserNameAndArrowContainer>
            <UserName data-testid={'userName'}>{userName}</UserName>
         </UserNameAndArrowContainer>
         <UserLearningPointsText>
            {t('folderManagement:sideNavbar.learningPoints')}
         </UserLearningPointsText>
      </UserProfileLayoutContainer>
   )
}

export const ExpandedFooterWithUserProfileLayout = withRouter(
   withTranslation()(userProfileLayout)
)

ExpandedFooterWithUserProfileLayout.defaultProps = {
   userName: 'Steve Rodgers'
}

//TODO:need to remove this code
interface CollapsedHeaderWithIconsProps extends RouteComponentProps {
   role: string
   history: History
   welcomeMessageUIStore: WelcomeMessageUIStore
}

const collapsedHeaderWithIcons = (
   props: CollapsedHeaderWithIconsProps
): React.ReactElement => {
   const { history, role } = props
   const sideNavbarMenuItemsData = getSideNavbarMenuItemsData(role)
   return (
      <>
         <CollapsedHeaderIBHubsIconContainer>
            <IbHubsVerticalLogo width={50} height={51} />
         </CollapsedHeaderIBHubsIconContainer>
         {sideNavbarMenuItemsData.map(item => (
            <CollapsedHeaderIconContainer
               key={item.itemName}
               onClick={() => onClickMenuItem(history, item.itemName)}
               title={item.itemName}
            >
               {renderIcon(item.iconName, false)}
            </CollapsedHeaderIconContainer>
         ))}
      </>
   )
}

export const CollapsedHeaderWithIcons = withRouter(collapsedHeaderWithIcons)
