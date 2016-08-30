# Cliente SOAP Genérico


Esse projeto tem por objetivo realizar chamada à qualquer endpoint SOAP através de um web service REST seguindo a arquitetura RESTful. Além disso, possui preparação para implementação de camada de persistência com Oracle, versionamento de banco de dados com Liquibase e camada UI com AngularJS, HTML e CSS.


### Exemplo de Requisição ao Cliente SOAP Genérico:

        http://{servidor}:{porta}/soap-client-api/request/?endpoint=https%3A%2F%2Fwww1.nfe.fazenda.gov.br%2FNfeConsultaNFe%2FNfeConsultaNFe.asmx&action=nfeConsultaNFeLog&pfx-ns=nfec&uri-ns=http%3A%2F%2Fwww.portalfiscal.inf.br%2Fnfe%2Fwsdl%2FNfeConsultaNFe&xml=%3CSOAP-ENV%3AEnvelope%20xmlns%3ASOAP-ENV%3D%22http%3A%2F%2Fschemas.xmlsoap.org%2Fsoap%2Fenvelope%2F%22%20xmlns%3Anfec%3D%22http%3A%2F%2Fwww.portalfiscal.inf.br%2Fnfe%2Fwsdl%2FNfeConsultaNFe%22%3E%3CSOAP-ENV%3AHeader%3E%3Cnfec%3AnfeCabecMsg%20xmlns%3D%22http%3A%2F%2Fwww.portalfiscal.inf.br%2Fnfe%22%3E%3Cnfec%3AversaoDados%3E1.00%3C%2Fnfec%3AversaoDados%3E%3C%2Fnfec%3AnfeCabecMsg%3E%3C%2FSOAP-ENV%3AHeader%3E%3CSOAP-ENV%3ABody%3E%3Cnfec%3AnfeDadosMsg%3E%3CconsNFeLog%20xmlns%3D%22http%3A%2F%2Fwww.portalfiscal.inf.br%2Fnfe%22%20versao%3D%221.00%22%3E%3CtpAmb%3E1%3C%2FtpAmb%3E%3CchNFe%3E31160616701716000156550250033667061133159079%3C%2FchNFe%3E%3C%2FconsNFeLog%3E%3C%2Fnfec%3AnfeDadosMsg%3E%3C%2FSOAP-ENV%3ABody%3E%3C%2FSOAP-ENV%3AEnvelope%3E
        
        Parâmetros:
        	
        	Obs.: Para setar o valor dos parâmetros na URL de chamada, deve-se utilizar método para encodar URI.
        	
        	- endpoint: URL do endpoint SOAP a ser consumido.
        	- action: nome da action que será executada no endpoint SOAP.
        	- pfx-ns: prefixo do namespace da requisição.
        	- uri-ns: URI do namespace do SOAP.
        	- xml: XML de requisição (identico ao do SoapUI).


### Formato da Requisição Utilizada no Exemplo (Sem Encode URI):

		<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:nfec="http://www.portalfiscal.inf.br/nfe/wsdl/NfeConsultaNFe">
		<SOAP-ENV:Header>
			<nfec:nfeCabecMsg xmlns="http://www.portalfiscal.inf.br/nfe">
				<nfec:versaoDados>1.00</nfec:versaoDados>
			</nfec:nfeCabecMsg>
		</SOAP-ENV:Header>
		<SOAP-ENV:Body>
			<nfec:nfeDadosMsg>
				<consNFeLog xmlns="http://www.portalfiscal.inf.br/nfe" versao="1.00">
					<tpAmb>1</tpAmb>
					<chNFe>31160616701716000156550250033667061133159079</chNFe>
				</consNFeLog>
			</nfec:nfeDadosMsg>
		</SOAP-ENV:Body>
	</SOAP-ENV:Envelope>


### Endpoint Alvo Utilizado no Exemplo (WSDL): 

        https://www1.nfe.fazenda.gov.br/nfe-consultaNFe/nfe-consultaNFe.asmx?wsdl



### Tecnologias Utilizadas (informações das versões no arquivo `pom.xml`)

