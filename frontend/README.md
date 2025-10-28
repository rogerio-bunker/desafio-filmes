# 🎬 MovieList — Desafio Verzel

Aplicação completa (frontend + backend) para busca, listagem e compartilhamento de filmes utilizando a API pública do **TMDb**.

---

## 🧩 Visão Geral

O **MovieList** permite ao usuário:

- 🔍 Pesquisar filmes pelo título
- ⭐ Adicionar e remover filmes dos favoritos
- 📤 Compartilhar a lista de favoritos via link
- 📥 Visualizar listas compartilhadas (modo somente leitura)

O projeto foi desenvolvido com foco em **organização, responsividade, boas práticas e integração entre front e back-end.**

---

## 🏗️ Tecnologias Utilizadas

### Frontend

- ⚛️ **React + Vite**
- 🎨 CSS moderno com variáveis, sombras e responsividade
- 🌐 Comunicação com backend via `fetch API`
- 🔁 React Router DOM (para rotas /, /favorites, /shared/:id)

### Backend

- 🟩 **Node.js + Express**
- 🔐 Integração com API **The Movie Database (TMDb)**
- 🌍 **CORS** habilitado
- 💾 Armazenamento temporário em memória (favoritos e listas compartilhadas)
- ⚙️ Proxy seguro entre o frontend e o TMDb

---

## 📂 Estrutura do Projeto

```bash
desafio-filmes/
│
├── backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── Favorites.jsx
│   │   │   └── SharedList.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── api.js
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
└── .gitignore
```

---

## ⚙️ Configuração e Execução Local

### 🔹 Pré-requisitos

- Node.js 18+
- npm 9+ (ou yarn)

---

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/rogerio-bunker/desafio-filmes.git
cd desafio-filmes
```

---

### 2️⃣ Instalar dependências

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

### 3️⃣ Rodar o backend

```bash
cd backend
npm run dev
```

> O servidor iniciará em [http://localhost:3000](http://localhost:3000)

---

### 4️⃣ Rodar o frontend

```bash
cd ../frontend
npm run dev
```

> O projeto abrirá em [http://localhost:5173](http://localhost:5173)

---

## 🔑 API TMDb

O backend consome os dados diretamente do TMDb usando sua chave de API:

```js
const TMDB_API_KEY = "17e5f0785f7fbd2795d09d69daccc321";
```

> Você pode criar uma nova em: https://www.themoviedb.org/settings/api

---

## 🌐 Endpoints do Backend

| Método   | Rota             | Descrição                        |
| :------- | :--------------- | :------------------------------- |
| `GET`    | `/search?q=nome` | Busca filmes no TMDb             |
| `GET`    | `/favorites`     | Lista filmes favoritos           |
| `POST`   | `/favorites`     | Adiciona filme aos favoritos     |
| `DELETE` | `/favorites/:id` | Remove um filme dos favoritos    |
| `POST`   | `/share`         | Cria link de lista compartilhada |
| `GET`    | `/shared/:id`    | Exibe lista compartilhada        |

---

## 💡 Fluxo da Aplicação

1. O usuário busca por filmes no campo principal.
2. Pode favoritar ou remover filmes da lista.
3. Na aba **Favoritos**, é possível gerar um link de compartilhamento.
4. Esse link abre a rota `/shared/:id`, mostrando a lista salva (somente leitura).

---

## 📱 Responsividade

- Layout moderno e adaptativo (desktop, tablet e mobile)
- Tipografia “Inter”
- Cores em tons escuros e destaque em **verde água (a cor do TMDb)**
- Cartões animados com `hover` e `shadow`

---

## 💾 Scripts Disponíveis

### Backend

| Script        | Função                                    |
| :------------ | :---------------------------------------- |
| `npm run dev` | Inicia o servidor Express com auto-reload |
| `npm start`   | Inicia o servidor em modo produção        |

### Frontend

| Script            | Função                                 |
| :---------------- | :------------------------------------- |
| `npm run dev`     | Roda o projeto em modo desenvolvimento |
| `npm run build`   | Gera build de produção                 |
| `npm run preview` | Visualiza o build gerado localmente    |

---

## 🧠 Conceitos Demonstrados

- Integração completa entre front e back-end
- Uso de rotas dinâmicas (`/shared/:shareId`)
- Componentização e boas práticas React
- Manipulação de estado e hooks (`useState`, `useEffect`, `useParams`)
- Fetch e promises assíncronas
- Responsividade avançada com CSS moderno
- Organização de projeto e versionamento Git/GitHub

---

## 🧑‍💻 Autor

**Desenvolvido por:**  
[Sérgio Rogério Melo dos Santos](https://github.com/rogerio-bunker)

📧 *rogerio.bunker@gmail.com*  
💼 Analista de Desenvolvimento de Sistemas

---

## 🏁 Licença

Este projeto é de uso educacional e livre para fins de estudo e demonstração técnica.
