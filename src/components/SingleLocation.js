import React from "react";
import { Button, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../utils/firebase";

const SingleLocation = ({ name, id, getPlaces }) => {
  const navigate = useNavigate();

  function editPlace() {
    navigate(`/edit/${id}`);
  }

  async function deleteLocation() {
    await deleteDoc(doc(db, "places", id));
    getPlaces();
  }

  return (
    <Paper elevation={5} sx={{ p: "0 1rem", m: "1rem auto", width: "50vw" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p>{name}</p>
        <Box>
          <Button color="secondary" onClick={editPlace}>
            Edit
          </Button>
          <Button onClick={deleteLocation}>Delete</Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default SingleLocation;
