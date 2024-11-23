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

---

## 🚀 **Funcionalidades Principais**
1. Cadastro de animais disponíveis para adoção.
2. Sistema de autenticação seguro para usuários.
 Upload e exibição de imagens dos animais.
5. Responsividade para dispositivos móveis e desktops.

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

