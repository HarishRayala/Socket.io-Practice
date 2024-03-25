import React, { useEffect, useState } from 'react'
import "./Fetchproducts.css"

const FetchProducts = ({socket}) => {
    const [products,setProducts]=useState([])
    console.log(socket);

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((json)=>{
                console.log(json)
                setProducts(json)
                if(socket) {
                    socket.emit("productsFetched", json.length); // Emit event with product count
                }
            })
    },[socket])
  return (
    <div>

        <div className='productsMainbox' >
            {
                products.map((item)=>{
                    return(
                        <div className='productContentBox' key={item.id}>
                            <h5>{item.title}</h5>
                            <div className='imagebox' >
                            <img src={item.image} />
                            </div>
                            <p>{item.description}</p>
                            <h3>{item.price}</h3>
                        </div>
                    )
                })
            }
        </div>

    </div>
  )
}

export default FetchProducts

