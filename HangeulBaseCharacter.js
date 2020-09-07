export default class HangeulBaseCharacter extends HTMLElement {
	constructor() {
		super();

		// Initializing Internal State(s)
		this.timeoutId = null;

		// Adding Event Listeners for the Custom Element itself
		this.addEventListener('mouseover', e => {
			if (!this.timeoutId) {
				this.timeoutId = window.setTimeout(() => {
					this.timeoutId = null;
					const infobox = this.shadowRoot.getElementById("infobox");
					infobox.classList = ["show"];
				}, 150);
			}
		});
		this.addEventListener('mouseleave', e => {
			if (this.timeoutId) {
				window.clearTimeout(this.timeoutId);
				this.timeoutId = null;
			}
		});

		// Creating a Shadow DOM
		const template = document.getElementById('hangeul-letter');
		this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
	}

	get hangeul() {
		return this.getAttribute('hangeul');
	}

	set hangeul(val) {
		if (val) {
			this.setAttribute('hangeul', val);
		} else {
			this.removeAttribute('hangeul');
		}
	}

	get rr() {
		return this.getAttribute('rr');
	}

	set rr(val) {
		if (val) {
			this.setAttribute('rr', val);
		} else {
			this.removeAttribute('rr');
		}
	}

	get ipa() {
		return this.getAttribute('ipa');
	}

	set ipa(val) {
		if (val) {
			this.setAttribute('ipa', val);
		} else {
			this.removeAttribute('ipa');
		}
	}

	static get observedAttributes() {
		return ['hangeul', 'rr', 'ipa'];
	}

	attributeChangedCallback(name, previous, current) {
		if (name === 'hangeul') {
			this.shadowRoot.getElementById("hangeul").innerHTML = current;
			this.shadowRoot.getElementById("infobox_hangeul").innerHTML = current;
		}
		if (name === 'rr') {
			this.shadowRoot.getElementById("rr").innerHTML = current;
			this.shadowRoot.getElementById("infobox_rr").innerHTML = current;
		}

		// i,m*ea*t;iː,m*ea*n
		if (name === 'ipa') {
			const phones = current
				.split(';')
				.map(s => {
					const [ipa, example] = s.split(',');
					const row = document.createElement("tr");
					const tdIpa = document.createElement("td");
					tdIpa.appendChild(document.createTextNode(ipa));
					const tdEng = document.createElement("td");
					example.split('*').map((part, index) => {
						if (index % 2 == 1) {
							const span = document.createElement('span');
							span.classList = ["pronunciation"];
							span.appendChild(document.createTextNode(part));
							return span;
						}
						return document.createTextNode(part)
					})
					.forEach(n => tdEng.appendChild(n))
					row.appendChild(tdIpa);
					row.appendChild(tdEng);
					return row;
				})

			// ['i,m*ea*t', 'iː,m*ea*n']
			// [['i', 'm*ea*t'], ['iː', 'm*ea*n']]
			// [['i', 'm<u>ea</u>t'], ['iː', 'm<u>ea</ul>n']]

			const table = this.shadowRoot.getElementById("ipa_table")
			table.innerHTML = '';
			const fragment = document.createDocumentFragment();
			const thead = document.createElement('thead');
			const thIpa = document.createElement('th');
			thIpa.appendChild(document.createTextNode('IPA'))
			const thEng = document.createElement('th');
			thEng.appendChild(document.createTextNode('English'))
			thead.appendChild(thIpa);
			thead.appendChild(thEng);
			fragment.appendChild(thead);

			const tbody = document.createElement('tbody');
			tbody.id = 'ipa';
			phones.forEach(n => tbody.appendChild(n));
			fragment.appendChild(tbody);

			table.appendChild(fragment);
		}
	}

	connectedCallback() {
		const infobox = this.shadowRoot.getElementById("infobox")
		infobox.addEventListener('click', e => {
			e.stopPropagation();
		});
		infobox.addEventListener('mouseleave', e => {
			e.target.classList = [];
		});
	}
}
