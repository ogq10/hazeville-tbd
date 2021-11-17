import { Grid, Box } from '@material-ui/core';
import React from 'react';
import Posh from './Posh';

const Poshes = ({ poshList, handleAddToCart }) => {
  return (
    
    <Box style={{position:'absolute', top:'300px'}} xs={{margin: '-30px'}} lg={{ flexGrow: 1}}>
      <Grid justify='space-evenly' container spacing={6}>
        {poshList.map((posh) => (
          <Grid item lg={4} md={12} sm={12} xs={12} key={posh.id}>
            <Posh posh={posh} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Poshes;
