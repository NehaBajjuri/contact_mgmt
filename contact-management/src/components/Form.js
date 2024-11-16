import React, { useState } from 'react';
import { TextField, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const ContactForm = ({ fetchContacts }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state on new submission

    try {
      // Make API call to add contact
      await axios.post('http://localhost:5000/contacts', formData);
      // After adding, refresh contact list
      setContacts((prevContacts) => [...prevContacts, response.data]);
      fetchContacts();
      // Reset form data after success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    } catch (error) {
      setError('Error adding contact. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Add New Contact</Typography>
      {error && <Alert severity="error">{error}</Alert>} {/* Show error message */}
      <TextField
        name="firstName"
        label="First Name"
        value={formData.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        name="company"
        label="Company"
        value={formData.company}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="jobTitle"
        label="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2 }}
        disabled={loading} // Disable button while loading
      >
        {loading ? <CircularProgress size={24} /> : 'Add Contact'} {/* Show loading spinner */}
      </Button>
    </Box>
  );
};

export default ContactForm;
