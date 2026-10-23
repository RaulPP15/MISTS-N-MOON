(() => {
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const $ = id => document.getElementById(id);
  const getCatalog = () => typeof getCardCatalog === 'function' ? getCardCatalog() : [];
  const getDecks = () => typeof getSavedDecks === 'function' ? getSavedDecks() : {p1:[],p2:[]};
  const save = decks => typeof saveDecks === 'function' && saveDecks(decks);
  let current = 'p1';
  function renderEditor(catalog, decks) {
    const counts = {};
    decks[current].forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    const editor = $('deckEditor');
    if (!editor) return;
    editor.innerHTML = `<div class="deck-total ${decks[current].length === 30 ? 'valid' : ''}">Total: <strong>${decks[current].length}/30</strong></div><div class="deck-list">${catalog.map(card => `<div class="deck-row"><span>${esc(card.nome)}</span><span class="count-controls"><button type="button" class="small-button deck-minus" data-id="${esc(card.id)}">−</button><strong>${counts[card.id] || 0}</strong><button type="button" class="small-button deck-plus" data-id="${esc(card.id)}">+</button></span></div>`).join('')}</div><button type="button" class="primary-button" id="saveDeckButton" ${decks[current].length === 30 ? '' : 'disabled'}>Salvar deck do ${current === 'p1' ? 'Jogador 1' : 'Jogador 2'}</button>`;
    editor.querySelectorAll('[data-id]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.id;
      if (button.classList.contains('deck-plus')) { if (decks[current].length >= 30) return window.MistsMoon.toast('O deck já possui 30 cartas.'); decks[current].push(id); }
      else { const index = decks[current].lastIndexOf(id); if (index >= 0) decks[current].splice(index, 1); }
      renderEditor(catalog, decks);
    }));
    $('saveDeckButton')?.addEventListener('click', () => { save(decks); window.MistsMoon.toast('Deck salvo para a próxima partida.'); });
  }
  function open() {
    const catalog = getCatalog();
    const decks = getDecks();
    window.MistsMoon.openModal(`<h2>Menu de cartas e decks</h2><p class="muted">Cada deck precisa conter exatamente 30 Animais. Guardião e Magias ficam fora da contagem.</p><div class="deck-tabs"><button type="button" class="secondary-button deck-tab active" data-deck="p1">Deck do Jogador 1</button><button type="button" class="secondary-button deck-tab" data-deck="p2">Deck do Jogador 2</button></div><div id="deckEditor"></div><hr><h3>Catálogo de Animais</h3><div class="catalog-grid">${catalog.map(card => `<article class="catalog-item"><div class="mini-art" style="background:${ART[card.art || 'shadow']}"></div><div><b>${esc(card.nome)}</b><small>${esc(card.escola)} · custo ${card.custoSombra}</small></div>${String(card.id).startsWith('custom-') ? `<button type="button" class="danger-button remove-card" data-id="${esc(card.id)}">Remover</button>` : ''}</article>`).join('')}</div><p class="muted">Cartas padrão não podem ser removidas.</p>`);
    current = 'p1'; renderEditor(catalog, decks);
    document.querySelectorAll('.deck-tab').forEach(tab => tab.addEventListener('click', () => { current = tab.dataset.deck; document.querySelectorAll('.deck-tab').forEach(item => item.classList.toggle('active', item === tab)); renderEditor(catalog, decks); }));
    document.querySelectorAll('.remove-card').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.id;
      const custom = getCustomCards().filter(card => card.id !== id);
      localStorage.setItem('mists-custom-cards', JSON.stringify(custom));
      decks.p1 = decks.p1.filter(cardId => cardId !== id); decks.p2 = decks.p2.filter(cardId => cardId !== id); save(decks);
      window.MistsMoon.toast('Carta removida. Recarregue o menu para atualizar o catálogo.');
      open();
    }));
  }
  window.DeckBuilder = { open };
})();
