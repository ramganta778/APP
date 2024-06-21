import React, { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileInputRef = useRef();
  let profilePicInputRef = useRef();

  let [profilePic, setProfilePic] = useState([]);

  let onSignupFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobile", mobileInputRef.current.value);

    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/register", reqOptions);

    let JSOData = await JSONData.json();
    // setProfilePic(JSOData);
    alert("Successfully Registered");

    console.log(JSOData);
  };

  return (
    <div className="signup">
      <form>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input type="password" ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No</label>
          <input ref={mobileInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            accept="image/*"
            onChange={(eo) => {
              let selectedPicPath = URL.createObjectURL(eo.target.files[0]);

              setProfilePic(selectedPicPath);
            }}
          ></input>
        </div>
        <div>
          <button
            className="group"
            type="button"
            onClick={() => {
              onSignupFD();
            }}
          >
            SignUp
          </button>

          <button>
            <Link to={"/"}>Login</Link>
          </button>

          <img src={profilePic}></img>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
