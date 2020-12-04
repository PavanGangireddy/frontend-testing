import React, { ReactElement } from 'react'

import AssignmentIconClipBoardVariant from '../../../Common/icons/AssignmentIconClipBoardVariant'

import {
   AssignmentWorkbookNameText,
   IconContainer,
   NameAndIconContainer
} from './styledComponents'

interface AssignmentNameWithIconProps {
   workbookName: string
}

function AssignmentNameWithIcon(
   props: AssignmentNameWithIconProps
): ReactElement {
   const { workbookName } = props

   return (
      <NameAndIconContainer>
         <IconContainer>
            <AssignmentIconClipBoardVariant width={32} height={32} />
         </IconContainer>
         <AssignmentWorkbookNameText>{workbookName}</AssignmentWorkbookNameText>
      </NameAndIconContainer>
   )
}

export default AssignmentNameWithIcon
