import Task from '../models/Task';
import * as Yup from 'yup'

class TaskController {

   async index(req, res){

      const tasks = await Task.findAll({
         where: { user_id: req.userId, check: false}
      })

      return res.json(tasks)
   }

   async store (req, res) {

   //Criando as validações
   const schema = Yup.object().shape({
      desc: Yup.string().required()
   })

   if(!(await schema.isValid(req.body))){
      return res.status(400).json({error: 'Falha ao cadastrar!'})
   }
   const { desc } = req.body

   const tasks = await Task.create({
      user_id: req.userId,
      desc
   })

   return res.json (tasks);
  }
}

export default new TaskController ();
