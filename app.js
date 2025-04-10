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
    contatos.replaceChildren('')
    contato.dados_contato.forEach(criarContato)
}

/**********************************************************/

async function preencherConversa(name) {
    const conversa= await pesquisarConversa(name)
    const conversas=document.getElementById('conversas')
    conversas.replaceChildren('')
    conversa.conversas.forEach(criarConversa)
}

async function pesquisarConversa(name){
    const url=`https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${name}`
    try {
        const response = await(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar informações:", error)
        return null
    }
}

async function criarConversa(link){
    const conversas=document.getElementById('conversas')
    const perfil=document.createElement('div')
    perfil.classList.add('perfil')

    const imgperfil = document.createElement('img')
    conversas.appendChild(imgperfil)

    const NovaInfo=document.createElement('div')
    NovaInfo.classList.add('info')
    perfil.appendChild(NovaInfo)

    const NovoNome=document.createElement('p')
    NovoNome.classList.add('name')
    NovoNome.textContent=`${link.name}`
    NovaInfo.appendChild(NovoNome)

    const NovoNumero=document.createElement('p')
    NovoNumero.textContent=`${link.description}`
    NovaInfo.appendChild(NovoNumero)

    conversas.appendChild(perfil)

    const chat = document.createElement('div')
    chat.classList.add('chat')

}

preencherContatos()