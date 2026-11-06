# Gemini ChatGPT Black

Extensão Firefox que aplica ao Gemini uma paleta preta inspirada no ChatGPT. Preserva o layout e as funções do Gemini. Funciona independentemente do tema claro ou escuro selecionado no site. Um pequeno script ativa a classe visual escura do próprio Gemini sem mudar a preferência salva da conta.

## Teste local

1. Abra `about:debugging#/runtime/this-firefox` no Firefox.
2. Clique em **Load Temporary Add-on** e selecione `manifest.json`.
3. Recarregue `https://gemini.google.com/app`.

A instalação temporária termina quando o Firefox reinicia. A instalação permanente no Firefox normal exige um XPI assinado pela Mozilla, mesmo para distribuição pessoal não listada.

## Verificação

`sh tests/theme.test.sh` testa as cores de fundo, barra lateral, brilho e campo de entrada em um fixture nos modos claro e escuro com Firefox headless e ImageMagick. Também é necessário conferir visualmente o Gemini autenticado, incluindo conversa, menus e janela estreita.

Para validar e gerar um pacote sem os arquivos de teste e documentação:

```sh
npx --yes web-ext lint --source-dir . --warnings-as-errors --ignore-files tests README.md AGENTS.md CLAUDE.md
npx --yes web-ext build --source-dir . --overwrite-dest --ignore-files tests README.md AGENTS.md CLAUDE.md
```

O arquivo em `web-ext-artifacts/` ainda não é instalável permanentemente no Firefox comum. Para uso pessoal permanente, envie esta versão para assinatura **unlisted** no [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/) ou use `web-ext sign --channel=unlisted` com credenciais AMO próprias. Instale o XPI assinado retornado pela Mozilla.

## Privacidade

A extensão só injeta CSS e ajusta classes de tema em `gemini.google.com`. Ela não lê mensagens, não faz requisições e não armazena dados.
