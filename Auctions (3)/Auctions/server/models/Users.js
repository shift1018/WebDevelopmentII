module.exports = (sequelize, Datatypes)=>{
    const Users = sequelize.define("Users",{
        username:{
            type: Datatypes.STRING,
            allowNull: false,
        },

        password:{
            type: Datatypes.STRING,
            allowNull: false,

        },

    });


    Users.associate =(models)=>{
        Users.hasMany(models.Historys,{
            onDelete:"cascade",
        })
    }

    return Users;
}