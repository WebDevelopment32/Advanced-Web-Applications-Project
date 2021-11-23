import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function ContactList(props) {
    return (
        <div className="contactListView">
            <div className="contactList">
            { props.contacts.map(contact =>
                <Link to={ contact.id }>
                <div className="contactListElement">{contact.tuote1}</div>
                </Link>
            )}
            </div>
            <div>
                <h4><code>Tilaus sisältää seuraavat tuotteet: </code></h4>
                <Outlet />
            </div>
        </div>
    )
}
