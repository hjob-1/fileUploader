
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './dataBaseconnection'
import fileRouter from './routers/fileRouter'


const port = 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.use('/files/api',fileRouter);


sequelize.authenticate().then(()=>{
 console.log("connected to database");
 app.listen(port, () => {
 
  return console.log(`Express is listening at http://localhost:${port}`);
})}).catch((err)=>console.log('error',err))




