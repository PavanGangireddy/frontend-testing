import React, { Component, ReactNode } from 'react'

import { getDateFormat } from '../../../../Common/utils/DateUtils'

import {
   NameContainer,
   BaseColumnContainer
} from '../PublishedListHeader/styledComponents'

import {
   PublishedWorkbookListItemContainer,
   NameLabel,
   DateLabel
} from './styledComponents'

interface WorkbookDetailsProps {
   id: string
   name: string
   publishedDateTime: string
   totalSelectedUsersCount: number
   publishedUsersCount: number
}

interface PublishedWorkbookListItemProps {
   workbookDetails: WorkbookDetailsProps
}

class PublishedWorkbookListItem extends Component<
   PublishedWorkbookListItemProps
> {
   render(): ReactNode {
      const {
         name,
         publishedDateTime,
         totalSelectedUsersCount,
         publishedUsersCount
      } = this.props.workbookDetails
      return (
         <PublishedWorkbookListItemContainer>
            <NameContainer>
               <NameLabel>{name}</NameLabel>
            </NameContainer>
            <BaseColumnContainer>
               <DateLabel>{getDateFormat(publishedDateTime)}</DateLabel>
            </BaseColumnContainer>
            <BaseColumnContainer>
               <DateLabel>{totalSelectedUsersCount}</DateLabel>
            </BaseColumnContainer>
            <BaseColumnContainer>
               <DateLabel>{publishedUsersCount}</DateLabel>
            </BaseColumnContainer>
         </PublishedWorkbookListItemContainer>
      )
   }
}

export default PublishedWorkbookListItem
