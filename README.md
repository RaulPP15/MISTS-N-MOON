# Mists'n'Moon

Jogo de cartas digital local para dois jogadores, desenvolvido apenas com HTML5, CSS3 e JavaScript vanilla.

## Executar
Abra `index.html` diretamente no navegador ou use qualquer servidor estático local. Não há dependências nem etapa de build.

## Controles
- Clique em um Animal na mão para invocá-lo.
- Clique em um Animal no campo e depois em um Animal adversário para atacar.
- Use as quatro Magias na lateral quando tiver Sombra e um Animal da mesma escola em campo.
- `Oferta às Sombras` descarta a primeira carta da mão e concede +1 Sombra.
- `Passar turno` alterna o jogador e realiza recuperação/compra.
- `Ctrl + Shift + D` abre o Dev Card Creator.

## Arquivos
- `index.html`: estrutura semântica da mesa e modais.
- `style.css`: tema lunar, cartas, mesa responsiva e componentes.
- `cards.js`: cartas iniciais e suporte a cartas customizadas.
- `game.js`: estado, regras, turnos, combate, recursos e renderização.
- `dev-panel.js`: criação, preview, exportação e armazenamento temporário de cartas.

As cartas salvas pelo painel ficam em `localStorage` e passam a integrar novos decks após reiniciar a partida.
