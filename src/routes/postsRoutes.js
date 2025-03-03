import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImage, atualizarNovoPost} from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ dest: "./uploads" , storage });


const routes = (app) => {
    // Permite que o servidor interprete dados JSON enviados nas requisições
    app.use(express.json());
    app.use(cors(corsOptions));
    // Rota GET para a URL '/posts'
    app.get("/posts", listarPosts);
    // Rota POST para a URL '/posts'
    app.post("/posts", postarNovoPost);
    // Rota POST para a URL '/upload'
    app.post("/upload", upload.single("imagem"), uploadImage);
    // Rota PUT para a URL '/posts/:id'
    app.put("/upload/:id", atualizarNovoPost);
}

export default routes;


