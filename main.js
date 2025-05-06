'use-strict'

async function buscarContatos() {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarCard(contato) {
    const listaContatos = document.getElementById('contatos')
    const card = document.createElement('div')
    card.classList.add('contato')

    const img = document.createElement('img')
    img.src = contato.profile
    card.appendChild(img)

    const info = document.createElement('div')
    info.classList.add('info')

    const nome = document.createElement('p')
    nome.classList.add('name')
    nome.textContent = contato.name

    const descricao = document.createElement('p')
    descricao.textContent = contato.description

    info.appendChild(nome)
    info.appendChild(descricao)
    card.appendChild(info)

    card.addEventListener('click', () => carregarConversa(contato.name))
    listaContatos.appendChild(card)
}

async function carregarContatos() {
    const dados = await buscarContatos()
    dados.dados_contato.forEach(criarCardContato)
}

async function buscarConversa(nomeContato) {
    const url = `https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${nomeContato}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function carregarConversa(nomeContato) {
    const data = await buscarConversa(nomeContato)
    const conversa = data.conversas[0]
    const areaMensagens = document.querySelector('.chat-messages')
    areaMensagens.innerHTML = '' // limpa conteúdo anterior

    // Cabeçalho do contato
    const cabecalho = document.createElement('div')
    cabecalho.classList.add('perfil')

    const img = document.createElement('img')
    img.src = conversa.profile
    cabecalho.appendChild(img)

    const info = document.createElement('div')
    info.classList.add('info')

    const nome = document.createElement('p')
    nome.classList.add('name')
    nome.textContent = conversa.name

    const descricao = document.createElement('p')
    descricao.textContent = conversa.description

    info.appendChild(nome)
    info.appendChild(descricao)
    cabecalho.appendChild(info)
    areaMensagens.appendChild(cabecalho)

    // Mensagens
    const chat = document.createElement('div')
    chat.classList.add('chat')

    conversa.conversas.forEach(msg => {
        const remetente = document.createElement('p')
        remetente.classList.add('sender')
        remetente.textContent = msg.sender

        const conteudo = document.createElement('p')
        conteudo.classList.add('autor')
        conteudo.textContent = msg.content

        chat.appendChild(remetente)
        chat.appendChild(conteudo)
    })

    areaMensagens.appendChild(chat)
}

// Inicializa os contatos
carregarContatos()
