import React from "react";
import Nav from "./Nav";
import { useSelector } from "react-redux";

function Home() {
  let storeObj = useSelector((store) => {
    return store;
  });
  
  return (
    <div>
      <Nav></Nav>
      <h1>
        Welcome! {storeObj.userDetails.firstName} {storeObj.userDetails.lastName}
      </h1>
      <img src={`/${storeObj.userDetails.profilePic}`}></img>
    </div>
  );
}

export default Home;

