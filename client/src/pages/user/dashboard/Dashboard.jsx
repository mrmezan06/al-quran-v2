import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import './dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../constants/BASE_URL';

const Dashboard = () => {
  const [userStatus, setUserStatus] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClick = (id) => {
    // navigate(`/edit/${rows[id - 1]._id}`);
    toast.error('Under Development');
  };
  const handleDeleteClick = async (id) => {
    // setOpen(true);
    // await axios
    //   .delete(`${BASE_URL}/book/delete/${rows[id - 1]._id}`)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       toast.success('Book deleted successfully.');
    //       fetchData();
    //     } else {
    //       toast.error(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message || err.message);
    //   });
    // setOpen(false);
    toast.error('Under Development');
  };

  const columnsAdmin = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 450,
    },
    {
      field: 'author',
      headerName: 'Author',
      width: 350,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'part',
      headerName: 'Part',
      width: 150,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      type: 'actions',
      width: 150,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faPen} />}
            label="Edit"
            onClick={() => handleEditClick(id)}
          />,
        ];
      },
    },
    {
      field: 'delete',
      type: 'actions',
      headerName: 'Delete',
      width: 150,
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            onClick={() => handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  const [rows, setRows] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userinfo.user);
  useEffect(() => {
    setUserStatus(user?.role);
    if (user && (user.role === 'admin' || user.role === 'uploader')) {
      navigate('/user/dashboard', { replace: true });
    }
    if (user && user.role === 'user') {
      navigate('/', { replace: true });
    }
    if (!user) {
      navigate('/user/login', { replace: true });
    }

    const fetchData = async () => {
      setOpen(true);
      await axios
        .get(
          `${BASE_URL}/book${
            userStatus === 'admin' ? '/get' : `/uploader/${user?._id}`
          }`
        )
        .then((res) => {
          var rw = [];
          if (res.data.length > 0) {
            res.data.map((book, i) =>
              rw.push({
                id: i + 1,
                title: book?.title,
                author: book?.author,
                category: book?.category,
                part: book?.part,
              })
            );
            setRows(rw);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message || err.message);
        });
      setOpen(false);
    };

    fetchData();
  }, [dispatch, navigate, user, userStatus]);

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
        <h1>Dashboard - {userStatus}</h1>
        <Toaster />
        <Box sx={{ height: 600, width: '80vw' }}>
          <DataGrid
            rows={rows}
            columns={columnsAdmin}
            pageSize={10}
            rowsPerPageOptions={10}
          />
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
