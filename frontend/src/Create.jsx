import { useState, useEffect } from "react";
import "./modals.css"
import api from "./api";

export default function Create({ setToggleCreate, setRefresh }) {

    async function addGrocery(grocery) {
        const res = await api.post("/grocery/create-group", grocery)
        setRefresh(prev => !prev)
    }

    const [groceries, setGroceries] = useState([
        {name: "", price: 0, quantity: ""}
    ])
    const [groceryName, setGroceryName] = useState("")

    const handleName = (e) => {
        setGroceryName(e.target.value)
    }

    const handleSubmit = (e) => {
        event.preventDefault()

        const groceriesData = {
            grocery_group_name: groceryName,
            items: groceries
        }

        addGrocery(groceriesData)

        console.log(`${groceryName} is added to the database`)

        setToggleCreate(false)
    }

    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">

                    <div className="modal-header">
                        <div id="left-header">
                            <h2>Create Groceries</h2>
                        </div>
                        <div id="right-header">
                            <button
                                onClick={() => setGroceries(prev => [...prev, {name: "", price: 0, quantity: ""}])}
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
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => {
                                        setGroceries(prev => {
                                            const updated = [...prev];
                                            updated[i].price = e.target.value
                                            return updated
                                        })
                                    }}
                                    required
                                />

                                <input 
                                    type="number" 
                                    placeholder="Quantity"
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
                        >Create</button>
    
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