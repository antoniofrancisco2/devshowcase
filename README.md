# DevShowcase API 🚀

API REST desenvolvida em Node.js com Express e TypeScript para gestão de portfólios de desenvolvedores, projetos e tecnologias.

## 🛠️ Tecnologias Utilizadas

- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite**

## 📌 Rotas da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/profiles` | Cria um novo perfil |
| `GET` | `/api/profiles/:id` | Busca perfil por ID com seus projetos |
| `POST` | `/api/technologies` | Cadastra uma nova tecnologia |
| `GET` | `/api/technologies` | Lista todas as tecnologias |
| `POST` | `/api/projects` | Cria um projeto vinculando perfil e tecnologias |
| `GET` | `/api/projects` | Lista todos os projetos cadastrados |

## 🚀 Como Executar o Projeto

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/devshowcase.git