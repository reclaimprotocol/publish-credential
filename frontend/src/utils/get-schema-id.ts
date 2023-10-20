import {schemas} from '../schema'


export function getSchemaId (provider: string) {
    let schemaId = ''
    for(let schema of schemas){
        if(provider === schema.name){
            schemaId = schema.id
            break
        }
    }
    return schemaId
}