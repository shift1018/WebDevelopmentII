'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  auctions.init({
    sellerEmail: {type:DataTypes.STRING(500), allowNull:false},
    itemName: {type:DataTypes.STRING(600),allowNull:false},
    itemDescription: {type:DataTypes.STRING(10000),allowNull:false},
    lastBidPrice:{type:DataTypes.INTEGER,allowNull:false},
    lastBidderEmail: DataTypes.STRING(320)
  }, {
    sequelize,
    modelName: 'auctions',
  });
  auctions.sync({alter: true}); // IMPORTANT: Added so that data types are applied (lengths are used as specified)
  return auctions;
};