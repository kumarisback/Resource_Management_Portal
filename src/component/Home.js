import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card'

const Home = () => {
    
    let nav= useNavigate();
    const searchInput = useRef(null);
    const [resources, setResources] = useState();
    const [startSearch, setStartSearch] = useState(false)
    useEffect(() => {
        const getResources = async () => {
            try {

                let res = await axios.get("https://media-content.ccbp.in/website/react-assignment/resources.json");

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
    return (
        <>

<div className={"d-flex"} style={{ width: "600px", margin: "auto" }} role="group">
        <button onClick={()=>{nav("/")}} type="button" style={{ width: "200px", height: "40px" }} className="btn btn-outline-primary flex-fill">Resources</button>
        <button onClick={()=>{nav("/request")}} type="button" style={{ width: "200px", height: "40px" }} className="btn btn-outline-primary flex-fill">Request</button>
        <button onClick={()=>{nav("/users")}} type="button" style={{ width: "200px", height: "40px" }} className="btn btn-outline-primary flex-fill">Users</button>
      </div>

            <div className="main" style={{ width: "80%", justifyContent: "center" }}>
                <div className="form-group has-search" style={{ width: "50%" , display:"flex"}}>
                    <span className="fa fa-search form-control-feedback"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.05888 4.77944C8.05888 6.59063 6.59063 8.05888 4.77944 8.05888C2.96826 8.05888 1.5 6.59063 1.5 4.77944C1.5 2.96826 2.96826 1.5 4.77944 1.5C6.59063 1.5 8.05888 2.96826 8.05888 4.77944ZM7.58708 8.64771C6.79881 9.22083 5.8286 9.55888 4.77944 9.55888C2.13983 9.55888 0 7.41905 0 4.77944C0 2.13983 2.13983 0 4.77944 0C7.41905 0 9.55888 2.13983 9.55888 4.77944C9.55888 5.82859 9.22084 6.79878 8.64773 7.58704L12.001 10.9403L10.9403 12.001L7.58708 8.64771Z" fill="#171F46" />
                    </svg>
                    </span>

                    <input type="text" ref={searchInput} onKeyDown={(e) => { if (e.key === "Enter") setStartSearch(true) }} className="form-control" placeholder="Search" />
                    <button type="button" className="btn bg-transparent" style={{ marginLeft: "-40px", zIndex: "100" }} onClick={()=>setStartSearch(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
                <div className='justify-content-between' style={{ display: "flex", flexWrap: "wrap", width: "150vh", justifyContent: "space-between" }}>
                    {resources?.map((res) => {
                        if (startSearch && searchInput.current != null && (searchInput.current.value.trim() !== "" && searchInput.current.value !== null) && (res.title.toLowerCase()).includes(searchInput.current.value.toLowerCase())) {
                            
                            return <Card key={res.id} data={res} />
                        }
                        else if (!startSearch) return <Card key={res.id} data={res} />
                    })}
                </div>
            </div>




        </>

    )
}

export default Home