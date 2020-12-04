import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { action, observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import { WithTranslation } from '../../../Common/types'
import SelectField from '../../../Common/components/SelectField'

import { sortbyValues } from '../../constants/DiscussionConstants'

import CreateNewDiscussion from '../CreateNewDiscussion'

import {
   HeaderContainer,
   DropDownContainerCss,
   LabelCss,
   RightSection,
   AddThreadContainer,
   SelectContainer
} from './styledComponents'

interface DiscussionsHeaderProps extends WithTranslation {
   selectedSortbyValue: string
   onChangeSortbyValue: (value: string) => void
   createNewDiscussion: (
      data: {
         title: string
         description: string
      },
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => Promise<void | {}>
   getCreateNewDiscussionAPIStatus: APIStatus
   shouldDisableActions?: boolean
}
interface DropDownValueType {
   label: string
   value: string
}

@observer
class DiscussionsHeader extends Component<DiscussionsHeaderProps> {
   @observable sortbyOptions: DropDownValueType[] = []
   prefixForT = 'discussions:'

   constructor(props) {
      super(props)
      this.initValues()
   }

   @action.bound
   initValues() {
      const {
         prefixForT,
         props: { t }
      } = this
      const { oldest, latest } = sortbyValues
      // FIXME: Need to add top value for all sortbyOptions
      this.sortbyOptions = [
         { value: latest, label: t(`${prefixForT}newestToOldest`) },
         { value: oldest, label: t(`${prefixForT}oldestToNewest`) }
      ]
   }

   getMatchingDropDownValueFromOptionsData = (
      value: string,
      optionsData: DropDownValueType[]
   ) => optionsData.find(data => data.value === value)

   render() {
      const {
         props: {
            selectedSortbyValue,
            onChangeSortbyValue,
            createNewDiscussion,
            getCreateNewDiscussionAPIStatus
         },
         sortbyOptions,
         getMatchingDropDownValueFromOptionsData
      } = this
      const { shouldDisableActions } = this.props
      return (
         <HeaderContainer>
            <RightSection>
               <SelectContainer isDisabled={shouldDisableActions}>
                  <SelectField
                     options={sortbyOptions}
                     onChange={onChangeSortbyValue}
                     containerCSS={DropDownContainerCss}
                     selectFieldCSS={LabelCss}
                     defaultValue={getMatchingDropDownValueFromOptionsData(
                        selectedSortbyValue,
                        sortbyOptions
                     )}
                     data-testid={'discussionSortDropdown'}
                     isSearchable={false}
                     isDisabled={shouldDisableActions}
                  />
               </SelectContainer>
               <AddThreadContainer>
                  <CreateNewDiscussion
                     generateNewDiscussionFn={createNewDiscussion}
                     apiStatus={getCreateNewDiscussionAPIStatus}
                     disabled={shouldDisableActions}
                  />
               </AddThreadContainer>
            </RightSection>
         </HeaderContainer>
      )
   }
}

export default withTranslation()(DiscussionsHeader)
