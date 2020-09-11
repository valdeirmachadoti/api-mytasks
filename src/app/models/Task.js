import Sequelize, {Model} from 'sequelize';

class Task extends Model {
   static init (sequelize) {
     super.init (
       {
        desc: Sequelize.STRING,
        check: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  //Relacionamento
  static associate(models){
     this.belongsTo(models.User, {foreignKey: 'user_id', as: 'user'})
  }
}

export default Task;
