import React, { useState} from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const ContactsTable = ({ fetchContacts, contacts, onEdit , onDelete}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  //const [contacts, setContacts] = useState([]);

  const handleDelete = async (id) => {
    try {
      // API call to delete from backend
      await axios.delete(`http://localhost:5000/contacts/${id}`);
  
      // Update the UI after successful deletion
      fetchContacts();
     // setContacts(contacts.filter((contact) => contact._id !== id));
//setContactstemp(contactstemp.filter((contact) => contact.id !== id));
     // alert('Contact deleted successfully');
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };
  

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                {/* Edit Button - Triggers Edit dialog */}
                <IconButton onClick={() => onEdit(contact)}>
                  <Edit />
                </IconButton>

                {/* Delete Button - Calls the handleDelete function */}
                <IconButton onClick={() => onDelete(contact._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={contacts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
      />
    </>
  );
};

export default ContactsTable;
