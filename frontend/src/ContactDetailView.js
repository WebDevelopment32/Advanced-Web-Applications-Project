import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContactDetailView(props) {

    function Tilaus() {
        alert('Tuote lisätty ostoskoriin')
        }

    const result = useParams();
    console.log(result);

    const contact = props.contacts.find(contact => contact.id === result.contactId);
    if(contact == null) {
        return <div>No contact found</div>
    }

    return (
        <div>
            <table>
                <tr>
                    <td>{contact.info1}</td>
                </tr>
                <tr>
                    <td>{contact.info2}</td>
                </tr>
                <tr>
                    <td>{contact.info3}</td>
                </tr>
                <tr>
                    <td>{contact.info4}</td>
                </tr>
                <button class="plus">+</button>
                <input class="quantityScreen" type="number"></input>
                <button class="minus">-</button>
                <button class="Tilaukseen" onClick={Tilaus}>Lisää Tilaukseen</button>
            </table>
        </div>
    )
}
