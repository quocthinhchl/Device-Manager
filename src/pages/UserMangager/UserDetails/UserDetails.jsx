import { Button, Descriptions, List, Row, Skeleton, Space } from "antd";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import axiosInstance from "../../../shared/services/http-client";
import { useNavigate } from "react-router";

const PathName = styled.p`
    margin: 10px 25px 0px 20px;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 32px;
    color: #111111;
  `;
const Content = styled.div`
    margin: 15px 16px;
    padding: 24px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    border-radius:10px;

    `;

const DevicesList = styled.div`
    display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 16px;
`

const Devices = styled.div`
    width: 1071px;
    height: 215px;
    background: #FFFFFE;
/* Neutral Dark/5 */

    border: 1px solid #DDE4EE;
    border-radius: 8px;
`
const Text = styled.p`
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #805EDF;
    margin: 0;
`


export default function UserDetails({ userId }) {

    const [user, setUser] = useState("");
    const [DVS, setDVS] = useState([]);
    const navigate = useNavigate();

    const id = userId.pathname.substring(userId.pathname.lastIndexOf('/') + 1);
    useEffect(() => {
        axiosInstance.get(`users/${id}?populate=devices,role`).then((res) => {
            setUser(res);
            setDVS(res.devices)
        });
    }, []);

    function HandleDelete() {
        console.log(id);
        axiosInstance.delete(`users/${id}`)
        navigate("/dashboard/users")
    }

    return (
        <>
            <PathName>User Details</PathName>
            <Content>
                <Descriptions title="" layout="vertical" column={3}
                    labelStyle={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#939393',
                        margin: 0
                    }}
                    style={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px',
                    }}
                >
                    <Descriptions.Item label="Name" >{user.fullname}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                    <Descriptions.Item label="Username">
                        Hangzhou, Zhejiang
                    </Descriptions.Item>
                    <Descriptions.Item label="DOB">{user.dob}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                        {user.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
                    {/* {user.role.name && <Descriptions.Item label="Role">{user.role.name}</Descriptions.Item>} */}
                </Descriptions>

                <DevicesList>
                    <p style={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#939393',
                        margin: 0
                    }}>Devices:</p>
                    <Devices >

                        <List
                            itemLayout="horizontal"
                            dataSource={DVS}
                            renderItem={(item) => (
                                <List.Item style={{
                                    border: 'none',
                                    padding: '16px 0 0 16px'
                                }}>
                                    <List.Item.Meta
                                        title={<Text key={item.id}>{item.name}</Text>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Devices>
                </DevicesList>

                <Row style={{ borderTop: "1px solid #dcd2d2", marginTop: "32px" }}>
                    <Space style={{ paddingTop: 24 }}>
                        <Button
                            style={{
                                background: "#8767E1",
                                color: "#F1F4F9"
                            }}
                            onClick={() => {
                                navigate(`/dashboard/users/edit/${id}`);
                            }}
                        >
                            Edit
                        </Button>
                        <Button
                            style={{
                                color: "#8767E1"
                            }}
                            onClick={() => {
                                console.log(id);
                                axiosInstance.delete(`users/${id}`)
                                navigate("/dashboard/users")
                            }}
                        >
                            Delete
                        </Button>
                    </Space>
                </Row>
            </Content>

        </>
    )
}