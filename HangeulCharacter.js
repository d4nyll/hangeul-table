import HangeulBaseCharacter from './HangeulBaseCharacter.js';

export default class HangeulCharacter extends HangeulBaseCharacter {

	get examples() {
		return this.getAttribute('examples');
	}

	set examples(val) {
		if (val) {
			this.setAttribute('examples', val);
		} else {
			this.removeAttribute('examples');
		}
	}

	static get observedAttributes() {
		return ['examples', ...super.observedAttributes];
	}

	attributeChangedCallback(name, previous, current) {
		super.attributeChangedCallback(name, previous, current);

		if (name === 'examples') {
			this.shadowRoot.getElementById("examples").innerHTML = '';
		}
	}
}

window.customElements.define('hangeul-character', HangeulCharacter);
