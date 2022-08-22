const bcrypt = require('bcryptjs');
const db = require('../data/database');
class User{
    constructor(email,password,fullName,street,postal,city){
          this.email = email;
          this.name = fullName;
          this.password = password;
          this.address = {
              street : street,
              postal : postal,
              city : city,
            };
          }

          getUserwithSameEmail(){
         return db.getDb().collection('users').findOne({
            email: this.email
        });
          }
          async existsAlready(){
                const exisitingUser = await this.getUserwithSameEmail();
                if(exisitingUser){
                    return true;
                }
                return false;
          }


    async signup(){
        const hashedPassword = await bcrypt.hash(this.password,12);
        db.getDb().collection('users').insertOne({
            email : this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address,
        });
    }

    comparePassword(hashedPassword){
        return bcrypt.compare(this.password, hashedPassword);
    }
}

module.exports = User;