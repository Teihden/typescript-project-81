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
    tagName;
    attributes;
    textContent;
    static tagMap = new Map([
        ["br", "single"],
        ["img", "single"],
        ["input", "single"],
        ["textarea", "double"],
        ["label", "double"],
        ["div", "double"],
    ]);
    /**
     * Создает экземпляр класса.
     * @param {string} tagName Имя тега.
     * @param {Record<string, string>} [attributes={}] Атрибуты тега, представленные в виде объекта ключ-значение.
     * @param {string} [textContent=""] Текстовое содержимое тега.
     * @return {void}
     */
    constructor(tagName, attributes = {}, textContent = "") {
        this.tagName = tagName;
        this.attributes = attributes;
        this.textContent = textContent;
    }
    /**
     * Преобразует текущий объект в строковое представление одиночного HTML-тега.
     * @return {string} Строка, представляющая одиночный HTML-тег с указанными атрибутами.
     */
    #toStringSingleTag() {
        const attributes = Object.entries(this.attributes ?? {})
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ");
        return `<${this.tagName}${attributes ? " " + attributes : ""}>`;
    }
    /**
     * Преобразует объект в строковое представление HTML-тега с двойным форматом.
     * Генерирует строку с открывающим и закрывающим тегами, включая текстовое содержимое и атрибуты.
     * @return {string} Строковое представление HTML-тега с атрибутами и текстовым содержимым.
     */
    #toStringDoubleTag() {
        const attributes = Object.entries(this.attributes ?? {})
            .map(([key, value]) => `${key}="${value}"`)
            .join(" ");
        return `<${this.tagName}${attributes ? " " + attributes : ""}>${this.textContent}</${this.tagName}>`;
    }
    /**
     * Возвращает строковое представление тега в зависимости от его типа.
     * @return {string} Строковое представление тега.
     */
    toString() {
        const isDouble = Tag.tagMap.get(this.tagName) === "double";
        return isDouble ? this.#toStringDoubleTag() : this.#toStringSingleTag();
    }
}
export default Tag;
