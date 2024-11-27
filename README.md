# Adote - Plataforma de Adoção de Animais 🐾

O **Adote** é uma aplicação desenvolvida para facilitar a adoção de animais, conectando pessoas interessadas em adotar a quem deseja disponibilizar animais para adoção. Inicialmente projetado para atender a região de **Visconde de Mauá (RJ-MG)**, o projeto também serve de inspiração para o desenvolvimento de iniciativas similares em outras regiões do Brasil.

---

## 🌟 **Objetivo da Aplicação**
Facilitar o processo de adoção de animais:
- Conectar adotantes e doadores.
- Promover a conscientização sobre adoção responsável.
- Expandir o alcance de ações de adoção para diversas regiões do país.

---

## 🛠 **Tecnologias Utilizadas**

### **Banco de Dados**
- **MongoDB**: Para armazenar informações sobre os animais e usuários.
- **Cloudinary**: Gerenciamento de mídia (imagens dos animais e usuários).

### **Linguagem de Programação**
- **TypeScript**: Para um código mais robusto e seguro.

### **Framework**
- **Next.js**: Framework React para renderização server-side e front-end moderno.

### **Outras Bibliotecas**
- **Mongoose**: Modelagem e interação com o banco de dados MongoDB.
- **NextAuth**: Gerenciamento de autenticação com credenciais personalizadas.
- **Styled Components**: Estilização baseada em componentes para uma experiência visual elegante.
- **Next Cloudinary**: Integração simplificada com a API do Cloudinary.

### **Gerenciamento de Estados**
Foi implementado o **useReducer** para gerenciar a lista de animais cadastrados, centralizando o controle de ações e refleteindo as mudanças na página home.


---

## 🚀 **Funcionalidades Principais**
1. Cadastro de animais disponíveis para adoção.
2. Sistema de autenticação seguro para usuários.
3. Upload e exibição de imagens dos animais.
5. Responsividade para dispositivos móveis e desktops.
6. Criptografia de senhas com bcrypt.
7. Listagem de animais disponíveis na página inicial.
8. cadastro, edição e exclusão de animais através do painel **Dashboard**.

---
##
---
## **Modelos de Dados**

### Modelo: Animal

O modelo `Animal` representa os dados de cada animal disponível para adoção.

### Estrutura do Modelo

| Campo              | Tipo                | Obrigatório | Descrição                                                                 |
|--------------------|---------------------|-------------|---------------------------------------------------------------------------|
| `_id`              | `ObjectId`         | Automático  | Identificador único gerado automaticamente pelo MongoDB.                 |
| `imageUrl`         | `String`           | Sim         | URL da imagem do animal armazenada no Cloudinary.                        |
| `type`             | `String`           | Sim         | Tipo do animal (ex.: cão, gato, etc.).                                   |
| `story`            | `String`           | Sim         | Informações sobre como o animal foi encontrado.                         |
| `approximateAge`   | `String`           | Sim         | Idade aproximada do animal.                                              |
| `size`             | `String`           | Sim         | Porte do animal (`Pequeno`, `Médio`, `Grande`).                          |
| `dewormed`         | `Boolean`          | Não         | Indica se o animal está vermifugado.                                     |
| `vaccinated`       | `Boolean`          | Não         | Indica se o animal está vacinado.                                        |
| `gender`           | `String`           | Sim         | Sexo do animal (`Macho`, `Fêmea`).                                       |
| `behavior`         | `String`           | Sim         | Descrição do comportamento do animal (ex.: carinhoso, ativo, etc.).      |
| `contact`          | `String`           | Sim         | Meio de contato do responsável pelo animal.                              |
| `user`             | `ObjectId`         | Sim         | ID do usuário responsável pelo registro, relacionado ao modelo `User`.   |
| `postdAt`          | `Date`             | Automático  | Data e hora da postagem do registro.                                     |
| `createdAt`        | `Date`             | Automático  | Data de criação do registro, gerado automaticamente.                     |
| `updatedAt`        | `Date`             | Automático  | Data de última atualização do registro, gerado automaticamente.          |

### Observações

- O campo `_id` é substituído por um campo `id` de string nas respostas das APIs, para facilitar a manipulação no front-end.
- O campo `postdAt` registra automaticamente a data/hora da criação do registro.

---

### Modelo: Usuário

O modelo `User` representa os dados de cada usuário registrado na plataforma.

### Estrutura do Modelo

| Campo              | Tipo                | Obrigatório | Descrição                                                               |
|--------------------|---------------------|-------------|-------------------------------------------------------------------------|
| `_id`              | `ObjectId`         | Automático  | Identificador único gerado automaticamente pelo MongoDB.                |
| `fullName`         | `String`           | Sim         | Nome completo do usuário.                                               |
| `email`            | `String`           | Sim         | Endereço de e-mail único do usuário.                                    |
| `phone`            | `String`           | Sim         | Número de telefone do usuário (10 ou 11 dígitos).                       |
| `password`         | `String`           | Sim         | Senha criptografada do usuário.                                         |
| `birthDate`        | `Date`             | Sim         | Data de nascimento do usuário (deve ter pelo menos 18 anos).            |
| `address`          | `String`           | Sim         | Endereço do usuário.                                                    |
| `profileImageUrl`  | `String`           | Não         | URL da imagem de perfil do usuário armazenada no Cloudinary.            |
| `createdAt`        | `Date`             | Automático  | Data de criação do registro, gerado automaticamente.                    |
| `updatedAt`        | `Date`             | Automático  | Data de última atualização do registro, gerado automaticamente.         |

### **Observações**

- O campo `_id` é substituído por um campo `id` de string nas respostas das APIs, para facilitar a manipulação no front-end.
- A senha do usuário é armazenada de forma segura, usando hash com `bcrypt`.
- O método `comparePassword` permite comparar a senha inserida pelo usuário no login com o hash armazenado no banco de dados.

