import { DataTypes, Sequelize } from 'sequelize';

export default class Dyeing extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      dyeingColor: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      dyeingDecolorization: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dyeingTime: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      dyeingHurt: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Dyeing',
      tableName: 'dyeing',
      paranoid: true, 
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  
  static associate(db) {
    db.Dyeing.belongsTo(db.Record)
  }
}; 