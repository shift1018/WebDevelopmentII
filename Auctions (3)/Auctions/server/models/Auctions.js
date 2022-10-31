module.exports = (sequelize, DataTypes)=> {
    const Auctions = sequelize.define("Auctions",{
        itemName:{
            // - itemName VC(100)  // required, 2-100 characters, only uppercase, lowercase, digits, spaces and: ./,_()-

            type:DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [2, 100],
                notNull: {
                  msg: 'Please enter your itemName'
                },
                is: /[\w\s./,_()-]/g,
                // ["\w\s./,_()-",'g']
            },  
            include: {
                required: true
            },
        },
        sellerEmail:{
            // - sellerEmail VC(320) // required, must look like a valid email
        
            type:DataTypes.STRING(320),
            allowNull: false,
            validate: {
                isEmail: true,
                notNull: {
                  msg: 'Please enter your name'
                }
            },  
            include: {
                required: true
            },
        },
        
        itemDescription:{
            // - itemDescription VC(10000) // required, 2-10000 characters, textarea, Advanced: rich text editor WYSIWYG
            // textarea, Advanced: rich text editor WYSIWYG
            type:DataTypes.STRING(10000),
            allowNull: false,
            validate: {
                len: [2, 10000],
                notNull: {
                  msg: 'Please enter your itemDescription'
                }
            },  
            include: {
                required: true
            },
        },
        lastBidPrice:{
            // - lastBidPrice decimal // required, 0 or higher
            type:DataTypes.DECIMAL,
            allowNull: false, 
            validate: {
                min: 0,
                notNull: {
                  msg: 'Please enter your lastBidPrice'
                }
            },  
            include: {
                required: true
            },
        },
        lastBidderEmail:{       
            // - lastBidderEmail VC(320) // may be NULL (initially)
            // If a particular field of a model is set to not allow null (with allowNull: false) and that value has been set to null, all validators will be skipped and a ValidationError will be thrown.On the other hand, if it is set to allow null (with allowNull: true) and that value has been set to null, only the built-in validators will be skipped, while the custom validators will still run.
            type:DataTypes.STRING(320),
            allowNull: true, 

            
        },
    });

    Auctions.associate =(models)=>{
        Auctions.hasMany(models.Historys,{
            onDelete:"cascade",
        })
    }

    // https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
    // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/

    return Auctions;
}




