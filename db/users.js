const records = [{
  id: 1,
  username: 'zamudio',
  password: '123'
},
{
  id: 2,
  username: 'topsed',
  password: '321'
}
];

exports.findById = (id, cb) => {
  process.nextTick(() => {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error(`User ${id} does not exist`));
    }
  });
};

exports.findByUsername = (username, cb) => {
  process.nextTick(() => {
    for (let i = 0, len = records.length; i < len; i += 1) {
      const record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

exports.findIfLoggedin = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
};
