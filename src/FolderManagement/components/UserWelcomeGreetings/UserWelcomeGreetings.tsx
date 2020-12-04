import React, { ReactElement } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'

import {
   GreetingsContainer,
   ImageContainer,
   MessageContainer,
   MessageDescription,
   MessageHeading,
   WelcomeImage
} from './styledComponent'

interface UserWelcomeGreetingsProps extends WithTranslation {
   userName: string
}

function UserWelcomeGreetings(props: UserWelcomeGreetingsProps): ReactElement {
   const { userName, t } = props
   return (
      <GreetingsContainer>
         <MessageContainer>
            <MessageHeading>
               {t('folderManagement:home.welcome')} {userName}!
            </MessageHeading>
            <MessageDescription>
               {t('folderManagement:home.firstTimeUserMessage')}
            </MessageDescription>
         </MessageContainer>
         <ImageContainer>
            <WelcomeImage
               src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/27f25ee7-e400-4384-be18-f68884313e5c.png'
               alt='Welcome Image'
            />
         </ImageContainer>
      </GreetingsContainer>
   )
}

export default withTranslation()(UserWelcomeGreetings)
