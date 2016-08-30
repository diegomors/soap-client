

var replaceAll = function (text, value,replaceValue) {

	while(text.indexOf(value)>=0){
		text=text.replace(value,replaceValue);
	}

	return text;
};

var concatenaParametroNaQueryString = function (url, chave, valor) {
	valToParse={};valToParse[chave]=valor;
    return concatenaParametroNaQueryStringFromJson(url,valToParse);
};


var concatenaParametroNaQueryStringFromJson = function (url, jsonVal) {

	var resultado = url;
	if (resultado.lastIndexOf('?') > -1) {
		resultado += "&";
	} else {
		resultado += "?";
	}

	resultado += $.param(jsonVal);
    return resultado;
};

/**
 * Este método deve ser chamado SEMPRE
 * que uma árvore DOM for substituída. Seja
 * na carga inicial (vide document.ready neste
 * mesmo script) ou via ajax LOAD ou similar.
 *
 * Se esse método não for chamado, componentes de
 * máscara e comportamentos customizados não
 * serão aplicados nos novos componentes.
 */
XtraInicializaDOM = function (el) {

	XtraComportamentos.aplica(el);
	XtraMascaras.aplica(el);
	XtraTooltip(el);
	XtraMultiselect(el);

};

/**
 * Inicializa os tooltips. Para usar, basta
 * adicionar a classe "xtra-tooltip" no elemento.
 */
XtraTooltip = function (el) {
	$(".xtra-tooltip", el).tooltip({ placement: "top" });
	$('span').tooltip();

};

/**
 * Inicializa os componentes de seleção múltipla.
 * Para usar, basta adicionar a classe "xtra-multiselect"
 * no elemento "select" correspondente.
 */
XtraMultiselect = function (el) {

	var notificaMudancaDeValor = function () {
		this.$select.trigger("xtra-multiselect-change");
	};

	$(".xtra-multiselect", el).each(function () {

		var $this = $(this);

		$this.multiselect({
			nonSelectedText: "Selecione",
			nSelectedText: " itens selecionados",
			allSelectedText: "Todos",
			selectAllText: "Selecionar todos",
			includeSelectAllOption: true,
			enableFiltering: true,
			enableCaseInsensitiveFiltering: true,
			filterPlaceholder: "Filtrar",
			numberDisplayed: $this.data("numberDisplayed"),
			//inheritClass:true,
			//dropRight:true,
			onChange: notificaMudancaDeValor
		});
		//almenta o tamanho do novo elemento para ocupar todo o tamanho da div (semelhante ao select original)
		$this.find('+div.btn-group').addClass('xtra-multiselect-fullWidth');

	});

};

/**
 * Configura o tratamento de erro em chamadas
 * Ajax. É esperado que o servidor retorne,
 * em HTML, o conteúdo da página de erro.
 */
XtraErroAjax = function() {

	/**
	 * Tenta encontrar um campo em tela que seja
	 * relacionado ao campo de DTO do servidor.
	 * Para funcionar corretamente, depende que
	 * seja corretamente atribuído o data-attribute
	 * "data-atributo-dto" com o nome apropriado.
	 */
	var buscaCampoEmTela = function (campo) {
		var $campo = null;
		$(".xtra-container-validacao input,select,textarea,span").each(function () {
			var $this = $(this);
			if (campo == $this.data("atributoDto")) {

				$campo = $this;

			} else {

				// permite que outras validações sejam atreladas
				// ao campo específico, através do data-attribute
				// "outras-validacoes".
				var outrasValidacoes = $this.data("outrasValidacoes") || "";
				outrasValidacoes = outrasValidacoes.split(",");
				for (var idx in outrasValidacoes) {
					if (outrasValidacoes[idx] == campo) {
						$campo = $this;
					}
				}

			}
		});
		return $campo;
	};

	/**
	 * Essa função recebe um objeto de erros
	 * de binding (vide ErroNaValidacaoDeCamposDTO).
	 *
	 * Os erros globais são apresentados apenas
	 * na caixa de diálogo. Os erros de campos são
	 * apresentados tanto na caixa de diálogo quanto
	 * no próprio campo, junto com a demarcação de inválido.
	 */
	var apresentaErros = function (erros) {

		var msg = "Os seguintes problemas foram encontrados no preenchimento do formulário: <br /><br /><ul>";

		// concatena as mensagens de erro globais
		if (erros.globais.length > 0) {
			for (var idx in erros.globais) {
				msg += "<li>" + erros.globais[idx] + "</li>";
			}
		}

		// concatena as mensagens de erro
		// específicas dos campos da tela
		for (var campo in erros.doCampo) {
			if (erros.doCampo[campo].length > 0) {

				// destaca o campo na tela em vermelho
				var $campo = buscaCampoEmTela(campo);

				var etiqueta = "";
				if ($campo != null) {
					etiqueta = $campo.data("etiqueta") || "\"" + campo + "\"";
					etiqueta += ": ";
				}

				var msgEspecifica = "";
				for (var idx in erros.doCampo[campo]) {
					msg += "<li>" + etiqueta + erros.doCampo[campo][idx] + "</li>";
					msgEspecifica += erros.doCampo[campo][idx] + "<br />";
				}

				XtraComportamentoContainerValidacao.registraErro($campo, msgEspecifica);

			}
		}

		msg += "</ul><br />Verifique e tente novamente.";

		XtraMensagens.aviso(msg);
	};

	$(document).ajaxError(function (event, xhr) {

		// se veio uma mensagem de erro via JSON,
		// podemos apresentar de uma forma melhor
		if (xhr["responseJSON"] != null &&
			xhr["responseJSON"]["excecao"] != null) {

			XtraMensagens.aviso(xhr.responseJSON.excecao.message);
			return;
		}

		// se veio uma coleção de erros de
		// preenchimento de formulário, podemos
		// também tratar de uma maneira específica
		if (xhr["responseJSON"] != null &&
			xhr["responseJSON"]["globais"] != null) {

			apresentaErros(xhr["responseJSON"]);
			return;
		}

		// substitui o documento atual
		// com o HTML retornado pelo servidor
		var newDoc = document.open("text/html", "replace");
		newDoc.write(xhr.responseText);
		newDoc.close();

	});

};

