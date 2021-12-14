import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContactDetailViewBK(props) {

    function Tilaus() {
        alert('Product added to cart successfully')
        }

    const result = useParams();
    console.log(result);

    const contactBK = props.contactsBK.find(contactBK => contactBK.id === result.contactIdBK);
    if(contactBK == null) {
        return <div>No contact found</div>
    }

    return (
        <div>
            <table className="tuoteInfo">
                <tr>
                    <td>{contactBK.info1}</td>
                </tr>
                <tr>
                    <td>{contactBK.info2}</td>
                </tr>
                <tr>
                    <td>{contactBK.info3}</td>
                </tr>
                <tr>
                    <td>{contactBK.info4}</td>
                </tr>
                <tr>
                    <td className="price">{contactBK.price}</td>
                </tr>
                <button class="plus">+</button>
                <input class="quantityScreen" type="number"></input>
                <button class="minus">-</button>
                <button class="Tilaukseen" onClick={Tilaus}>Add to cart</button>
            </table>
        </div>
    )
}