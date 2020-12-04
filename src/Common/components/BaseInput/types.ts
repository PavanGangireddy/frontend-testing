export interface ValidationResponseType {
   errorMessage: string
   shouldShowError: boolean
}

export interface InputProps {
   onChange?: (event: any) => void
   containerCSS?: Record<string, any>
   containerClassName?: string
   textInputStyles?: any
   value?: string
   validate?: () => ValidationResponseType
   shouldValidateOnBlur?: boolean
   tagName?: string
   [x: string]: any
   testId?: string
}
