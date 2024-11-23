import 'dotenv/config';
import conectarAoBanco from "../config/dbconfig.js";
import { ObjectId } from "mongodb";


// Conecta ao banco de dados usando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);


// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts(){
    // Seleciona o banco de dados 'back-end-instaview'
    const db = conexao.db("back-end-instaview");
    // Seleciona a coleção 'post' dentro do banco de dados
    const colecao = db.collection("post");
    // Retorna um array com todos os documentos da coleção
    return colecao.find({}).toArray();
}

// Função assíncrona para criar um novo post no banco de dados
export async function criarPost(novoPost){
    const db = conexao.db("back-end-instaview");
    const colecao = db.collection("post");
    return await colecao.insertOne(novoPost); 
}

export async function atualizarPost(id, novoPost){
    const db = conexao.db("back-end-instaview");
    const colecao = db.collection("post");
    const objectId = ObjectId.createFromHexString(id, novoPost);
    return await colecao.updateOne({_id: new ObjectId(objectId)}, {$set: novoPost});
}