/**
 * Registra um interceptador em todas as requisições
 * ajax, responsável por adicionar o parâmetro "_cid"
 * (identificador da conversação atual) na requisição.
 */
XtraParametroConversacaoAjax = function () {

	// intercepta todas as requisições ajax
	$.ajaxPrefilter(function (options, originalOptions, jqXHR) {

		// adiciona o parâmetro "_cid"
		if (window["conversationId"] != null) {
			options.url = concatenaParametroNaQueryString(options.url, "_cid", conversationId);
		}

	});

};

/**
 * Singleton que fornece métodos utilitários para
 * executar operações AJAX. Esses métodos sempre
 * devem ser utilizados no lugar dos métodos nativos
 * do jQuery, para que comportamentos globais não parem
 * de funcionar.
 */
XtraAjax = function () {

	var thisObj = null;

	thisObj = {

		load: function (seletor, url, fn, dados) {

			var $el = $(seletor);

			$el.load(url, dados, function () {

				// inicializa o novo DOM,
				// ação necessária para aplicar
				// máscaras e comportamentos customizados
				XtraInicializaDOM($el);

				// chama o callback se passado
				// pelo consumidor
				if (fn) {
					fn();
				}

			});

		}

	};

	return thisObj;

}();

/**
 * Singleton que fornece utilitários para mostrar
 * caixas de aviso ao usuário.
 */
XtraMensagens = function () {

	var thisObj = null;

	thisObj = {

		aviso: function (msg, fn) {
			bootbox.alert(msg, fn);
		}

	};

	return thisObj;
}();

/**
 * Registra no jQuery a extensão 'arrayDeValoresSelecionados'.
 * Ela serve para retornar as seleções de um componente "select"
 * normalizadas em um array. Por padrão, o método "val" retorna
 * null se não existirem seleções, no entanto, este método retorna
 * um array vazio.
 */
XtraExtensaoArrayDeValoresSelecionados = function () {

	$.fn.extend({
		arrayDeValoresSelecionados: function () {
			var vals = [];

			// para cada valor no atual seletor,
			// adiciona todas as eventuais seleções
			// no array vals
			this.each(function () {
				var val = $(this).val();
				if (val != null) {
					vals = vals.concat(val);
				}
			});

			return vals;
		}
	});

};

/**
 * Registra no jQuery a extensão 'valorTrueFalse'.
 * Ela serve para converter o retorno de "val" de
 * "0" e "1" para "false" e "true" respectivamente.
 * Se "val" retornar "", esse valor é mantido.
 */
XtraExtensaoValorTrueFalse = function () {

	$.fn.extend({
		valorTrueFalse: function () {
			var val = "";
			this.each(function () {
				val = $(this).val() || "";
				if (val == "0") {
					val = "false";
				} else if (val == "1") {
					val = "true";
				}
			});
			return val;
		}
	});

};

/**
 * Registra evento de tratamento da solicitação de troca
 * de tema para alto contraste. Funciona adicionando uma
 * classe global (no body da página) e substituindo o
 * CSS do tema Bootstrap.
 */
XtraAltoContraste = function () {

	$(".btn-alto-contraste").click(function () {

		var $body = $(document.body);

		var altoContraste = !$body.is(".alto-contraste");

		// repassa a solicitação para o servidor,
		// de forma que as próximas páginas possam
		// manter a preferência do usuário
		$.post(contextPath + "/app/acessibilidade/alto-contraste?habilitado=" + altoContraste, function () {

			$body.toggleClass("alto-contraste");

			var cssURL = altoContraste ?
					contextPath + "/static/plugins/bootstrap-3.3.5/css/bootstrap.cyborg.min.css" :
						contextPath + "/static/plugins/bootstrap-3.3.5/css/bootstrap.min.css";

			$("#bootstrap-css").attr("href", cssURL);

			$body.hide();
			setTimeout(function () { $body.show(); }, 0);

		});

		return false;

	});

};

/**
 * Instala eventos de interceptação ajax
 * para mostrar e esconder o "ajax-loader".
 */
