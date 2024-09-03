import { useState } from 'react'
import Footer from './components/Footer'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const App = () => {
  const [inputText, setInputText] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const handleInputChange = (event) => {
    setInputText(event.target.value)
    filterCountries(event.target.value)
  }

  const filterCountries = (searchTerm) => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  const handleCountryClick = (country) => {
    alert(`You clicked on ${country.name.common}`)
  }

  return (
    <div className="App">
      <Footer />
    </div>
    )
}


export default App
