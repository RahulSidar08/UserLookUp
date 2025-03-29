import React, { useEffect, useState } from "react";
import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Button,
  Pagination,
  Paper,
  Grid,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorHandler, successHandler } from "../utils/toastHandlers";
import { setUser } from "../redux/authSlice";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    if (searchedQuery) {
      const filteredUsers = users.filter((user) =>{
        return(
          user.email.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          user.first_name.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchedQuery.toLowerCase())
        )}
      );
      setUsers(filteredUsers);
    } else {
      setUsers(users);
    }
  }, [searchedQuery, users]);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${page}`
      );
      setUsers(response.data.data);
      setUser(response.data.data);
      console.log(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      errorHandler("Failed to fetch users!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      successHandler("User deleted successfully!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      errorHandler("Failed to delete user!");
    }
  };

  return (
    <Container maxWidth="md">
      <Container>
        <TextField
          sx={{ mt: 2 }}
          fullWidth
          label="search user"
          value={searchedQuery}
          onChange={(e) => setSearchedQuery(e.target.value)}
        />
      </Container>
      <Paper elevation={3} sx={{ p: 2, mt: 3 }}>
        <TableContainer
          sx={{ overflowX: "auto", display: "block", width: "100%" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Avatar
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar
                      src={user.avatar}
                      sx={{
                        width: { xs: 40, sm: 50 },
                        height: { xs: 40, sm: 50 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {user.first_name} {user.last_name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{user.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack
                      spacing={1}
                      direction={{ xs: "column", sm: "row" }}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        onClick={() => navigate(`/edit/${user.id}`)}
                        variant="contained"
                        color="primary"
                        size="small"
                        fullWidth={{ xs: true, sm: false }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(user.id)}
                        variant="contained"
                        color="error"
                        size="small"
                        fullWidth={{ xs: true, sm: false }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination - Centered on Small Screens */}
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            size="small"
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default UsersList;
