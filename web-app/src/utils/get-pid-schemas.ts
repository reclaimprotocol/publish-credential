import SCHEMA_EAS from './../contracts-artifacts/schema-polygon.json'

export function getSchemaAndUidPolygon(provider: string) {
    const data = SCHEMA_EAS

    for (let schema of data) {
        if (schema.providers.includes(provider))
            return { uid: schema.uid, schema: schema.schema }
    }
    return { uid: false, schema: false }
}
