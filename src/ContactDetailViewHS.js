import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContactDetailViewHS(props) {

    function Tilaus() {
        alert('Product added to cart successfully')
        }

    const result = useParams();
    console.log(result);

    const contactHS = props.contactsHS.find(contactHS => contactHS.id === result.contactIdHS);
    if(contactHS == null) {
        return <div>No contact found</div>
    }

    return (
        <div>
            <table className="tuoteInfo">
                <tr>
                    <td>{contactHS.info1}</td>
                </tr>
                <tr>
                    <td>{contactHS.info2}</td>
                </tr>
                <tr>
                    <td>{contactHS.info3}</td>
                </tr>
                <tr>
                    <td>{contactHS.info4}</td>
                </tr>
                <tr>
                    <td className="price">{contactHS.price}</td>
                </tr>
                <button class="plus">+</button>
                <input class="quantityScreen" type="number"></input>
                <button class="minus">-</button>
                <button class="Tilaukseen" onClick={Tilaus}>Add to cart</button>
            </table>
        </div>
    )
}