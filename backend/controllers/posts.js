import Post from '../model/Post.js';
import User from '../model/User.js';

// @desc    GET feed posts
// @route   GET /api/posts/
// @access  Private
const addPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const user = await User.findById(userId);

    const post = new Post({
      userId,
      userName: user.name,
      content,
      likes: {},
      comments: [],
    });

    await post.save();

    res.status(201).json({ msg: 'Post added successfully', post: post });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    GET user posts
// @route   GET /api/posts/:userId
// @access  Private
const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// @desc    PATCH Like post
// @route   PATCH /api/posts/:id/like
// @access  Private
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export { addPost, getFeedPosts, getUserPosts, likePost };
