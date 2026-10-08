# Validação — reconstrução "Cantinho Vip" (outubro de 2026)

Verificações feitas no ambiente de desenvolvimento, sobre o artefato `.site-build/` servido em `/SITE-GELISE/` no Chromium (Playwright).

## Correções de fotos (7 de outubro)

- Hero: os selos não cobrem mais o rosto. No celular e no tablet ficam numa fileira abaixo da foto; no desktop, na borda esquerda e na base. O teste calcula a área do rosto já renderizada (`object-fit`/`object-position`) e confirma que nenhum selo a toca em 375, 390, 768, 1024 e 1280 px. Essa checagem falha na versão anterior.
- Sobre: a foto passou a ser `assets/gelise-sobre.(jpg|webp)`, recortada da referência enviada pela cliente (`assets/originals/gelise-sobre-referencia.png`, área interna da moldura dourada, 670 × 1184). É exibida inteira, sem zoom, numa moldura retangular com uma luz dourada que percorre a borda (só `transform`; parada com movimento reduzido).

## `tests/site.cjs`: 11 grupos aprovados

- Título, `lang="pt-BR"`, uma única H1, `theme-color` `#2B0B25`, 12 cards de serviço, galeria oculta (lista vazia), cursos visíveis, contato só com endereço e WhatsApp, nenhum caminho absoluto, nenhum erro ou aviso de console.
- Sem rolagem horizontal e sem imagens quebradas em 375, 768 e 1280 px.
- Clicar num card de serviço marca o serviço na etapa 2, atualiza o resumo e rola até o formulário.
- Formulário completo: erros amigáveis por etapa, saudação pelo nome, "Outro" com texto obrigatório, dica e data obrigatória para eventos, revisão com "Editar", `<a target="_blank">` com `href` atualizado ao vivo, tela "Quase lá" com botão de reabrir e "Fazer um novo pedido".
- Mensagem do WhatsApp decodificada e comparada **caractere por caractere** com o modelo (acentos, emojis, `*negrito*`, `&`).
- Fora de eventos a data é opcional ("A combinar") e "Observações" some quando vazia.
- Menu mobile: `aria-expanded`, Escape e fechamento ao navegar.
- Intro só na 1ª visita, removida em ~1,2 s.
- `prefers-reduced-motion`: sem intro, partículas e marquee; conteúdo visível.
- Sem JavaScript: o hero continua visível e há alternativa de contato (`noscript`).

Também houve revisão visual por capturas em 375, 390, 768 e 1280 px, incluindo as etapas 2, 4 e 5 do formulário.

## Não verificado aqui

- Lighthouse/Core Web Vitals não foram medidos.
- O link `wa.me` foi verificado como URL; ele não foi aberto num celular com WhatsApp.
- Google Fonts foi carregado nas capturas, mas nos testes automatizados ele é substituído por CSS vazio (rede externa), então os testes usam as fontes de fallback.

## Estado da publicação

O site é publicado pelo GitHub Pages em **https://ocantinhovip.com.br/** (domínio próprio; o endereço `https://theusmkt.github.io/SITE-GELISE/` passa a redirecionar para ele depois que o domínio é salvo em Settings → Pages). URLs de Open Graph, Twitter Card e JSON-LD apontam para o domínio próprio.
