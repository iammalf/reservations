import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview } from "@mui/icons-material";

const UsersActions = () => {
  return (
    <Box>
      <Tooltip title="View Details">
        <IconButton color="success" onClick={() => {}}>
          <Preview />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit This User">
        <IconButton color="primary" onClick={() => {}}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete this User">
        <IconButton color="error" onClick={() => {}}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UsersActions;
