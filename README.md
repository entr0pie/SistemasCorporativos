# SistemasCorporativos

## Iniciando a aplicação

### Instanciando um MySQL pelo Docker

```sh
docker run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=login_example mysql
```

### Rodando a aplicação

```sh
npm i
npm run start
```

* **Nota**: lembre-se de criar um arquivo **.env**, no mesmo formato do **[.env.example](./.env.example)**.