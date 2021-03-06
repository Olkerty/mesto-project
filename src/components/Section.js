export class Section {
	constructor({ items, renderer }, selector) {
		this._items = items;
		this._renderer = renderer;
		this.selector = selector;
	}
	renderItems() {
		this._items.forEach((item) => {
			this._renderer(item);
		});
	}
	addItem(DOMelement) {
		this._renderer(DOMelement);
	}
}