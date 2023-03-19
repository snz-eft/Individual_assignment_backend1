// @ts-nocheck
import { DeleteTwoTone } from "@mui/icons-material";
import { useAuth } from "hooks/useAuth";
import { Link } from "react-router-dom";

const {
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  TextField,
} = require("@mui/material");
const { default: React, useEffect, useState } = require("react");

const Friends = (props) => {
  const auth = useAuth();
  const [friends, setFriends] = useState([]);
  const [newFriend, setnewFriend] = useState("");
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const friendsRequest = await fetch("http://localhost:5050/friends", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const friendResult = await friendsRequest.json();
        setFriends(friendResult);
      } catch (e) {
        auth.logout();
      }
    };
    fetchTodos();
  }, [refresh, auth]);

  const handleAddFriend = async () => {
    try {
      await fetch(`http://localhost:5050/friends/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ friend_username: newFriend }),
      });

      setnewFriend("");
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      await fetch(`http://localhost:5050/friends/${friendId}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setRefresh(!refresh);
    } catch (e) {
      auth.logout();
    }
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Friends
      </Typography>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <TextField
            id="standard-basic"
            label="Add a Friend"
            variant="standard"
            placeholder="Add a new task"
            value={newFriend}
            onChange={(e) => setnewFriend(e.target.value)}
          />
        </Grid>
        <Grid item sm={4}>
          <Button onClick={(e) => handleAddFriend()}>Add a Friend</Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {friends.map((friend) => (
              <TableRow key={friend.username}>
                <TableCell component="th" scope="row">
                  <Link to={`/friends/${friend.friend_id}/todos`}>
                    {friend.username}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveFriend(friend.friend_id)}
                  >
                    <DeleteTwoTone />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Friends;
