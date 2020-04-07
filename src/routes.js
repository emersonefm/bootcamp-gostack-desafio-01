const { Router } = require('express');
const routes = Router();

const projects = [];

function projectExists(req, res, next) {
  const { id } = req.params;
  const projeto = projects.find(element => element.id == id);

  if (!projeto){
    return res.status(400).json({ message: "Projeto não encontrado." })
  }

  return next();
}

routes.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

routes.get('/projects', (req, res) => {
  return res.json(projects);
});

routes.put('/projects/:id', projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(element => element.id == id);

  project.title = title;
  return res.json(project)
});

routes.delete('/projects/:id', projectExists, (req, res) => {
  const { id } = req.params;
  const findProject = projects.findIndex(element => element.id = element);
  projects.splice(findProject, 1);
  return res.json({ message: "Projeto deletado."})
});

routes.post('/projects/:id/tasks', projectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(element => element.id == id);

  project.tasks.push(title);
  return res.json(project)
})

module.exports = routes;