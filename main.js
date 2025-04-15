'use-strict'

async function pesquisarContatos() {
    const url=`https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarContato(link){
    const contatos=document.getElementById('contatos')
    const NovoCard=document.createElement('div')
    NovoCard.classList.add('contato')

    const NovoPerfil=document.createElement('img')
    NovoPerfil.scr=link.profile
    NovoCard.appendChild(NovoPerfil)

    const NovaInfo=document.createElement('div')
    NovaInfo.classList.add('info')
    NovoCard.appendChild(NovaInfo)

    const NovoNome=document.createElement('p')
    NovoNome.classList.add('name')
    NovoNome.textContent=`${link.name}`
    NovaInfo.appendChild(NovoNome)

    const NovoNumero=document.createElement('p')
    NovoNumero.textContent=`${link.description}`
    NovaInfo.appendChild(NovoNumero)
    
    NovoCard.appendChild(NovaInfo)
    contatos.appendChild(NovoCard)

    NovoCard.addEventListener('click', async function(){
        
        await preencherConversa(link.name)
    })
}

async function preencherContatos() {
    const contato= await pesquisarContatos()
    const contatos=document.getElementById('contatos')
    contato.dados_contato.forEach(criarContato)
}

/*************************************************************************************************/

async function preencherConversa(name) {
    const data = await pesquisarConversa(name);
    const conversa = data.conversas[0]
    criarConversa(conversa);
}

async function pesquisarConversa(name){
    const url=`https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${name}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar informações:", error)
        return null
    }
}

async function criarConversa(conversa){
    const conversas=document.getElementById('conversas')
    conversas.replaceChildren()
    const perfil=document.createElement('div')
    perfil.classList.add('perfil')

    const imgperfil = document.createElement('img')
    imgperfil.src = conversa.profile
    perfil.appendChild(imgperfil)


    const NovaInfo=document.createElement('div')
    NovaInfo.classList.add('info')
    perfil.appendChild(NovaInfo)

    const NovoNome=document.createElement('p')
    NovoNome.classList.add('name')
    NovoNome.textContent=`${conversa.name}`
    NovaInfo.appendChild(NovoNome)

    const NovoNumero=document.createElement('p')
    NovoNumero.textContent=`${conversa.description}`
    NovaInfo.appendChild(NovoNumero)

    conversas.appendChild(perfil)

    const chat = document.createElement('div')
    chat.classList.add('chat')

    conversa.conversas.forEach(message => {
        const sender = document.createElement('p')
        sender.classList.add('sender')
        sender.textContent=`${message.sender}`
        chat.appendChild(sender)

        const autor = document.createElement('p')
        autor.classList.add('autor')
        autor.textContent=`${message.content}`
        chat.appendChild(autor)
    })

    conversas.appendChild(chat)

    const message = document.createElement('div')
    message.placeholder='Enviar Uma mensagem'
    message.classList.add('message')

    const digite= document.createElement('input')
    digite.classList.add('digite')
    digite.classList.add('message')

    message.appendChild(digite)

    const enviar = document.createElement('button')
    enviar.textContent='ENVIAR'
    enviar.classList.add('enviar')

    message.appendChild(enviar)

    conversas.appendChild(message)

}

preencherContatos()