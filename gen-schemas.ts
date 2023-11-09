import fs from 'fs'
import path from 'path'

interface SchemaObject {
  schema: string
  uid: string
  providers: string[]
  isRegistered: boolean
}

interface SchemaParameter {
  '@id': string
  '@type': string
}

const generateIden3Serialization = (parameters: {
  [key: string]: SchemaParameter
}): string => {
  const parameterKeys = Object.keys(parameters)

  let serialization = `iden3:v1:slotIndexA=provider`

  if (parameterKeys.length === 1) {
    serialization += `&slotIndexB=${parameterKeys[0]}`
  } else if (parameterKeys.length === 2) {
    serialization += `&slotIndexB=${parameterKeys[0]}&slotValueA=${parameterKeys[1]}`
  } else if (parameterKeys.length === 3) {
    serialization += `&slotIndexB=${parameterKeys[0]}&slotValueA=${parameterKeys[1]}&slotValueB=${parameterKeys[2]}`
  }

  return serialization
}

const parseSchema = (schema: string): { [key: string]: SchemaParameter } => {
  const typesMap: any = {
    uint256: 'xsd:integer',
    string: 'xsd:string'
  }

  const result: { [key: string]: SchemaParameter } = {}
  const fields = schema.split(', ')
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i].split(' ')
    const type = field[0]
    const name = field[1]
    result[name] = {
      '@id': `polygon-vocab:${name}`,
      '@type': typesMap[type] || 'xsd:string'
    }
  }
  return result
}

const generateJsonLdFiles = (
  schemas: SchemaObject[],
  outputDir: string
): void => {
  // Ensure the output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  schemas.forEach(schemaObject => {
    const parameters = parseSchema(schemaObject.schema)

    schemaObject.providers.forEach(provider => {
      const jsonldContent = {
        '@context': [
          {
            '@protected': true,
            '@version': 1.1,
            id: '@id',
            type: '@type',
            [provider]: {
              '@id': `https://raw.githubusercontent.com/reclaimprotocol/publish-credential/main/polygonid-schemas/${provider}.jsonld#${provider}`,
              '@context': {
                '@propagate': true,
                '@protected': true,
                'polygon-vocab':
                  'urn:uuid:6f209f68-2ba9-4114-aa67-577f1717eb2c#',
                iden3_serialization: generateIden3Serialization(parameters),
                xsd: 'http://www.w3.org/2001/XMLSchema#',
                provider: {
                  '@id': 'polygon-vocab:provider',
                  '@type': 'xsd:string'
                },
                ...parameters
              }
            }
          }
        ]
      }

      const fileName = `${provider}.jsonld`
      const filePath = path.join(outputDir, fileName)
      fs.writeFileSync(filePath, JSON.stringify(jsonldContent, null, 2))
      console.log(`Generated ${fileName}`)
    })
  })
}

// Example usage
const schemas: SchemaObject[] = require('./web-app/src/contracts-artifacts/schema-eas.json') // Load your schemas from a file
const outputDirectory = './polygonid-schemas' // Define your output directory

generateJsonLdFiles(schemas, outputDirectory)
