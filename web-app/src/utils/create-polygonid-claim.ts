

const typesMap: any = {
    uint256: 'int',
    int256: 'int',
    string: 'string'
}

export default function createPolygonIdClaim(
    params: {
        [key: string]: string
    },
    provider: string,
    schema: string,
    chain: string
) {
    const schemaId = `https://raw.githubusercontent.com/reclaimprotocol/publish-credential/main/polygonid-schemas/${provider}.json`
    const schemaItemsRaw = schema.split(',')
    const slots: any = {
        'id': chain === 'polygon-mumbai' ? localStorage.getItem('userIdMumbai') : localStorage.getItem('userIdMain'),
    }
    for (let item of schemaItemsRaw) {
        const fItem = item.split(' ')
        const value: string = params[fItem[1]]
        slots[fItem[1]] = typesMap[fItem[0]] == 'int' ? parseInt(value) : value
    }

    return {
        credentialSchema:
            schemaId,
        type: provider,
        credentialSubject: {
            ...slots
        },
        expiration: 1893456000,
    };

}
