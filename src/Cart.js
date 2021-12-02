import React from 'react'
import './Cart.css'

export default function OrderMenu() {
    return (
        <div className="order-page">
            <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
                <tr>
                    <td>
                        <div className="cart-info">
                            <img src="../Images/mcdonalds.jpg" alt=""></img>
                            <div>
                                <p>McDonalds order</p>
                                <p>Price: 10.00€</p>
                                <button>Remove</button>
                            </div>
                        </div>
                    </td>
                    <td className="loppusumma"><input type="number" value="1"/></td>
                    <td className="loppusumma">10.00€</td>
                </tr>
                <tr>
                    <td>
                        <div className="cart-info">
                            <img src="../Images/BKlogo.png" alt=""></img>
                            <div>
                                <p>BurgerKing order</p>
                                <p>Price: 10.00€</p>
                                <button>Remove</button>
                            </div>
                        </div>
                    </td>
                    <td className="loppusumma"><input type="number" value="1"/></td>
                    <td className="loppusumma">10.00€</td>
                </tr>
            </table>
            <div className="total-price">
                <table>
                    <tr>
                        <td>Total</td>
                        <td>20.00€</td>
                    </tr>
                </table>
            </div>    
        </div>
    )
}
