module.exports = (sequelize, DataTypes)=> {
    const Historys = sequelize.define("Historys",{
        
  
        lastBidPrice:{
            // - lastBidPrice decimal // required, 0 or higher
            type:DataTypes.DECIMAL,
            allowNull: false, 
            
        },
        lastBidderEmail:{       
            // - lastBidderEmail VC(320) // may be NULL (initially)
            // If a particular field of a model is set to not allow null (with allowNull: false) and that value has been set to null, all validators will be skipped and a ValidationError will be thrown.On the other hand, if it is set to allow null (with allowNull: true) and that value has been set to null, only the built-in validators will be skipped, while the custom validators will still run.
            type:DataTypes.STRING(320),
            allowNull: true, 

        },
        

    })

    // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

    return Historys;
}




