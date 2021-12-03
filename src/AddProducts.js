import React from 'react'
import './AddProducts.css'

export default function AddProducts() {

    function addProduct() {
        alert('Product added successfully')
        }

    return (
        <div>
            <h2 className="addOtsikko">Add products</h2>
            <div className="addNameDiv">
                <p className="addProductName">Give your product a name</p>
                <input type="text" className="addNameInput"></input>
            </div>
            <div className="addNameDiv">
                <p className="addProductName">Price (€)</p>
                <input type="text" className="addPriceInput"></input>
            </div>
            <div></div>
            <div className="addNameDiv">
                <p className="addInfo">Info #1</p>
                <input type="text" className="addInput"></input>
            </div>
            <div className="addNameDiv">
                <p className="addInfo">Info #2</p>
                <input type="text" className="addInput"></input>
            </div>
            <div></div>
            <div className="addNameDiv">
                <p className="addInfo">Info #3</p>
                <input type="text" className="addInput"></input>
            </div>
            <div className="addNameDiv">
                <p className="addInfo">Info #4</p>
                <input type="text" className="addInput"></input>
            </div>
                <button className="addBtn" onClick={addProduct}>Add</button>
        </div>
    )
}
