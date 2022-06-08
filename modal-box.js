(function() {
	var style = `
		<style>
			bv-modal div.overlay{
				position: absolute;
				top: 0%;
				left: 0%;
				width: 100%;
				height: 100%;
				background-color: rgba(0,0,0,0.7);
				animation: modal-show-up 0.3s ease-in-out;
			}

			bv-modal div.body{
				overflow: hidden;
				position: absolute;
				bottom: 5%;
				right: 15%;
				height: 90%;
				width: 70%;
				box-sizing: border-box;
				border-radius: 30px;
				animation: modal-grow-in 0.3s ease-in-out;

				border: var(--modal-border-color, black) var(--modal-border-width, 4px) var(--modal-border-style, solid);
				background-color: var(--modal-body-background-color, white);
				font-family: var(--modal-font-family, "Times New Roman", Times, serif)
			}

			bv-modal div.header, bv-modal div.footer{
				height: 10%;
				width: 100%;
				box-sizing: border-box;
				position: relative;

				background-color: var(--modal-header-background-color, white);
				color: var(--modal-header-color, black);
				font-size: var(--modal-header-font-size, 30px)
			}

			bv-modal div.footer{
				display: flex;
				align-items: center;
				padding: 1%;
				padding-left: 2%;
				padding-right: 2%;
				box-sizing: border-box;

				background-color: var(--modal-footer-background-color, white);
				color: var(--modal-footer-color, black);
				font-size: var(--modal-footer-font-size, 20px)	
			}

			bv-modal div.title{
				position: absolute;
				top: 0px;
				left: 0px;

				display: flex;
				align-items: center;
				font-size: 30px;
				font-weight: bold;
				background: none;
				height: 100%;
				width: 90%;
				padding: 1%;
				padding-left: 2%;
				padding-right: 2%;
				box-sizing: border-box;
			}

			bv-modal div.close-button{
				position: absolute;
				top: 0px;
				right: 0px;

				display: flex;
				align-items: center;
				font-weight: bold;
				justify-content: center;
				height: 100%;
				width: 10%;
				cursor: pointer;

				border-left: var(--modal-border-color, black) var(--modal-border-width, 4px) var(--modal-border-style, solid);
				font-size: var(--modal-close-btn-font-size, 30px);
				background-color: var(--modal-close-btn-background-color, white);
				color: var(--modal-close-btn-color, black);
			}

			bv-modal div.close-button:hover{
				color: var(--modal-hover-close-btn-color, white);
				background-color: var(--modal-hover-close-btn-background-color, #F5110A);

				animation: modal-close-button 0.5s;
			}

			bv-modal div.content{
				height: 80%;
				width: 100%;
				box-sizing: border-box;
				border-top: var(--modal-border-color, black) var(--modal-border-width, 4px) var(--modal-border-style, solid);
				padding: 1%;
				padding-left: 2%;
				padding-right: 2%;
				border-bottom: var(--modal-border-color, black) var(--modal-border-width, 4px) var(--modal-border-style, solid);
				overflow: auto;
			}

			@keyframes modal-close-button {
  				from {
  					background-color: var(--modal-close-btn-background-color, white);
  					color: var(--modal-close-btn-color, black);
  				}
 			 	to {
 			 		background-color: var(--modal-hover-close-btn-background-color, #F5110A);
 			 		color: var(--modal-hover-close-btn-color, white);
 			 	}
			}

			@keyframes modal-show-up{
				from{
					opacity: 0;
				}
				to{
					opacity: 1;
				}
			}
			@keyframes modal-hide-away{
				from{
					opacity: 1;
				}
				to{
					opacity: 0;
				}
			}


			@keyframes modal-grow-in{
				from{
					height: 22.5%;
					width: 17.5%;
					bottom: 41%;
					right: 43%;
				}
				to{
					height: 90%;
					width: 70%;
					bottom: 5%;
					right: 15%;
				}
			}
			@keyframes modal-shink-away{
				from{
					height: 90%;
					width: 70%;
					bottom: 5%;
					right: 15%;
				}
				to{
					height: 18%;
					width: 14%;
					bottom: 41%;
					right: 43%;
				}
			}	
		<style>
	`;

	document.head.innerHTML = style + document.head.innerHTML;

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
			function Zatvori(elem) { 
				elem.style.display = "none";
				elem.querySelector("div.overlay").removeAttribute("style");
				elem.querySelector("div.body").removeAttribute("style");
			}
			setTimeout(Zatvori, 300, this);
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