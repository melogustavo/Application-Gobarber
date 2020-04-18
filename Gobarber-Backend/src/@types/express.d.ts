declare namespace Express {
  // vc esta adicionando ao request a informacao de user que tem o campo id como string
  export interface Request {
    user: {
      id: string;
    };
  }
}
