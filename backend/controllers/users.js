import User from '../model/User.js';

// @desc    GET User
// @route   POST /api/user/:id
// @access  Private
const getUser = async (req, res) => {
  try {
    // Getting id from request parameter
    const { id } = req.params;

    // Finding user for given id
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    GET friends
// @route   POST /api/user/:id/friends
// @access  Private
const getUserFriends = async (req, res) => {
  try {
    // Getting id from request parameter
    const { id } = req.params;

    // Finding user for given id
    const user = await User.findById(id);

    // Finding friends for given user
    const friends = await Promise.all(user.friends);

    res.status(200).json(friends);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    Add or Remove friend
// @route   POST /api/user/:id/friends/:id
// @access  Private
const addOrRemoveFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;

    const user = await User.findById(userId);
    // const friend = await User.findById(friendId)

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
    } else {
      user.friends.push(friendId);
    }

    await user.save();
    res
      .status(200)
      .json({ msg: 'User as friend added or removed successfully ' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export { getUser, getUserFriends, addOrRemoveFriend };
