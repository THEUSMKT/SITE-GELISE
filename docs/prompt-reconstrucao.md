# PROMPT — Reconstrução completa do site "Cantinho Vip · Estética e Beleza" (Gelise)

## 0. Missão

Você é um designer e desenvolvedor front-end sênior, especialista em landing pages de alta conversão para o setor de beleza.

Reconstrua **do zero e por completo** o site da **Gelise** (aparece como **"Gê Ferreira"** nos uniformes), profissional de unhas, cílios e estética, dona do **Cantinho Vip — Estética e Beleza**.

O site atual está publicado em `https://theusmkt.github.io/SITE-GELISE/` (GitHub Pages). **Não aproveite o layout nem a estrutura atuais.** Quero uma estrutura nova, um visual de luxo e um **formulário de agendamento em etapas** que termina enviando tudo preenchido para o WhatsApp da Gelise.

O site precisa:
1. Fazer sentido com o nome **"Cantinho Vip"**: a cliente deve sentir que entrou num cantinho exclusivo, aconchegante e sofisticado, onde ela é tratada como VIP.
2. Usar **exatamente as cores e o clima da logo** (vinho/ameixa escuro + dourado metálico).
3. Ser **muito bonito**, com animações e efeitos visuais, sem ficar pesado.
4. Ser **fácil de entender** em 5 segundos: o que a Gelise faz, e como agendar.
5. Converter: o objetivo único é a pessoa **preencher o formulário e cair no WhatsApp da Gelise**.

---

## 1. Antes de escrever código (obrigatório)

1. Liste os arquivos do projeto e leia o site atual (HTML, CSS, JS, imagens).
2. **Aproveite do site atual somente o conteúdo real**: textos verdadeiros, lista de serviços, número de WhatsApp, Instagram, endereço, imagens. Descarte layout, estilos e estrutura.
3. Procure no código atual qualquer link `wa.me`, `api.whatsapp.com` ou telefone. Se achar, use esse número como `WHATSAPP_NUMBER`. Se não achar, deixe o placeholder descrito na seção 7 e me avise no final.
4. Localize as imagens do projeto. Devem existir (ou eu vou colocar) em `assets/`:
   - `logo.png` — logo circular (descrição na seção 2)
   - `gelise-unhas.jpg` — Gelise de jaleco branco bordado "Nail Designer · Especialista em unhas", cabelo vermelho, segurando a caneta/motor de unhas rosa, com parede de esmaltes ao fundo
   - `gelise-cilios.jpg` — Gelise de jaleco preto com detalhes dourados e a marca "CV Cantinho Vip · Gê Ferreira", segurando pinças de cílios, unhas vinho
   Se os arquivos tiverem outros nomes, identifique-os, renomeie e organize em `assets/`.
5. Responda em 5 a 8 linhas com o plano e comece a construir. Não espere aprovação.

---

## 2. Identidade visual (extraída da logo)

**A logo:** círculo vinho-ameixa profundo com um perfil feminino de cabelo esvoaçante desenhado em linha dourada metálica, dentro de um anel dourado, uma flor (tipo plumeria/frangipani) no cabelo, brilhos em estrela (✦) e uma linha de luz dourada embaixo. Texto **"Cantinho Vip"** em serifa elegante dourada com brilho, "Estética e Beleza" menor, separado por um divisor com ornamento em losango.

**Paleta (defina como variáveis CSS em `:root`):**
```
--plum-950: #14040F;   /* fundo mais profundo */
--plum-900: #1E0719;
--plum-800: #2B0B25;   /* fundo principal (cor da logo) */
--plum-700: #3F1236;
--wine-600: #6B1A45;   /* vinho de destaque */
--wine-500: #8E1B3A;   /* vermelho-vinho (cor do cabelo/unhas da Gelise) */
--gold-100: #FBEFC8;
--gold-300: #F3D98B;
--gold-500: #D4AF37;   /* dourado principal */
--gold-700: #A87B22;
--cream-50: #FBF5EA;   /* seções claras (use com moderação) */
--text-on-dark: #F4E9DC;
--text-muted-on-dark: #BFA9B5;
```
**Gradiente dourado metálico** (texto, bordas, botões):
`linear-gradient(135deg, #F6E3A1 0%, #D4AF37 35%, #A87B22 60%, #F3D98B 100%)`

**Regras de cor:** predominância de ameixa escuro. Dourado é o brilho, não o fundo. Seções claras (creme) só para alternar ritmo, com texto ameixa. Nada de rosa-choque, azul, branco puro ou cinza frio.

