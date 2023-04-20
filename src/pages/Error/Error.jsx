import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';



const ErrorPage = (props) => {

    function Handle() {
        localStorage.removeItem("token");

        props.setToken(null)
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Xin lỗi hệ thống đang gặp sự cố"
            extra={
                <Button type="primary" onClick={Handle}>Trở lại trang đăng nhập</Button>
            }
        />
    );
};

export default ErrorPage;