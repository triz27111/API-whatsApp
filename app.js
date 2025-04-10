const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    app.use(cors());
    next();
});


const contatos = require('./funcoes.js');

app.get('/v1/contatos-usuarios/perfil/todososusuarios', cors(), async function(request, response) {
    let dados = contatos.getTodosOsUsuarios();
    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado um usuario' });
    }
});


app.get('/v1/contatos/perfil/usuariosprofile', cors(), async function(request, response) {
    let number = request.params.sigla;
    let dados = contatos.getPerfilDoUsuario(number);
    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado um perfil de usuario' });
    }
});


app.get('/v1/contatos/contatousuario/usuarios', cors(), async function(request, response) {
    let uf = request.query.sigla;
    let dados = contatos.getContatoDoUsuario(uf);
    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado nehum contato' });
    }
});

app.get('/v1/contatos/perfilusuario/usuarios/:number', cors(), async function(request, response) {
    let number = request.params.number;  
    let dados = contatos.getPerfilDoUsuario(number); 
    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'Não foi encontrado um perfil de usuário' });
    }
});



app.get('/v1/contatos-conversas/relacao-chats', cors(), async function(request, response) {
    let dados = contatos.getConversasRelacionadas();
    response.status(200).json(dados);
});

app.get('/v1/palavra-chave/pesquisaporpalavra', cors(), async function(request, response) {
    let uf = request.query.sigla;
    let dados = contatos.getPesquisarPorPalavraChave(uf);
    if (dados) {
        response.status(200).json(dados);
    } else {
        response.status(404).json({ 'status': 404, 'message': 'nenhuma palavra não encontrada' });
    }
});

app.listen(8080, function() {
    console.log('API funcionando e aguardando requisições...');
});


