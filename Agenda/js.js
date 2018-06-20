class Agenda {
  constructor(){
    this.draw = this.draw.bind(this)
    this.content = document.getElementById("content")
    this.addButton  = document.getElementById("add")
    this.modal = document.getElementById("modal")
    this.body = document.getElementById("body")
    this.closeModal = document.getElementById("close")
    this.nombre = document.getElementById("nombre")
    this.apellido = document.getElementById("apellido")
    this.numero = document.getElementById("numero")
    this.sendButton = document.getElementById("send")
    this.URL = "http://www.raydelto.org/itla/agenda/"
    this.sendData = this.sendData.bind(this)
  }
  handleEvents(){
    this.addButton.addEventListener("click", e => {
      this.modal.setAttribute("open", true)
    })
    this.modal.addEventListener("click",e =>{
      let target = e.target
      let dataset = target.dataset
      let type = dataset.type
      if(type ==="modal")this.modal.removeAttribute("open")
    })
    this.closeModal.addEventListener("click",() =>{
      this.modal.removeAttribute("open")
    })
  }
  getData(){
     fetch(this.URL)
      .then(response => response.json())
      .then(response => {
        response.map(e => {
          if(e.nombre !=="" || e.apellido !=="" || e.telefono !=="")
          {
            this.draw(e)
          }
        })
      })
  }
  /*Obtener los datos del formulario y pasarlo al metodo que envia los datos*/
  getFormData(){
    this.sendButton.addEventListener("click", ()=>{
      const post = {
        nombre : this.nombre.value,
        apellido : this.apellido.value,
        telefono : this.numero.value
      }
      this.sendData(post)
      this.modal.removeAttribute("open")
    })
  }
  /*Envia los datos por el metodo post*/
  sendData(post){
    const options = {
      method:"POST",
      body: JSON.stringify(post)
    }
    fetch(this.URL,options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.error(`Error ${error}`))
  }
  /*Crea el elemento html con los datos*/
  draw(e){
    const CONTACT = `
      <div class="tarjeta-contactos">
        <p class="nombre">${e.nombre} ${e.apellido}</p>
        <p class="apellido">${e.telefono}</p>
      </div>
    `
    this.content.insertAdjacentHTML("beforeEnd",CONTACT)
  }
}

let agenda = new Agenda()
agenda.handleEvents()
agenda.getData()
agenda.getFormData()
