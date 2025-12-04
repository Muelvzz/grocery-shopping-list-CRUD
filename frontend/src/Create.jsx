import { useState, useEffect } from "react";
import "./modals.css"

export default function Create({ setToggleCreate, setRefresh }) {

    const [groceries, setGroceries] = useState([
        {name: "", quantity: ""}
    ])
    const [groceryName, setGroceryName] = useState("")

    const handleName = (e) => {
        setGroceryName(e.target.value)
    }

    const handleSubmit = (e) => {
        event.preventDefault()
        console.log({
            groceryName: groceryName,
            groceries: groceries
    })
        setToggleCreate(false)
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">

                    <div className="modal-header">
                        <div id="left-header">
                            <h2>This is a modal</h2>
                        </div>
                        <div id="right-header">
                            <button
                                onClick={() => setGroceries(prev => [...prev, {name: "", quantity: ""}])}
                            >➕</button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <h3>Grocery Name:</h3>
                        <input 
                            type="text"
                            placeholder="Enter your grocery name" 
                            value={groceryName}
                            onChange={handleName}
                            required
                        />

                        <h3>Groceries:</h3>

                        {groceries.map((item, i) => (
                            <div className="add-grocery" key={i}>
                                <input 
                                    type="text" 
                                    placeholder="Name"
                                    value={item.name}
                                    onChange={(e) => {
                                        setGroceries(prev => {
                                            const updated = [...prev];
                                            updated[i].name = e.target.value
                                            return updated
                                        })
                                    }}
                                    required
                                />

                                <input 
                                    type="number" 
                                    placeholder="Number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        setGroceries(prev => {
                                            const updated = [...prev];
                                            updated[i].quantity = e.target.value
                                            return updated
                                        })
                                    }}
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setGroceries(prev => prev.filter((_, idx) => idx !== i))
                                    }
                                >❌</button>
                            </div>
                        ))}

                        <button
                            id="submit-btn"
                        >Save</button>
    
                    </form>

                    <button
                        onClick={() => setToggleCreate(false)}
                        id="cancel-btn"
                    >Cancel</button>
                </div>
            </div>
        </>
    )
}