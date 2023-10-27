'use client'
import { useEffect, useState, CSSProperties } from 'react'
import { fetchAllCustomProviders } from '../utils/fetch-providers'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

export default function ProviderSelectInput ({
  handleSelectChange
}: {
  handleSelectChange: any
}) {
  const [providerOptions, setProviderOptions] = useState<any>(null)
  const animatedComponents = makeAnimated()

  const selectCustomProvider = async () => {
    const providers = await fetchAllCustomProviders()

    if (providers) {
      setProviderOptions(providers)
    }
    console.log(providers.filter((provider: any) => provider.options[0].type === 'http'))
  }

  useEffect(() => {
    selectCustomProvider()
    
  }, [])


  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black.200'
  }

  const groupBadgeStyles: CSSProperties = {
    borderRadius: '2em',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'semibold',
    lineHeight: '1',
    minWidth: 1,
    // padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
    color: 'black'
  }

  const grouplabel: CSSProperties = {
    borderRadius: '2em',
    textTransform: 'uppercase',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'semibold',
    lineHeight: '1',
    minWidth: 1,
    padding: '0',
    textAlign: 'center'
  }

  const formatGroupLabel = (providerOptions: any) => (
    <div style={groupStyles}>
      <span style={grouplabel}>{providerOptions.label}</span>
      <span style={groupBadgeStyles}>{providerOptions.options.length}</span>
    </div>
  )

  return (
    <>
      <Select 
        // menuPortalTarget={document.body}
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999}),
          option: (base, props) => ({...base, color:"black"})
        }}
        maxMenuHeight={450}
        placeholder='Select Custom Providers'
        options={providerOptions}
        onChange={handleSelectChange}
        formatGroupLabel={formatGroupLabel}
        components={animatedComponents}
      />
    </>
  )
}