* Java 7.X
* [Maven](https://maven.apache.org/) 3.X
* [Spring](https://spring.io/)
* JPA 2.0|[Hibernate](http://hibernate.org/)
* [Jetty](http://www.eclipse.org/jetty/) (desenvolvimento)
* [Weblogic 12c](http://www.oracle.com/technetwork/middleware/weblogic/)
* [AngularJS](https://angularjs.org/)
* [Liquibase](http://www.liquibase.org/)
* [RESTful](https://pt.wikipedia.org/wiki/REST)


### Estrutura consolidada do projeto

```
soap-client
├── soap-client-api
|   ├── profiles
|   ├── src
|   └── pom.xml
├── soap-client-core
|   ├── profiles
|   ├── src
|   └── pom.xml
├── soap-client-db
|   ├── db
|   ├── db.changelog.xml
|   └── pom.xml
├── soap-client-ui
|   ├── src
|   └── pom.xml
├── README.md
└── pom.xml
```

##### Descrição da estrutura

* soap-client:
    * Projeto pai, "guarda-chuva", funciona como envelope dos módulos a seguir. Também utilizado para armazenar configurações Mavem reutilizáveis
* soap-client-api (WAR):
    * Nesse módulo, ficará o serviço RESTful do projeto (caso necessário, pode ser SOAP também, Clients (WS)), controladores REST. Além disso pode comportar também implementações de Scheduler e Threads. Testes devem estar presentes também.
* soap-client-core (JAR):
    * Esse é o módulo principal do projeto, nele consta os objetos de negócio do projeto! Por padrão, para cada model, deve ser criado seu respectivo Repositório (manipulação na base de dados) e Serviço (regras de negócio). Por exemplo para o modelo `Pessoa`, teremos o `PessoaRepositorio` e o `PessoaServico`, ou seja, os objetos de negócio e o regras de negócio ficarão nesse módulo. Este é dependência do módulo soap-client-api.
* soap-client-db:
    * Todas as migrações do banco de dados, separados por changeset...
* soap-client-ui:
    * Nesse módulo ficará a VIEW (AngularJS, HTML, CSS), também terá testes unitários de view, se aplicável. Este módulo por conter apenas arquivos estáticos, não gera empacotamento WAR, podem ser implantado em qualquer web server.


### Subindo a aplicação

1. Após **clonar** o repositório na sua máquina, entre no diretório do projeto e mude para a branch de desenvolvimento **(se já não estiver nela)**:

        $ git branch desenvolvimento origin/desenvolvimento (caso a branch não exista localmente)
        $ git checkout desenvolvimento

2. Baixando as dependências, executanto os testes e subindo no Jetty (caso queira desabilitar o start do Jetty após o install, basta alterar o plugin no arquivo `soap-client-api/pom.xml`):

        $ mvn clean install
        Acesse http://localhost:9091/soap-client-api/
        Acesse http://localhost:9091/soap-client-ui/#
        
        Obs. 1: Necessário instalar a lib ojdbc6.jar (http://www.oracle.com/technetwork/apps-tech/jdbc-112010-090769.html).
        Obs. 2: Necessário configurar o banco de dados no arquivo soap-client-core\src\main\core.properties.

3. Configurando para o Eclipse, execute dentro do diretório do projeto

        Basta importar o projeto como **Maven Project**.

4. Informações para criação dos DataSource se encontram no arquivo `core.properties`.

5. Executando o projeto

    5.1 Configurar certificado digital no Weblogic:
    	
    	Para realizar chamada à um endpoint SOAP que necessita de certificado digital, faz-se necessário configurá-lo no Weblogic.    	       
    
    5.2 API no Weblogic:

        $ cd soap-client-api
        $ mvn clean package wls:deploy
        Acesse http://localhost:{porta}/soap-client-api/
        
    5.3 UI é constituído por HTML, JS e CSS, basta colocar como um diretório no Weblogic, Apache ou um Servlet Conatainer, como o Jetty.

        $ Acesse http://{servidor}:{porta}/template-ui/#


6. Logs
    
    A aplicação além de enviar os logs para o console guarda no diretório /u02/logs/soap-client/soap-client.log


### Observações

* Para alterações no módulo 'core', é necessário tem executar `mvn install` para que o módulo seja colocado no repositório local;
* DataSource de desenvolvimento é criado pelo Spring, na classe `ConfiguracaoJPADesenvolvimento.java`, sendo que as informações de conexão são lidas do arquivo `core.properties` do módulo core.
* Por padrão, usa-se *weblogic/welcome1* como usuário/senha do domínio local do seu Weblogic!