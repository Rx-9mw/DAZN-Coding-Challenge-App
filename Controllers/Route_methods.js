const User = require('../Models/New_User_Model');

// GET
const getAllUsers = async (req, res) => {
  try {
    // Pulling and sending all users from the database without __v
    const allUsers = await User.find({}, {__v: 0});
    res.send(allUsers);

  } catch (error) {
    res.send('ERROR: ' + error.message);
    console.log(error.message);
  }

}
// GET by id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the user with the id is in the database.
    if(await User.findById(id) === null){ return res.send('ERROR: Could not find a user with this id.') }
    
    // Pulling the user with the id form the database.
    const user = await User.findById(id, {__v: 0});
    
    res.send(user);
  } catch (error) {
    res.send(`ERROR: The id given is incorrect.`);
    console.log(error.message);
  }

}
// POST
const createUser = async (req, res) => {
  try {
    const streams = req.body.numberOfCurrentStreams;

    // Checking if the username is in the request.
    if(req.body.username === undefined){ return res.send('ERROR: The username should be defined in the request.') }

    // Checking if the username is a string.
    if(typeof req.body.username !== 'string'){ return res.send('ERROR: The username should be a String.') }


    //When the number of streams is defined we chack if its a whole number and if its between 0 and 3.
    if(streams !== undefined){
      if(typeof streams !== 'number' || streams % 1 !== 0 || streams < 0 || streams > 3){
        return res.send('ERROR: Please input the correct number of streams for the user.');
      }
    }

    // Creating and saving a new user.
    const user = new User(req.body);
    await user.save();

    res.send('New user added to the database.');
  } catch (error) {
    res.send('ERROR: ' + error.message);
    console.log(error.message);
  }

}
// DELETE
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // Check if the user with the id is in the database.
    if(await User.findById(id) === null){ return res.send('ERROR: Could not find a user with this id.') }

    // Finding and deleting the user from the database.
    await User.findByIdAndDelete(id);
    res.send('User has been deleted.');

  } catch (error) {
    res.send(`ERROR: The id given is incorrect.`);
    console.log(error.message);
  }

}
//PATCH
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    let user;

    // Check if the user with the id is in the database
    if(await User.findById(id) === null){ return res.send('ERROR: Could not find a user with this id.') }
    
    // Check if the request for updating the streams was formed correctly
    if(update.updateNumberOfStreams === undefined){ return res.status(400).send('ERROR: Invalid PATCH request.') }

    // Assign info from the database to the user object
    user = await User.findById(id);

    const streams = user.numberOfCurrentStreams + update.updateNumberOfStreams;

    // Check if the streams are between 0-3, the number of passed in streams is a string or if the number has decimal places
    if(typeof streams === 'string' || streams % 1 !== 0) {
      return res.send('ERROR: Please input the correct number of streams to update with. (eg. 1, -1)');
    }else if (streams > 3 || streams < 0) {
      return res.send('ERROR: The number of streams cannot be lower than 0 or higher than 3.');
    }

    // Assign the number of streams to the user object and update the database
    user.numberOfCurrentStreams = streams;
    await User.findByIdAndUpdate(id, user);

    res.send('User has been updated.');

  } catch (error) {
    res.send(`ERROR: The id given is incorrect.`);
    console.log(error.message);
  }
}

// Exporting the functions
module.exports = {getAllUsers, getUserById, createUser, deleteUser, updateUser};
