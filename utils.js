function generateFormatedTd(raw) {
	const td = document.createElement("td");
	raw.split('*').map((part, index) => {
		if (index % 2 == 1) {
			const span = document.createElement('span');
			span.classList = ["pronunciation"];
			span.appendChild(document.createTextNode(part));
			return span;
		}
		return document.createTextNode(part)
	})
	.forEach(n => td.appendChild(n))
	return td;
}

export {
	generateFormatedTd,
}
