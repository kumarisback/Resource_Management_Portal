import React,{useRef} from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import img from '../image/image.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const AddItem = () => {
    const title = useRef("")
    const desc = useRef("")
    const link = useRef("")
    const name = useRef("")
    const notify = (details) => toast(details);
    const submitHandler = async (e) => {

        if(title.current.value.trim()=== "" || desc.current.value.trim()=== "" || link.current.value.trim()=== "" || name.current.value.trim()=== ""){
            notify("all fields are mandatory");
            return
        }
        try {
            let res = await axios.get("https://media-content.ccbp.in/website/react-assignment/add_resource.json", {});
            notify("Item added succesfully!!!")
        } catch (error) {
            notify("Fail to add")
        }
        nav(-1);
        return
    }
    let nav = useNavigate();
    return (
        <div style={{ width: "80%", margin: "auto" }}>

            <div style={{ display: 'flex' }}>
                <Form style={{ flex: "50%", padding: "10px", margin: "10% 10% auto auto" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                        </svg>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li onClick={() => { nav(-1) }} className="breadcrumb-item active" aria-current="page" style={{ alignItems: "center" }}>Go back</li>
                            </ol>
                        </nav>
                    </div>
                    <Form.Group className="mb-3" >
                        <Form.Label >Item Name</Form.Label>
                        <Form.Control ref={title} type="text" placeholder="Enter item name" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Link</Form.Label>
                        <Form.Control ref={link} type="text" placeholder=" Enter Link" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label > Resource Name</Form.Label>
                        <Form.Control ref={name} type="text" placeholder="Enter Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={desc} type="text" placeholder="Enter Description" />
                    </Form.Group>
                    <Button onClick={submitHandler} style={{ marginLeft: "40%" }} variant="primary">Add item</Button>{' '}
                </Form>
                <img style={{ width: "50%" }} src={img} alt='' />

            </div>
            <ToastContainer position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        </div>
    )
}

export default AddItem