XtraAjaxLoader = function () {

	var onAjaxStart = function () {
		$(".ajax-loading").show();
	};

	var onAjaxStop = function () {
		$(".ajax-loading").hide();
	};

	$(document).ajaxStart(onAjaxStart);
	$(document).ajaxStop(onAjaxStop);

};

/**
 * Redireciona o usuário para a URL relativa
 * ao contexto da aplicação. Esse método adiciona
 * o ID da conversação atual, se o mesmo existir.
 */
XtraRedirecionaInternamente = function (url) {
	if (window["conversationId"] != null) {
		window.location = contextPath + concatenaParametroNaQueryString(url, "_cid", conversationId);
	} else {
		window.location = contextPath + url;
	}
};

/**
 * Exibe uma popup de confirmação para o usuário,
 * executando a "fn" com um parâmetro de resposta boolean.
 */
XtraConfirmacao = function (msg, fn) {
	bootbox.confirm(msg, fn);
};

/**
 * Executa a função passada por parâmetro com delay de,
 * por padrão, 500ms. Isso significa que, se essa função
 * for chamada repetidamente dentro desses 500ms, o callback
 * será chamado apenas uma vez. Muito útil para controlar
 * eventos do tipo "autocomplete", chamados em função de input
 * repetido do usuário.
 */
XtraExtensaoExecutaComDelay = function () {

	$.fn.extend({
		executaComDelay: function (fn, delayEmMillis) {

			// por padrão o delay é de 500 millis
			if (delayEmMillis == null) {
				delayEmMillis = 500;
			}

			// para cada valor no atual seletor,
			// instala o evento de execução com delay
			this.each(function () {

				var $this = $(this);
				var data = $this.data();

				// cancela a última chamada de execução
				// com delay, se aplicável
				if (data["ultimaChamadaExecucaoComDelay"] != null) {
					clearTimeout(data["ultimaChamadaExecucaoComDelay"]);
				}

				// agenda nova execução com delay
				var timeoutID = setTimeout($.proxy(fn, this), delayEmMillis);
				data["ultimaChamadaExecucaoComDelay"] = timeoutID;

			});

			return this;
		}
	});

};

/**
 * Limpa o valor de todos os campos do container
 * passado como parâmetro. "el" pode também ser
 * um seletor (string).
 */
XtraLimparFormulario = function (el) {

	var $el = $(el);
	$el.find("input[type=text]").val("");
	$el.find("select option:selected").prop("selected", false);
	$el.find("select.xtra-multiselect").multiselect("refresh");

};

/**
 * Cria uma representação "flat" do objeto
 * passado como parâmetro, usando como chave
 * principal o segundo parâmetro. A representação
 * "flat" de um objeto é uma representação
 * onde arrays e objetos são percorridos de forma
 * recursiva, criando atributos da seguinte maneira
 * no objeto principal:
 *
 * - atributo1.atributoarray[0].atributoobjeto.atributofinal
 * - atributo1.atributoarray[2].atributoobjeto.atributofinal
 * - atributo2.atributo3
 *
 * O resultado é sempre um único objeto sem atributos objetos
 * ou arrays.
 */
XtraFlatMap = function (obj) {

	// esta rotina só suporta objetos
	if (typeof obj !== 'object' || $.isArray(obj)) {
		throw 'XtraFlatMap funciona apenas com objetos';
	}

	if (obj == undefined || obj == null) {
		return obj;
	}

	var resultado = {};
	var extende = null;
	extende = function (obj2, chave2) {

		if (obj2 == undefined || obj2 == null) {

			resultado[chave2] = obj2;

		} else  if ($.isArray(obj2)) {

			for (var i = 0; i < obj2.length; i++) {
				extende(obj2[i], chave2 + "[" + i + "]");
			}

		} else if (typeof obj2 === 'object') {

			var prefixo = chave2;
			if (prefixo != "") {
				prefixo += ".";
			}
			for (var subChave in obj2) {
				extende(obj2[subChave], prefixo + subChave);
			}

		} else {
			resultado[chave2] = obj2;
		}

	};
	extende(obj, "");

	return resultado;
};

XtraBootStrapNavSwitch= function(){
	//incializa evento de troca de abas para todos os elementos. Por alguma razão o evento nativo do bootstrap não esta sendo acionado
	$('.nav li').click(function(){
		$(this).parents('ul').find('li').removeClass('active');
		$(this).addClass('active');
	});

}

cardClickChecked = function() {

	$('input[type="checkbox"]').click(function(e){
		alert("teste");
	})

	$('.card-box').click(function(e) {
		var checkbox = $(this).parents().find('input[type="checkbox"]');
		checkbox.prop( "checked", true );
	})
}


$(document).ready(function () {

	XtraInicializaDOM(document.body);
	XtraErroAjax();
	XtraParametroConversacaoAjax();
	XtraExtensaoArrayDeValoresSelecionados();
	XtraExtensaoValorTrueFalse();
	XtraExtensaoExecutaComDelay();
	XtraAltoContraste();
	XtraAjaxLoader();
	XtraBootStrapNavSwitch();
	cardClickChecked();

});
