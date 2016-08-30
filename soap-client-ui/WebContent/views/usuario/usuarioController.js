(function () {

    var app = angular.module('usuario');

    app.controller('usuarioController', [ '$location','$timeout','$scope','$http','$routeParams',  function ($location,$timeout,$scope,$http,$routeParams) {
        var usuario=this;
        usuario.id=$routeParams.id;
        //gera um evento que informa o controller de conteudo para modificar o nome da página
        $scope.$emit(config.events().conteudo.mudarTituloPagina,'Listagem de Usuários');

        usuario.redirecionarCadastrar = function(id){
            if(id!=undefined)
                id='/'+id;
            else
                id='';
          $location.path("/usuario"+id);
        };


        usuario.editar = function(item){

          sessionStorage.setItem('userId',item.id);
          usuario.redirecionarCadastrar(item.id);
        };

        usuario.remover = function(item){

          usuario.loading=true;
          $http.delete('/soap-client-api/pessoas/'+item.id).then(
                function(data){

                    usuario.listagem.grade.splice(usuario.listagem.grade.indexOf(item),1);

                    console.log('usuário deletado com sucesso!');
                    console.log(item);

                    usuario.loading=false;
                },
                function(error){
                    console.log(error);
                    usuario.loading=false;
                }
            );
        };

        usuario.cadastrar = function(){
          usuario.loading=true;
          if(usuario.id!=undefined && usuario.id!=""){
            $http.put('/soap-client-api/pessoas/'+usuario.id,usuario.model).then(
                function(data){
                    console.log('usuário editado com sucesso!');
                    usuario.loading=false;
                    redirecionaListagem();
                },
                function(error){
                    console.log(error);
                    usuario.loading=false;
                }
            );
          }else{
            $http.post('/soap-client-api/pessoas',usuario.model).then(
                    function(data){
                        console.log('usuário cadastrado com sucesso!');
                        usuario.loading=false;
                        redirecionaListagem();
                    },
                    function(error){
                        console.log(error);
                        usuario.loading=false;
                    }
                );
            }
        };

        //tamanho mínimo do nome (exemplo para mostrar como criar uma validação configurada a partir do controller)
        usuario.nomeMinTam=3;

        usuario.model={
            id:null,
            nome:null
        };

        usuario.listagem={
            filtro:null,
            grade:[],
        }

        function redirecionaListagem() {
          $location.path("/usuarios");
        }

        usuario.loading=true;
        function buscarUsuarios(){
            if (usuario.id == undefined || usuario.id == null ){
                usuario.id="";
            }
            usuario.model.id=usuario.id;
             
            $http.get('/soap-client-api/pessoas/'+usuario.id).then(
                function(res){
                    if(res.status==200){
                        usuario.listagem.grade=res.data;
                    }
                    else{
                        console.log('erro, httpcode: '+res.status);
                    }
                    usuario.loading=false;
                },
                function(error){
                    console.log(error);
                    usuario.loading=false;
                }
            );
        }
        buscarUsuarios();
   }]);

})();

