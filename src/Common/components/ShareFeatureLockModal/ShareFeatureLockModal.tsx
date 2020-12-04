import React, { Ref, Component } from 'react'
import { withTranslation } from 'react-i18next'

import BlackCloseIcon from '../../icons/BlackCloseIcon'
import LockIcon from '../../icons/LockIcon'
import { WithTranslation } from '../../types'

import BaseModalContainer from '../BaseModalContainer'

import {
   ShareLockFeatureContainer,
   Header,
   Divider,
   Title,
   CloseIconContainer,
   Body,
   LockText
} from './styledComponents'
import styles from './styles.module.css'

interface ShareFeatureLockModalProps extends WithTranslation {
   shareFeatureLockModalRef: Ref<BaseModalContainer>
   onCancel: () => void
}

class ShareFeatureLockModal extends Component<ShareFeatureLockModalProps> {
   render() {
      const { shareFeatureLockModalRef, onCancel, t } = this.props
      return (
         <BaseModalContainer
            ref={shareFeatureLockModalRef}
            hideCloseIcon
            dialogClass={styles.shareFeatureLockModal}
         >
            <ShareLockFeatureContainer>
               <Header>
                  <Title>{t('common:shareLock.share')}</Title>
                  <CloseIconContainer>
                     <BlackCloseIcon onClick={onCancel} />
                  </CloseIconContainer>
               </Header>
               <Divider />
               <Body>
                  <LockIcon />
                  <LockText as='p'>
                     {t('common:shareLock.infoMessage')}
                  </LockText>
               </Body>
            </ShareLockFeatureContainer>
         </BaseModalContainer>
      )
   }
}

export default withTranslation()(ShareFeatureLockModal)
