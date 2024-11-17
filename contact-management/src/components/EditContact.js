
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
  const [errors, setErrors] = useState({});
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
    setErrors({});
  }, [open, contact]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Enter a valid email.';
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number.';
    if (!formData.company.trim()) newErrors.company = 'Company name is required.';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
 if (validate()) {

    handleUpdate(formData);
    handleClose();
 }
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
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
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
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
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
