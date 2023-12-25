
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3001;
const cors = require('cors');
const axios = require('axios'); // Import the axios module

// Enable CORS for requests from http://localhost:3000
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(corsOptions));

app.get('/script/:filename', (req, res) => {
  const { filename } = req.params;

  // Подняться на уровень выше относительно текущей директории
  const parentDirectory = path.join(__dirname, '..');

  // Перейти в папку "projects"
  const projectsDirectory = path.join(parentDirectory, 'projects');

  // Создать путь к файлу внутри "projects"
  const filePath = path.join(projectsDirectory, filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});


app.get('/projects/', async (req, res) => {

  const ccfolder = req.query.folder;
  const parentDirectory = path.join(__dirname, '..'); // Перейти на уровень выше
  const projectsDirectory = path.join(parentDirectory, 'projects'); // Перейти в папку "projects"
  const directoryPath = path.join(projectsDirectory, ccfolder);
  const result = {};

  const isDirectory = async (path) => {
    try {
      const stats = await fs.promises.lstat(path);
      return stats.isDirectory();
    } catch (error) {
      throw new Error("No such file or Directory");
    }
  };

  const createTree = async (path, target) => {
    const data = await fs.promises.readdir(path);
    for (const item of data) {
      const currentLocation = `${path}/${item}`;
      const isDir = await isDirectory(currentLocation);
      if (!isDir) {
        target[item] = true;
        continue;
      }
      target[item] = {};
      await createTree(currentLocation, target[item]);
    }
  };

  try {
    await createTree(directoryPath, result);
    res.send(result)
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/file/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('File not found');
    }
  });
});

app.post('/saveFile', (req, res) => {
  const { files, hubName, entityNames } = req.body;
  const folderPath = path.join(__dirname, '..', 'projects', hubName);
  const filePaths = entityNames.map(entityName => path.join(folderPath, entityName));

  console.log('req', req.body)
  // Проверяем, существует ли папка
  if (!fs.existsSync(folderPath)) {
    // Если папки не существует, создаем её рекурсивно
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // // Сохраняем файл
  for (let i = 0; i < files?.length; i++) {
    fs.writeFile(filePaths[i], files[i], (err) => {
      if (err) {
        console.error(err);
        // res.status(500).send('Ошибка при сохранении файла');
      } else {
        console.log('success')
        // res.status(200).send('Файл успешно сохранен');
      }
    });
  }

});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

