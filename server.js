import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instancia do express
const app = express();
// Configura o servidor para servir arquivos estáticos
app.use(express.static("uploads"));
// Configura as rotas
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console
app.listen(3000, () => {
    console.log("Servidor escutando....");
});




