import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

export default {
  ethereal: container.resolve(EtherealMailProvider),
};

// Como aqui dentro do Ethereal vc precisa usar um constructor para instanciar (segundo a configuracao), vc precisa usar o registerInstance... ou seja em injecao de depdendencia, sempre que seu codigo for usar algo do constructor que nao esteja injected, ele vai precisar ser registerInstance ao inves do registerSingleton
container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
