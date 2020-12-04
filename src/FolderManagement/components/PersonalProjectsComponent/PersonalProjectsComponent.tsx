import React, { Component } from 'react'

import CreatePersonalProject from './CreatePersonalProject'
import PersonalProjectsContent from './PersonalProjectsContent'
import { PersonalProjectsContainer } from './styledComponents'

interface PersonalProjectsComponentProps {
   isPersonalProjectsLocked: boolean
}

class PersonalProjectsComponent extends Component<
   PersonalProjectsComponentProps
> {
   render() {
      const { isPersonalProjectsLocked } = this.props
      return (
         <PersonalProjectsContainer>
            <PersonalProjectsContent />
            <CreatePersonalProject
               isPersonalProjectsLocked={isPersonalProjectsLocked}
            />
         </PersonalProjectsContainer>
      )
   }
}

export default PersonalProjectsComponent
