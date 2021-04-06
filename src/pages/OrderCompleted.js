import React from 'react'
import {formatPrice} from "../services/utility";
import calcTotalPrice from "../services/utility";
import "./OrderCompleted.css"

function OrderCompleted({order,setOrder}) {
    console.log("order",order)
    const total=order.items.map(item=>item)
    const totalPrice=calcTotalPrice(order)
    console.log("total",total)
    console.log("totalPrice",totalPrice);

    return (
        <div className="OrderCompleted">
            <h2>Resume</h2>
            <label>Name: {order.billingData.name}</label><br></br>
            <label>Surname: {order.billingData.surname}</label><br></br>
            <label>Address: {order.billingData.address}</label><br></br>
            <label>Email: {order.billingData.email}</label><br></br> 
            <label>Data: {order.created}</label><br></br> 
            <ul>
            {order.items.map((item,key)=>{
               return <li>{key+1}:{`${item.title}`} <strong>{formatPrice(item.price)}</strong></li>
            })}
            </ul>
            <strong>Total Price: {formatPrice(totalPrice)}</strong> 
        </div>
    )
}

export default OrderCompleted
