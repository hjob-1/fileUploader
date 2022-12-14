import { Router } from "express";
import { deleteFile, fileUpload, getFile } from "../controllers/fileController";
import multer from 'multer';
const upload = multer();

const fileRouter = Router();

fileRouter.get("/all", getFile);
fileRouter.post("/upload", upload.single("my-file"),fileUpload);
fileRouter.delete("/delete/:id", deleteFile);

export default fileRouter