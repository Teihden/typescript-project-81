export default class Tag {
    static { this.tagMap = new Map([
        ['br', 'single'],
        ['img', 'single'],
        ['input', 'single'],
        ['textarea', 'double'],
        ['label', 'double'],
        ['div', 'double'],
        ['form', 'double'],
    ]); }
    constructor(tagName, attributes = {}, textContent = '') {
        this.tagName = tagName;
        this.attributes = attributes;
        this.textContent = textContent;
    }
    #toStringSingleTag() {
        const attributes = Object.entries(this.attributes ?? {})
            .map(([key, value]) => `${key}='${value}'`)
            .join(' ');
        return `<${this.tagName}${attributes ? ' ' + attributes : ''}>`;
    }
    #toStringDoubleTag() {
        const attributes = Object.entries(this.attributes ?? {})
            .map(([key, value]) => `${key}='${value}'`)
            .join(' ');
        return `<${this.tagName}${attributes ? ' ' + attributes : ''}>${this.textContent}</${this.tagName}>`;
    }
    toString() {
        const isDouble = Tag.tagMap.get(this.tagName) === 'double';
        return isDouble ? this.#toStringDoubleTag() : this.#toStringSingleTag();
    }
}
