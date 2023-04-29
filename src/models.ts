import { DataTypes } from 'sequelize';

const User = {
    email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },
    passhash: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}

const Gift = {
    fromUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    toUserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}

const Year = {
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}

export { User, Gift, Year };



