module.exports = (sequelize, DataTypes)=> {
    const Todos = sequelize.define("Todos",{
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


    return Todos;
}




