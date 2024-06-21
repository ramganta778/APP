import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  let storeObj = useSelector((store) => {
    return store;
  });

  let navigate = useNavigate();

  useEffect(() => {
    if (storeObj && storeObj.userDetails && storeObj.userDetails.email) {
    } else {
      navigate("/");
    }
  }, []);
  return (
    <div className="navbar">
      <Link to={"/Home"}>Home</Link>
      <Link to={"/Tasks"}>Tasks</Link>
      <Link to={"/"}>Logout</Link>
    </div>
  );
}

export default Nav;
