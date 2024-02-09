'use client'
//@ts-nocheck
import axios from 'axios'
import {
	GET_ALL_COMMUNITY_PROVIDERS_ENDPOINT,
} from '../constants'

export const fetchAllCustomProviders = async () => {
	try {
	
		const responseValue = await axios.get(GET_ALL_COMMUNITY_PROVIDERS_ENDPOINT)


			const providerOptions: any[] = []

		providerOptions.push({
			value: 'V2',
			label: 'v2',
			logo: 'https://reclaim-protocol.github.io/developer-portal/static/media/community.0e9c6e0f.svg',
			isUserInputRequired: false,
			subProviders: responseValue.data.providers,
		})

			// Grouping for dropdown option
			const groupedOptions = providerOptions.map((p) => ({
				label: p.label,
				options: p.subProviders.map((pro: any) => {
						return {
							value: pro,
							label: pro.name,
							type: 'http',
						}
				}),
			}))

			console.log('groupedOptions', groupedOptions)

			return groupedOptions
	} catch (error) {
		console.error('Error while fetching custom providers:', error)
	}
}
