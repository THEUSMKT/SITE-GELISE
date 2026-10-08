# Cantinho Vip · Estética e Beleza — Gelise

Landing page estática do **Cantinho Vip** (Gelise Beck Ferreira, "Gê Ferreira"), em Imbé/RS. O objetivo único é a cliente montar o pedido num **formulário em 5 etapas** e cair no WhatsApp da Gelise com tudo preenchido.

HTML, CSS e JavaScript puros, sem framework e sem build obrigatório. Hospedagem no GitHub Pages com domínio próprio: **https://ocantinhovip.com.br/** (o endereço antigo `https://theusmkt.github.io/SITE-GELISE/` redireciona para ele).

## Estrutura

```
index.html          página única
css/style.css       paleta (variáveis em :root), layout e animações
js/script.js        CONFIG editável no topo + toda a interação
assets/             logo, fotos (JPG + WebP), og-image, ícone Apple
assets/originals/   uploads originais intactos (não vão para o deploy)
favicon.png
scripts/build.py    monta .site-build/ para o Pages
tests/site.cjs      testes de navegador (Playwright)
docs/               briefing original e prompt da reconstrução
```

## Editar conteúdo

Tudo fica no objeto `CONFIG`, no topo de `js/script.js`:

| Campo | O que faz |
| --- | --- |
| `WHATSAPP_NUMBER` | DDI+DDD+número, só dígitos. Usado no formulário, botões e botão flutuante. |
| `INSTAGRAM_URL` | Se vazio, o Instagram não aparece. |
| `ADDRESS` | Endereço e botão "Como chegar". Se vazio, fica oculto. |
| `OPENING_HOURS` | Horário de atendimento. Se vazio, fica oculto. |
| `SERVICES` | Cards da seção Serviços **e** opções da etapa 2. Ícones disponíveis em `ICONS`. |
| `OCCASIONS` | Opções da etapa 3. `event: true` torna a data obrigatória e mostra a dica de agenda. |
| `PERIODS` | Opções de período da etapa 4. |
| `COURSES` | Cursos profissionalizantes. Lista vazia oculta a seção. |
| `GALLERY_IMAGES` | Fotos reais de trabalhos `{ src, alt, width, height }`. Lista vazia oculta a seção. |

Textos fixos (hero, sobre, como funciona) ficam em `index.html`. Há um bloco comentado para **depoimentos**, para usar só quando houver depoimentos reais.

Cores: variáveis em `:root` no início de `css/style.css`. Fontes (Google Fonts): Playfair Display (títulos), Montserrat (texto) e Great Vibes (frase manuscrita).

## Rodar localmente

```bash
python3 -m http.server 8000
# abra http://localhost:8000/
```

## Testes

```bash
python3 scripts/build.py
node tests/site.cjs        # precisa do pacote playwright (NODE_PATH) e do Chromium
```

Os testes servem o artefato em `/SITE-GELISE/` e verificam: SEO básico, caminhos relativos, ausência de rolagem horizontal (375/768/1280 px), card que pré-seleciona o serviço, todas as etapas do formulário com validação, **a mensagem exata enviada ao WhatsApp** (acentos e emojis), menu mobile, intro da 1ª visita, `prefers-reduced-motion` e página sem JavaScript. Capturas ficam em `test-results/` (ignorado pelo git).

## Publicação (GitHub Pages)

A workflow `.github/workflows/pages.yml` roda em push na `main` (ou manualmente em **Actions**), executa `scripts/build.py --site-url <url do Pages>` e publica `.site-build/`. No artefato, o build torna absolutas as URLs de canonical, Open Graph, Twitter Card e JSON-LD. Os originais em `assets/originals/` não são publicados.

Use só caminhos relativos (`assets/...`, nunca `/assets/...`). Assim o site funciona tanto na raiz do domínio próprio quanto no subdiretório `/SITE-GELISE/` do endereço `github.io` (os testes usam o subdiretório, o caso mais restritivo).

## Domínio próprio: ocantinhovip.com.br

Como o deploy é feito por GitHub Actions, **não é preciso arquivo `CNAME`** no repositório; o domínio fica salvo nas configurações do Pages.

1. **DNS no Registro.br** (domínio → DNS → Editar zona), mantendo o servidor DNS do Registro.br:

   | Nome | Tipo | Valor |
   | --- | --- | --- |
   | *(vazio, raiz)* | A | `185.199.108.153` |
   | *(vazio, raiz)* | A | `185.199.109.153` |
   | *(vazio, raiz)* | A | `185.199.110.153` |
   | *(vazio, raiz)* | A | `185.199.111.153` |
   | *(vazio, raiz)* | AAAA | `2606:50c0:8000::153` |
   | *(vazio, raiz)* | AAAA | `2606:50c0:8001::153` |
   | *(vazio, raiz)* | AAAA | `2606:50c0:8002::153` |
   | *(vazio, raiz)* | AAAA | `2606:50c0:8003::153` |
   | `www` | CNAME | `theusmkt.github.io` |

   Apague registros A/AAAA/CNAME antigos da raiz e do `www` que apontem para outro lugar (por exemplo, um "site em construção").
2. **GitHub → Settings → Pages → Custom domain:** digite `ocantinhovip.com.br` e salve. Espere o "DNS check successful".
3. Quando o certificado ficar pronto (pode levar até 24 h), marque **Enforce HTTPS**.
4. Recomendado: em **Settings da conta → Pages → Add a domain**, verifique `ocantinhovip.com.br` com o registro TXT que o GitHub mostrar. Isso impede que outra conta use o seu domínio.

A workflow passa a URL configurada (`configure-pages` → `base_url`) para `scripts/build.py`, que gera o `canonical` com o domínio novo.
