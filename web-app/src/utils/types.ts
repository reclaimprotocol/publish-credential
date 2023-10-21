export type CustomSubProvider = {
  applicationId: string[]
  customProviderId: string[]
  description: string
  form: boolean
  id: string
  params: []
  providerId: string
  providerName: string
}


export type paramsType = {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  predefined: boolean
}

export type providerType = {
  isUserInputRequired: boolean
  label: string
  type: string
  value: CustomSubProvider
  params: paramsType[]
}