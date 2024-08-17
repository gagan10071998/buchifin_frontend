import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import UserProfileCard from "./UserProfileCard";
// import { users } from "./data";
import { Typography } from "@mui/material";
import useAPI from "app/hooks/useApi";

const AgronomistList = ({users}) => {
    console.log('USERS@', users);
    return (
    <>
      <Typography>
        <Grid container spacing={3.75}>
          {users?.length > 0 ? (users.map((user, index) => {
            console.log('USER DATA', user);
            return (
              <Grid item key={index} xs={12} sm={6} lg={4}>
                <UserProfileCard user={user} />
              </Grid>
            );
          })) : null}
        </Grid>
      </Typography>
    </>
  );
};

export default AgronomistList;
