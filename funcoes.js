/*********************************************************************************************************************************************************************************
 *Objetivo: Criar API pra o WHATSAPP
 *Data: 28/01/2025
 *Autor:Beatriz
 *Versão: 1.0
***********************************************************************************************************************************************************************************/

var lista = require('./contatos.js')

const getTodosOsUsuarios = function() {
    let listaUsuarios = lista["whats-users"];
    let usuarios = {};
    let listas = [];

    listaUsuarios.forEach(function(item) {
        listas.push(item.account);
        listas.push(item.id);
        listas.push(item.number);
        listas.push(item.nickname);
    });

    usuarios.id = listas;
    usuarios.quantidade = listas.length;

    return usuarios;
};

console.log(getTodosOsUsuarios());


const getPerfilDoUsuario = function (number) {
    let listaProfile = lista["whats-users"];
    let dadosProfile = {}; 
    let status = false;

    listaProfile.forEach(function (item) {
        if (String(item.number).toUpperCase() === String(number).toUpperCase()) {
            status = true;
            dadosProfile.background = item.background;
            dadosProfile.number = item.number;
            dadosProfile.profileImage = item["profile-image"];
        }
    });

    if (status) {
        return dadosProfile;
    } else {
        return false;
    }
};

console.log(getPerfilDoUsuario('11955577796'));  

const getContatoDoUsuario = function(id) {
    let listaUsuarios = lista["whats-users"];
    let contatosUsuario = [];
    let status = false;

    listaUsuarios.forEach(function(usuario) {
        if (String(usuario.id).toUpperCase() === String(id).toUpperCase()) {
            status = true;
            if (usuario.contacts) {
                usuario.contacts.forEach(function(contato) {
                    let contatoInfo = {};
                    contatoInfo.account = contato.account ? contato.account : ''; 
                    contatoInfo.description = contato.description ? contato.description : ''; 
                    contatoInfo['profile-image'] = contato['profile-image'] ? contato['profile-image'] : ''; 
                    contatosUsuario[contatosUsuario.length] = contatoInfo;
                });
            }
        }
    });

    if (status) {
        return contatosUsuario;
    } else {
        return status;
    }
};

console.log(getContatoDoUsuario('1'));




const getConversasUsuarios = function(contacts) {
    let listaConversas = lista['whats-users'];
    let conversasUsuarios = {}; 
    let status = false;

    listaConversas.forEach(function(item) {
        console.log("Item:", item);

        if (String(item.chats).toUpperCase() === String(contacts).toUpperCase()) {
            status = true;

            if (item.id1) {
                conversasUsuarios.id1 = item.id1;
            }
            if (item.id2) {
                conversasUsuarios.id2 = item.id2;
            }
            if (item.id3) {
                conversasUsuarios.id3 = item.id3;
            }
            if (item.id4) {
                conversasUsuarios.id4 = item.id4;
            }

            if (item.description) {
                conversasUsuarios.description = item.description;
            }
        }
    });

    console.log("Conversas do usuário:", conversasUsuarios);

    if (status) {
        return conversasUsuarios;
    } else {
        return false; 
    }
};

console.log(getConversasUsuarios('Ricky'));




const getConversasRelacionadas = function(chatsFiltro, conversaRelacao, contatos, status) {
    if (conversaRelacao == undefined) {
        if (lista == undefined) {
            return false;
        }
        if (lista.listaContatos == undefined) {
            return false;
        }
        if (lista.listaContatos.contatos == undefined) {
            return false;
        }

        conversaRelacao = lista.listaContatos.contatos;
        contatos = [];
        status = false;
    }

    let item = conversaRelacao[0];
    let resto = conversaRelacao.slice(1);

    if (item == undefined) {
        let chatsContatos = {};
        chatsContatos.chats = String(chatsFiltro).toUpperCase();
        chatsContatos.contatos = contatos;

        if (status == false) {
            return false;
        }
        return chatsContatos;
    }

    if (String(item.chats).toUpperCase() == String(chatsFiltro).toUpperCase()) {
        let chatsRelacionamento = {};
        chatsRelacionamento.conversas = item.sender;
        chatsRelacionamento.recebidos = item.content;
        chatsRelacionamento.hora = item.time;
        contatos.push(chatsRelacionamento);
        status = true;
    }

    return getConversasRelacionadas(chatsFiltro, resto, contatos, status);
};


console.log(getConversasRelacionadas("Jane Smith"));

const getPesquisarPorPalavraChave = function(palavraChave) {
    if (typeof palavraChave === 'undefined' || palavraChave === null) {
        console.error("A palavra chave não foi fornecida.");
        return "Erro: A palavra chave não foi fornecida";
    }

    let listaConversas = lista['whats-users'];  
    let resultados = []; 
    let chaveMaiuscula = palavraChave.toUpperCase();  

    listaConversas.forEach(function(item) {
        let chaveExistenteEmConversa = false;
        let chaveExistenteEmDescricao = false;

        let chats = String(item.chats).toUpperCase();
        let conversaEncontrada = chats.indexOf(chaveMaiuscula) !== -1;

        if (conversaEncontrada) {
            chaveExistenteEmConversa = true;
        }

        if (item.description) {
            let description = String(item.description).toUpperCase();
            let descricaoEncontrada = description.indexOf(chaveMaiuscula) !== -1;

            if (descricaoEncontrada) {
                chaveExistenteEmDescricao = true;
            }
        }

        if (chaveExistenteEmConversa) {
            let resultadoConversa = {
                tipo: 'Conversa',
                contato: item.users,  
                chats: item.chats
            };
            resultados.push(resultadoConversa);
        }

        if (chaveExistenteEmDescricao) {
            let resultadoContato = {
                tipo: 'Contato',
                contato: item.users, 
                description: item.description
            };
            resultados.push(resultadoContato);
        }
    });

    if (resultados.length !== 0) {
        return resultados;  
    } else {
        return "Nenhum resultado encontrado";  
    }
};


console.log(getPesquisarPorPalavraChave('Mark'));


module.exports = {
    getTodosOsUsuarios,
    getPerfilDoUsuario,
    getContatoDoUsuario,
    getConversasUsuarios,
    getConversasRelacionadas,
    getPesquisarPorPalavraChave
}