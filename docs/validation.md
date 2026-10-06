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

O commit inicial da implementação, `db401473b18ef0a9e42a63e2fea475e92dca2e89`, foi enviado com sucesso para `main` de `THEUSMKT/SITE-GELISE`.

A [primeira execução de Pages](https://github.com/THEUSMKT/SITE-GELISE/actions/runs/37464004671) foi iniciada pelo GitHub e falhou em `configure-pages`, antes do deploy, com:

> Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions. Error: Not Found.

O endereço esperado retornou **404** nessa verificação. Portanto, o site foi implementado e enviado ao repositório, mas **a publicação não foi concluída nem confirmada**.

Ação necessária do proprietário: em **Settings → Pages → Build and deployment → Source**, selecionar **GitHub Actions**; depois executar novamente a [workflow de publicação](https://github.com/THEUSMKT/SITE-GELISE/actions/workflows/pages.yml). Confirmar o job `deploy` e testar a URL retornada. Não é preciso inserir um token no código. A documentação oficial de `configure-pages` informa que a habilitação automática via `enablement` exige um token diferente de `GITHUB_TOKEN`; não foi acrescentada uma exigência de credencial para substituir esse passo simples nas configurações.

## Ambiente reutilizável

Salvos no rascunho da configuração do ambiente: `install_script` para gerar o artefato e `start_skill` para iniciar o servidor e verificar sua saúde. Foram acrescentados os domínios `api.github.com` e `theusmkt.github.io` para operações de consulta de publicação. O rascunho deve ser revisado e salvo nas configurações, e o ambiente deve ser publicado pelo produto para persistir o snapshot; essa publicação é distinta do deploy do site no GitHub Pages. O salvamento do rascunho não executa as instruções, aplica alterações de rede ou confirma restauração em uma nova tarefa.
