# Installation Steps

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the project root:
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017
DB_NAME=nodejs_learning
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

3. Run database migrations:
```bash
npm run migrate:up
```

4. Start the server:
```bash
npm run dev
```
