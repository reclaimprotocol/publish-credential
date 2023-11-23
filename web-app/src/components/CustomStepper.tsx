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
  Button
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
import { Proof } from '@reclaimprotocol/reclaim-sdk'
import { PolygonModal } from './Polygon/Modal'

const steps = [
  { title: 'First', description: 'Choose Provider' },
  { title: 'Second', description: 'Choose Chain' },
  { title: 'Third', description: 'Prove Claim' },
  { title: 'Final', description: 'Publish' }
]

export function CustomStepper () {
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

  const handleConnectPolygonWalletOpen = useCallback((nextStep: number) => {
    if (
      nextStep === 3 &&
      chosenChain == 'polygon-mumbai' &&
      localStorage.getItem('userId') == null
    ) {
      setOpenModal(true)
      return false
    }
    return true
  }, [])

  return (
    <>
      <Stepper index={activeStep}>
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
    </>
  )
}
