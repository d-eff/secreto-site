import { Sequelize } from 'sequelize';
import * as models from './models';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL);

for (const modelName in models) {
    sequelize.define(modelName, models[modelName])
}

const gift = sequelize.models.Gift
const year = sequelize.models.Year;
const user = sequelize.models.User;

//associations
gift.belongsTo(year);
year.hasMany(gift);
 
// gift.hasOne(user, { as: 'fromUser', foreignKey: 'id' });
// gift.hasOne(user, { as: 'toUser', foreignKey: 'id' });

user.belongsToMany(year, {through: 'UserYear'});
year.belongsToMany(user, {through: 'UserYear'});

sequelize.sync();

export default sequelize;