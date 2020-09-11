import Task from '../models/Task';
import * as Yup from 'yup';

class TaskController {
  async index (req, res) {
    //Buscando o usuario logado e listando as tasks não concluidas.
    const tasks = await Task.findAll ({
      where: {user_id: req.userId, check: false},
    });

    return res.json (tasks);
  }

  async store (req, res) {
    //Criando as validações
    const schema = Yup.object ().shape ({
      desc: Yup.string ().required (),
    });

    if (!await schema.isValid (req.body)) {
      return res.status (400).json ({error: 'Falha ao cadastrar!'});
    }
    const {desc} = req.body;

    const tasks = await Task.create ({
      user_id: req.userId,
      desc,
    });

    return res.json (tasks);
  }

  async update (req, res) {
    const {task_id} = req.params;
    const task = await Task.findByPk (task_id);

    if (!task) {
      return res.status (400).json ({error: 'Tarefa não cadastrada!'});
    }

    await task.update (req.body);

    return res.json (task);
  }

  async delete (req, res) {

    const {task_id} = req.params;

    const task = await Task.findByPk (task_id);

    if (!task) {
      return res.status (400).json ({error: 'Tarefa não existe!'});
    }
    //Verifica se a tarefa é do que está logado
    if(task.user_id !== req.userId ){
      return res.status(401).json({error: 'Requisição não autorizada'})
    }

    await task.destroy();

    return res.send();
  }
}

export default new TaskController ();
