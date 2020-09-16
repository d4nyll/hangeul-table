import HangeulCharacter from './HangeulCharacter.js';

export default class HangeulVowel extends HangeulCharacter {

	get name() {
		return this.getAttribute('name');
	}

	set name(val) {
		if (val) {
			this.setAttribute('name', val);
		} else {
			this.removeAttribute('name');
		}
	}

	static get observedAttributes() {
		return ['name', ...super.observedAttributes];
	}

	attributeChangedCallback(name, previous, current) {
		super.attributeChangedCallback(name, previous, current);

		if (name === 'name') {
			const [hangeul, rr] = current.split(';');

			const name = this.shadowRoot.getElementById("name");

			const fragment = document.createDocumentFragment();
			const span_rr = document.createElement('span');
			span_rr.id = 'name_rr';
			span_rr.appendChild(document.createTextNode(rr))
			const span_hangeul = document.createElement('span');
			span_hangeul.id = 'name_hangeul';
			span_hangeul.appendChild(document.createTextNode(hangeul))

			fragment.appendChild(span_rr);
			fragment.appendChild(span_hangeul);

			name.innerHTML = '';
			name.appendChild(fragment);
		}
	}
}

window.customElements.define('hangeul-vowel', HangeulVowel);
