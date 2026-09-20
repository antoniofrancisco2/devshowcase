import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 1. POST /api/profiles - Cadastrar perfil
app.post('/api/profiles', async (req, res) => {
  const { name, email, bio, githubUrl } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e e-mail são obrigatórios.' });
  }

  try {
    const profile = await prisma.profile.create({
      data: { name, email, bio, githubUrl }
    });
    return res.status(201).json(profile);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar perfil. Verifique se o e-mail já existe.' });
  }
});

// 2. GET /api/profiles/:id - Buscar perfil por ID com seus projetos
app.get('/api/profiles/:id', async (req, res) => {
  const { id } = req.params;

  const profile = await prisma.profile.findUnique({
    where: { id },
    include: { projects: true }
  });

  if (!profile) {
    return res.status(404).json({ error: 'Perfil não encontrado.' });
  }

  return res.json(profile);
});

// 3. POST /api/technologies - Cadastrar tecnologia
app.post('/api/technologies', async (req, res) => {
  const { name, category } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Nome da tecnologia é obrigatório.' });
  }

  try {
    const technology = await prisma.technology.create({
      data: { name, category }
    });
    return res.status(201).json(technology);
  } catch (error) {
    return res.status(400).json({ error: 'Tecnologia já cadastrada.' });
  }
});

// 4. GET /api/technologies - Listar todas as tecnologias
app.get('/api/technologies', async (req, res) => {
  const technologies = await prisma.technology.findMany();
  return res.json(technologies);
});

// 5. POST /api/projects - Cadastrar projeto com validações
app.post('/api/projects', async (req, res) => {
  const { title, description, repositoryUrl, deployUrl, profileId, technologyIds } = req.body;

  if (!title || !description || !repositoryUrl || !profileId) {
    return res.status(400).json({ error: 'Título, descrição, URL do repositório e profileId são obrigatórios.' });
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        repositoryUrl,
        deployUrl,
        profileId,
        technologies: technologyIds ? {
          connect: technologyIds.map((id: string) => ({ id }))
        } : undefined
      },
      include: { technologies: true, profile: true }
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar projeto. Verifique se o profileId é válido.' });
  }
});

// 6. GET /api/projects - Listar projetos
app.get('/api/projects', async (req, res) => {
  const projects = await prisma.project.findMany({
    include: {
      profile: true,
      technologies: true,
      feedbacks: true
    }
  });
  return res.json(projects);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor DevShowcase API rodando na porta ${PORT}`);
});