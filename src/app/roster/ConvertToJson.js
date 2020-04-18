import readXlsxFile, { convertToJson } from 'read-excel-file'

const result = readXlsxFile(file, { properties: true })
result.data = skipNRows(result.data)
return convertToJson(result.data, schema, { properties: result.properties })