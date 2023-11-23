import {
    ClaimOptions,
    Claim,
    SchemaHash,
    ClaimOption,
    DID
} from '@iden3/js-iden3-core'
import { keccak256 } from '@ethersproject/keccak256'
import {
    IdentityWallet,
    byteEncoder,
    InMemoryPrivateKeyStore,
    BjjProvider,
    KmsKeyType,
    KMS,
    CredentialStorage,
    IdentityStorage,
    InMemoryDataSource,
    Identity,
    Profile,
    InMemoryMerkleTreeStorage,
    EthStateStorage,
    W3CCredential,
    CredentialStatusResolverRegistry,
    CredentialStatusType,
    IssuerResolver,
    RHSResolver,
    CredentialWallet,
} from '@0xpolygonid/js-sdk'

async function createIdentity() {
    const dataStorage = {
        credential: new CredentialStorage(new InMemoryDataSource<W3CCredential>()),
        identity: new IdentityStorage(
            new InMemoryDataSource<Identity>(),
            new InMemoryDataSource<Profile>()
        ),
        mt: new InMemoryMerkleTreeStorage(40),
        states: new EthStateStorage()
    }

    const memoryKeyStore = new InMemoryPrivateKeyStore()
    const bjjProvider = new BjjProvider(KmsKeyType.BabyJubJub, memoryKeyStore)
    const kms = new KMS()
    kms.registerKeyProvider(KmsKeyType.BabyJubJub, bjjProvider)

    const statusRegistry = new CredentialStatusResolverRegistry()
    statusRegistry.register(
        CredentialStatusType.SparseMerkleTreeProof,
        new IssuerResolver()
    )
    statusRegistry.register(
        CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
        new RHSResolver(dataStorage.states)
    )
    const credWallet = new CredentialWallet(dataStorage, statusRegistry)
    const wallet = new IdentityWallet(kms, dataStorage, credWallet)

    const seedPhrase: Uint8Array = byteEncoder.encode(
        'seedseedseedseedseedseedseedseed'
    )

    const { did, credential } = await wallet.createIdentity({
        // method: DidMethod.Iden3,
        // blockchain: Blockchain.Polygon,
        // networkId: NetworkId.Mumbai,
        seed: seedPhrase,
        revocationOpts: {
            type: CredentialStatusType.Iden3ReverseSparseMerkleTreeProof,
            id: 'https://rhs-staging.polygonid.me'
        }
    })

    return did
}

function createSchemaHash(schemaID: Uint8Array) {
    // Assuming schemaID is an array of bytes (numbers between 0 and 255)
    const hash = keccak256(schemaID)

    // The hash is a hex string, so we need to convert the last 16 bytes (32 characters) to a byte array
    const last16Bytes = hash.slice(-32)
    const sHash = []
    for (let i = 0; i < last16Bytes.length; i += 2) {
        sHash.push(parseInt(last16Bytes.substr(i, 2), 16))
    }
    return Uint8Array.from(sHash)
}

export default async function encodePolygonIdClaim(
    params: {
        [key: string]: string
    },
    provider: string,
    schema: string
) {
    const utf8EncodeText = new TextEncoder()
    const schemaId = `https://raw.githubusercontent.com/reclaimprotocol/publish-credential/main/polygonid-schemas/${provider}.jsonld#${provider}`
    const schemaBinary = createSchemaHash(utf8EncodeText.encode(schemaId))
    const schemaHash = new SchemaHash(schemaBinary)
    const did = await createIdentity()
    let claimOptions: ClaimOption[] = [
        ClaimOptions.withFlagUpdatable(false),
        ClaimOptions.withRevocationNonce(BigInt(1999)),
        ClaimOptions.withId(DID.idFromDID(did), 2  )
    ]

    const schemaItemsRaw = schema.split(',')
    const slots = []
    for (let item of schemaItemsRaw) {
        const fItem = item.split(' ')
        const value: string = params[fItem[1]]
        slots.push(value)
    }
    if (slots.length === 1) {
        claimOptions = [
            ...claimOptions,
            ClaimOptions.withIndexDataBytes(utf8EncodeText.encode(slots[0]), null)
        ]
    }

    if (slots.length === 2) {
        claimOptions = [
            ...claimOptions,
            ClaimOptions.withIndexDataBytes(
                utf8EncodeText.encode(slots[0]),
                utf8EncodeText.encode(slots[1])
            )
        ]
    }

    if (slots.length === 3) {
        claimOptions = [
            ...claimOptions,
            ClaimOptions.withIndexDataBytes(
                utf8EncodeText.encode(slots[0]),
                utf8EncodeText.encode(slots[1])
            ),
            ClaimOptions.withValueDataBytes(
                utf8EncodeText.encode(slots[2]),
                utf8EncodeText.encode('0x00')
            )
        ]
    }

    if (slots.length === 4) {
        claimOptions = [
            ...claimOptions,
            ClaimOptions.withIndexDataBytes(
                utf8EncodeText.encode(slots[0]),
                utf8EncodeText.encode(slots[1])
            ),
            ClaimOptions.withValueDataBytes(
                utf8EncodeText.encode(slots[2]),
                utf8EncodeText.encode(slots[3])
            )
        ]
    }

    const claim = Claim.newClaim(schemaHash, ...claimOptions)
    console.log(did)
    return {
        hIndex: claim.hIndex(),
        hValue: claim.hValue()
    }
}
