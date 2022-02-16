const dal = require("../data-access-layer/dal");
const jwt = require("jsonwebtoken");

function getAllUsers() {
  return dal.executeQueryAsync("select * from users");
}

function addSingleUserAsync(user) {
  console.log(user);
  return dal.executeQueryAsync(
    `insert into users values
     (?,?,?,? )`, // preventing sql injection
    [user.chosenUserName, user.password, "", ""]
  );
}

async function loginAsync(credentials) {
  const user = await dal.executeQueryAsync(
    `
              select * from users 
              where username=?
              and password=?
          `,
    [credentials.username, credentials.password]
  );
  if (!user || user.length < 1) return null;
  delete user[0].password;
  user[0].token = jwt.sign(
    { user: user[0] },
    "welcome to Itamar`website",
    { expiresIn: "50 minutes" }
  );
  return user[0];
}



module.exports = {
  getAllUsers,
  addSingleUserAsync,
  loginAsync,
};
