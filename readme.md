<h1>Requisitos para executar o projeto</h1>

<ul>
  <li> mysql ou docker </h1>
  <li> nodejs</h1>
</ul>

<h1>Passos para a execução</h1>

<p>1 - Criar um arquivo .env para o frontend e backend com as configurações definidas no .env.example</p>
<p>2 - Se certifique que tenha instalando o mysql ou o docker</p>
<p>3 - Caso use o docker entre na pasta api e rode o comando docker compose up -d para subir o banco de dados</p>
<p>4 - Apos configurar o banco rode as migrations com <strong> yarn migrations</strong></p>
<p>5 - Apos isso inicie o projeto com <strong> yard dev </strong> na pasta do front e backend</p>
<p>6 - Para rodar os testes na api crie um novo database com o nome <strong>desafio_teste</strong> entre na pasta api e rode <strong>yarn test</strong></p>

<p>Teste o projeto no <strong> <a href="https://desafio-front-sable.vercel.app/login">link</a></strong> </p>
