import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function ContactListBK(props) {
    return (
        <div className="contactListView">
            <div className="contactList">
            { props.contactsBK.map(contactBK =>
                <Link to={ contactBK.id }>
                <div className="contactListElement">{contactBK.tuote1}</div>
                </Link>
            )}
            </div>
            <div className="tuoteInfo">
                <h4><code>The order includes the following products: </code></h4>
                <Outlet />
            </div>
        </div>
    )
}
