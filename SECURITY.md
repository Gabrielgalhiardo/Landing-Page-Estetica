# Segurança do modelo

Esta versão usa uma identidade fictícia e imagens conceituais. Não há retratos fornecidos por clientes, contatos, endereço ou perfis sociais de uma empresa real. O mapa é um SVG local e não carrega conteúdo do Google. Não existe backend, cadastro ou envio de formulários.

Nenhuma chave de API ou credencial é necessária. Todos os campos de contato estão vazios, e os CTAs apenas abrem um diálogo local. Analytics está desativado por padrão. Fonts, imagens e SVGs são servidos localmente.

Arquivos `.env*` preenchidos, dados de implantação, dependências, builds, caches e relatórios são ignorados. Somente `.env.example`, sem domínio ou identificador de Analytics, pode ser versionado. Variáveis `VITE_*` são públicas no navegador e nunca devem conter segredos.

Use `npm run check:secrets` antes de enviar o código. `npm run setup:git` instala uma proteção pre-commit local que verifica o conteúdo do índice Git. A checagem encontra formatos conhecidos de segredos, mas não substitui a revisão dos arquivos adicionados.

Este pacote não inclui histórico Git nem publicação automática. Se substituir conteúdo em um repositório existente, commits antigos ainda podem conter os arquivos anteriores: apenas trocar a versão atual não apaga o histórico.
