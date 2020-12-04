import React, { Component } from 'react'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import { History } from 'history'

import IbHubsHorizontalIcon from '../../icons/IbHubsHorizontalIcon'
import UserStore from '../../../UserProfile/stores/UserStore'
import { goToLoginPage } from '../../../UserProfile/utils/NavigationUtils'

import Image from '../Image'

import DesktopDropDownMenuItem from './DesktopDropDownMenuItem'
import {
   HeaderContainer,
   NavBar,
   HomeLabel,
   HomeButton,
   imageCSS
} from './styledComponents'

// TODO: remove this header component and all components related to this header component
interface Props extends WithTranslation {
   shouldShowHome: boolean
   renderNavButtons?: Function
   userStore: UserStore
   history: History
}

@observer
class Header extends Component<Props> {
   static defaultProps = {
      renderNavButtons: () => null
   }
   onClickHome = (): void => {
      alert('clicked home')
      //TODO: Replace with home navigation
   }

   renderHomeLink = (): React.ReactNode => {
      const { shouldShowHome, t } = this.props
      if (shouldShowHome) {
         return (
            <HomeButton onClick={this.onClickHome}>
               <HomeLabel>{t('common.header.home')}</HomeLabel>
            </HomeButton>
         )
      }
      return null
   }

   getDropDownElement = (): React.ReactNode => {
      const { t } = this.props
      //TODO: replace this pic url
      return (
         <Image
            src={
               'data:image/jpeg;base64,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'
            }
            imageCSS={imageCSS}
            alt={t('common.header.profilePicAltText')}
         />
      )
   }

   renderNavButtons = (): React.ReactNode => {
      const { renderNavButtons } = this.props
      if (renderNavButtons) {
         return renderNavButtons()
      }
      return null
   }

   goToLoginPage = (): void => {
      const { history } = this.props
      goToLoginPage(history)
   }

   onSuccessLogout = (): void => {
      this.goToLoginPage()
   }

   onFailureLogout = (): void => {
      this.goToLoginPage()
   }

   onClickLogout = () => {}

   getProfileDropDownItems = () => {
      const { t } = this.props
      return [
         {
            onClick: this.onClickLogout,
            dropDownItemText: t('common.header.logout')
         }
      ]
   }

   render(): React.ReactNode {
      return (
         <HeaderContainer>
            <IbHubsHorizontalIcon />
            <NavBar>
               {this.renderHomeLink()}
               {this.renderNavButtons()}
               <DesktopDropDownMenuItem
                  renderDropDownElement={this.getDropDownElement}
                  dropDownItems={this.getProfileDropDownItems()}
               />
            </NavBar>
         </HeaderContainer>
      )
   }
}

export default withRouter(withTranslation()(Header))
