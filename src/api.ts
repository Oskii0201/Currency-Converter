import axios from 'axios';

export const fetchRates = async (base: string): Promise<{ [key: string]: number }> => {
    try {
        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`);
        return response.data.rates;
    } catch (error) {
        console.error('Error fetching rates:', error);
        return {};
    }
};