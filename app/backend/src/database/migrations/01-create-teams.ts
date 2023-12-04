import { DataTypes, Model, QueryInterface, Sequelize } from 'sequelize';
import { Team } from '../..//types/Team';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Team>>('teams', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,      
            autoIncrement: true,
            allowNull: false,
        },
        teamName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'team_name',
        },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('Teams');
  }
};


