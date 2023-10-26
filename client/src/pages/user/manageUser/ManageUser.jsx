import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRefresh,
  faStar,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../constants/BASE_URL';
const { formatInTimeZone } = require('date-fns-tz');

const ManageUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const user = useSelector((state) => state.userinfo.user);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (id, status) => {
    // if (rows[id - 1].isAdmin) {
    //   toast.error("It's an admin account. You can't edit it.");
    // } else {
    //   if (!userId) {
    //     navigate(`/login`);
    //   }

    //   setOpen(true);

    //   try {
    //     axios
    //       .put(`/auth/status/${userId}/${rows[id - 1]._id}`, { status })
    //       .then((res) => {
    //         if (res.status === 200) {
    //           toast.success('Status changed successfully.');
    //           fetchData();
    //         } else {
    //           toast.error(res.data.message);
    //         }
    //       });
    //   } catch (error) {
    //     toast.error(error.response.data.message);
    //   }
    //   setOpen(false);
    // }
    toast.error('Under Development');
  };
  const handleDeleteClick = async (id) => {
    setOpen(true);
    // if (rows[id - 1].isAdmin) {
    //   toast.error("It's an admin account. You can't delete it.");
    // } else {
    //   try {
    //     const uId = rows[id - 1]._id;

    //     await axios
    //       .put(`/auth/status/${userId}/${uId}`, { status: 'deletedUser' })
    //       .then((res) => {
    //         if (res.status === 200) {
    //           toast.success('User deleted successfully!');
    //           fetchData();
    //         } else {
    //           toast.error(res.data.message);
    //         }
    //       });
    //   } catch (error) {
    //     toast.error(error.response.data.message);
    //   }
    // }

    toast.error('Under Development');

    setOpen(false);
  };

  const columnsAdmin = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'name',
      headerName: 'Name',
      width: 180,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'createdAt',
      headerName: 'Created At (GMT+6)',
      width: 220,
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At (GMT+6)',
      width: 220,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            <span className={'text-capitalize'}>{params.row.status}</span>
          </div>
        );
      },
    },
    {
      field: 'uploader',
      headerName: 'Make Uploader',
      type: 'actions',
      width: 130,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faRefresh} />}
            label="Make User"
            color="warning"
            size="medium"
            onClick={() => handleEditClick(id, 'user')}
            toolTip="Make User"
            style={{ outline: 'none' }}
            showInMenu={true}
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faUser} />}
            label="Make Uploader"
            color="primary"
            size="medium"
            onClick={() => handleEditClick(id, 'uploader')}
            toolTip="Make Uploader"
            style={{ outline: 'none' }}
          />,

          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faStar} />}
            label="Make Admin"
            color="success"
            size="medium"
            onClick={() => handleEditClick(id, 'admin')}
            toolTip="Make Admin"
            style={{ outline: 'none' }}
          />,
        ];
      },
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: 'Delete User',
      width: 100,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            color="warning"
            onClick={() => handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if (!user || user?.role !== 'admin') {
      navigate('/user/login');
    }
    const fetchData = async () => {
      await axios
        .get(`${BASE_URL}/user/get/${user?._id}`)
        .then((res) => {
          // console.log(res.data);
          var rw = [];
          if (res.data.users.length > 0) {
            res.data.users.map((user, i) =>
              rw.push({
                id: i + 1,
                name: user?.name,
                email: user?.email,
                createdAt: formatInTimeZone(
                  parseISO(user?.createdAt),
                  'Asia/Dhaka',
                  'yyyy-MM-dd hh:mm:ss a'
                ),
                updatedAt: formatInTimeZone(
                  parseISO(user?.updatedAt),
                  'Asia/Dhaka',
                  'yyyy-MM-dd hh:mm:ss a'
                ),
                uploader: user?.role,
                status: user?.role,
                _id: user?._id,
              })
            );
            setRows(rw);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message || err.message);
        });
    };
    fetchData();
  }, [user, navigate]);

  return (
    <div className="main-user">
      <div className="dashboard">
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <h1>Manage User</h1>
        <Toaster />
        <Box sx={{ height: 600, width: '70vw' }}>
          <DataGrid
            rows={rows}
            columns={columnsAdmin}
            pageSize={9}
            rowsPerPageOptions={[9]}
          />
        </Box>
      </div>
    </div>
  );
};

export default ManageUser;
