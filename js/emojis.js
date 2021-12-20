class Emoji {
  constructor(caja, btn, input) {
    this.caja = caja;
    this.btn = btn;
    this.input = input;
    this.urlExit = "https://www.svgrepo.com/show/273966/close.svg";
    this.urlEmoji = "https://res.cloudinary.com/dkhktyqd3/image/upload/v1638946898/carita_mjmlcl.svg";
    this.btn.style.backgroundImage = `url(${this.urlEmoji})`;
  }

  views() {
    console.group('estacion')
    this.caja.classList.toggle("view");
    console.log(this.btn.style.backgroundImage);
    if(this.btn.style.backgroundImage === `url("${this.urlEmoji}")`) {
        console.log(this.btn.style.backgroundImage === `url("${this.urlEmoji}")`)
        this.btn.style.backgroundImage = `url(${this.urlExit})`;
    } else {
        this.btn.style.backgroundImage = `url(${this.urlEmoji})`;
    }
    console.log(this.btn.style.backgroundImage)
    console.groupEnd()
  }

  write(event) {
    this.input.value += event.detail.unicode;
  }
}
