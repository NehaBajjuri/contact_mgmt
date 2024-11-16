
import React, { useState, useEffect } from 'react'; 
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';

const EditContactDialog = ({ open, handleClose, contact={}, handleUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: contact?.firstName || '',
    lastName: contact?.lastName || '',
    email: contact?.email || '',
    phoneNumber: contact?.phoneNumber || '',
    company: contact?.company || '',
    jobTitle: contact?.jobTitle || '',
  });
  useEffect(() => {
    if (open && contact) {
      setFormData({
        firstName: contact.firstName || '',
        lastName: contact.lastName || '',
        email: contact.email || '',
        phoneNumber: contact.phoneNumber || '',
        company: contact.company || '',
        jobTitle: contact.jobTitle || '',
      });
    }
  }, [open, contact]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, phoneNumber } = formData;

    // Basic validation
    if (!firstName || !lastName || !email || !phoneNumber) {
      alert('All fields except Company and Job Title are required!');
      return;
    }

    handleUpdate(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="company"
          label="Company"
          value={formData.company}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="jobTitle"
          label="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditContactDialog;
