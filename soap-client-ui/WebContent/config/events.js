if(config==undefined)var config={};
//lista de todos os eventos
config.events=function () {
    return {
        usuario:{
            logar:'usuari_logou',
            deslogar:'usuari_deslougou'
        },
        conteudo:{
            mudarTituloPagina:'conteudo_mudarTituloPagina'
        },
        contribuinte:{
            salvou:'contribuinte_dbSalvou',
            retornou:'contribuinte_dbRetornou'
        },
        asyncLoader:{
            start:'asyncLoaderStart',
            end:'asyncLoaderEnd'
        }
    };
};
