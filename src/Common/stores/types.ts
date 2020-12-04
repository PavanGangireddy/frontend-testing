import { ReactElement } from 'react'

export interface LabelValueType {
   value: string
   label: string
   icon?: ReactElement
}

export interface ValidationResponseType {
   errorMessage: string
   shouldShowError: boolean
}

export interface ErrorObjectType {
   shouldShowError: boolean
   errorMessage: string
}
