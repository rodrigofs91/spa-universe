export class Router {
  routes = {}

  // Mapeie as rotas para as imagens de fundo e os links correspondentes
  routeInfo = {
    "/": {
      background: "./assets/mountains-universe-1.png",
      linkSelector: 'a[href="/"]',
    },
    "/universe": {
      background: "./assets/mountains-universe-2.png",
      linkSelector: 'a[href="/universe"]',
    },
    "/exploration": {
      background: "./assets/mountains-universe-3.png",
      linkSelector: 'a[href="/exploration"]',
    },
    default: {
      background: "./assets/mountains-universe-1.png",
      linkSelector: null,
    },
  }

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const body = document.querySelector("body")
    const { pathname } = window.location

    // Obtenha as informações da rota correspondente ou use o valor padrão
    const routeInfo = this.routeInfo[pathname] || this.routeInfo["default"]

    // Atualize a imagem de fundo com base nas informações da rota
    body.style = `background-image: url(${routeInfo.background});`

    // Adicione a classe "active" ao link correspondente à rota atual e remova-a dos outros
    const links = document.querySelectorAll("a")
    links.forEach((link) => {
      link.classList.remove("active")
    })

    if (routeInfo.linkSelector) {
      const activeLink = document.querySelector(routeInfo.linkSelector)

      if (activeLink) {
        activeLink.classList.add("active")
      }
    }

    // Carregue o conteúdo da página correspondente à rota atual
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      })
  }
}
