# Validação da implementação

Verificações executadas em 6 de outubro de 2026 no ambiente de desenvolvimento, sobre o artefato `.site-build/` servido no subdiretório `/SITE-GELISE/`.

## Resultado local

**15 verificações aprovadas** com `tests/site.cjs`, Chromium e Playwright:

- Estrutura semântica, uma H1 e galeria/âncora ocultas sem fotos de resultados.
- Todas as mensagens contextuais de WhatsApp, telefone e busca de endereço.
- Cinco acordeões de serviços com Enter e Espaço.
- Cinco painéis de cursos com estado selecionado e teclas de navegação.
- Layout e imagens em 360, 390, 768, 1024 e 1440 px, sem rolagem horizontal.
- Menu móvel com foco, contenção, Escape, fechamento ao navegar e mudança para desktop.
- Movimento reduzido: conteúdo visível e animações não essenciais desativadas.
- Auditoria automatizada axe para WCAG 2/2.1 A/AA: nenhuma violação encontrada. Isso não substitui uma auditoria humana completa.
- Componente futuro de trabalhos testado com fixtures apenas no navegador: filtros, lightbox, setas, foco contido e devolvido e Escape. Nenhuma fixture foi publicada como trabalho real.
- JavaScript desativado: serviços nativos, cinco cursos legíveis, navegação e WhatsApp disponíveis.
- Nenhum erro de console ou recurso ausente; originais e documentação fora do artefato.

Capturas de desktop e celular foram revisadas durante a implementação. Capturas e resultados completos estão no diretório local ignorado `test-results/`, regenerável pelo teste.

Também verificado: hashes dos três PNG originais iguais aos arquivos do pacote; IDs/âncoras/recursos locais resolvidos; build repetível com hashes idênticos; canonical e Open Graph preservando `/SITE-GELISE/` quando `--site-url` é informado; servidor de desenvolvimento e renderização no navegador funcionando com o comando salvo no ambiente.

## Estado da publicação

**Site publicado e verificado:** https://theusmkt.github.io/SITE-GELISE/.

Após a seleção de **GitHub Actions** como fonte do Pages pelo proprietário, a [execução 37464868101](https://github.com/THEUSMKT/SITE-GELISE/actions/runs/37464868101) foi iniciada por `workflow_dispatch` sobre o commit `da3c23d687fdef89d526aac2338fe156644f59ac` e concluiu com sucesso, incluindo build e deploy.

Verificações sobre a publicação:

- Página pública com HTTP **200**, título e conteúdo do Cantinho VIP.
- API do GitHub confirmou a URL, `build_type: workflow` e HTTPS obrigatório.
- Canonical, `og:url` e imagem de compartilhamento apontando para o project site `/SITE-GELISE/`.
- Onze recursos públicos de entrada, incluindo CSS, JS, fontes, imagens e favicon, retornaram 200 e são idênticos aos arquivos locais, byte por byte.
- Chromium em 390 px verificou título, retrato, menu móvel, Escape, troca de cursos e ausência de erros da página. As respostas HTTPS foram obtidas pelo cliente HTTP do Playwright com verificação TLS mantida e entregues ao navegador via `route.fetch`/`route.fulfill`: o Chromium desta máquina não reconheceu diretamente a autoridade certificadora do proxy do ambiente. Não foi desativada a verificação TLS.

As primeiras execuções falharam em `configure-pages` com `Not Found` enquanto o Pages ainda não estava habilitado. Esse requisito foi resolvido; não é necessário configurar outra workflow, inserir token no código ou escolher os modelos Jekyll/Static HTML oferecidos nas configurações.

## Ambiente reutilizável

Salvos no rascunho da configuração do ambiente: `install_script` para gerar o artefato e `start_skill` para iniciar o servidor e verificar sua saúde. Foram acrescentados os domínios `api.github.com` e `theusmkt.github.io` para operações de consulta de publicação. O rascunho deve ser revisado e salvo nas configurações, e o ambiente deve ser publicado pelo produto para persistir o snapshot; essa publicação é distinta do deploy do site no GitHub Pages. O salvamento do rascunho não executa as instruções, aplica alterações de rede ou confirma restauração em uma nova tarefa.
