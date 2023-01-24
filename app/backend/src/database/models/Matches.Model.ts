import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  INTEGER,
  BOOLEAN,
} from 'sequelize';
import db from '.';

class Matches extends Model<InferAttributes<Matches>, InferCreationAttributes<Matches>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamsGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    type: INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  homeTeamId: {
    type: INTEGER,
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
  },
  awayTeamsGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

export default Matches;
