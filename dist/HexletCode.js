var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _HexletCode_instances, _HexletCode_getControlValue;
import Tag from './Tag.js';
import { capitalize } from 'es-toolkit';
import filterObj from './helpers.js';
/**
 * Класс HexletCode предоставляет функциональность для создания HTML-форм на основе шаблона данных.
 */
class HexletCode {
    /**
     * Создает строку HTML формы на основе переданного шаблона и атрибутов.
     * @param {Record<string, string>} template Шаблон полей ввода формы.
     * @param {IAttributes} [attributes={}] Атрибуты формы, такие как URL-адрес и другие параметры.
     * @param {IHexletCodeCb} [cb=() => {}] Обратный вызов, вызываемый с экземпляром `HexletCode`.
     * @return {string} Строка HTML формы.
     */
    static formFor(template = {}, attributes = {}, cb = () => {
    }) {
        var _a, _b, _c;
        const instance = new HexletCode(template);
        if (cb && typeof cb === 'function') {
            cb(instance);
        }
        const getFormAttributes = (_a = HexletCode.tagAttributesMap.get('form')) !== null && _a !== void 0 ? _a : (() => ({}));
        return new Tag('form', filterObj(getFormAttributes({ action: (_c = (_b = attributes.url) === null || _b === void 0 ? void 0 : _b.toString()) !== null && _c !== void 0 ? _c : '#' })), instance.formContent).toString();
    }
    /**
     * Конструктор класса.
     * @param {Record<string, string>} template Объект, содержащий данные в формате ключ-значение.
     * @return {void} Возвращает экземпляр объекта.
     */
    constructor(template = {}) {
        _HexletCode_instances.add(this);
        this.template = template;
        /**
         * Переменная, представляющая содержание формы в виде строки.
         * Может использоваться для хранения и обработки данных, введенных пользователем в форме.
         * Изначально инициализируется пустой строкой.
         * Подлежит обновлению в процессе работы приложения.
         */
        this.formContent = '';
    }
    /**
     * Добавляет строку ввода в строку разметки с указанными атрибутами и значением.
     * @param {string} name Имя поля, для которого генерируется элемент ввода.
     * @param {IHexletCodeCfg} [cfg={}] Конфигурация атрибутов для создаваемого элемента ввода. Может включать свойства as для задания типа тега и дополнительные атрибуты.
     * @return {void}
     */
    input(name, cfg = {}) {
        var _a, _b, _c;
        const value = __classPrivateFieldGet(this, _HexletCode_instances, "m", _HexletCode_getControlValue).call(this, name);
        const tagName = (_a = cfg.as) !== null && _a !== void 0 ? _a : 'input';
        const { as } = cfg, restAttributes = __rest(cfg, ["as"]);
        const getLabelAttributes = (_b = HexletCode.tagAttributesMap.get('label')) !== null && _b !== void 0 ? _b : (() => ({}));
        const labelString = new Tag('label', filterObj(getLabelAttributes({ labelFor: name })), capitalize(name)).toString();
        const getControlAttributes = (_c = HexletCode.tagAttributesMap.get(tagName)) !== null && _c !== void 0 ? _c : (() => ({}));
        const inputString = new Tag(tagName, filterObj(Object.assign(Object.assign({}, getControlAttributes({ name, value })), restAttributes)), value).toString();
        this.formContent += `${labelString}${inputString}`;
    }
    /**
     * Добавляет элемент input с типом submit в содержимое формы.
     * @param {string} [value] Строковое значение, которое будет использоваться как текст кнопки submit. Если не указано, по умолчанию используется 'Save'.
     * @return {void}
     */
    submit(value) {
        var _a;
        const getSubmitInputAttributes = (_a = HexletCode.tagAttributesMap.get('inputSubmit')) !== null && _a !== void 0 ? _a : (() => ({}));
        const submitInputString = new Tag('input', filterObj(getSubmitInputAttributes({ value: value !== null && value !== void 0 ? value : 'Save' })), '').toString();
        this.formContent += `${submitInputString}`;
    }
}
_HexletCode_instances = new WeakSet(), _HexletCode_getControlValue = function _HexletCode_getControlValue(name) {
    var _a;
    if (!(name in this.template)) {
        throw new Error(`Field '${name}' does not exist in the template.`);
    }
    return (_a = this.template[name]) !== null && _a !== void 0 ? _a : '';
};
HexletCode.tagAttributesMap = new Map([
    ['input', ({ name, value } = {}) => ({ name, type: 'text', value })],
    ['inputSubmit', ({ value } = {}) => ({ type: 'submit', value })],
    ['textarea', ({ name } = {}) => ({ cols: 20, rows: 40, name })],
    ['form', ({ action } = {}) => ({ method: 'post', action })],
    ['label', ({ labelFor } = {}) => ({ for: labelFor })],
]);
export default HexletCode;
