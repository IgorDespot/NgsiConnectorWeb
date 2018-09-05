const userServicePath = (req, res) => {
  const tokenSplit = req.body.fiwareServicePathUpload.split("/");
  if (tokenSplit[ 3 ] === req.user.username) {
    return true;
  }
  return false;
};

module.exports = {
  userServicePath,
};
