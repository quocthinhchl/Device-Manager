import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../shared/services/http-client';
import styled from 'styled-components';
import { StatisticalCard } from './StatisticalCard';
import { BiCategoryAlt } from 'react-icons/bi';
import { MdDevices } from 'react-icons/md';
import { GrNotes } from 'react-icons/gr';
import { GiAutoRepair } from 'react-icons/gi';
import { FiUsers } from 'react-icons/fi';
import Charts from 'react-apexcharts';

const Content = styled.div`
  margin: 26px 20px;

  /* background: #ffffff; */
  display: flex;
  flex-direction: column;
`;

const Statistical = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  flex-wrap: wrap;
  /* gap: 1rem; */
  margin: 20px 5px;
`;

export default function StatisticalPage() {
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState();
  const [categories, setCategories] = useState();
  const [borrowRequests, setBorrowRequests] = useState();
  const [repairRequests, setRepairRequests] = useState();
  // const [chartData, setChartData] = useState({
  //   series: [
  //     {
  //       name: 'Người dùng',
  //       data: [0, 3, 8, users.length],
  //     },
  //     {
  //       name: 'Loại thiết bị',
  //       data: [0, 5, 5, categories?.meta?.pagination?.total],
  //     },
  //     {
  //       name: 'Thiết bị',
  //       data: [0, 9, 11, devices?.meta?.pagination?.total],
  //     },
  //     {
  //       name: 'Yêu cầu mượn trả',
  //       data: [0, 0, 10, borrowRequests?.meta?.pagination?.total],
  //     },
  //     {
  //       name: 'Yêu cầu sửa chữa',
  //       data: [0, 0, 4, repairRequests?.meta?.pagination?.total],
  //     },
  //   ],

  //   options: {
  //     chart: {
  //       height: 350,
  //       type: 'line',
  //       zoom: {
  //         enabled: false,
  //       },
  //       background: '#ffffff',
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       curve: 'straight',
  //     },
  //     title: {
  //       text: 'Số lượng qua từng tháng',
  //       align: 'left',
  //     },
  //     grid: {
  //       row: {
  //         colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //         opacity: 0.5,
  //       },
  //     },
  //     xaxis: {
  //       categories: ['07/2023', '08/2023', '09/2023', '10/2023'],
  //     },
  //   },
  // });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axiosInstance.get(`/users?pagination[pageSize]=100`).then(res => {
      setUsers(res);
    });
    await axiosInstance
      .get(`/categories?pagination[pageSize]=100`)
      .then(res => {
        setCategories(res);
      });
    await axiosInstance.get(`/devices?pagination[pageSize]=100`).then(res => {
      setDevices(res);
    });
    await axiosInstance
      .get(`/borrow-requests?pagination[pageSize]=100`)
      .then(res => {
        setBorrowRequests(res);
      });
    await axiosInstance
      .get(`/repair-requests?pagination[pageSize]=10`)
      .then(res => {
        setRepairRequests(res);
      });
  };

  const chartData = {
    series: [
      {
        name: 'Người dùng',
        data: [0, 3, 8, users.length],
      },
      {
        name: 'Loại thiết bị',
        data: [0, 5, 5, categories?.meta?.pagination?.total],
      },
      {
        name: 'Thiết bị',
        data: [0, 9, 11, devices?.meta?.pagination?.total],
      },
      {
        name: 'Yêu cầu mượn trả',
        data: [0, 0, 10, borrowRequests?.meta?.pagination?.total],
      },
      {
        name: 'Yêu cầu sửa chữa',
        data: [0, 0, 4, repairRequests?.meta?.pagination?.total],
      },
    ],

    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        background: '#ffffff',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Số lượng qua từng tháng',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ['07/2023', '08/2023', '09/2023', '10/2023'],
      },
    },
  };

  const statisticalCardData = [
    {
      title: 'Người dùng',
      value: `${users?.length}`,
      icon: <FiUsers size={45} />,
    },
    {
      title: 'Loại thiết bị',
      value: `${categories?.meta?.pagination?.total}`,
      icon: <BiCategoryAlt size={45} />,
    },
    {
      title: 'Thiết bị',
      value: `${devices?.meta?.pagination?.total}`,
      icon: <MdDevices size={45} />,
    },
    {
      title: 'Yêu cầu mượn trả',
      value: `${borrowRequests?.meta?.pagination?.total}`,
      icon: <GrNotes size={45} />,
    },
    {
      title: 'Yêu cầu sửa chữa',
      value: `${repairRequests?.meta?.pagination?.total}`,
      icon: <GiAutoRepair size={45} />,
    },
  ];

  const renderStatisticalCard = () => {
    return statisticalCardData.map(item => {
      return (
        <StatisticalCard
          key={item.title}
          title={item.title}
          value={parseInt(item.value)}
          icon={item.icon}
        />
      );
    });
  };

  return (
    <>
      <Content>
        <Statistical>{renderStatisticalCard()}</Statistical>
      </Content>
      <Charts
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </>
  );
}
