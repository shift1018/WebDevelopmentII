module.exports = (sequelize, Datatypes)=>{
    const Users = sequelize.define("Users",{
        email:{
            type: Datatypes.STRING(360),
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: {
                  msg: 'Please enter your email'
                }
            }
        },

        password:{
            type: Datatypes.STRING(100),
            allowNull: false,

        },

    });


    // Users.associate =(models)=>{
    //     Users.hasMany(models.Todos,{
    //         onDelete:"cascade",
    //     })
    // }


    return Users;
}