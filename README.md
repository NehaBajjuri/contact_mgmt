# contact_mgmt


This project is a contact management system with a React frontend, a Node.js backend, and a MongoDB database. It allows users to manage their contact list with features like add, edit, delete

---

## 🛠️ Setup Instructions

Follow these steps to set up and run the project on your local machine.

### Prerequisites

1. **Node.js**: Ensure Node.js is installed (v14 or above recommended). [Download Node.js](https://nodejs.org/)
2. **MongoDB**: Install MongoDB and ensure it is running on your local machine. [Install MongoDB](https://www.mongodb.com/docs/manual/installation/)
3. **Other Dependencies**: Ensure `npm` is available (comes with Node.js).

---

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
2. cd project-folder
3. npm install
4. node filename.js // start the backend server
5. npm start // run frontend code


Schema used for MongoDB
---
```javascript
const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  company: String,
  jobTitle: String,
});