**Tipografia (Google Fonts):**
- Títulos: **Cormorant Garamond** (600/700), serifa de alto contraste, parecida com a da logo. Alternativa: Playfair Display.
- Corpo e UI: **Montserrat** (400/500/600).
- Detalhe manuscrito pontual (frase "Sonhe, Acredite, Conquiste"): **Great Vibes** ou **Allura**.
- Títulos de seção com texto em gradiente dourado + leve brilho. Subtítulos em caixa-alta com letter-spacing largo.

**Motivos gráficos para reaproveitar em todo o site:**
- o **anel dourado** da logo (círculo fino em SVG com traço animado)
- o **divisor com losango ✦** entre seções
- **brilhos em estrela** (sparkles)
- a **flor** (plumeria) em SVG como marca-d'água sutil
- molduras em **arco** para as fotos (formato de portal), com borda dourada

---

## 3. Estrutura da página (nova ordem, uma página só)

1. **Loader/intro (opcional, máx. 1,2 s, só na 1ª visita, pulável):** o anel dourado se desenha em SVG, a logo aparece com fade e brilho, tudo sobe e revela o site.
2. **Header fixo** com efeito vidro (blur) sobre ameixa: logo pequena à esquerda; links âncora (Serviços · Como funciona · Sobre · Agendar); botão dourado "Agendar". No mobile, menu hambúrguer em tela cheia com animação. O header encolhe ao rolar.
3. **Hero:** fundo ameixa com gradiente radial e partículas douradas.
   - Selo pequeno acima do título: "✦ Estética e Beleza".
   - Título (palavras revelando em sequência, com shimmer dourado): **"Seu cantinho VIP de beleza"** (pode refinar, mantendo a ideia de exclusividade e acolhimento).
   - Subtítulo: unhas, cílios e cuidados especiais com a Gelise, para o dia a dia e para os momentos que merecem brilhar.
   - Dois botões: **"Quero agendar meu horário"** (rola até o formulário) e **"Ver serviços"** (contorno dourado).
   - Lado direito/abaixo: foto da Gelise (`gelise-unhas.jpg`) em **moldura de arco** com borda dourada, anel dourado girando devagar atrás, flor decorativa e 2 ou 3 selos flutuantes (ex.: "Atendimento exclusivo", "Agende em 1 minuto", "Sonhe · Acredite · Conquiste").
   - Indicador de rolagem discreto.
4. **Faixa marquee** (letreiro lento): "Unhas ✦ Cílios ✦ Sobrancelhas ✦ Eventos ✦ Noivas ✦ Cuidado e Beleza" em dourado sobre ameixa.
5. **Serviços:** grade de cards com ícone SVG linear dourado, nome e 1 linha de descrição. **Clicar num card pré-seleciona o serviço no formulário e rola até ele.** Lista inicial sugerida (fica numa config, seção 7):
   - Manicure (mãos)
   - Pedicure (pés)
   - Mãos + Pés (combo)
   - Unhas decoradas / alongamento / nail art
   - Extensão de cílios
   - Design de sobrancelhas
   - Maquiagem
   - Outro serviço
   > Remova da lista o que a Gelise não faz, usando o que o site atual informar. Não invente serviço novo além dessa lista.
6. **Como funciona (3 passos, linha do tempo com anel dourado):** 1) Conte o que você quer · 2) Escolha o dia e a ocasião · 3) Confirme com a Gelise no WhatsApp.
7. **Sobre a Gelise:** a foto `gelise-cilios.jpg` em moldura de arco (recorte para esconder bordas/textos do material original), texto curto e acolhedor, e a frase manuscrita "Sonhe, Acredite, Conquiste". Reaproveite o texto verdadeiro do site atual; se não houver, escreva um texto genérico e honesto, **sem inventar anos de experiência, números, prêmios ou certificações**.
8. **Galeria (opcional):** carrossel/grade com as imagens listadas em `GALLERY_IMAGES` (config). **Se a lista estiver vazia, a seção inteira fica oculta.** Lightbox simples ao clicar.
9. **FORMULÁRIO DE AGENDAMENTO** (o coração do site, seção 4 abaixo).
10. **Contato e localização:** endereço, horário de atendimento e Instagram, vindos da config. **Cada item só aparece se estiver preenchido.** Botão para o Instagram e botão de WhatsApp.
11. **Rodapé:** logo, divisor ✦, "Cantinho Vip · Estética e Beleza", links rápidos, © ano atual. Mantenha o crédito discreto de criação do site somente se já existir no site atual.
12. **Botão flutuante de WhatsApp** (canto inferior direito) com pulso suave, que abre uma conversa simples (sem os dados do formulário).

