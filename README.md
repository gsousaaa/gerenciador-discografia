

# Documentação do Projeto: Gerenciador de Discografia Tião Carreiro e Pardinho 🤠

## Visão Geral
O Gerenciador de Discografia Tião Carreiro e Pardinho é uma aplicação Fullstack desenvolvida para permitir aos usuários gerenciar a discografia da famosa dupla sertaneja Tião Carreiro e Pardinho. O projeto consiste em um back-end construído com o framework Laravel para fornecer uma API RESTful, MySQL como banco de dados e um front-end desenvolvido em React para oferecer uma interface de usuário amigável e interativa.
## Vídeo da aplicação em funcionamento:
https://www.youtube.com/watch?v=wBd87tpJYvk

## Como Iniciar o Projeto

### Clonar o Repositório
Antes de começar, você precisa clonar o repositório do projeto para sua máquina local. Execute o seguinte comando:
```bash
  git clone https://github.com/gsousaaa/teste-supliu.git
```
    
### Front-end
Para iniciar o projeto do front-end, siga estas etapas:

1. **Instalar as Dependências:**
    ```bash
    cd frontend
    npm install
    ```

2. **Rodar o Front-end:**
    ```bash
    cd frontend
    npm run dev
    ```

### Back-end
Para iniciar o projeto do back-end, siga estas etapas:

1. **Rodar o Back-end:**
    ```bash
    cd backend
    php artisan serve
    ```

Isso permitirá que você inicie tanto o front-end quanto o back-end do projeto, permitindo que você comece a desenvolver e interagir com a aplicação.


## Funcionalidades
A aplicação oferece as seguintes funcionalidades aos usuários:

1. **Ver Lista de Álbuns e Faixas:** Os usuários podem visualizar a lista completa de álbuns e suas respectivas faixas.

2. **Pesquisar Álbuns e Faixas por Nome:** Uma funcionalidade de pesquisa permite aos usuários encontrar álbuns e faixas específicas digitando seus nomes.

3. **Adicionar um Novo Álbum:** Os usuários podem adicionar novos álbuns à discografia da dupla Tião Carreiro e Pardinho.

4. **Adicionar uma Nova Faixa em um Álbum:** É possível adicionar novas faixas a um álbum existente.

5. **Excluir uma Faixa:** Os usuários têm a capacidade de excluir faixas da discografia.

6. **Excluir um Álbum:** Além disso, os usuários podem excluir álbuns inteiros, juntamente com todas as faixas associadas.

## Tecnologias Utilizadas

### Back-end (Laravel)
O back-end da aplicação foi desenvolvido utilizando o Laravel, um framework PHP poderoso e robusto que proporciona uma experiência de desenvolvimento eficiente e escalável.

Recursos Utilizados:
- Rotas RESTful para gerenciar álbuns e faixas.
- Eloquent ORM para interagir com o banco de dados de forma intuitiva.
- Validação de dados para garantir a integridade dos dados.
- Tratamento de erros para fornecer respostas adequadas às solicitações.

### Front-end (React)
O front-end da aplicação foi construído com React, uma biblioteca JavaScript popular para a criação de interfaces de usuário interativas e responsivas.

Recursos Utilizados:
- Componentes reutilizáveis para criar uma interface de usuário consistente.
- Gerenciamento de estado para controlar o estado da aplicação de forma eficiente.
- Integração com a API RESTful do back-end para buscar e enviar dados.
- Estilização utilizando Chakra UI para garantir uma experiência visual atraente e acessível.

## Estrutura da API
A API RESTful oferece as seguintes rotas para interagir com os recursos de álbuns e faixas:

- `GET /albums`: Retorna todos os álbuns cadastrados, incluindo suas respectivas faixas.
- `GET /album/{album_id}`: Retorna detalhes de um álbum específico com base no ID fornecido, juntamente com suas faixas correspondentes.
- `POST /createalbum`: Cria um novo álbum.
- `PUT /album/{album_id}`: Atualiza os detalhes de um álbum existente.
- `DELETE /album/{album_id}`: Exclui um álbum existente.
- `POST /album/{album_id}/music`: Adiciona uma nova faixa a um álbum específico.
- `DELETE /album/{album_id}/music/{music_id}`: Exclui uma faixa específica de um álbum.
- `PUT /album/{album_id}/music/{music_id}`: Atualiza os detalhes de uma faixa específica de um álbum.


## Design do Banco de Dados e Relacionamentos

O banco de dados foi projetado para armazenar informações sobre álbuns e faixas, mantendo um relacionamento adequado entre eles. Aqui está a estrutura do banco de dados e os relacionamentos entre as tabelas:

### Tabela `albums`
A tabela `albums` armazena informações sobre os álbuns da dupla Tião Carreiro e Pardinho.

Campos:
- `id`: Identificador único do álbum (chave primária).
- `album_name`: Nome do álbum.

### Tabela `musics`
A tabela `musics` armazena informações sobre as faixas (músicas) associadas a cada álbum.

Campos:
- `id`: Identificador único da faixa (chave primária).
- `music_name`: Nome da faixa.
- `album_id`: Chave estrangeira que referencia o `id` do álbum ao qual a faixa pertence.

Relacionamento:
- Cada faixa na tabela `musics` está associada a um álbum específico na tabela `albums` por meio da chave estrangeira `album_id`.

Este design de banco de dados permite uma estrutura organizada e eficiente para armazenar e recuperar informações sobre os álbuns e faixas da discografia da dupla Tião Carreiro e Pardinho. Os relacionamentos entre as tabelas garantem integridade referencial e facilitam a recuperação de dados relacionados em consultas.

