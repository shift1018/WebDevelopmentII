module.exports = (sequelize, DataTypes)=> {
    const Auctions = sequelize.define("Auctions",{
        task:{
            type:DataTypes.STRING(100),
            allowNull: false,
        },
        dueDate:{
            type:DataTypes.DATEONLY ,
            allowNull: false,
        },
        
        isDone:{     
            type:DataTypes.INTEGER,
            allowNull: false,
           
        },
        
    });


    return Auctions;
}




