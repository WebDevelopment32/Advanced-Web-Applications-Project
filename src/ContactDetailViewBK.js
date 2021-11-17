import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContactDetailViewBK(props) {

    const result = useParams();
    console.log(result);

    const contactBK = props.contactsBK.find(contactBK => contactBK.id === result.contactIdBK);
    if(contactBK == null) {
        return <div>No contact found</div>
    }

    return (
        <div>
            <table>
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
            </table>
        </div>
    )
}