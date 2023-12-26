'use client'

import { Box } from "@chakra-ui/layout"
import ProviderSelectInput from "../ProviderSelectInput"

type Props = {
    handleSelectChange: any
}

export function ChooseProviderStep({ handleSelectChange }: Props) {

    return <>
        <ProviderSelectInput handleSelectChange={handleSelectChange} />
    </>

}