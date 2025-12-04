import { useState, useEffect } from "react";
import "./dashboard.css"

function getRandomColors(number) {
  return Array.from({length: number}, () => 
    "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"))
}

export default function Dashboard({ groceries, setGroceries, setRefresh, toggleDark }) {

    const [color, setColor] = useState(getRandomColors(groceries.length))

    useEffect(() => {
        setColor(getRandomColors(groceries.length))
    }, [groceries.length])

    return (
        <>
            {groceries.map((grocery, index) => (
                <div 
                    className="grocery-container"
                    style={{backgroundColor: color[index] }}
                    key={grocery.id}
                >

                    <div className="grocery-header">
                        <div className="grocery-header-left">
                            <h2>{ grocery.grocery_group_name }</h2>
                        </div>
                        <div className="grocery-header-right">

                            <button 
                                id="add-btn"
                                style={{color: toggleDark ? "white" : "black"}}
                            >Add</button>
                            <button 
                                id="edit-btn"
                                style={{color: toggleDark ? "white" : "black"}}
                            >Edit</button>
                            <button 
                                id="delete-btn"
                                style={{color: toggleDark ? "white" : "black"}}
                            >Delete</button>

                        </div>
                    </div>
                    <hr />
                    
                    <div className="grocery-content">

                        <div className="grocery-content-header">
                            <div className="grocery-content-header-left">
                                <p>Name</p>
                            </div>
                            <div className="grocery-content-header-right">
                                <p>Quantity</p>
                            </div>
                        </div>

                        {grocery.items.map((item) => (
                            <div className="grocery-content-data">
                                <div className="grocery-content-data-left">
                                    <p>{ item.name }</p>
                                </div>
                                <div className="grocery-content-data-right">
                                    <p>{ item.quantity }</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </>
    )
}