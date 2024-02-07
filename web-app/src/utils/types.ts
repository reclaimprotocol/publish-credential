export type CustomSubProvider = {
  applicationId: string[]
  customProviderId: string[]
  description: string
  form: boolean
  id: string
  params: []
  httpProviderId: string
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

export interface Proof {
    identifier: string;
    claimData: ProviderClaimData;
    signatures: string[];
    witnesses: WitnessData[];
    extractedParameterValues: any;
}
interface WitnessData {
    id: string;
    url: string;
}
interface ProviderClaimData {
    provider: string;
    parameters: string;
    owner: string;
    timestampS: number;
    context: string;
    identifier: string;
    epoch: number;
}