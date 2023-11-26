// const mongoose = require('mongoose');
// // Allow Promises
// mongoose.Promise = global.Promise;
// // Connection
// mongoose.connect('mongodb://localhost:27017/db_test', { useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify:false  });
// // Validation
// mongoose.connection
//   .once('open', () => console.log('Connected to the database!'))
//   .on('error', err => console.log('Error with the database!', err));
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://koushik:koushik@employeedatabase.uqho6xi.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// })
// .then(() => {
//   console.log('Connected to the database!');
// })
// .catch((error) => {
//   console.error('Error connecting to the database:', error);
// });
// const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://koushik:koushik@employeedatabase.uqho6xi.mongodb.net/db_test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
// })
// .then(() => {
//   console.log('Connected to the database!');
// })
// .catch((error) => {
//   console.error('Error connecting to the database:', error);
// });


const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://koushik:koushik@employeedatabase.uqho6xi.mongodb.net/student-mern-fullstack', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// // Create a Mongoose model (just an example)
// const Student = mongoose.model('Student', {
//   name: String,
//   email: String,
//   enrollnumber: Number
// });

// // Insert a document into the "students" collection within the "db_test" database
// const newStudent = new Student({
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   enrollnumber: 12345
// });

// // Save the document to the database
// newStudent.save()
//   .then(() => console.log('Document inserted successfully'))
//   .catch(error => console.error('Error inserting document:', error));
