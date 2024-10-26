# Clean Energy Platform

Aplicação FullStack utilizando o framework Next.js com TypeScript e banco de dados relacional PostgreSQL.

> Nota: Aqui é utilzado o gerenciador pnpm, mas pode ser usado outro de sua preferência

## Banco de dados

O banco de dados utilizado para esse projeto é o PostgreSQL, que será hospedado em um container Docker.

A URL do banco de dados deve ser inserida no arquivo .env.local, seguindo o padrão apresentado em [.env.template](./.env.template).

1. **Subindo o container:** Para subir o container, há um arquivo [docker-compose.yml](./docker-compose.yml) contendo a configuração e a imagem do PostgreSQL. Para iniciar, utilize o comando:

```bash
docker compose up
```

2. **Criando as tabelas e as migrations:** Para a criação das tabelas do banco, é utilizado o [Drizzle ORM](https://orm.drizzle.team/) para criar os _schemas_ e manipular as _queries SQL_ e o [Drizzle KIT](https://orm.drizzle.team/docs/kit-overview) contém os scripts para gerar as _migrations_ e aplicá-las no banco.

```bash
pnpm run drizzle:generate && pnpm run drizzle:migrate
```

3. **Visualizando as tabelas:** Após gerar e aplicar as _migrations_, é possível visualizar as tabelas criadas a partir do studio que o _drizzle_ disponibiliza.

```bash
pnpm run drizzle:studio
```

Agora seu banco de dados está pronto para ser utilizado.

## API
