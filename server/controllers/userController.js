// route    POST /api/users/auth
const authUser = (req, res) => {
  res.status(200).json({ message: "User authenticated" });
};

export { authUser };
