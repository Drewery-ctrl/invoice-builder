

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: 'User already exists',
    });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  const token = await newUser.generateAuthToken();
  res.status(201).json({
    token,
  });
};