import React, { Component, Ref, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'
import RadioGroup from '../../../Common/components/RadioGroup'
import SelectField from '../../../Common/components/SelectField'
import PublishIcon from '../../../Common/icons/PublishIcon'
import DateTimePicker from '../../../Common/components/DateTimePicker'
import { getDateAndTimeFormat } from '../../../Common/utils/DateUtils'
import UsersGroupModel from '../../../UserProfile/stores/models/UsersGroupModel'
import {
   isAPIFetching,
   getAPIErrorMessage
} from '../../../Common/utils/APIUtils'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { showFailureBottomCenterToast } from '../../../Common/utils/ToastUtils'

import { PublishWorkbookRequest } from '../../stores/types'
import {
   publishTypeList,
   evaluationOrderList,
   BOTTOM_START,
   BOTTOM_END,
   evaluationTypeList,
   groupList
} from '../../constants/UIConstants'

import {
   MainContainer,
   Header,
   PublishWorkbookTitle,
   CloseIcon,
   Divider,
   BodyContainer,
   Title,
   EvaluationTypeContainer,
   RadioItemCSS,
   RadioItemsContainerCSS,
   SubContainer,
   UsersGroupContainer,
   SelectFieldContainerCSS,
   Footer,
   PublishButton,
   PublishButtonText,
   DatePickerContainer,
   DateTimePickerWrapper,
   EvaluationTypeWrapper,
   ErrorText,
   DateWrapper,
   DurationInputBox,
   DurationTitle
} from './styledComponents'

interface PublishWorkbookPopUpProps extends WithTranslation {
   onCancel: () => void
   getUsersGroupsAPI: (
      onSuccess: () => void,
      onFailure: (error: any) => void
   ) => void
   getUsersGroupAPIStatus: APIStatus
   getUsersGroupAPIError: any
   userGroups: Map<string, UsersGroupModel>
   publishAssignmentWorkbookAPI: (requestObject: PublishWorkbookRequest) => void
   publishAssignmentWorkbookAPIStatus: APIStatus
}

interface GroupItem {
   value: string | null
   label: string
}

@observer
class PublishWorkbookPopUp extends Component<PublishWorkbookPopUpProps> {
   @observable publishType!: string
   @observable evaluationOrder!: string
   @observable startDate!: string | null
   @observable endDate!: string | null
   @observable startingDay!: Date
   @observable endingDay!: Date
   @observable hasEvaluationError!: boolean
   @observable hasDateError!: boolean
   @observable groupsList!: Array<GroupItem>
   @observable evaluationTypeList!: Array<GroupItem>
   @observable selectedEvaluationType!: GroupItem
   @observable selectedGroup!: GroupItem
   @observable durationInSeconds!: number | null
   startDatePickerRef
   endDatePickerRef

   prefixForT = `workbookManagement:publishWorkbook.`

   constructor(props) {
      super(props)
      this.initPublishWorkbookPopUp()
   }

   componentDidMount() {
      this.doNetworkCallForGroups()
   }

   initPublishWorkbookPopUp = () => {
      this.publishType = publishTypeList[0].value
      this.evaluationOrder = ''
      this.startDatePickerRef = React.createRef()
      this.endDatePickerRef = React.createRef()
      this.evaluationTypeList = evaluationTypeList
      this.groupsList = groupList
      this.selectedEvaluationType = evaluationTypeList[0]
      this.selectedGroup = groupList[0]
      this.startDate = null
      this.endDate = null
      this.durationInSeconds = null
      this.hasEvaluationError = false
      this.hasDateError = false
      this.startingDay = new Date()
      this.endingDay = new Date()
   }

   onSuccessGetUsersGroups = (): void => {
      const { userGroups } = this.props
      userGroups.forEach(eachGroup => {
         const groupItem = {
            label: eachGroup.groupName,
            value: eachGroup.groupId
         }
         this.groupsList.push(groupItem)
      })
   }

   onFailureGetUsersGroups = (error): void => {
      const errorMessage = getAPIErrorMessage(error)
      showFailureBottomCenterToast(errorMessage)
   }

   doNetworkCallForGroups(): void {
      const { getUsersGroupsAPI } = this.props
      getUsersGroupsAPI(
         this.onSuccessGetUsersGroups,
         this.onFailureGetUsersGroups
      )
   }

   onCloseStartDateTimePicker = (): void => {
      const date = this.startDatePickerRef.current?.getSelectedDueDate()
      this.startDate = date ? getDateAndTimeFormat(date) : null
   }

   onCloseEndDateTimePicker = (): void => {
      const date = this.endDatePickerRef.current?.getSelectedDueDate()
      this.endDate = date ? getDateAndTimeFormat(date) : null
   }

   onClickCancel = () => {
      const {
         props: { onCancel },
         initPublishWorkbookPopUp
      } = this
      initPublishWorkbookPopUp()
      onCancel()
   }

   renderPopUpHeader = (): ReactNode => {
      const {
         onClickCancel,
         props: { t }
      } = this
      return (
         <Header>
            <PublishWorkbookTitle>
               {t(`${this.prefixForT}publishWorkbook`)}
            </PublishWorkbookTitle>
            <CloseIcon
               onClick={onClickCancel}
               data-testid={'publishPopUpCloseIcon'}
            />
         </Header>
      )
   }

   onChangePublishType = (value: string): void => {
      this.publishType = value
      this.selectedGroup = groupList[0]
      this.hasDateError = false
      this.hasEvaluationError = false
   }

   onChangeEvaluationType = (evaluationType: GroupItem): void => {
      this.selectedEvaluationType = evaluationType
   }

   onChangeGroup = (selectedGroup): void => {
      this.selectedGroup = selectedGroup
   }

   renderUsersGroups = observer(
      (): ReactElement => {
         const { publishAssignmentWorkbookAPIStatus, t } = this.props
         return (
            <UsersGroupContainer>
               <Title>{t(`${this.prefixForT}users`)}</Title>
               <SelectField
                  options={this.groupsList}
                  defaultValue={this.selectedGroup}
                  selectFieldCSS={SelectFieldContainerCSS}
                  onChange={this.onChangeGroup}
                  isDisabled={isAPIFetching(publishAssignmentWorkbookAPIStatus)}
                  data-testid={'userGroupsSelect'}
               />
            </UsersGroupContainer>
         )
      }
   )

   onChangeStartDateTime = date => {
      this.startingDay = date
   }

   onChangeEndDateTime = date => {
      this.endingDay = date
   }

   isPresentDaySelected = selectedDate => {
      const presentDay = new Date().getDate()
      const selectedDay = selectedDate.getDate()
      return !(selectedDay - presentDay > 0)
   }

   getCustomDate = (year, month, day, hours, minutes, seconds) =>
      new Date(year, month, day, hours, minutes, seconds)

   // TODO: need to fix present day min time
   renderDatePickers = observer(
      (): ReactElement => {
         const {
            startDatePickerRef,
            endDatePickerRef,
            startDate,
            endDate,
            onCloseStartDateTimePicker,
            onCloseEndDateTimePicker,
            props: { publishAssignmentWorkbookAPIStatus, t },
            hasDateError,
            onChangeStartDateTime,
            onChangeEndDateTime,
            startingDay,
            endingDay,
            isPresentDaySelected,
            getCustomDate
         } = this
         const presentDateTime = new Date()
         const minStartTime = isPresentDaySelected(startingDay)
            ? presentDateTime
            : getCustomDate(
                 startingDay.getFullYear(),
                 startingDay.getMonth(),
                 startingDay.getDate(),
                 0,
                 0,
                 0
              )
         const minEndTime = isPresentDaySelected(endingDay)
            ? presentDateTime
            : getCustomDate(
                 startingDay.getFullYear(),
                 startingDay.getMonth(),
                 startingDay.getDate(),
                 0,
                 0,
                 0
              )
         const maxTime = getCustomDate(
            presentDateTime.getFullYear(),
            presentDateTime.getMonth(),
            presentDateTime.getDate(),
            23,
            59,
            0
         )
         // FIXME: Need to update the date picker styling
         return (
            <DatePickerContainer>
               <DateWrapper>
                  <SubContainer>
                     <Title>{t(`${this.prefixForT}startTime`)}</Title>
                     <DateTimePickerWrapper>
                        <DateTimePicker
                           ref={startDatePickerRef}
                           key={`${startDate}`}
                           date={startDate}
                           onCalendarClose={onCloseStartDateTimePicker}
                           popperPlacement={BOTTOM_START}
                           disabled={isAPIFetching(
                              publishAssignmentWorkbookAPIStatus
                           )}
                           minDate={presentDateTime}
                           minTime={minStartTime}
                           maxTime={maxTime}
                           onChangeDateTime={onChangeStartDateTime}
                           dateTimePickerTestId={'startDateTimePicker'}
                           containerCSS={{ maxWidth: '200px' }}
                        />
                     </DateTimePickerWrapper>
                  </SubContainer>
                  <SubContainer>
                     <Title>{t(`${this.prefixForT}endTime`)}</Title>
                     <DateTimePickerWrapper>
                        <DateTimePicker
                           ref={endDatePickerRef}
                           key={`${endDate}`}
                           date={endDate}
                           onCalendarClose={onCloseEndDateTimePicker}
                           popperPlacement={BOTTOM_END}
                           disabled={isAPIFetching(
                              publishAssignmentWorkbookAPIStatus
                           )}
                           onChangeDateTime={onChangeEndDateTime}
                           minDate={presentDateTime}
                           minTime={minEndTime}
                           maxTime={maxTime}
                           dateTimePickerTestId={'endDateTimePicker'}
                        />
                     </DateTimePickerWrapper>
                  </SubContainer>
               </DateWrapper>

               <ErrorText
                  isError={hasDateError}
                  data-testid={'dateDiffErrorText'}
               >
                  {t(`${this.prefixForT}dateError`)}
               </ErrorText>
            </DatePickerContainer>
         )
      }
   )

   onchangeEvaluationOrder = (value): void => {
      this.evaluationOrder = value
      this.hasEvaluationError = false
   }

   renderEvaluationOrderUI = observer(
      (): ReactElement => {
         const { publishAssignmentWorkbookAPIStatus, t } = this.props
         const { hasEvaluationError } = this
         return (
            <SubContainer>
               <Title>{t(`${this.prefixForT}evaluationOrder`)}</Title>
               <EvaluationTypeContainer>
                  <RadioGroup
                     options={evaluationOrderList}
                     selectedValue={this.evaluationOrder}
                     onSelectOption={this.onchangeEvaluationOrder}
                     radioItemCss={RadioItemCSS}
                     radioItemsContainerCss={RadioItemsContainerCSS}
                     disabled={isAPIFetching(
                        publishAssignmentWorkbookAPIStatus
                     )}
                  />
               </EvaluationTypeContainer>
               <ErrorText
                  isError={hasEvaluationError}
                  data-testid={'evaluationOrderErrorText'}
               >
                  {t(`${this.prefixForT}required`)}
               </ErrorText>
            </SubContainer>
         )
      }
   )

   renderEvaluationType = observer(
      (): ReactElement => {
         const { publishAssignmentWorkbookAPIStatus, t } = this.props
         return (
            <EvaluationTypeWrapper>
               <Title>{t(`${this.prefixForT}evaluationType`)}</Title>
               <SelectField
                  options={this.evaluationTypeList}
                  defaultValue={this.selectedEvaluationType}
                  selectFieldCSS={SelectFieldContainerCSS}
                  onChange={this.onChangeEvaluationType}
                  isDisabled={isAPIFetching(publishAssignmentWorkbookAPIStatus)}
                  data-testid={'evaluationTypeSelect'}
               />
            </EvaluationTypeWrapper>
         )
      }
   )

   onChangeAssignmentDuration = (event): void => {
      this.durationInSeconds = event.target.value
   }

   renderAssignmentDuration = observer(
      (): ReactElement => {
         const {
            onChangeAssignmentDuration,
            durationInSeconds,
            props: { t }
         } = this
         return (
            <SubContainer>
               <DurationTitle>
                  {t(`${this.prefixForT}durationInSeconds`)}
               </DurationTitle>
               <DurationInputBox
                  onChange={onChangeAssignmentDuration}
                  type='number'
                  value={durationInSeconds}
                  placeholder={t(
                     `${this.prefixForT}durationInSecondsPlaceholder`
                  )}
               />
            </SubContainer>
         )
      }
   )

   renderEvaluationUI = observer(
      (): ReactElement => {
         const {
            renderEvaluationOrderUI: RenderEvaluationOrderUI,
            renderUsersGroups: RenderUsersGroups,
            renderDatePickers: RenderDatePickers,
            renderEvaluationType: RenderEvaluationType,
            renderAssignmentDuration: RenderAssignmentDuration
         } = this
         return (
            <>
               <RenderUsersGroups />
               <RenderDatePickers />
               <RenderAssignmentDuration />
               <RenderEvaluationOrderUI />
               <RenderEvaluationType />
            </>
         )
      }
   )

   renderNormalUI = (): ReactNode => {
      const { renderUsersGroups: RenderUsersGroups } = this
      return <RenderUsersGroups />
   }

   renderSuccessUI = observer(
      (): ReactElement => {
         const { value } = publishTypeList[0]
         const { renderEvaluationUI: RenderEvaluationUI } = this
         return (
            <SubContainer>
               {this.publishType === value ? (
                  <RenderEvaluationUI />
               ) : (
                  this.renderNormalUI()
               )}
            </SubContainer>
         )
      }
   )

   renderPopUpContent = observer(
      (): ReactElement => {
         const {
            getUsersGroupAPIStatus,
            getUsersGroupAPIError,
            publishAssignmentWorkbookAPIStatus,
            t
         } = this.props
         return (
            <BodyContainer>
               <Title>{t(`${this.prefixForT}typeOfWorkbook`)}</Title>
               <EvaluationTypeContainer>
                  <RadioGroup
                     options={publishTypeList}
                     selectedValue={this.publishType}
                     onSelectOption={this.onChangePublishType}
                     radioItemCss={RadioItemCSS}
                     radioItemsContainerCss={RadioItemsContainerCSS}
                     disabled={isAPIFetching(
                        publishAssignmentWorkbookAPIStatus
                     )}
                  />
               </EvaluationTypeContainer>
               {/* FIXME: Need to fix the loader styling */}
               <LoadingWrapper
                  apiStatus={getUsersGroupAPIStatus}
                  apiError={getUsersGroupAPIError}
                  renderSuccessUI={this.renderSuccessUI}
                  onRetry={this.doNetworkCallForGroups}
                  containerStyle={{ height: '100%' }}
                  loaderTestId={'usersGroupsLoader'}
               />
            </BodyContainer>
         )
      }
   )

   getEvaluationRequestObject = (): PublishWorkbookRequest => {
      const {
         selectedGroup: { value: groupId },
         selectedEvaluationType: { value: evaluationType },
         startDate,
         endDate,
         evaluationOrder,
         publishType,
         durationInSeconds
      } = this
      return {
         workbook_type: publishType,
         group_id: groupId,
         evaluation_type: evaluationType,
         start_datetime: startDate,
         end_datetime: endDate,
         cards_layout: evaluationOrder,
         duration_in_seconds: durationInSeconds
      }
   }

   getDateDiff = (): any => {
      const { startDate, endDate } = this
      if (startDate && endDate) {
         const dateDiff = Date.parse(endDate) - Date.parse(startDate)
         return dateDiff > 0
      }
   }

   isReadyToPublishEvaluation = (): boolean => {
      const { startDate, endDate, evaluationOrder, getDateDiff } = this
      return startDate && endDate && evaluationOrder && getDateDiff()
   }

   validateFields = (): void => {
      const {
         startDate,
         endDate,
         startDatePickerRef,
         endDatePickerRef,
         evaluationOrder,
         getDateDiff
      } = this
      if (startDate === null) startDatePickerRef.current?.setError('Required')
      if (endDate === null) endDatePickerRef.current?.setError('Required')
      if (evaluationOrder === '') {
         this.hasEvaluationError = true
      }
      this.hasDateError =
         getDateDiff() || startDate === null || endDate === null ? false : true
   }

   onClickPublishEvaluation = (): void => {
      const { publishAssignmentWorkbookAPI } = this.props
      this.validateFields()
      if (this.isReadyToPublishEvaluation()) {
         const requestObject = this.getEvaluationRequestObject()
         publishAssignmentWorkbookAPI(requestObject)
      }
   }

   getPublishNormalRequestObject = (): PublishWorkbookRequest => {
      const {
         selectedGroup: { value: groupId },
         publishType
      } = this
      return {
         workbook_type: publishType,
         group_id: groupId,
         evaluation_type: null,
         start_datetime: null,
         end_datetime: null,
         cards_layout: null,
         duration_in_seconds: null
      }
   }

   onClickPublishNormal = (): void => {
      const { publishAssignmentWorkbookAPI } = this.props
      const requestObject = this.getPublishNormalRequestObject()
      publishAssignmentWorkbookAPI(requestObject)
   }

   isEvaluation = (): boolean => this.publishType === publishTypeList[0].value

   renderPopUpFooter = observer(
      (): ReactElement => {
         const { publishAssignmentWorkbookAPIStatus, t } = this.props
         const {
            isEvaluation,
            onClickPublishEvaluation,
            onClickPublishNormal
         } = this
         return (
            <Footer isEvaluation={isEvaluation()}>
               <PublishButton
                  isLoading={isAPIFetching(publishAssignmentWorkbookAPIStatus)}
                  onClick={
                     isEvaluation()
                        ? onClickPublishEvaluation
                        : onClickPublishNormal
                  }
                  id={'popUpPublishButton'}
               >
                  <PublishIcon />
                  <PublishButtonText>
                     {t(`${this.prefixForT}publish`)}
                  </PublishButtonText>
               </PublishButton>
            </Footer>
         )
      }
   )

   render(): ReactNode {
      const {
         renderPopUpFooter: RenderPopUpFooter,
         renderPopUpContent: RenderPopUpContent
      } = this
      return (
         <MainContainer>
            {this.renderPopUpHeader()}
            <Divider />
            <RenderPopUpContent />
            <RenderPopUpFooter />
         </MainContainer>
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   PublishWorkbookPopUp
)
