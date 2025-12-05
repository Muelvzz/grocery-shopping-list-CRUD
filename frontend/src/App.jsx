import { useState, useEffect } from 'react'
import './App.css'

import Create from "./Create.jsx"
import Dashboard from './Dashboard.jsx'

import api from './api.js'

function App() {

  const [refresh, setRefresh] = useState(false)
  const [toggleDark, setToggleDark] = useState(false)
  const [toggleCreate, setToggleCreate] = useState(false)

  const [groceries, setGroceries] = useState([])

  async function loadGroceries() {
    const res = await api.get("/grocery/view-all")
    setGroceries(res.data)
  }

  useEffect(() => {
    if (toggleDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [toggleDark])

  useEffect(() => {
    loadGroceries()
  }, [refresh])

  return (
    <>
      <header>

        <div id="header-title">
          <h1>CRUD Grocery List</h1>
        </div>

        <div id="header-btn">
          <button 
            id='ui-dark-btn' 
            onClick={() => setToggleDark(!toggleDark)}
            style={{backgroundColor: toggleDark ? "white" : "black"}}
          >
            {toggleDark ? "🔆" : "🌙"}
          </button>
          <button 
            id='create-btn'
            style={{color: toggleDark ? "white" : "black"}}
            onClick={() => setToggleCreate(true)}
          >CREATE</button>
        </div>

      </header>

      <main>
        <Dashboard 
          groceries={groceries}
          setGroceries={setGroceries}
          toggleDark={toggleDark}
        />
      </main>

        {
          toggleCreate && (
            <Create 
              setToggleCreate={setToggleCreate}
              setRefresh={setRefresh}
            />
          )
        }
    </>
  )
}

export default App
