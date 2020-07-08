import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colorPrimary } from "../helpers/styles";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminSidebar from "../components/AdminSidebar";
import AdminTable from "../components/AdminUserDashboardTable";
import AdminDriverTable from "../components/AdminDriverDashboardTable";
import RequestsTable from "../components/RequestsDashboardTable";
import CardMessage from "../components/Cards/CardMessage";
import Messages from "../components/Messages";
import NavbarOn from "../components/NavOn";
import DriverMenu from "../components/DriverMenu";
import UserProfileSidebar from "../components/UserProfileSidebar";
import UserProfileForm from "../components/Forms/UserProfile";
import { useSelector } from "react-redux";
import Correo from "../components/Correo";

export default function EmailCli() {
  const [on, setToggle] = React.useState(true);
  const handleToggle = (e) => setToggle(!on);
  const { name, lastName, role } = useSelector((state) => ({
    ...state.User,
  }));
  return (
    <EmailCliStyle>
      <NavbarOn name={name} toggle={handleToggle} />
      <DriverMenu show={on} />
      <div className="page">
        <div className="sid">
          {/* <SideIn></SideIn> */}
          <UserProfileSidebar />
        </div>
        <div className="mails">
          <h1>Emails</h1>
          <Correo color="#EE462F" />
        </div>
      </div>
    </EmailCliStyle>
  );
}

const EmailCliStyle = styled.div`
  position: absolute;
  background: white;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;

  .page {
    margin-top: 80px;
  }

  .mails {
    background-color: white;
    padding-left: 3rem;
    h1 {
      font-weight: 300;
      color: #ee462f;
      letter-spacing: 2px;
      margin-bottom: 40px;
    }
  }

  @media only screen and (min-width: 970px) {
    .page {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-auto-rows: 100vh;
    }
    .mails {
      h1 {
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #ee462f;
        width: 600px;
      }
    }
  }
  @media only screen and (max-width: 969px) and (min-width: 735px) {
    .page {
      display: grid;
      grid-template-columns: 25% 75%;
      grid-auto-rows: 100vh;
    }
    .mails {
      height: 100vh;
      width: 100vw;
      h1 {
        margin-top: 100px;
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
      }
      hr {
        border: 1px solid #ee462f;
        width: 600px;
      }
    }
  }
  @media only screen and (max-width: 734px) {
    .page {
      margin-top: 50px;
    }
    .repartidores {
      height: 100vh;
      h1 {
        margin-top: 100px;
        font-size: 30px;
        font-weight: 300;
        color: #ee462f;
        letter-spacing: 2px;
      }
      h2 {
        margin-top: 15px;
        margin-bottom: 15px;
        font-size: 15px;
      }
      hr {
        border: 1px solid #ee462f;
        width: 400px;
      }
    }
    .sid {
      display: none;
    }
  }
`;
