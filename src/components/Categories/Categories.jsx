import React from 'react';
import './Categories.css';
import DPCard from './DPCard/DPCard';
import GPCard from './GPCard/GPCard';
import HCard from './HCard/HCard';
import { Grid } from '@material-ui/core';
const Categories = () => {
  return (
    <>
    {/* <button onClick={handleEmptyCart}>
      empty
    </button> */}
      <Grid
        container
        style={{ position: 'absolute', top: '250px' }}
        justifyContent="center"
      >
        <DPCard />
        <HCard />
        <GPCard />
        
      </Grid>
    </>
  );
};
export default Categories;
