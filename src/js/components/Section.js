export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addPrependItem(element) {
        this._container.prepend(element);
    }
    addAppendItem(element) {
        this._container.append(element);
    }
    _clear() {
        this._container.innerHTML = '';
    }
    renderItems(items) {
        this._clear();
  
        items.forEach(item => {
            this._renderer(item);
        });
    }
}