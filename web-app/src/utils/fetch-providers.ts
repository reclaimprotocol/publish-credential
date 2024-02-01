'use client'
//@ts-nocheck
import axios from 'axios'
import {
	GET_ALL_COMMUNITY_PROVIDERS_ENDPOINT,
	GET_ALL_CUSTOM_PROVIDERS_ENDPOINT,
} from '../constants'

export const fetchAllCustomProviders = async () => {
	try {
		const { data } = await axios.get(GET_ALL_CUSTOM_PROVIDERS_ENDPOINT)
		const responseValue = await axios.get(GET_ALL_COMMUNITY_PROVIDERS_ENDPOINT)

		if (data.isSuccess) {
			const { customProvidersWithSubProviders } = data

			const providerOptions = customProvidersWithSubProviders.map(
				//@ts-ignore
				(provider) => ({
					value: provider.parentProviderName,
					label: provider.providerDisplayName,
					logo: provider.logoUrl,
					//@ts-ignore
					isUserInputRequired: provider.subProviders.some((e) => e.form),
					subProviders: provider.subProviders,
				})
			)

			providerOptions.push({
				value: 'community',
				label: 'Community',
				logo: 'https://reclaim-protocol.github.io/developer-portal/static/media/community.0e9c6e0f.svg',
				isUserInputRequired: false,
				subProviders: responseValue.data.providers,
			})

			// Grouping for dropdown option
			//@ts-ignore
			const groupedOptions = providerOptions.map((p) => ({
				label: p.label,
				//@ts-ignore
				options: p.subProviders.map((pro) => {
					if (p.label === 'Community') {
						return {
							value: pro,
							label: pro.name,
							type: 'http',
						}
					} else {
						return {
							value: pro,
							label: pro.providerName,
							type: 'custom',
						}
					}
				}),
			}))

			console.log('groupedOptions', groupedOptions)

			return groupedOptions
		}
	} catch (error) {
		console.error('Error while fetching custom providers:', error)
	}
}
