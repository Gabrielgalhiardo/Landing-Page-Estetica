# Aurévyra · Estética & Bem-estar

Landing page de uma marca fictícia, feita em React, TypeScript e Vite. Mantém um design em creme e verde sálvia, tipografia editorial, animações suaves e layout responsivo. Todos os nomes, logos e fotografias pertencem à nova proposta conceitual. Não há vínculo com uma empresa real.

## Rodar localmente

Requer Node.js 22.12+ e npm.

```sh
npm ci
npm run dev
```

Para conferir a versão de produção:

```sh
npm run build
npm run preview
```

O build executa TypeScript, checagem de segredos, geração do HTML estático e validação do conteúdo e dos assets.

## Personalizar

Os dados da marca e os canais estão em `src/data/business.ts`. Telefone, endereço, Instagram e Maps ficam vazios por padrão. Nenhum contato real ou localização anterior foi mantido. Os botões abrem um diálogo local de demonstração; não enviam mensagens, reservas ou dados. Para ativar o WhatsApp, preencha `phone` com DDI e DDD (somente dígitos) e `displayPhone` com a versão formatada.

Serviços estão em `src/data/services.ts`. Antes de uma publicação oficial, confirme cada serviço em `confirmedServiceIds` e revise os textos de demonstração e a política de privacidade.

Logos SVG com letras em curvas, símbolo e mapa decorativo: `public/brand/`. Fotos conceituais geradas por IA: `public/images/`. Proveniência e prompts em `ASSETS.md`.

## GitHub e hospedagem

O pacote não inclui histórico Git anterior, credenciais, arquivos de ambiente preenchidos ou identidade de hospedagem. Pode ser usado como modelo de portfólio, respeitando as licenças das fontes e dos ícones oficiais de terceiros. A ausência de resultados numa busca pelo nome não equivale a uma verificação de registro de marca.

```sh
git init -b main
npm run setup:git
git add .
npm run check:secrets
git commit -m "Modelo Aurévyra"
```

Configure o remoto do seu próprio repositório e envie o commit. O hook pre-commit inspeciona o índice Git e bloqueia padrões conhecidos de segredos. Veja `SECURITY.md`.

Na Vercel, use preset **Vite**, raiz na pasta do `package.json`, instalação `npm ci`, build `npm run build` e saída `dist`. Nenhuma variável é obrigatória. A publicação não foi realizada por este projeto local.

`.env.example` contém somente padrões públicos. `VITE_OFFICIAL_SITE=false` mantém `noindex`; isso não impede acesso a uma página publicada. `VITE_SITE_URL` e `VITE_GA_ID` ficam vazios; Analytics está desativado. Nunca coloque senhas ou tokens em `VITE_*`, pois seus valores ficam disponíveis no navegador.
