const userCorrect =  {
  id: 1,
  username: 'Admin',
  role: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const incorrectEmail = {
  email: 'invalidEmail@invalid.com',
  password: 'secret_admin',
}

const correctLoginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const incorrectPassword = {
  email: 'admin@admin.com',
  password: 'invalidPassword',
}

const withoutEmail = {
  password: 'secret_admin',
}

const withoutPassword = { 
  email: 'admin@admin.com',
}

const invalidToken = 'InvalidToken'

export {
  incorrectEmail,
  correctLoginBody,
  incorrectPassword,
  userCorrect,
  withoutEmail,
  withoutPassword,
  invalidToken
}