import { config } from 'dotenv';
config();
import currencyapi from '@everapi/currencyapi-js';

const API_KEY = process.env.API_KEY;
const client = new currencyapi(API_KEY);

async function Conversion(valueTND) {
    const response = await client.latest({
        base_currency: 'TND',
        currencies: 'ETH'
    });
    const rate = response.data.ETH.value;
    return valueTND * rate;
}

export default Conversion;
