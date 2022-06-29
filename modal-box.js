(function() {
	window.addEventListener("DOMContentLoaded", () => {
		var link = `<link rel="stylesheet" href="https://combinatronics.com/VoldyBV/modal-box/master/modal-box.css">`;
		document.head.insertAdjacentHTML("afterbegin", link);

		var modals = document.body.querySelectorAll("bv-modal");

		if(modals.length > 0){
			modals.forEach((element) => {
				if(element.hasAttribute("opened")){
					element.open();
				}
			})
		}
	});

	class BVModal extends HTMLElement{
  		constructor(){
  			super();
		}
		connectedCallback(){
			var dodaj = this.#addBody.bind(this);
			if(!this.hasAttribute("title")) this.title = "";
			if(!this.hasAttribute("footer")) this.footer = "";
			document.addEventListener('DOMContentLoaded', dodaj);
		}
		adoptedCallback(){
			var dodaj = this.#addBody.bind(this);
			if(!this.hasAttribute("title")) this.title = "";
			if(!this.hasAttribute("footer")) this.footer = "";
			document.addEventListener('DOMContentLoaded', dodaj);
		}

		static get observedAttributes() {
			return ["title", "footer"]
    	}

		attributeChangedCallback(name, oldValue, newValue) {
			switch(name){
				case 'title': 
					var elem = this.querySelector("div.title[title]");
					if(elem) elem.innerHTML = this.title;
					break;
				case 'footer':
					var elem = this.querySelector("div.footer[info]");
					if(elem) elem.innerHTML = this.footer;
					break;
				default: break;
			}
		}

		#addBody(){
			var body = `
				<div class="overlay">
					<div class="body">
						<div class="header">
							<div class="title" title>
								this is title
							</div><!--
							--><div class="close-button" close>
								&#10006;
							</div>
						</div>
						<div class="content" content></div>
						<div class="footer" info>
							this is footer.
						</div>
					</div>
				</div>
			`;
			var Close = this.close.bind(this);
			var content = this.innerHTML;
			this.innerHTML = body;
			this.style.display = "none";
			this.querySelector("div.content[content]").innerHTML = content;
			this.querySelector("div.close-button[close]").addEventListener("click", Close);
			this.querySelector("div.title[title]").innerHTML = this.title;
			this.querySelector("div.footer[info]").innerHTML = this.footer;
			this.addEventListener("contextmenu", function (event){ event.preventDefault();})
		}
		open(){
			this.style.display = "block";
		}
		close(){
			this.querySelector("div.overlay").setAttribute("style", "animation: modal-hide-away 0.3s ease-in-out");
			this.querySelector("div.body").setAttribute("style", "animation: modal-shink-away 0.3s ease-in-out");
			function Zatvori() { 
				this.style.display = "none";
				this.querySelector("div.overlay").removeAttribute("style");
				this.querySelector("div.body").removeAttribute("style");
				if(this.hasAttribute("onclose")){
					eval(this.getAttribute("close"))
				}
			}
			setTimeout(Zatvori.bind(this), 300);
		}

		set title(newValue){
			this.setAttribute("title", newValue);
		}
		get title(){
			return this.getAttribute("title");
		}

		set footer(newValue){
			this.setAttribute("footer", newValue);
		}
		get footer(){
			return this.getAttribute("footer");
		}
		disconnectedCallback() {
		}
  	}
  window.customElements.define("bv-modal", BVModal);
})();