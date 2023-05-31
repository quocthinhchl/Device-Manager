import { Breadcrumb, Button, Descriptions, List, Modal, Row, Skeleton, Space, notification } from "antd";
import React, { useEffect, useState } from "react"
import styled from "styled-components";
import axiosInstance from "../../../shared/services/http-client";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { UserProfile } from "../../../stores/Slice/UserSlice";
import { Link } from "react-router-dom";

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


export default function UserDetails() {

    const [user, setUser] = useState("");
    const [DVS, setDVS] = useState([]);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams()
    const userProfile = useSelector(UserProfile)



    useEffect(() => {
        axiosInstance.get(`users/${id}?populate=devices,role`).then((res) => {
            setUser(res);
            setDVS(res.devices);
        })
            .catch((error) => {
                notification.warning({
                    message: error.response.data.error.message,
                    description: `Có gì đó không ổn`,
                });
            })
    }, []);

    // useEffect(() => {

    //     const fetchDevices = async () => {
    //         try {
    //             const res = await axiosInstance.get(
    //                 `users/${id}?populate=devices,role`
    //             );
    //             if (res.data) {
    //                 setUser(res);
    //                 setDVS(res.devices)
    //             }
    //         } catch (error) {
    //             notification.warning({
    //                 message: 'Có gì đó không ổn',
    //                 description: `Có gì đó không ổn`,
    //             });
    //         }
    //     };
    //     fetchDevices();
    // }, []);


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        await axiosInstance.delete(`users/${id}`)
        setIsModalOpen(false);
        navigate("/dashboard/users_list")
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function HandleDelete() {
        // console.log(id, 'ghjgjghjhgj');
        showModal()
    }


    return (
        <>
            <PathName>
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: <Link to='/dashboard/users_list'>All User</Link>,
                        },
                        {
                            title: <b>{user.fullname}</b>,
                            href: '',
                        },
                    ]}
                />
            </PathName>
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
                        {user.username}
                    </Descriptions.Item>
                    <Descriptions.Item label="DOB">{user.dob}</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                        {user.phoneNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">{user.gender?.charAt(0).toUpperCase() + user.gender?.slice(1)}</Descriptions.Item>
                    <Descriptions.Item label="Role">{user.role?.name}</Descriptions.Item>
                </Descriptions>

                <DevicesList>
                    <p style={{
                        fontFamily: 'Poppins',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '24px',
                        color: '#939393',
                        margin: 0,
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
                    {(userProfile.isAdmin)
                        ? <Space style={{ paddingTop: 24 }}>
                            <Button
                                style={{
                                    background: "#8767E1",
                                    color: "#F1F4F9"
                                }}
                                onClick={() => {
                                    navigate(`/dashboard/users_list/edit/${id}`);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                style={{
                                    color: "#8767E1"
                                }}
                                onClick={HandleDelete}
                            >
                                Delete
                            </Button>
                        </Space>
                        : <Space style={{ paddingTop: 24 }}>
                            <Button
                                style={{
                                    color: "rgb(135, 103, 225)"
                                }}
                                onClick={() => {
                                    navigate(`/dashboard/users_list`);
                                }}
                            >
                                Back
                            </Button>
                        </Space>}

                </Row>
            </Content>
            <Modal title="Detele" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn xoá {user.fullname} không?</p>
            </Modal>
        </>
    )
}