> Não inclua depoimentos, avaliações, preços nem números de atendimentos a menos que existam de verdade no site atual. Deixe um bloco comentado no HTML ("depoimentos — adicionar quando houver") para uso futuro.

---

## 4. O formulário de agendamento (requisito principal)

Formato: **assistente em etapas (wizard)** dentro de um cartão ameixa com borda dourada e efeito vidro. Uma pergunta por tela, barra de progresso dourada no topo ("Etapa 2 de 5"), botões **Voltar** e **Continuar**, Enter avança, animação de slide/fade entre etapas. No desktop, mostre ao lado um **"Resumo do seu pedido"** que atualiza ao vivo conforme ela escolhe.

**Etapa 1 — Nome**
"Como posso te chamar?" — campo de texto obrigatório (mín. 2 caracteres). Depois disso, a Gelise passa a cumprimentar pelo nome nas etapas seguintes ("Prazer, Maria! ✨ O que vamos fazer?").

**Etapa 2 — O que você quer fazer?** (múltipla escolha)
Cards grandes e clicáveis com ícone e check animado, com os mesmos serviços da seção 5. É possível marcar vários (ex.: mãos + pés + cílios). Obrigatório marcar ao menos um. Se marcar "Outro serviço", aparece um campo de texto para descrever.

**Etapa 3 — Para qual ocasião?** (escolha única, em "chips")
Dia a dia / cuidado pessoal · Aniversário · Casamento · Noiva / Madrinha · Formatura · Festa / Balada · Ensaio fotográfico · Evento corporativo · Outro (abre campo de texto). Obrigatório.

**Etapa 4 — Quando?**
- Data desejada (`input type="date"`, `min` = hoje, estilizado no tema).
- Período preferido, em chips: Manhã · Tarde · Noite · Tenho flexibilidade.
- Campo opcional "Quer contar mais algum detalhe?" (textarea; ex.: referência de cor, modelo, inspiração).
- Se a ocasião for evento (casamento, formatura etc.), a data é obrigatória e aparece a dica "Eventos têm agenda mais concorrida: quanto antes, melhor ✨".

**Etapa 5 — Revisão e envio**
Cartão com tudo que ela preencheu (nome, serviços, ocasião, data, período, observações), com link "Editar" em cada item. Botão grande dourado: **"Enviar para o WhatsApp da Gelise"**, com ícone do WhatsApp e brilho animado.

**Comportamento do envio**
- Montar a mensagem com `encodeURIComponent` e abrir `https://wa.me/{WHATSAPP_NUMBER}?text={mensagem}`.
- O botão final deve ser um **`<a>` com `href` atualizado ao vivo** (não depender de `window.open` dentro de callback assíncrono, para não ser bloqueado no celular). `target="_blank"` e `rel="noopener"`.
- Ao clicar: pequena explosão de brilhos dourados, tela de agradecimento ("Quase lá, Maria! Sua solicitação foi montada. Se o WhatsApp não abriu, toque aqui.") com botão de reabrir.
- Modelo de mensagem (ajuste a formatação para ficar limpa no WhatsApp):

```
Olá, Gelise! ✨ Vim pelo site do Cantinho Vip e gostaria de agendar.

👤 *Nome:* {nome}
💅 *Serviços:* {serviços separados por vírgula}
🎉 *Ocasião:* {ocasião}
📅 *Data desejada:* {dd/mm/aaaa}
⏰ *Período:* {período}
📝 *Observações:* {texto, ou omitir a linha se vazio}

Aguardo seu retorno! 💖
```

**Validação e acessibilidade:** mensagens de erro amigáveis em português, foco automático no primeiro campo de cada etapa, `label` em todos os campos, `aria-live` na troca de etapa, navegação completa por teclado, estados de foco visíveis em dourado. Alvos de toque ≥ 44 px.

---

## 5. Animações e efeitos (use todos, com bom gosto)

- **Partículas/brilhos dourados** no hero em canvas leve (≈40 no desktop, ≈18 no mobile), pausam quando saem da tela.
- **Revelação ao rolar** (IntersectionObserver): fade + slide com *stagger* entre elementos irmãos.
- **Texto dourado com shimmer** (brilho que atravessa o título periodicamente).
- **Anel dourado** com `stroke-dashoffset` se desenhando; versão que gira devagar atrás da foto do hero.
- **Divisores ✦** que se desenham ao entrar na tela.
- **Cards de serviço:** elevação, borda dourada com brilho que **segue o mouse** (radial-gradient via CSS vars), leve inclinação 3D no desktop.
- **Botões:** varredura de brilho (shine) ao passar o mouse, efeito magnético sutil no desktop.
- **Parallax leve** na foto do hero e na flor decorativa.
- **Marquee** contínuo de serviços.
- **Formulário:** transição slide entre etapas, barra de progresso animada, check com "pop" ao selecionar, confete de brilhos no envio.
- **Header** que encolhe e ganha blur ao rolar; links com sublinhado dourado animado.
- **Respeitar `prefers-reduced-motion`:** desligar partículas, parallax, marquee e shimmer, mantendo apenas fades simples.
- Tudo a 60 fps: animar só `transform` e `opacity`, evitar sombras gigantes animadas, `will-change` com parcimônia.

