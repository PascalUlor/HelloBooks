'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _toTitleCase = require('to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    firstname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      trim: true,
      validate: {
        // is: {
        //  arg: /\w+/g,
        //  msg: 'Firstname can only consit of letters'
        // },
        len: {
          args: [2, 30],
          msg: 'Firstname must be at least 2 chars and less than 30 chars'
        }
      },
      set: function set(val) {
        if (val !== undefined) {
          this.setDataValue('firstname', (0, _toTitleCase2.default)(val));
        }
      }
    },

    lastname: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      trim: true,
      validate: {
        // is: {
        //  arg: /\w+/g,
        //  msg: 'Lastname can only consit of letters',
        // },
        len: {
          args: [2, 30],
          msg: 'Lastname must be at least 2 chars and less than 30 chars'
        }
      },
      set: function set(val) {
        if (val !== undefined) {
          this.setDataValue('lastname', (0, _toTitleCase2.default)(val));
        }
      }
    },

    username: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Usernames can not be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Only Alpha numeric for usernames please'
        },
        len: {
          args: [2, 30],
          msg: 'Username must be at least 2 chars and less than 30 chars'
        }
      },
      unique: {
        args: true,
        msg: 'Username already exist in database'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: {
          arg: [5, 16],
          msg: 'Length between 5 and 16 please'
        },
        notEmpty: {
          args: true,
          msg: 'Password can not be empty'
        }
      }
    },

    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password confirmation can not be empty'
        }
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        isEmail: {
          arg: true,
          msg: 'Must be an Email address'
        },
        len: {
          args: [5, 45],
          msg: 'Firstname must be at least 2 chars and less than 30 chars'
        }
      },
      unique: {
        args: true,
        msg: 'Email already exist'
      }
    },
    user_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1

    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {

    hooks: {

      beforeCreate: function beforeCreate(user) {
        // user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        // user.password_confirmation
        if (user.password === user.password_confirmation) {
          user.password = User.generateHash(user.password);
        } else {
          throw new Error('Passwords do not the match');
        }
      },

      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {
          undefined.password = _bcryptNodejs2.default.hashSync(user.password, _bcryptNodejs2.default.genSaltSync(10), null);
        }
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Books, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'userid'
    });
  };

  User.generateHash = function (password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10), null);
  };

  return User;
};