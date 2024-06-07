'use client'
// adding necessary imports
import React from 'react'
import { useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// herein we made use of a function initialised in TableDoc.js for adding new user entry
export default function Addtable({ addUserCallback }) {

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div align="center">
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Entry
            </Button>
            <Dialog
            // Dialog form parameters to intput the values entered by the user
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());

                        const newrow = {
                            id: formJson.id,
                            firstName: formJson.firstName,
                            lastName: formJson.lastName,
                            birthDate: formJson.birthDate,
                            age: formJson.age,
                            email: formJson.email,
                        }
                        addUserCallback(newrow);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please fill following entry to add data
                    </DialogContentText>
                    <TextField autoFocus required margin="dense" id="id" type="number" name="id" label="Aadhar ID" fullWidth variant="standard" />
                    <TextField autoFocus required margin="dense" id="firstName" type="text" name="firstName" label="First Name" fullWidth variant="standard" />
                    <TextField autoFocus required margin="dense" id="lastName" type="text" name="lastName" label="Last Name" fullWidth variant="standard" />
                    <TextField autoFocus required margin="dense" id="birthDate" type="date" name="birthDate" label="" fullWidth variant="standard" />
                    <TextField autoFocus required margin="dense" id="age" type="number" name="age" label="Age" fullWidth variant="standard" />
                    <TextField autoFocus required margin="dense" id="email" type="email" name="email" label="Email Address" fullWidth variant="standard" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add Entry</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
