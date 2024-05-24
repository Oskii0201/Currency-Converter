import Select from "react-select";
import {SelectedOption} from "../../types.ts";
import {useEffect, useState} from "react";
import {fetchRates} from "../../api.ts";
import styles from "./rateTable.module.css"
interface RateTableProps{
    currencies: string[];
    currencyOptions: SelectedOption[];
}
export function RateTable({currencies, currencyOptions }:RateTableProps){
    const [baseCurrency, setBaseCurrency] = useState<SelectedOption>({ value: 'USD', label: 'USD' });
    const [rates, setRates] = useState<{ [key: string]: number }>({});
    useEffect(() => {
        const getRates = async () => {
            const fetchedRates = await fetchRates(baseCurrency.value);
            setRates(fetchedRates);
        };

        getRates();
    }, [baseCurrency]);

    const handleBaseCurrencyChange = (selectedOption: any) => {
        setBaseCurrency(selectedOption);
    };
    return(
        <div className={styles.card}>
            <div className={styles.rateTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                        <tr>
                            <th>
                                <Select
                                    value={baseCurrency}
                                    onChange={handleBaseCurrencyChange}
                                    options={currencyOptions}
                                    className={styles.select}
                                />
                            </th>
                            <th>1 {baseCurrency.value}</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currencies.filter(currency => currency !== baseCurrency.value).map(currency => (
                        <tr key={currency}>
                            <td>{currency}</td>
                            <td>{(rates[currency] || 0).toFixed(3)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}