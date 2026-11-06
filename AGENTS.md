# Projeto

- Extensão Firefox Manifest V3 de tema para `gemini.google.com`.
- Preserve layout, conteúdo, interações, imagens e cores de sintaxe; altere apenas superfícies e contraste necessários ao tema preto.
- Mantenha permissões e código ao mínimo: CSS para cores e um script local apenas para manter a classe de tema escuro, sem rede ou armazenamento.
- Antes de mudar o tema, rode `sh tests/theme.test.sh` e confirme que um teste de regressão falha; depois faça a menor correção e rode de novo.
- Verifique visualmente o Gemini real nos temas claro e escuro após mudanças de seletores. O fixture local não prova compatibilidade com o DOM atual do site.
