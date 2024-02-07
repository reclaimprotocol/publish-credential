'use client'
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Box,
  Flex,
  Button,
  Container,
  Divider
} from '@chakra-ui/react'
import {
  ChooseProviderStep,
  ChooseChainStep,
  ProveClaimStep,
  PublishStep
} from './Steps'
import { reclaimNetworksAddresses } from '../reclaimNetworkAddresses'
import { useCallback, useState } from 'react'
import { providerType } from '../utils/types'
import { Proof } from '../utils/types'
import { PolygonModal } from './Polygon/Modal'

const steps = [
  { title: 'First', description: 'Pick Provider' },
  { title: 'Second', description: 'Pick Chain' },
  { title: 'Third', description: 'Prove Claim' },
  { title: 'Final', description: 'Publish' }
]

export function CustomStepper() {
  const [selectedProvider, setSelectedProvider] = useState<
    providerType | undefined
  >(undefined)
  const [proof, setProof] = useState<Proof>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [chosenChain, setChosenChain] =
    useState<keyof typeof reclaimNetworksAddresses>('polygon-mumbai')
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length
  })

  const handleConnectPolygonWalletOpen = useCallback(
    (nextStep: number) => {
      if (
        nextStep === 3 &&
        chosenChain == 'polygon-mumbai' &&
        localStorage.getItem('userIdMumbai') == null
      ) {
        setOpenModal(true)
        return false
      }
      if (
        nextStep === 3 &&
        chosenChain == 'polygon-mainnet' &&
        localStorage.getItem('userIdMain') == null
      ) {
        setOpenModal(true)
        return false
      }

      return true
    },
    [chosenChain]
  )

  return (
    <Flex flexDirection={window.innerWidth < 700 ? 'row' : 'column'} gap={window.innerWidth < 700 ? 1 : 12} >
      <Stepper index={activeStep} orientation={window.innerWidth < 700 ? 'vertical' : 'horizontal'} height={window.innerWidth < 700 ? '360px' : '40px'} >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink='0'>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Divider orientation={window.innerWidth < 700 ? 'vertical' : 'horizontal'} color={'black'} height={window.innerWidth < 700 ? '360px' : '1px'} mx={4} />
      <Flex flexDirection='column' gap={12} justifyContent={'space-around'}>
        {activeStep == 1 && (
          <ChooseProviderStep
            handleSelectChange={(e: any) => {
              setSelectedProvider(e)
            }}
          />
        )}
        {activeStep == 2 && (
          <ChooseChainStep
            provider={
              //@ts-ignore
              selectedProvider?.value.providerId || selectedProvider?.value.name
            }
            setChosenChain={setChosenChain}
          />
        )}
        {activeStep == 3 && (
          <ProveClaimStep
            selectedProvider={selectedProvider}
            handleSetProof={(proof: Proof) => {
              setProof(proof)
            }}
          />
        )}
        {activeStep == 4 && (
          <PublishStep
            proof={proof}
            chosenChain={chosenChain}
            provider={selectedProvider}
          />
        )}
        <Flex gap={4}>
          {activeStep > 1 && (
            <Button
              onClick={() => {
                setActiveStep(activeStep - 1)
              }}
            >
              Back
            </Button>
          )}
          {activeStep < steps.length && (
            <Button
              onClick={() => {
                if (handleConnectPolygonWalletOpen(activeStep + 1))
                  setActiveStep(activeStep + 1)
              }}
            >
              Next
            </Button>
          )}

          {openModal && <PolygonModal />}
        </Flex>
      </Flex>
    </ Flex>
  )
}
