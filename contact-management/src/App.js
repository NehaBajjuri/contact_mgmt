import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios'; // Import axios
import './App.css'
import EditContact from './components/EditContact';
import ContactTable from './components/ContactTable'; 


const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  // Fetch contacts from the backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contacts');
      setContacts(response.data.map(contact => ({
        ...contact,
        id: contact._id,  // MongoDB provides _id by default
      })));
      
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  // Fetch contacts when the component mounts
  React.useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddContact = () => {
    console.log('Opening dialog for new contact');
    setCurrentContact(null); // Open dialog for new contact
    setIsDialogOpen(true);
  };

  const handleEditContact = (contact) => {
    setCurrentContact(contact); // Pass selected contact to edit
    setIsDialogOpen(true);
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      console.log(contacts); // Add this line after setContacts

    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSaveContact = async (contactData) => {
    try {
      if (currentContact) {
        // Update existing contact (PUT request)
        const updatedContact = await axios.put(
          `http://localhost:5000/contacts/${currentContact._id}`, // Use _id for the update
          contactData
        );
                setContacts(
                  contacts.map((contact) =>
                    contact._id === currentContact._id ? updatedContact.data : contact
                  )
        );
      } else {
        // Add new contact (POST request)
        const response = await axios.post('http://localhost:5000/contacts', contactData);
        setContacts([...contacts, response.data]); // Add the new contact returned from the API
      }
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center"   gutterBottom>
        Contact Management System
      </Typography>
      <Button variant="contained" color="primary" align="center" onClick={handleAddContact} style={{ marginBottom: 20 , backgroundColor: '#007bff', color: '#fff',justifyContent:'center'}}>
        Add New Contact
      </Button>
      <ContactTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
      {isDialogOpen && (
        <EditContact
          open={isDialogOpen}
          handleClose={handleCloseDialog}
          contact={currentContact}
          handleUpdate={handleSaveContact}
        />
      )}
    </Container>
  );
};

export default App;
