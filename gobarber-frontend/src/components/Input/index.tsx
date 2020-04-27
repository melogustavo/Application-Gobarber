import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

// Vc define a interface de input props extendendo tudo que ja vem por padrao no InputHTMLAttributes... ai vc passa o parametro de tipagem HTMLInputElement que eh global e vc nao precisa importar
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // O name ja tem so que ele eh opcional, ai vc sobrescreve ele dizendo que eh obrigatorio
  name: string;
  // Quando vc quer receber um componente como uma propriedade vc pode passar essa tipagem ai abaixo
  icon: React.ComponentType<IconBaseProps>;
}

// Passando o InputProps como parametro para o componente Input
const Input: React.FC<InputProps> = ({ icon: Icon, ...rest }) => (
  <Container>
    {Icon && <Icon size={20} />}
    <input {...rest} />
  </Container>
);

export default Input;
