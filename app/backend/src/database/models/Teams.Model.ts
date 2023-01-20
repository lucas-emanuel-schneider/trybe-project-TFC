import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import db from '.';
import Matches from './Matches.Model';

class Teams extends Model<InferAttributes<Teams>, InferCreationAttributes<Teams>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'awayTeam' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'awayTeam' });

export default Teams;
