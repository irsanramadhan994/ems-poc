import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DialogTitle from "@mui/material/DialogTitle";
import { Col, Container, Row } from "react-bootstrap";
import { Typography } from "@mui/material";

export const FormDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          maxWidth: "800px !important",
          width: "650px",
          minHeight: "300px",
          borderRadius: "16px",
        },
      }}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());

          console.log(formJson);
          handleClose();
        },
      }}
    >
      <DialogTitle>CREATE STREAM</DialogTitle>
      <DialogContent>
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="stream"
                label="Stream Name"
                type="text"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col md={12} xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="order"
                name="order"
                label="Order"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col md={12} xs={12}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="leadTime"
                name="leadTime"
                label="Lead Time In Days"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col md={6} xs={12} className="my-2">
              <Typography className="text-secondary">Start Date</Typography>

              <TextField
                required
                margin="dense"
                id="startDate"
                name="startDate"
                type="date"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col md={6} xs={12} className="my-2">
              <Typography className="text-secondary">End Date</Typography>
              <TextField
                required
                margin="dense"
                id="endDate"
                name="endDate"
                type="date"
                fullWidth
                variant="outlined"
              />
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Normal</MenuItem>
                  <MenuItem value={20}>Special</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Main Rewards
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Normal</MenuItem>
                  <MenuItem value={20}>Special</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Additional Rewards
                </InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Normal</MenuItem>
                  <MenuItem value={20}>Special</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">SKU</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Normal</MenuItem>
                  <MenuItem value={20}>Special</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Region</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Col>

            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Cities</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Province</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col md={12} className="my-2">
              <Button variant="contained" type="submit">
                ADD LOCATION
              </Button>
            </Col>
            <Col md={12} className="my-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Activity</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};
