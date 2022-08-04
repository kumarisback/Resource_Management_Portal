import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Table from '../Table'
import { useNavigate, useParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResourcesDetails = () => {


    const filterdata = useRef("");
    const [Search, setSearch] = useState("");
    const [flag, setflag] = useState(true);
    let { id } = useParams();
    const [temp, settemp] = useState()
    let nav = useNavigate();
    const [resources, setResources] = useState();
    const notify = (details) => toast(details);
    useEffect(() => {
        const getResources = async () => {
            try {

                let res = await axios.get(`https://media-content.ccbp.in/website/react-assignment/resource/${id}.json`);

                if (res.status === 200)
                    setResources(res.data)
                else
                    alert("somethingwent wrong")
            } catch (error) {
                alert("something went wrong")
            }
        }


        getResources();


    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: ' ',
                columns: [
                    {
                        Header: '',
                        accessor: 'id',
                        Cell: (props) => {
                            return < input value={props.value} id={props.value} type={'checkbox'} />

                        }
                    },
                    {
                        Header: 'Title',
                        accessor: 'title',
                    },
                    {
                        Header: 'Description',
                        accessor: 'description',
                    },
                    {
                        Header: 'Link',
                        accessor: 'link',
                    }

                ],
            },
        ],
        []
    )

    const handleDelete = (arr) => {
        arr.forEach(element => {
            if (element !== null && element !== undefined) {
                document.getElementById(`${element}`).checked = false;
            }
        });
        let reso = resources.resource_items;
        reso = reso.filter(per => !arr.includes(per.id))
        let last = resources;
        last.resource_items = reso;
        setResources({ ...resources, resource_items: reso })
    }

    function compare1(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }

    function compare2(a, b) {
        if (a.title > b.title) {
            return -1;
        }
        if (a.title < b.title) {
            return 1;
        }
        return 0;
    }
    function compare3(a, b) {
        if (a.createdAt < b.createdAt) {
            return -1;
        }
        if (a.createdAt > b.createdAt) {
            return 1;
        }
        return 0;
    }

    const handleUpdate = async () => {
        try {
            // update is not provided by this api so i'm just using it for sake
            let res = await axios.get(`https://media-content.ccbp.in/website/react-assignment/resource/1.json`);

            if (res.status === 200)
                notify("update successfully")
            else
                notify("somethingwent wrong")
        } catch (error) {
            notify("something went wrong")
        }
    }

    const arrange = (types) => {
        let reso;
        setflag(false)
        if (types === 1) {

            reso = resources.resource_items;
            reso.sort(compare1);
            setResources({ ...resources, resource_items: [...reso] })

        }
        else if (types === 2) {
            reso = resources.resource_items;
            reso.sort(compare2);
            setResources({ ...resources, resource_items: [...reso] })
        }
        else {
            reso = resources.resource_items;

            reso.sort(compare3);
            setResources({ ...resources, resource_items: [...reso] })
        }

        setflag(true)
        return
    }
    return (
        <div style={{ width: "80%", margin: "auto" }}>

            <div style={{ display: "flex", alignItems: "center", justifyItems: "" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li onClick={() => { nav(-1) }} className="breadcrumb-item active" aria-current="page" style={{ alignItems: "center" }}>resources</li>
                    </ol>
                </nav>
            </div>
            <div className="" style={{ width: "18rem" }}>
                <div className="card-body">
                    <div className='headerOfResorseDetails' style={{ display: "flex" }}>
                        <img src={resources?.icon_url} alt="..." className='rounded-circle' style={{ maxWidth: "64px", maxHeight: "64px" }}></img>
                        <div style={{ marginLeft: "30px" }} >
                            <h5 className="card-title">{resources?.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{resources?.id}</h6>
                            <h6 className="card-subtitle mb-2 text-muted"><small><a style={{ textDecoration: "none" }} href={resources?.link} target="_blank">{resources?.link}</a></small></h6>
                        </div>
                    </div>
                    <p className="card-text">{resources?.description}</p>
                </div>
            </div>


            <button onClick={handleUpdate} type="button" className="btn btn-primary mt-5">Update</button>


            <nav className="navbar navbar-light bg-light justify-content-between mt-4">
                <a className="navbar-brand">Item</a>
                <div className="form-inline d-flex justify-content-start" >
                    <input onClick={e=>{if(  filterdata.current.value!==null && filterdata.current!= null && filterdata.current.value.trim()!==""){
                          
                           setResources({ ...resources, resource_items:[...temp]})
                    }}} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            settemp( resources.resource_items);
                         
                            // (filterdata.current.value.trim()).toLowerCase().includes
                            setResources({ ...resources, resource_items: resources.resource_items.filter(x => x.title.toLowerCase().includes(filterdata.current.value.trim())) })
                        }
                    }} ref={filterdata} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={() => setSearch(filterdata.current.value)} />



                    <DropdownButton id="dropdown-basic-button" title="sort" >
                        <Dropdown.Item onClick={e => arrange(1)}>Ascending</Dropdown.Item>
                        <Dropdown.Item onClick={e => arrange(2)}>Decending</Dropdown.Item>
                        <Dropdown.Item onClick={e => arrange(3)}>Most Recent</Dropdown.Item>
                    </DropdownButton>

                </div>
            </nav>

            {flag && resources != null && <Table columns={columns} data={resources.resource_items} handleDelete={handleDelete} />}
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

export default ResourcesDetails