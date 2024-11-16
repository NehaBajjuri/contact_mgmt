const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/contactDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB...'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to add a new contact
app.post('/contacts', async (req, res) => {
  try {
    // Ensure the body fields match the schema
    console.log('Request Body:', req.body); 
    const newContact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      company: req.body.company,
      jobTitle: req.body.jobTitle,
    });

    // Save contact to the database
    await newContact.save();

    res.status(201).json(newContact);  // Respond with the saved contact
  } catch (err) {
    console.error('Error adding contact:', err);
    res.status(500).send('Error adding contact');
  }
});

// GET endpoint to fetch all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    res.status(500).send('Error fetching contacts');
  }
});

// PUT endpoint to update an existing contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(contact);
  } catch (err) {
    res.status(400).send('Error updating contact');
  }
});

// DELETE endpoint to remove a contact
app.delete('/contacts/:id', async (req, res) => {
  const contactId = req.params.id;

  // Validate MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    console.error('Invalid contact ID:', contactId);
    return res.status(400).json({ message: 'Invalid contact ID' });
  }

  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      console.error('Contact not found:', contactId);
      return res.status(404).json({ message: 'Contact not found' });
    }
    console.log('Contact deleted:', contactId);
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting contact:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

app.listen(5000, () => console.log('Server started on port 5000'));
