# PP2-CG
Projeto feito para a disciplina de Processamento Gráfico - 2022/01. <br/>

Participantes do grupo: <br/>
Felipe Bertoni Salvati - RA 792177 <br/>
Fernando Favareto Abromovick - RA 792178 <br/>
Vinícius Carvalho Venturini - RA 793250 <br/>

## Especificações do projeto:

O projeto contém a implementação do conteúdo que foi aprendido em aula. Após a declaração e criação do <i>vertex shader</i> e do <i>fragment shader</i>, criamos os buffers dos vértices e índices de cada objeto, juntamente com seus atributos (cores). Depois, criamos as matrizes do mundo, visão e projeção, e por fim chamamos um loop de renderização dos objetos.

## Principais características implementadas:

No programa, é possível interagir com objetos no mundo individualmente, podendo os transladar, rotacionar e mudar sua escala. Para isso, foram utilizadas algumas funções da biblioteca *glMatrix*, além de algumas funções que foram implementadas pelos desenvolvedores. Assim, por meio da multiplicação de todos os pontos do objeto por uma matriz de transformação, é possível transformar o objeto no mundo.

## Modo de interação:

Em nosso programa, temos 3 objetos disponibilizados para interação no mundo, mas como temos um número limitado de inputs intuitivos no teclado, fizemos com que o usuário apenas possa interagir com um objeto por vez, alternando o objeto que está sendo usado ao **pressionar a tecla Enter**. <br/>

Para interagir com os objetos, temos os seguintes comandos: <br/>

**W : movimenta o objeto para cima** <br/>
**A : movimenta o objeto para a esquerda** <br/>
**S : movimenta o objeto para baixo** <br/>
**D : movimenta o objeto para a direita** <br/>

**E : aproxima o objeto da tela** <br/>
**Q : afasta o objeto da tela** <br/>

Além disso, ao usar o *numpad* (ou os números do teclado), podemos rotacionar o objeto desejado:

**1 : a** <br/>
**2 : rotaciona o objeto para baixo, no eixo Z** <br/>
**3 : a** <br/>
**4 : rotaciona o objeto para a esquerda, no eixo Y** <br/>
**5 : a** <br/>
**6 : rotaciona o objeto para a direita, no eixo Y** <br/>
**7 : a** <br/>
**8 : rotaciona o objeto para cima, no eixo Z** <br/>
**9 : a** <br/>
