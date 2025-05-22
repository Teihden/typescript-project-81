import Tag from "./Tag";
import { IAttributes, IHexletCodeCb, IHexletCodeCfg } from "../globals";
import { capitalize } from "es-toolkit";
import filterObj from "./helpers";

/**
 * Класс HexletCode предоставляет функциональность для создания HTML-форм на основе шаблона данных.
 */
export default class HexletCode {
  /**
   * Переменная, представляющая содержание формы в виде строки.
   * Может использоваться для хранения и обработки данных, введенных пользователем в форме.
   * Изначально инициализируется пустой строкой.
   * Подлежит обновлению в процессе работы приложения.
   */
  private formContent = "";

  static readonly tagAttributesMap = new Map([
    [ "input", ({ name, value }: IAttributes = {}): IAttributes => ({ name, type: "text", value }) ],
    [ "inputSubmit", ({ value }: IAttributes = {}): IAttributes => ({ type: "submit", value }) ],
    [ "textarea", ({ name }: IAttributes = {}): IAttributes => ({ cols: 20, rows: 40, name }) ],
    [ "form", ({ action }: IAttributes = {}): IAttributes => ({ method: "post", action }) ],
    [ "label", ({ labelFor }: IAttributes = {}): IAttributes => ({ for: labelFor }) ],
  ]);

  /**
   * Создает строку HTML формы на основе переданного шаблона и атрибутов.
   * @param {Record<string, string>} template Шаблон полей ввода формы.
   * @param {IAttributes} [attributes={}] Атрибуты формы, такие как URL-адрес и другие параметры.
   * @param {IHexletCodeCb} [cb=() => {}] Обратный вызов, вызываемый с экземпляром `HexletCode`.
   * @return {string} Строка HTML формы.
   */
  static formFor(
    template: Record<string, string> = {},
    attributes: IAttributes = {},
    cb: IHexletCodeCb = () => {
    },
  ): string {
    const instance = new HexletCode(template);

    if (cb && typeof cb === "function") {
      cb(instance);
    }

    const getFormAttributes = HexletCode.tagAttributesMap.get("form") ?? (() => ({}));
    return new Tag("form", filterObj(getFormAttributes({ action: attributes.url?.toString() ?? "#" })), instance.formContent).toString();
  }

  /**
   * Конструктор класса.
   * @param {Record<string, string>} template Объект, содержащий данные в формате ключ-значение.
   * @return {void} Возвращает экземпляр объекта.
   */
  constructor(
    public template: Record<string, string> = {},
  ) {
  }

  /**
   * Возвращает значение поля по заданному имени из шаблона.
   * @param name Имя поля, значение которого требуется получить.
   * @return Значение указанного поля из шаблона. Если значение поля не задано, возвращается пустая строка.
   * @throws Ошибка, если указанное поле отсутствует в шаблоне.
   */
  #getControlValue(name: string): string {
    if (!(name in this.template)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    return this.template[name] ?? "";
  }

  /**
   * Добавляет строку ввода в строку разметки с указанными атрибутами и значением.
   * @param {string} name Имя поля, для которого генерируется элемент ввода.
   * @param {IHexletCodeCfg} [cfg={}] Конфигурация атрибутов для создаваемого элемента ввода. Может включать свойства as для задания типа тега и дополнительные атрибуты.
   * @return {void}
   */
  input(
    name: string,
    cfg: IHexletCodeCfg = {},
  ): void {
    const value = this.#getControlValue(name);
    const tagName = cfg.as ?? "input";
    const { as, ...restAttributes } = cfg;

    const getLabelAttributes = HexletCode.tagAttributesMap.get("label") ?? (() => ({}));
    const labelString = new Tag("label", filterObj(getLabelAttributes({ labelFor: name })), capitalize(name)).toString();

    const getControlAttributes = HexletCode.tagAttributesMap.get(tagName) ?? (() => ({}));
    const inputString = new Tag(tagName, filterObj({ ...getControlAttributes({ name, value }), ...restAttributes }), value).toString();

    this.formContent += `${labelString}${inputString}`;
  }

  /**
   * Добавляет элемент input с типом submit в содержимое формы.
   * @param {string} [value] Строковое значение, которое будет использоваться как текст кнопки submit. Если не указано, по умолчанию используется "Save".
   * @return {void}
   */
  submit(value?: string): void {
    const getSubmitInputAttributes = HexletCode.tagAttributesMap.get("inputSubmit") ?? (() => ({}));
    const submitInputString = new Tag("input", filterObj(getSubmitInputAttributes({ value: value ?? "Save" })), "").toString();

    this.formContent += `${submitInputString}`;
  }
}
