import HangeulVowel from './HangeulVowel.js';

export default class HangeulConsonant extends HangeulVowel {

	get 'ipa-initial'() {
		return this.getAttribute('ipa-initial');
	}

	set 'ipa-initial'(val) {
		if (val) {
			this.setAttribute('ipa-initial', val);
		} else {
			this.removeAttribute('ipa-initial');
		}
	}

	static get observedAttributes() {
		return ['ipa-initial', ...super.observedAttributes];
	}

	attributeChangedCallback(name, previous, current) {
		super.attributeChangedCallback(name, previous, current);

		if (name === 'ipa-initial') {
			this.shadowRoot.getElementById("infobox_initial").innerHTML = current;
		}
	}
}

window.customElements.define('hangeul-consonant', HangeulConsonant);
