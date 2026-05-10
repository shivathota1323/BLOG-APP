# Vercel deployment settings

Deploy this capstone as two Vercel projects from the same GitHub repository.

## Backend project

- Root Directory: `capstone/backend` if you push `backend_blogapp` there, otherwise the folder that contains backend `package.json`
- Framework Preset: Other
- Build Command: `npm install`
- Output Directory: leave empty
- Install Command: `npm install`
- Start Command: `npm start`

Environment variables:

```text
DB_URL=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/blogdb
SECRET_KEY=replace_with_a_long_random_secret
FRONTEND_URL=https://your-frontend-project.vercel.app
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

After deploy, open the backend URL. It should return:

```json
{ "message": "Blog API is running" }
```

## Frontend project

- Root Directory: `capstone/frontend` if you push `frontend_blogapp` there, otherwise the folder that contains frontend `package.json`
- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

Environment variables:

```text
VITE_API_BASE_URL=https://your-backend-project.vercel.app
```

## Required order

1. Push backend and frontend source folders to GitHub with their `package.json` files.
2. Deploy the backend first.
3. Add the backend URL to frontend `VITE_API_BASE_URL`.
4. Deploy the frontend.
5. Add the final frontend URL to backend `FRONTEND_URL`.
6. Redeploy backend once after setting `FRONTEND_URL`.
