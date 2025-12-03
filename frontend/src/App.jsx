import { useState, useEffect } from 'react'
import './App.css'
import Create from "./Create.jsx"

function App() {

  const [refresh, setRefresh] = useState(0)
  const [toggleDark, setToggleDark] = useState(false)
  const [toggleCreate, setToggleCreate] = useState(false)

  useEffect(() => {
    if (toggleDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [toggleDark])

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

        {
          toggleCreate && (
            <Create 
              setToggleCreate={setToggleCreate}
            />
          )
        }
    </>
  )
}

export default App
