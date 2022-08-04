import React from 'react'
import { useNavigate } from 'react-router';

const Card = (props) => {
       let nav= useNavigate();

    let obj = props.data;
    return (
        <div onClick={() => {
            nav("/resource/" + obj.id)
        }} className="card border " style={{ width: "320px", margin: "32px 32px 32px 0", borderColor: "#D7DFE9" }}>
            <div className=" card-header bg-transparent " style={{ height: "192px" }}>
                <div className='d-flex'>
                    <img className='rounded ' style={{ width: "44px", height: "44px", }} src={obj.icon_url} alt="" />
                    <div style={{ marginLeft: "1rem" }}>
                        <p ><strong>{obj.title}</strong></p>
                        <p style={{ color: "#7E858E", marginTop: "-20px" }}><small>{obj.category}</small></p>
                    </div>
                </div>
                <p ><a style={{ color: "#0B69FF", textDecoration: 'none' }} href={obj.link} target="_blank">{obj.link}</a></p>
                <p style={{ fontSize: "14px", color: "#7E858E" }}>{obj.description}</p>

            </div>

        </div>
    )
}

export default Card