import { useState, useEffect } from "react";
import "./dashboard.css"

export default function Dashboard({ groceries, setGroceries, toggleDark }) {

    return (
        <>
            {groceries.map((grocery) => (
                <div 
                    className="grocery-container"
                    style={{backgroundColor: "rgba(128, 128, 128, 0.3)" }}
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
                            <div>
                                <p>Name</p>
                            </div>
                            <div>
                                <p>Price</p>
                            </div>
                            <div>
                                <p>Quantity</p>
                            </div>
                        </div>

                        {grocery.items.map((item) => (
                            <div className="grocery-content-data">
                                <div >
                                    <p 
                                        align="left"
                                        style={{marginLeft: "1rem"}}
                                    >{ item.name }</p>
                                </div>
                                <div>
                                    <p>{ item.price } pesos</p>
                                </div>
                                <div>
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