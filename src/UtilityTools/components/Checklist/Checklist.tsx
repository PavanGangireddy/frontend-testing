import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
//eslint-disable-next-line
import { withTranslation, WithTranslation } from 'react-i18next'

import AddIcon from '../../../Common/icons/PlusIcon'
import Colors from '../../../Common/themes/Colors'

import ChecklistItemModel from '../../stores/models/ChecklistItemModel'
import { NewCheckListType } from '../../stores/types'

import ChecklistItem from '../ChecklistItem'

import {
   ChecklistContainer,
   AddChecklistContainer,
   AddButtonCaption,
   ChecklistWrapper,
   NoChecklistItemsContainer,
   NoChecklistItemsCaption
} from './styledComponents'
import AddCheckListItem from './AddCheckListItem'

interface ChecklistProps extends WithTranslation {
   checklist: Array<ChecklistItemModel>
   onAddChecklistItem: (requestObject: NewCheckListType) => void
   onUpdateChecklistItem?: () => void
   onPostNewChecklistItem: () => void
   removeNewChecklistItem: (id: string) => void
   newItemId?: string
}

@observer
class Checklist extends Component<ChecklistProps> {
   @observable isAddingChecklistItem!: boolean

   constructor(props) {
      super(props)
      this.isAddingChecklistItem = false
   }

   onChangeAddChecklistItem = () => {
      this.isAddingChecklistItem = !this.isAddingChecklistItem
   }

   onPostNewChecklistItem = () => {
      const { onPostNewChecklistItem } = this.props
      onPostNewChecklistItem()
   }

   onRemoveNewChecklistItem = (id: string) => {
      const { removeNewChecklistItem } = this.props
      removeNewChecklistItem(id)
   }

   renderChecklist = (
      checklist: Array<ChecklistItemModel>
   ): Array<JSX.Element> =>
      checklist.map(checklistItem => (
         <ChecklistItem
            removeNewChecklistItem={this.onRemoveNewChecklistItem}
            onPostNewChecklistItem={this.onPostNewChecklistItem}
            key={checklistItem.id}
            checklistItem={checklistItem}
         />
      ))

   onClickAddChecklistItem = (requestObject: NewCheckListType) => {
      const {
         props: { onAddChecklistItem },
         onChangeAddChecklistItem
      } = this
      onChangeAddChecklistItem()
      onAddChecklistItem(requestObject)
   }

   renderChecklistView = (): JSX.Element => {
      const {
         props: { checklist, t },
         isAddingChecklistItem,
         renderChecklist,
         renderAddButton,
         onClickAddChecklistItem
      } = this
      if (checklist.length) {
         return (
            <ChecklistContainer>
               {renderChecklist(checklist)}
               {isAddingChecklistItem && (
                  <AddCheckListItem
                     onClickAddChecklistItem={onClickAddChecklistItem}
                  />
               )}
               {renderAddButton()}
            </ChecklistContainer>
         )
      }
      return (
         <NoChecklistItemsContainer data-testid='noCheckListsDataContainer'>
            {!isAddingChecklistItem && (
               <NoChecklistItemsCaption data-testid='noCheckListsData'>
                  {t('utilityTools:checklist.noChecklistItems')}
               </NoChecklistItemsCaption>
            )}
            {isAddingChecklistItem && (
               <AddCheckListItem
                  onClickAddChecklistItem={onClickAddChecklistItem}
               />
            )}
            {renderAddButton()}
         </NoChecklistItemsContainer>
      )
   }

   renderAddButton = (): ReactElement => {
      const { t } = this.props
      return (
         <AddChecklistContainer
            onClick={this.onChangeAddChecklistItem}
            data-testid='addChecklistButton'
         >
            <AddIcon fill={Colors.brightBlue} />
            <AddButtonCaption>
               {t('utilityTools:checklist.addCheckList')}
            </AddButtonCaption>
         </AddChecklistContainer>
      )
   }

   render() {
      return <ChecklistWrapper>{this.renderChecklistView()}</ChecklistWrapper>
   }
}

export default withTranslation()(Checklist)
