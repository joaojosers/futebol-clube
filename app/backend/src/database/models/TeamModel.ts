import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import Match from './MatchMode';
// import OtherModel from './OtherModel';

class Team extends Model<InferAttributes<Team>,
InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Team;
/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

// OtherModel.belongsTo(Team, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Team, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
// Match.belongsTo(Team, { foreignKey: 'home_Team_id', as: 'homeTeam' });
// Match.belongsTo(Team, { foreignKey: 'away_Team_id', as: 'awayTeam' });

// // Team.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// // Team.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
// Team.hasMany(Match, { foreignKey: 'home_Team_id', as: 'homeTeam' });
// Team.hasMany(Match, { foreignKey: 'away_Team_id', as: 'awayTeam' });

