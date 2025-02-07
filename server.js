require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDb = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const leadRoutes = require('./src/routes/leadRoutes');
const contactRoutes = require('./src/routes/contactRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/swaggerOptions');
const userRoutes = require('./src/routes/userRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes'); 

const app = express();
connectDb();

app.use(cors({
  origin: '*',  // Allows requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));
app.use(helmet());
app.use(express.json());

app.options('*', cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/api/users", userRoutes);
app.use('/api', settingsRoutes);

app.use((err, req, res , next)=>{
  res.status(500).json({message: err.message});
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
