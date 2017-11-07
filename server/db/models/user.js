const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate:{
      isEmail:true
    }
  },
  firstName:{
    type:Sequelize.STRING,
    allowNull:true,
    defaultValue:'JCVS'
  },
  lastName:{
    type:Sequelize.STRING,
    allowNull:true,
    defaultValue:'User'
  },
  password: {
    type: Sequelize.STRING,
    allowNull:false
  },
  status:{
    type: Sequelize.ENUM,
    values: ['member','admin'],
    allowNull:false,
    defaultValue:'member'
  },
  address:{
    type: Sequelize.STRING,
    allowNull:true
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User




/**
 * instanceMethods
 */
User.prototype.getFullName= function (user) {
  return `${user.firstName} ${user.lastName}`;
}

// MAY BRING BACK WHEN WE FIGURE OUT WHAT IT DOES
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}







/**
 * classMethods
 */

// MAY BRING BACK WHEN WE FIGURE OUT WHAT IT DOES
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */

User.hook('beforeCreate', (user) => {
  if(user.status !== 'guest'){
    if(!(user.email)|| !(user.password)) {
      throw new Error(`${user.status}s must enter an email and password`);
    }
  }
})


// MAY BRING BACK WHEN WE FIGURE OUT WHAT IT DOES
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
