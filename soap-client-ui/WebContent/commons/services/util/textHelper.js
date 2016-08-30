
(function () {
    var app = angular.module("utilService");
    
    
    app.service("textHelper",[   function () {
        
        this.replaceAll=function(text,replacementText,searchExpression){
            if(searchExpression!=''){
                while(text.search(searchExpression)>=0){
                    text=text.replace(searchExpression, replacementText); 
                }
            }
            return text;
        }
        this.format=function (texto, Mascara) {        
            if(texto==null || texto==undefined)
                texto='';
        
                
            var boleanoMascara;

            var exp = /\-|\.|\/|\(|\)| /g

            if (texto == null) return;

            var campoSoNumeros = texto.replace(exp, "");

            var posicaoCampo = 0;
            var NovoValorCampo = "";
            var TamanhoMascara = campoSoNumeros.length;

            for (var i = 0; i <= TamanhoMascara; i++) {
                boleanoMascara = ((Mascara.charAt(i) == "-") || (Mascara.charAt(i) == ".")
                    || (Mascara.charAt(i) == "/"))
                boleanoMascara = boleanoMascara || ((Mascara.charAt(i) == "(")
                    || (Mascara.charAt(i) == ")") || (Mascara.charAt(i) == " "))
                if (boleanoMascara) {
                    NovoValorCampo += Mascara.charAt(i);
                    TamanhoMascara++;
                } else {
                    NovoValorCampo += campoSoNumeros.charAt(posicaoCampo);
                    posicaoCampo++;
                }
            }
            return NovoValorCampo;
        }
        
        this.fillLeft=function (text, fillText,tam) {
            return fill(text, fillText,tam,true);
        } 
        
        this.fillRight=function (text, fillText,tam) {
            return fill(text, fillText,tam,false);
        } 
        
        function fill(text, fillText,tam,isLeft){
            while(text.length<tam){
                if(isLeft)
                    text=fillText+text;
                else
                    text=text+fillText;
            }
            
            return text;
        }
    }]);
})();