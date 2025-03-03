import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    // Chama a função para buscar os posts
    const posts = await getTodosPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
} 

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(error){
        console.log(error.message);
        res.status(500).send({"Erro": "Ocorreu um erro ao criar o post"});
    } 
}

export async function uploadImage(req, res) {
    const novoPost = {
        descricao: "",
        imgurl:req.file.originalname,
        Alt:""
    };
    try{
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch(error){
        console.log(error.message);
        res.status(500).send({"Erro": "Ocorreu um erro ao criar o post"});
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    
    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        const post = {
            imgurl: urlImagem,
            descricao: descricao,
            Alt: req.body.Alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch(error){
        console.log(error.message);
        res.status(500).send({"Erro": "Ocorreu um erro ao criar o post"});
    } 
}