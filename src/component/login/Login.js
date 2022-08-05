
import Button from 'react-bootstrap/Button';
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const userName = useRef();
  const passWord = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      userName.current.value.trim().length === 0 ||
      passWord.current.value.trim().length === null
    ) {
      alert("Please fill email/password");
      return;
    }
    props.setAuth(true);
    localStorage.setItem("isAuth",true);
    navigate("/")
     return
  };

  useEffect(()=>{
    alert("Any username and password with length more than one are valid ");
  },[])



  return (
    <div>
      <section className="h-screen">
        <div className="px-6 h-full text-gray-800" style={{width:"80%" , margin:"auto"}}>
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                // className="w-full"
                style={{width:"500px",height:"400px", margin:"auto"}}
                alt="images"
              />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={(e) => submitHandler(e)} style={{width:"50%" , margin:"auto"}}>
                <div className="mb-6 m-2">
                  <input
                    type="email"
                    id="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email address"
                    ref={userName}
                    required
                  />
                </div>

                <div className="mb-6 m-2  ">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Password"
                    ref={passWord}
                    pattern=".{6,}"
                    required
                    title="6 characters minimum"
                  />
                </div>

                <div className="text-center lg:text-left">
                  {/* <button
                   
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button> */}
                  <Button className="m-1"  onClick={submitHandler}
                    type="submit" variant="primary">Login</Button>{' '}

                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;