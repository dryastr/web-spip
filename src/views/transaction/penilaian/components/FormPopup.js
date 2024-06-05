

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Formpopup = () => {

    const [open, setOpen] = useState(false);

    
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <div>
        {/* <Button variant="outlined" color="primary" style={button} onClick={handleClick}>
        + Sasaran Pemda
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Data</DialogTitle>
        <DialogContent>
          <form>
            <Grid container spacing={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Indikator"
                  variant="outlined"
                  defaultValue='aaa'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Target Kinerja"
                  variant="outlined"
                  defaultValue='ssss'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Satuan"
                  variant="outlined"
                  defaultValue='sss'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Indikator Kinerja Terpadu"
                  variant="outlined"
                  defaultValue='aaaa'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Target Kinerja Kerja"
                  variant="outlined"
                  defaultValue='sss'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Keterangan"
                  variant="outlined"
                  defaultValue='mmm'
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Tutup</Button>
          <Button onClick={handleClose}>Simpan</Button>
        </DialogActions>
      </Dialog>
      {/* <div style={{ height: 160, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} hideFooterPagination />
      </div> */}
     
      <div style={{ marginTop: '20px' }}>{/* ... (your tab content) */}
      </div>
      </div>
    )
}

export default Formpopup




