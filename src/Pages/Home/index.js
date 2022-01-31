import { Button } from "antd";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { locUpdate, login } from "../../api/auth.js";
import { getpPofile } from "../../api/auth.js";
// import { Geolocation } from '@capacitor/geolocation';
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [profile, setprofile] = useState();
  const [refresh, setrefresh] = useState("");

  let history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    console.log("token in home", localStorage.getItem("user_token"));
    localStorage.getItem("user_token") === null ||
    localStorage.getItem("user_token") === undefined
      ? history.push("/")
      : console.log("no");
    console.log("token before", localStorage.getItem("user_token"));
    //  const profDet= await getpPofile();
    //  console.log("prof",profDet);
    setprofile(location.state.detail);

    setInterval(async () => {
      console.log("interval")
      // const coordinates = await Geolocation.getCurrentPosition();
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log("cordinates", lat, long);
        locUpdate({ lat: lat, lng: long });
      });
    }, 3000);
  }, [localStorage.getItem("user_token"), refresh]);

  return (
    <div className="home">
      <h2>Profile</h2>
      <table>
        <tr>
          <td>NAME</td>
          <td>{profile?.name}</td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td>{profile?.mobile}</td>
        </tr>
      </table>
      <a
        onClick={() => {
          localStorage.removeItem("user_token");
          console.log("token", localStorage.getItem("user_token"));
          setrefresh("refresh");
        }}
        style={{
          width: "100%",
          margin: "0",
          color: "white",
          marginTop: "20px",
          display: "block",
        }}
      >
        Log Out
      </a>
    </div>
  );
}
