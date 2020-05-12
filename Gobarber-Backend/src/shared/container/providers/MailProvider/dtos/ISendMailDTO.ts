import IPaeseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDto {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IPaeseMailTemplateDTO;
}
