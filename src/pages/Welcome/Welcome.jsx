
import {

    theme,

    Button,
    Space,

} from "antd";

import styled from "styled-components";
import logo from "./icon.svg";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"



const WelcomePage = (props) => {
    const buttonStyle = {
        backgroundColor: "#8767E1",
        color: "#fff",
    };

    const Content = styled.div`
    margin: 15px 16px;
    padding: 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    text-align: center;
    align-items: center;
  `;
    const {
        token: { colorBgContainer },
    } = theme.useToken();


    const navigate = useNavigate();
    return (
        <>
            {/* <PathName>My Profile</PathName> */}
            <Content>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>Welcome home... </h1>
                <h2 style={{ color: "#33FFFF" }}>{props.userData.fullname}</h2>
                <p>
                    {" "}
                    Là dự án tốn bao nhiêu tâm huyết, mô hôi và máu của đội ngũ phát
                    triển:{" "}
                </p>
                <p>Reactjs-PKA</p>

                <Space style={{
                    textAlign: "center"
                }}>
                    <Button
                        style={buttonStyle}
                        onClick={() => {
                            navigate("myprofile/update");
                        }}
                    >
                        Update Profile
                    </Button>
                    <Button
                        onClick={() => {
                            navigate("myprofile/change");
                        }}
                    >
                        Change Password
                    </Button>
                </Space>

            </Content>
        </>
    );
};
export default WelcomePage;
