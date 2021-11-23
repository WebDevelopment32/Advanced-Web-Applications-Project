import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function ContactListHS(props) {
    return (
        <div className="contactListView">
            <div className="contactList">
            { props.contactsHS.map(contactHS =>
                <Link to={ contactHS.id }>
                <div className="contactListElement">{contactHS.tuote1}</div>
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
