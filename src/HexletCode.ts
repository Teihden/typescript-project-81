import Tag from "./Tag";
import { IAttributes, IHexletCodeCb, IHexletCodeCfg } from "../globals";

/**
 * Класс HexletCode предоставляет функциональность для создания HTML-форм на основе шаблона данных.
 */
class HexletCode {
  /**
   * Переменная, предназначенная для хранения строки ввода.
   * Ожидается, что значение будет строкового типа.
   * Используется для обработки или передачи текстовых данных.
   */
  private inputString = "";

  /**
   * Карта атрибутов тегов.
   * Хранит соответствие между именами HTML-тегов и их атрибутами по умолчанию.
   * Ключом карты является строка с именем тега.
   * Значение карты — объект, где ключи представляют имена атрибутов, а значения - их значения по умолчанию.
   */
  static readonly tagAttributesMap = new Map([
    [ "input", { type: "text" } ],
    [ "textarea", { cols: 20, rows: 40 } ],
    [ "form", { action: "#", method: "post" } ],
  ]);

  /**
   * Создает строку HTML формы на основе переданного шаблона и атрибутов.
   * @param {Record<string, string>} template Шаблон полей ввода формы.
   * @param {IAttributes} [attributes={}] Атрибуты формы, такие как URL-адрес и другие параметры.
   * @param {IHexletCodeCb} [cb=() => {}] Обратный вызов, вызываемый с экземпляром `HexletCode`.
   * @return {string} Строка HTML формы.
   */
  static formFor(
    template: Record<string, string>,
    attributes: IAttributes = {},
    cb: IHexletCodeCb = () => {
    },
  ): string {
    const instance = new HexletCode(template);

    if (cb && typeof cb === "function") {
      cb(instance);
    }

    const tagDefaultAttributes = HexletCode.tagAttributesMap.get("form") ?? {};
    const actionAttribute = attributes.url ? { action: attributes.url } : {};
    const formAttributes = {
      ...tagDefaultAttributes,
      ...actionAttribute,
    };
    const filterAttributes = Object.fromEntries(
      Object.entries(formAttributes).filter(([ _, value ]) => value !== undefined),
    );

    return new Tag("form", filterAttributes, instance.inputString).toString();
  }

  /**
   * Конструктор класса.
   * @param {Record<string, string>} template Объект, содержащий данные в формате ключ-значение.
   * @return {void} Возвращает экземпляр объекта.
   */
  constructor(
    public template: Record<string, string>,
  ) {
  }

  /**
   * Возвращает значение поля по заданному имени из шаблона.
   * @param name Имя поля, значение которого требуется получить.
   * @return Значение указанного поля из шаблона. Если значение поля не задано, возвращается пустая строка.
   * @throws Ошибка, если указанное поле отсутствует в шаблоне.
   */
  #getFieldValue(name: string): string {
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
    const fieldValue = this.#getFieldValue(name);
    const tagName = cfg.as ?? "input";
    const valueAttribute = tagName === "input" ? { value: fieldValue } : {};
    const tagDefaultAttributes = HexletCode.tagAttributesMap.get(tagName) ?? {};
    const { as, ...restAttributes } = cfg;

    const attributes = {
      name,
      ...tagDefaultAttributes,
      ...valueAttribute,
      ...restAttributes,
    };
    const filterAttributes = Object.fromEntries(
      Object.entries(attributes).filter(([ _, value ]) => value !== undefined),
    );

    this.inputString += new Tag(tagName, filterAttributes, fieldValue).toString();
  }
}

export default HexletCode;
