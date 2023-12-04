import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Match extends Model<InferAttributes<Match>,
InferCreationAttributes<Match>> {
  declare id: CreationOptional<number>;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize: db,
  modelName: 'trybeEval',
  timestamps: false,
});

/**
    * `Workaround` para aplicar as associations em TS:
    * Associations 1:N devem ficar em uma das instâncias de modelo
    * */

// OtherModel.belongsTo(Match, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Match, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Match.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Match.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Match;
