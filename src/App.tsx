import "./App.css"
import {Converter} from "./components/Converter/Converter.tsx";
import {RateTable} from "./components/RateTable/RateTable.tsx";

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'PLN'];
const currencyOptions = currencies.map(currency => ({ value: currency, label: currency }));

export function App() {

    return (
    <div className="app">
        <header>
            <h1>$ Currency Converter</h1>
        </header>
        <div className="flexContainer">
            <Converter currencyOptions={currencyOptions}/>
            <RateTable currencies={currencies} currencyOptions={currencyOptions}/>
        </div>
    </div>
  )
}
