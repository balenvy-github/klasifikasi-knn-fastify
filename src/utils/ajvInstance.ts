import Ajv from 'ajv';
import addFormat from 'ajv-formats';

const ajvInstance = new Ajv({ allErrors: true });
addFormat(ajvInstance);

export default ajvInstance;
