export type Pagination = {
   limit: number
   offset: number
}

export type FilterType = string

export type APIError = {
   res_status: string
   response: string
   http_status_code: number
}

export type ErrorType = {
   errorCode: number
   title: string
   description: string
}
