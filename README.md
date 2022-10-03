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

Para acessar o programa, basta seguir o link https://kyleflick124.github.io/PP2-CG/ <br/>

Em nosso programa, temos 3 objetos disponibilizados para interação no mundo, mas como temos um número limitado de inputs intuitivos no teclado, fizemos com que o usuário apenas possa interagir com um objeto por vez, alternando o objeto que está sendo usado ao **pressionar a tecla Enter**. <br/>

Para interagir com os objetos, temos os seguintes comandos: <br/>

**W : movimenta o objeto para cima** <br/>
**A : movimenta o objeto para a esquerda** <br/>
**S : movimenta o objeto para baixo** <br/>
**D : movimenta o objeto para a direita** <br/>

**E/+ : aproxima o objeto da tela** <br/>
**Q/- : afasta o objeto da tela** <br/>

Além disso, ao usar o *numpad* (ou os números do teclado), podemos rotacionar o objeto desejado: <br/>
![numpad2](https://user-images.githubusercontent.com/63080035/193506499-8236070e-f2bb-4fe1-acbe-959449a16a7e.png)

**1 : rotaciona o objeto para baixo e para a esquerda** <br/>
**2 : rotaciona o objeto para baixo, apenas no eixo Z** <br/>
**3 : rotaciona o objeto para baixo e para a direita** <br/>
**4 : rotaciona o objeto para a esquerda, apenas no eixo Y** <br/>
**6 : rotaciona o objeto para a direita, apenas no eixo Y** <br/>
**7 : rotaciona o objeto para cima e para a esquerda** <br/>
**8 : rotaciona o objeto para cima, apenas no eixo Z** <br/>
**9 : rotaciona o objeto para cima e para a direita** <br/>

**Enter : troca o objeto sendo manipulado. <br/> Opções disponíveis: Cubo, Pirâmide, Icosaedro** <br/>

## Erros conhecidos e problemas de implementação:

Tivemos alguns erros e problemas ao renderizar todos os objetos de uma vez na cena. Tentamos seguir alguns tutoriais para renderizar mais de um objeto por vez na cena, mas sempre que tentávamos fazer isso o programa dava erro de espaço insuficiente no buffer, então renderizamos apenas um objeto por vez. No entanto, caso isso fosse solucionado, poderíamos sim interagir com cada objeto individualmente na cena, pois as transformações que fazemos nos objetos mexem apenas nos vértices de um objeto por vez. Mesmo assim, ainda é possível testar as transformações em cada objeto individual, alternando-os com a tecla **Enter**.
