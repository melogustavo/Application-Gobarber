import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

// Vc define a interface de input props extendendo tudo que ja vem por padrao no InputHTMLAttributes... ai vc passa o parametro de tipagem HTMLInputElement que eh global e vc nao precisa importar
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // O name ja tem so que ele eh opcional, ai vc sobrescreve ele dizendo que eh obrigatorio
  name: string;
  // Quando vc quer receber um componente como uma propriedade vc pode passar essa tipagem ai abaixo
  icon: React.ComponentType<IconBaseProps>;
}

// Passando o InputProps como parametro para o componente Input
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  // Para o envio de formulario
  useEffect(() => {
    registerField({
      name: fieldName,
      // Retorna a referencia daquele input para que vc consiga acessar atraves do path
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      {Icon && <Icon size={20} />}
      {/* default value seria pra quando vc quiser ja iniciar com algum valor setado */}
      <input defaultValue={defaultValue} ref={inputRef} {...rest} />
    </Container>
  );
};
export default Input;
