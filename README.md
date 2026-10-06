# Cantinho VIP · Gelise Beck Ferreira

Website estático de **THEUSMKT/SITE-GELISE**, criado a partir do pacote fornecido pela cliente. HTML semântico, CSS e JavaScript modular, sem framework, servidor de aplicação, dependências de produção ou rastreadores. Hospedagem exclusivamente pelo GitHub Pages.

## Desenvolvimento

Use o checkout existente em `/workspace/SITE-GELISE`; cada tarefa na nuvem já é isolada, portanto não é necessário criar outro worktree.

```bash
cd /workspace/SITE-GELISE
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra o site pelo servidor HTTP disponível no seu ambiente de desenvolvimento. Módulos JavaScript exigem HTTP; não abra `index.html` diretamente com `file://`.

Para gerar o artefato de publicação:

```bash
python3 scripts/build.py
```

O diretório ignorado `.site-build/` inclui somente `index.html`, `.nojekyll`, favicon, imagens otimizadas, fontes com licenças, CSS e JS. Briefing, testes, scripts e imagens originais ficam fora da publicação. O build é repetível e não altera os arquivos fonte. Python 3.10+ é suficiente. Node não é necessário para desenvolver ou hospedar o site.

Resultados dos testes e estado verificado da publicação: [docs/validation.md](docs/validation.md).

## GitHub Pages

1. Envie os arquivos para a branch `main` do repositório.
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. A workflow `.github/workflows/pages.yml` executa em pushes para `main` ou manualmente em **Actions**. Ela monta `.site-build/` e publica com as ações oficiais de Pages. Versões principais verificadas durante a implementação: checkout v6, configure-pages v5, upload-pages-artifact v4 e deploy-pages v4, fixadas por SHA.
4. Espere a conclusão do job `deploy` e confirme a URL retornada por ele. Endereço padrão esperado: `https://theusmkt.github.io/SITE-GELISE/`. A existência da workflow não confirma um deploy concluído.

Todos os caminhos são relativos para funcionar no subdiretório `/SITE-GELISE/`. Não há CNAME nem rotas que dependam de redirecionamento. A workflow usa o endereço retornado por `configure-pages` para inserir canonical, `og:url`, imagem absoluta de compartilhamento e URL no JSON-LD **somente no artefato**. Uma geração local sem `--site-url` não afirma um endereço publicado.

## Conteúdo e identidade

- Dados de contato, nomes para as mensagens de serviços/cursos, categorias e portfólio: `assets/js/config.js`.
- Textos editoriais, catálogo semântico e metadados: `index.html`. Ao alterar fatos, mantenha também os links de fallback sem JS e o JSON-LD sincronizados.
- Paleta, tipografia, composição responsiva e tokens de movimento: `assets/css/style.css`.
- Fontes locais: Cormorant Garamond (normal e itálico) e Manrope variável, pacotes Fontsource 5.3.0, sob SIL Open Font License. Licenças em `assets/fonts/`.
- As três imagens originais estão preservadas, sem alteração, em `assets/originals/`. Os derivados WebP preservam o enquadramento completo dos retratos. A logo é um recorte quadrado `(191, 115, 979, 903)` do PNG original, enquadrando o emblema circular inteiro, sem redesenho e sem fingir transparência. Favicon e ícone Apple usam o mesmo recorte.
- Briefing original: `docs/briefing.md`.

Os dois fluxos de conversão são atendimentos e cursos. WhatsApp usa mensagens contextualizadas e `encodeURIComponent`. Endereço abre uma busca no Google Maps, sem coordenadas presumidas. Não há preços, horários, depoimentos, certificações, resultados ou redes sociais inventados.

O conteúdo permanece legível sem JavaScript. Serviços usam `details/summary` nativos; nesse modo, todos os painéis de cursos são exibidos. O JS aprimora o menu com foco e Escape, anima os serviços, ativa abas de cursos com setas/Home/End, adiciona revelações variadas e respeita `prefers-reduced-motion`.

## Ativar trabalhos reais

O portfólio e a âncora **Trabalhos** ficam completamente ocultos quando `site.portfolio` está vazio. Retratos da Gelise não são resultados de serviços.

Após receber fotos reais e autorizadas, adicione imagens otimizadas em `assets/images/` e registros em `site.portfolio`:

```js
{
  image: 'assets/images/nome-da-foto-real.webp',
  alt: 'Descrição objetiva da imagem real',
  category: 'Unhas',
  caption: 'Legenda factual do trabalho',
  width: 800, // dimensões reais do arquivo
  height: 1000,
}
```

Categorias: `Cabelos`, `Unhas`, `Olhar`, `Maquiagens e penteados`. A seção é ativada automaticamente, com filtros, lightbox, botões anterior/próximo, setas, Escape, foco contido e devolvido ao botão que abriu a imagem. Antes/depois requer fotos reais em pares e consentimento; não há comparador implementado sem esse conteúdo.

## Validação

`tests/site.cjs` verifica o **artefato servido sob `/SITE-GELISE/`** em Chromium: responsividade, imagens e caminhos, erros de console, menu e foco, acordeões, cinco cursos, mensagens de WhatsApp, mapa, movimento reduzido, falha de JavaScript e galeria futura usando fixtures apenas no navegador do teste. Capturas e relatório ficam no diretório ignorado `test-results/`.

No ambiente Codex, Playwright e Chromium já estão disponíveis:

```bash
python3 scripts/build.py
node tests/site.cjs
```

Em outro ambiente, instale Playwright fora do projeto ou disponibilize-o via `NODE_PATH`, instale Chromium e defina `CHROMIUM_PATH` se necessário. `@axe-core/playwright` é opcional para a auditoria automatizada de acessibilidade; o relatório distingue sua execução de ausência. O teste inicia e encerra seu próprio servidor e navegador.

## Conteúdo que pode ser ampliado

Fotos autorizadas de resultados, detalhes confirmados do Dia de Princesa, informações adicionais de cursos, horários e redes sociais podem ser acrescentados quando fornecidos pela cliente. Esses pontos não aparecem como avisos ou placeholders no site público.
