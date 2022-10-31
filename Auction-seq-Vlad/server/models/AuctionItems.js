module.exports = (sequelize, DataTypes) =>{

    const AuctionItems = sequelize.define("AuctionItems", {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true 
        },
        sellerEmail: {
            type: DataTypes.STRING(320),
            allowNull: false
        },
        itemName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        itemDescription: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastBidPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        lastBidderEmail: {
            type: DataTypes.STRING(320),
            allowNull: true
        }
    });

    return AuctionItems;
};