---

## 6. Requisitos técnicos

- **Site estático puro**: `index.html`, `css/style.css`, `js/script.js`, `assets/`. HTML5 semântico, CSS moderno (variáveis, grid, flexbox, `clamp()` para tipografia fluida), JavaScript vanilla. **Sem frameworks e sem build.**
- **Funciona no GitHub Pages em subpasta** (`/SITE-GELISE/`): use **somente caminhos relativos** (`assets/logo.png`, nunca `/assets/...`).
- **Mobile-first.** A maior parte do tráfego vem do Instagram/anúncios no celular. Teste 375 px, 768 px e 1280 px. Sem rolagem horizontal.
- **Desempenho:** imagens com `loading="lazy"` (exceto a do hero), `width/height` definidos, `decoding="async"`; fontes com `display=swap` e `preconnect`; JS sem bibliotecas pesadas. Meta: LCP rápido e nota alta no Lighthouse.
- **SEO e compartilhamento:** `<html lang="pt-BR">`, `<title>` "Cantinho Vip | Estética e Beleza — Gelise", meta description, Open Graph e Twitter Card usando a logo, favicon gerado a partir da logo, tema do navegador (`theme-color: #2B0B25`).
- **Código limpo e comentado** nos pontos-chave, fácil de eu editar depois.

---

## 7. Configuração editável (topo do `js/script.js`)

Deixe tudo que eu possa precisar mudar num único objeto no início do arquivo:

```js
const CONFIG = {
  WHATSAPP_NUMBER: "55XXXXXXXXXXX", // DDI+DDD+número, só dígitos. SUBSTITUIR se não achar no site atual
  INSTAGRAM_URL: "",                // preencher se existir
  ADDRESS: "",                      // oculto se vazio
  OPENING_HOURS: "",                // oculto se vazio
  SERVICES: [ /* nome, descrição curta, ícone */ ],
  OCCASIONS: [ /* lista da etapa 3 */ ],
  GALLERY_IMAGES: [],               // vazio = seção oculta
};
```
Se `WHATSAPP_NUMBER` ainda for o placeholder, exiba `console.warn` e mostre um aviso discreto **apenas no console** (nunca ao visitante).

---

## 8. O que NÃO fazer

- Não manter o layout, as cores nem a estrutura do site antigo.
- Não usar template genérico, fundo branco/rosa-bebê ou cara de "site de clínica".
- Não inventar depoimentos, preços, endereço, telefone, números ou certificações.
- Não usar imagens de banco nem fotos de outras pessoas. Use só a logo e as fotos da Gelise.
- Não usar caminhos absolutos nem dependências que quebrem no GitHub Pages.
- Não dar `git push` nem publicar nada sem eu pedir. Pode fazer commit local com mensagem clara.

---

## 9. Checklist de aceite (confira cada item antes de finalizar)

- [ ] Paleta fiel à logo (ameixa + dourado metálico) e fonte serifa elegante nos títulos
- [ ] Hero impactante, com a mensagem de "cantinho VIP" clara em 5 segundos
- [ ] Todas as animações da seção 5 funcionando e fluidas, com fallback para `prefers-reduced-motion`
- [ ] Formulário em 5 etapas, com validação, resumo ao vivo e botão final como `<a>` com `href` atualizado
- [ ] Mensagem do WhatsApp chega formatada corretamente, com acentos e emojis (teste o link gerado)
- [ ] Clicar num card de serviço pré-seleciona no formulário
- [ ] Seções opcionais (galeria, endereço, Instagram) somem quando vazias
- [ ] Sem rolagem horizontal em 375 px; botões e campos fáceis de tocar
- [ ] Todos os caminhos relativos, funcionando em subpasta
- [ ] Sem erros no console

---

## 10. Entrega final

Ao terminar, responda com:
1. Resumo curto do que foi feito (máx. 8 linhas).
2. **Lista do que eu preciso preencher/verificar** (número de WhatsApp, Instagram, endereço, horário, serviços que a Gelise realmente oferece, imagens da galeria).
3. Como abrir e testar localmente.
4. Avisos sobre qualquer decisão que você tomou sem ter certeza.
