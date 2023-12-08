import { DataTypes, Model, QueryInterface, Sequelize } from 'sequelize';

import { MatchType } from '../../types/Match';
import Match from '../models/MatchModel';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<MatchType>>('matches', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,      
            autoIncrement: true,
            allowNull: false,
        },
        homeTeamId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'home_team_id',
        },
        homeTeamGoals: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'home_team_goals',
        },
        awayTeamId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'away_team_id',
        },
        awayTeamGoals: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            field: 'away_team_goals',
        },
        inProgress: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            field: 'in_progress',
        },

    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  }
};


