import { Descriptions } from "antd";
import React from "react"
import styled from "styled-components";

export default function UserDetails() {
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
    flex-direction: row;
    border-radius:10px;

    `;

    return (
        <>
            <PathName>User Details</PathName>
            <Content>
                <Descriptions title="" layout="vertical" column={3}>
                    <Descriptions.Item label="Name">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Email">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Username">
                        Hangzhou, Zhejiang
                    </Descriptions.Item>
                    <Descriptions.Item label="DOB">25/01/1992</Descriptions.Item>
                    <Descriptions.Item label="Phone Number">
                        Cau Giay, Ha noi
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">empty</Descriptions.Item>
                    <Descriptions.Item label="Role">empty</Descriptions.Item>
                </Descriptions>

            </Content>

        </>
    )
}