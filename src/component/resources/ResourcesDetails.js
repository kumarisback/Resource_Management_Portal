import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '../Table'
import { useNavigate, useParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const ResourcesDetails = () => {

    
const filterdata= useRef("");
const [Search, setSearch] = useState("");
    let { id } = useParams();
    let nav = useNavigate();
    const [resources, setResources] = useState();
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
                            return < input value={props.value}  type={'checkbox'} />

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

    const handleDelete=(arr)=>{
        let reso=resources.resource_items;
        reso=reso.filter(per=> !arr.includes(per.id))
        let last=resources;
        last.resource_items=reso;
        setResources({...resources,resource_items:reso  })
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


            <button type="button" className="btn btn-primary mt-5">Update</button>


            <nav className="navbar navbar-light bg-light justify-content-between mt-4">
                <a className="navbar-brand">Item</a>
                <form className="form-inline d-flex justify-content-start" >
                    <input ref={filterdata} className="form-control mr-sm-2" type="search" value={""} placeholder="Search" aria-label="Search" onChange={()=>setSearch(e.current.value)} />

                    

                    <DropdownButton id="dropdown-basic-button" title="sort" >           
                        <Dropdown.Item href="#/action-1">Ascending</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Decending</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Most Recent</Dropdown.Item>
                    </DropdownButton>

                </form>
            </nav>

            {resources != null && <Table columns={columns} data={resources?.resource_items} handleDelete={handleDelete} />}
        </div>
    )
}

export default ResourcesDetails