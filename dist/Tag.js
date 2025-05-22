var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Tag_instances, _Tag_toStringSingleTag, _Tag_toStringDoubleTag;
/**
 * Класс Tag представляет HTML-тег и предоставляет методы для работы с его строковым представлением.
 *
 * Поле tagMap содержит информацию о типах тегов (одинарные или двойные).
 *
 * Конструктор:
 * - tagName: Имя HTML-тега.
 * - attributes: Объект с атрибутами тега в формате ключ-значение.
 * - textContent: Содержимое тега (только для двойных тегов).
 *
 * Методы:
 * - toStringSingleTag: Возвращает строковое представление для одинарных HTML-тегов.
 * - toStringDoubleTag: Возвращает строковое представление для двойных HTML-тегов.
 * - toString: Определяет тип тега (одинарный или двойной) и возвращает соответствующее строковое представление.
 */
class Tag {
    /**
     * Создает экземпляр класса.
     * @param {string} tagName Имя тега.
     * @param {Record<string, string>} [attributes={}] Атрибуты тега, представленные в виде объекта ключ-значение.
     * @param {string} [textContent=''] Текстовое содержимое тега.
     * @return {void}
     */
    constructor(tagName, attributes = {}, textContent = '') {
        _Tag_instances.add(this);
        this.tagName = tagName;
        this.attributes = attributes;
        this.textContent = textContent;
    }
    /**
     * Возвращает строковое представление тега в зависимости от его типа.
     * @return {string} Строковое представление тега.
     */
    toString() {
        const isDouble = Tag.tagMap.get(this.tagName) === 'double';
        return isDouble ? __classPrivateFieldGet(this, _Tag_instances, "m", _Tag_toStringDoubleTag).call(this) : __classPrivateFieldGet(this, _Tag_instances, "m", _Tag_toStringSingleTag).call(this);
    }
}
_Tag_instances = new WeakSet(), _Tag_toStringSingleTag = function _Tag_toStringSingleTag() {
    var _a;
    const attributes = Object.entries((_a = this.attributes) !== null && _a !== void 0 ? _a : {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    return `<${this.tagName}${attributes ? ' ' + attributes : ''}>`;
}, _Tag_toStringDoubleTag = function _Tag_toStringDoubleTag() {
    var _a;
    const attributes = Object.entries((_a = this.attributes) !== null && _a !== void 0 ? _a : {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    return `<${this.tagName}${attributes ? ' ' + attributes : ''}>${this.textContent}</${this.tagName}>`;
};
Tag.tagMap = new Map([
    ['br', 'single'],
    ['img', 'single'],
    ['input', 'single'],
    ['textarea', 'double'],
    ['label', 'double'],
    ['div', 'double'],
    ['form', 'double'],
]);
export default Tag;
