import { observable, action, computed } from 'mobx'
import { APIStatus, API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { getAPIErrorMessage } from '../../../../Common/utils/APIUtils'

import SectionService from '../../../services/SectionService'
import CardService from '../../../services/CardService'
import ListService from '../../../services/ListService'

import {
   ListResponseType,
   SectionResponseType,
   CreateSectionAPIRequest,
   CreateSectionResponse,
   MoveSectionRequestType,
   MoveListRequestType
} from '../../types'

import BaseModel from '../BaseModel'
import SectionModel from '../SectionModel'

class ListModel extends BaseModel {
   @observable sections: Map<string, SectionModel>
   @observable isCreating?: boolean

   @observable sectionName: string

   @observable createSectionAPIStatus!: APIStatus
   @observable createSectionAPIError: any

   @observable deleteSectionAPIStatus!: APIStatus
   @observable deleteSectionAPIError: any

   @observable renameListAPIStatus!: APIStatus
   @observable renameListAPIError!: any

   @observable moveSectionAPIStatus!: APIStatus
   // TODO: Need to fix the type
   @observable moveSectionAPIError!: any

   listService: ListService
   sectionService: SectionService
   cardService: CardService

   constructor(
      listDetails: ListResponseType,
      listService: ListService,
      sectionService: SectionService,
      cardService: CardService,
      isCreating = false
   ) {
      const { list_id: id, list_name: name, sections } = listDetails
      super({ id, name })
      this.listService = listService
      this.sectionService = sectionService
      this.cardService = cardService
      this.initListModel()
      this.sections = new Map()
      this.setSections(sections)
      this.sectionName = ''
      this.isCreating = isCreating
   }

   @action
   initListModel() {
      this.createSectionAPIStatus = API_INITIAL
      this.createSectionAPIError = {}

      this.deleteSectionAPIStatus = API_INITIAL
      this.deleteSectionAPIError = {}

      this.renameListAPIStatus = API_INITIAL
      this.renameListAPIError = {}

      this.moveSectionAPIStatus = API_INITIAL
      this.moveSectionAPIError = {}
   }

   @computed get listSectionsArray() {
      return Array.from(this.sections.values())
   }

   @action.bound
   setSections(sections: Array<SectionResponseType>): void {
      sections.map(section => {
         const { section_id: id } = section
         this.sections.set(
            id,
            new SectionModel(section, this.sectionService, this.cardService)
         )
      })
   }

   @action.bound
   setCreateSectionAPIStatus(status: APIStatus): void {
      this.createSectionAPIStatus = status
   }

   @action.bound
   setCreateSectionAPIError(error: any): void {
      this.createSectionAPIError = error
   }

   @action.bound
   setCreateSectionAPIResponse(response: CreateSectionResponse | null): void {
      if (response) {
         const { section_id: id } = response
         const sectionObject = {
            section_id: id,
            section_name: this.sectionName,
            cards: []
         }
         this.sections.set(
            id,
            new SectionModel(
               sectionObject,
               this.sectionService,
               this.cardService
            )
         )
      }
   }

   @action.bound
   createSectionAPI(
      requestObject: CreateSectionAPIRequest,
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {}
   ) {
      const { section_name } = requestObject
      this.sectionName = section_name
      const createSectionPromise = this.listService.createSectionAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(createSectionPromise)
         .to(this.setCreateSectionAPIStatus, response => {
            this.setCreateSectionAPIResponse(response)
            onSuccess()
         })
         .catch(error => {
            this.setCreateSectionAPIError(error)
            onFailure()
         })
   }

   @action.bound
   updateName(updatedName: string): void {
      this.name = updatedName
   }

   @action.bound
   setDeleteSectionAPIStatus(status: APIStatus): void {
      this.deleteSectionAPIStatus = status
   }

   @action.bound
   setDeleteSectionAPIError(error: any): void {
      this.deleteSectionAPIError = error
   }

   @action.bound
   deleteSectionAPI(
      sectionId: string,
      onSuccess: (name: string) => void,
      onFailure: (error: any) => void
   ) {
      const deleteSectionPromise = this.listService.deleteSectionAPI(sectionId)
      return bindPromiseWithOnSuccess(deleteSectionPromise)
         .to(this.setDeleteSectionAPIStatus, response => {
            const deletedSection = this.sections.get(sectionId)
            if (deletedSection) onSuccess(deletedSection.name)
            this.sections.delete(sectionId)
         })
         .catch(error => {
            this.setDeleteSectionAPIError(error)
            onFailure(error)
         })
   }

   @action.bound
   setRenameListAPIStatus(status: APIStatus): void {
      this.renameListAPIStatus = status
   }

   @action.bound
   setRenameListAPIError(error: any): void {
      this.renameListAPIError = getAPIErrorMessage(error)
   }

   //TODO:need to write return type
   @action.bound
   renameListAPI(
      onSuccess: Function = (): void => {},
      onFailure: Function = (): void => {},
      value
   ) {
      const requestObject = {
         list_name: value
      }
      const renameListPromise = this.listService.renameListAPI(
         requestObject,
         this.id
      )
      return bindPromiseWithOnSuccess(renameListPromise)
         .to(this.setRenameListAPIStatus, () => {
            onSuccess()
            this.updateName(value)
         })
         .catch(error => {
            this.setRenameListAPIError(error)
            onFailure()
         })
   }

   @action.bound
   setMoveSectionAPIStatus(status: APIStatus): void {
      this.moveSectionAPIStatus = status
   }

   // TODO: Need to update type
   @action.bound
   setMoveSectionAPIError(error: any): void {
      this.moveSectionAPIError = error
   }

   // TODO: Need to mention return type
   @action.bound
   moveSectionAPI(
      sectionId: string,
      request: MoveSectionRequestType,
      onSuccess: (
         sectionName: string,
         sectionId: string,
         listId: string
      ) => void,
      onFailure: (error) => void
   ) {
      const movePageListPromise = this.listService.moveSectionAPI(
         sectionId,
         request
      )
      return bindPromiseWithOnSuccess(movePageListPromise)
         .to(this.setMoveSectionAPIStatus, () => {
            const deletedSection = this.sections.get(sectionId)
            if (deletedSection) {
               const { name } = deletedSection
               const { list_id: listId } = request
               onSuccess(name, sectionId, listId)
            }
         })
         .catch(error => {
            this.setMoveSectionAPIError(error)
            onFailure(error)
         })
   }
}

export default ListModel