---

## Arquitetura da Aplicação

A aplicação **Adote** foi projetada com uma arquitetura moderna, utilizando tecnologias amplamente adotadas no desenvolvimento web. Abaixo, é detalhada a arquitetura da aplicação, suas camadas e as responsabilidades de cada parte.

---

### Estrutura Geral

```plaintext
```plaintext
├── app/
│   ├── about/          # Página de informações sobre a aplicação
│   ├── api/            # Rotas da API (RESTful e Streams)
│   │   ├── animals/    # API para gerenciamento de animais
│   │   ├── auth/       # Autenticação (NextAuth.js)
│   │   ├── dashboard/  # API para gerenciar animais do usuário autenticado
│   │   ├── home/       # API para listagem de animais na home
│   │   ├── users/      # API para gerenciar usuários
│   │   └── sign-cloudinary-params/ # API para assinar parâmetros do Cloudinary
│   ├── dashboard/      # Página do dashboard para gerenciar animais
│   ├── profile/        # Página de perfil do usuário
│   ├── animal/         # Página de detalhes de um animal
│   ├── auth/           # Páginas de login e registro
│   ├── fonts/          # Arquivos de fontes personalizados
│   ├── interfaces/     # Definições de tipos e interfaces para TypeScript
│   ├── reducers/       # Reducers para gerenciamento de estado global
│   ├── layout.tsx      # Layout padrão compartilhado entre as páginas
│   └── page.tsx        # Página inicial (Home)
├── components/         # Componentes reutilizáveis (UI e lógica)
│   ├── AvatarUpload/   # Componente para upload de imagem de perfil
│   ├── BotaoHome/      # Botão para navegar para a página inicial
│   ├── Cabecalho/      # Cabeçalho da aplicação com links de navegação
│   ├── Rodape/         # Rodapé da aplicação
│   ├── AnimalContext/  # Contexto para gerenciamento global de animais
│   ├── Titulo/         # Componente estilizado para títulos principais
│   ├── TituloSecundario/ # Componente estilizado para títulos secundários
│   └── SessionProviderWrapper.tsx # Wrapper para gerenciar sessões do NextAuth.js
├── lib/                # Funções auxiliares e configurações globais
│   ├── mongodb.ts      # Conexão com o MongoDB
│   ├── authConfig.ts   # Configurações do NextAuth.js
├── models/             # Modelos Mongoose (animais e usuários)
```
---

## 📂 **Como Executar Localmente**

### **Pré-requisitos**
- Node.js (versão 16 ou superior)
- MongoDB Atlas ou local
- Conta no Cloudinary para gerenciar imagens
- Clonar o repositório:
  ```bash
  git clone https://github.com/maisaolisilva/Adote.git
  cd Adote

### 🛠 Configuração de Variáveis de Ambiente

Para que a aplicação funcione corretamente, é necessário configurar as seguintes variáveis de ambiente no arquivo `.env.local`, localizado na raiz do projeto:

| Variável                     | Descrição                                                                                      | Exemplo                          |
|------------------------------|------------------------------------------------------------------------------------------------|----------------------------------|
| `MONGODB_URI`                | URL de conexão com o banco de dados MongoDB.                                                  | `mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>` |
| `NEXTAUTH_URL`               | URL base da aplicação. Em desenvolvimento, use `http://localhost:3000`; em produção, use a URL do deploy. | `http://localhost:3000` ou `https://seusite.vercel.app` |
| `NEXTAUTH_SECRET`            | Chave secreta utilizada para criptografar sessões e tokens de autenticação.                   | `sua_chave_secreta`             |
| `CLOUDINARY_CLOUD_NAME`      | Nome da conta no Cloudinary. Utilizado para upload e gerenciamento de imagens.                | `seu_nome_no_cloudinary`        |
| `CLOUDINARY_API_KEY`         | Chave pública da API do Cloudinary.                                                          | `sua_chave_api`                 |
| `CLOUDINARY_API_SECRET`      | Chave secreta da API do Cloudinary.                                                          | `sua_chave_secreta`             |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nome da conta no Cloudinary. Configuração para ser usada no front-end.                     | `seu_nome_no_cloudinary`        |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Preset de upload configurado no Cloudinary para realizar envios de arquivos.             | `ml_default`                    |
| `NEXT_PUBLIC_CLOUDINARY_API_KEY` | **(Requerido para produção)** Chave pública da API do Cloudinary, usada para integrar corretamente no ambiente de produção. | `sua_chave_api`                 |

### Criando o Arquivo `.env.local`
1. Crie o arquivo `.env.local` na raiz do projeto.
2. Preencha o arquivo com suas configurações, por exemplo:

```env
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/meuBanco
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_secreta
CLOUDINARY_CLOUD_NAME=meu_cloudinary
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=minha_chave_secreta
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=meu_cloudinary
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=ml_default
```
### **Dicas**
1. Utilize o Postman ou outra ferramenta para testar as API.
2. Não se esqueça de usar bases de dados para sua aplicação local diferentes da aplicação em produção.
3. As senhas dos usuários **precisam** ser criptografadas.
4. Atente-se para a versão do Next.js que está a utilizar.

---
## **Para o Futuro**
Futuramente pretende-se implementar um meio de recuperação de senhas e também outro meio de autenticação, como pela conta do *Google*. Outras possíveis atualizações, incluem:
1. Adicionar a possibilidade de o usuário mudar sua senha.
2. Adicionar página para pedidos de ajuda ou doações de pessoas que cuidam de animais abandonados.
3. Aperfeiçoar o *desing* do site.
4. Filtros de busca.

