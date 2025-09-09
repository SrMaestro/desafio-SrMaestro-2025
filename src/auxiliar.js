import { AbrigoAnimais } from "./abrigo-animais.js";

const instancia = new AbrigoAnimais();

let x = instancia.encontraPessoas(
    "bola, carrinho",
    "boneca, peteca",
    "cachorro, gato"
);

console.log(x);
