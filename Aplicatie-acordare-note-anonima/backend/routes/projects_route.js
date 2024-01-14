const router = require('express').Router();
const path = require('path');
const {Project } = require('../config/database');
const {Jury} = require('../config/database')
const {Deliverable} = require('../config/database')
const Joi = require('joi');
const multer = require('multer');

const validateGrades = (project) => {
  const schema = {
      c_grade: Joi.number().integer().min(1).max(10).required(),
      u_grade1: Joi.number().integer().min(1).max(10).required(),
      u_grade2: Joi.number().integer().min(1).max(10).required(),
      u_grade3: Joi.number().integer().min(1).max(10).required(),
      u_grade4: Joi.number().integer().min(1).max(10).required()
  };
  return Joi.validate(project, schema);
};

const validateFinalGrade = (project) => {
  const schema = {
      finalGrade: Joi.number().min(1).max(10).required()
  };
  return Joi.validate(project, schema);
};

const validateProjectName = (project) => {
  const schema = {
      projectName: Joi.string().min(3).required()
  };
  return Joi.validate(project, schema);
};

const validateProject = (project) => {
  const schema = {
      projectName: Joi.string().min(3).required(),
  };
  return Joi.validate(project, schema);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname || 'default-name');
}
  });

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const projects = await Project.findAll();
        // res.status(200).json(projects);
        res.status(200).send(projects);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

router.post('/', upload.single('file'), async (req, res) => {
    try {
      // Dacă nu există un fișier în cerere, trimite un mesaj de eroare
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
      const { projectName, studentName } = req.body; // Numele proiectului trimis ca parte din form data
  
      // Crează un nou proiect în baza de date cu numele proiectului și calea fișierului
      console.log(projectName + " - " + req.file.path);
      const newProject = await Project.create({
        projectName,
        studentName, // Asigurați-vă că includeți studentName aici
        filePath: req.file.path
    });
  
      res.status(200).json({ message: 'File uploaded successfully', project: newProject });
    } catch (err) {
      console.error('Error uploading file:', err);
      res.status(500).send('Server error during file upload');
    }
  });

  router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, 'uploads', filename);
    res.download(filepath);
  });

  router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
        res.status(200).send(project);
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
    
})

router.put('/changeProjectName/:id', async (req, res) => {
    try {

        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

router.put('/changeGrades/:id', async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        const {error} = validateGrades(req.body);
        if (error) return res.status(400).send(error.details[0].message);
    
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

router.put('/changeFinalGrade/:id', async (req, res) => {
    try{
        console.log(req.body);

        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
       
        await project.update(req.body);
        res.send('Modified successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const project = await Project.findByPk(req.params.id);
        if(!project) return res.status(404).send('The project with the given ID was not found!');
    
        await project.destroy();
        res.send('Deleted successfully!');
    }
    catch (err) {
        res.status(500).send('Error ...');
    }
});
  
module.exports = router;