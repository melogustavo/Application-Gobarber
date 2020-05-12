interface ITemplateVariables {
  [key: string]: string | number;
}

// Essa variables esta com essa tipagem dessa forma porque assim vc consegue receber ela como um objeto e ter quantas propriedades quiser;
export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
