import Select from "react-select";
import {useEffect, useState} from "react";
import {SelectedOption} from "../../types.ts";
import {fetchRates} from "../../api.ts";
import styles from "./converter.module.css";
import arrows from "../../assets/compare-arrows.svg";

interface  ConverterProps{
    currencyOptions: SelectedOption[];
}

export function Converter({currencyOptions}: ConverterProps){
    const [fromCurrency, setFromCurrency] = useState<SelectedOption>({ value: 'USD', label: 'USD' });
    const [toCurrency, setToCurrency] = useState<SelectedOption>({ value: 'EUR', label: 'EUR' });
    const [amount, setAmount] = useState<number>(1);
    const [conversionRate, setConversionRate] = useState<number>(1);
    const [convertedAmount, setConvertedAmount] = useState<number>(1);
    const [rates, setRates] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const getRates = async () => {
            const fetchedRates = await fetchRates(fromCurrency.value);
            setRates(fetchedRates);
            setConversionRate(fetchedRates[toCurrency.value])
        };

        getRates();
    }, [fromCurrency]);

    useEffect(() => {
        setConvertedAmount(amount * conversionRate);
    }, [amount, conversionRate]);

    const handleFromCurrencyChange = (selectedOption: SelectedOption) => {
        setFromCurrency(selectedOption);
    };

    const handleToCurrencyChange = (selectedOption: SelectedOption) => {
        setToCurrency(selectedOption);
        setConversionRate(rates[selectedOption.value]);
    };

    const reverseCurrencies = () => {
        const temp = fromCurrency;
        setFromCurrency(toCurrency);
        setToCurrency(temp);
    };
    return(
        <div className={styles.card}>
            <div className={styles.converter}>
                <div className={styles.column}>
                    <label>From</label>
                    <Select
                        value={fromCurrency}
                        onChange={handleFromCurrencyChange}
                        options={currencyOptions}
                        className={styles.select}
                    />
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(+e.target.value)}
                    />
                </div>
                <div className={styles.column}>
                    <button onClick={reverseCurrencies}><img src={arrows} alt="arrows"/> </button>
                </div>

                <div className={styles.column}>
                    <label>To</label>
                    <Select
                        value={toCurrency}
                        onChange={handleToCurrencyChange}
                        options={currencyOptions}
                        className={styles.select}
                    />
                    <input
                        type="text"
                        value={`${convertedAmount.toFixed(3)} ${toCurrency.value}`}
                        readOnly
                        disabled
                    />
                </div>
            </div>
        </div>

    )
}