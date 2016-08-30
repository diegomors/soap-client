
/*
* Neste script ficam definidos todos os objetos
* que tratam determinados comportamentos que são
* ativados nos elementos do DOM, através da utilização
* das classes "xtra-*". Por exemplo: xtra-paginavel,
* xtra-itens-removiveis etc.
*/

/**
 * Responsável por delegar a atualização do DOM,
 * ou a carga inicial da página, para cada comportamento
 * diferente, para que esses instalem e configurem
 * suas funções.
 */
XtraComportamentos = function () {
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {

			XtraComportamentoCollapsible.aplica(el);
			XtraComportamentoItensRemoviveis.aplica(el);
			XtraComportamentoArmazenarSelecao.aplica(el);
			XtraComportamentoSelecionarTodos.aplica(el);
			XtraComportamentoPaginavel.aplica(el);
			XtraComportamentoLiveChange.aplica(el);
			XtraComportamentoContainerValidacao.aplica(el);
			XtraComportamentoSecaoEndereco.aplica(el);
			XtraComportamentoFileUpload.aplica(el);
			XtraComportamentoSeletorMarcaModelo.aplica(el);
			
		}
			
	};
	
	return thisObj;
}();

/**
 * Comportamento de "expand-collapse" nos paineis
 * do bootstrap. Use a classe "xtra-collapsible-collapsed"
 * no bloco principal para que o componente inicie fechado.
 * 
 * Classe ativadora: xtra-collapsible
 * 
 * Onde pode ser utilizada: paineis (classe "panel")
 * 
 * Requisitos adicionais: o painel deve possuir header com title
 * (classes "panel-heading" e "panel-title")
 */
XtraComportamentoCollapsible = function () {
	
	var toggle = function ($seta) {
		
		// muda o estilo da seta
		var $icon = $seta.find("i");
		$icon.toggleClass("glyphicon-triangle-bottom");
		$icon.toggleClass("glyphicon-triangle-right");
		
		// mostra ou esconde o corpo
		var $painel = $seta.closest(".xtra-collapsible");
		$painel.toggleClass("xtra-collapsible-collapsed");
		
	};
	
	var seta_onClick = function () {
		
		var $this = $(this);
		toggle($this);
		
	};
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			var $paineis = $(".xtra-collapsible", el);
			
			$paineis.each(function () {
				
				
				// recupera o elemento do título
				// do painel
				var $painel = $(this);
				var $title = $painel.children(".panel-heading").children(".panel-title");

				var collapsed = $painel.is(".xtra-collapsible-collapsed");
				
				// cria e insere a seta no DOM
				var $seta = $("<a class=\"xtra-collapsible-seta\"><i class=\"glyphicon glyphicon-triangle-" + (collapsed ? "right" : "bottom") + "\"></i></a>");
				$seta.prependTo($title);
				
				// registra o evento que trata o clique na seta
				$seta.click(seta_onClick);
				
			});
			
		}
			
	};
	
	return thisObj;
	
}();

/**
 * Permite que o usuário remova um ou mais
 * itens de uma coleção, através de um botão
 * de remoção.
 * 
 * Classe ativadora: xtra-itens-removiveis
 * 
 * Onde pode ser utilizada: qualquer elemento de bloco
 * 
 * Requisitos adicionais: um ou mais xtra-itens-removiveis-item,
 * cada um com no mínimo um xtra-itens-removiveis-removedor dentro.
 */
XtraComportamentoItensRemoviveis = function () {
	
	var removedor_onClick = function () {
		
		var $this = $(this);
		var $itensRemoviveis = $this.closest(".xtra-itens-removiveis");
		
		// destrói o item removível
		$this.closest(".xtra-itens-removiveis-item").remove();
		
		// dispara evento customizado, permitindo
		// que outros componentes possam ser atualizados
		$itensRemoviveis.trigger("xtra-itens-removiveis-item-removido");
		
	};
	
	var thisObj = null;
	
	thisObj = {
			
		aplica: function (el) {

			// instala o evento de clique nos removedores
			$(".xtra-itens-removiveis .xtra-itens-removiveis-removedor").click(removedor_onClick);
			
		}
			
	};
	
	return thisObj;
	
}();

/**
 * Permite que o usuário selecione todos os checkbox de
 * um grupo de uma só vez, através de um checkbox específico.
 * 
 * Classe ativadora: xtra-selecionar-todos
 * 
 * Onde usar: no checkbox que seleciona todos os itens
 * 
 * Requisitos adicionais: data-attribute "grupo-de-checkboxes"
 * com o nome do grupo referente a seleção. Todos os checkboxes
 * impactados pela seleção devem possuir a classe 
 * "xtra-selecionar-todos-item" e o mesmo data-attribute.
 */
XtraComportamentoSelecionarTodos = function () {
	
	var pertencemAoMesmoGrupo = function ($item1, $item2) {
		return $item1.data("grupoDeCheckboxes") == $item2.data("grupoDeCheckboxes");
	};
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			$(".xtra-selecionar-todos", el).click(function () {
				
				var $this = $(this);
				
				// propaga a mudança de seleção
				// para todos os itens do mesmo grupo
				$(".xtra-selecionar-todos-item").each(function () {
					var $thisItem = $(this);
					if (pertencemAoMesmoGrupo($this, $thisItem)) {
						$thisItem.prop("checked", $this.prop("checked"));
						$thisItem.trigger("xtra-comportamento-armazenar-selecao-marcacao-atualizada");
					}
				});
				
			});

			$(".xtra-selecionar-todos-item", el).click(function () {
				
				var $this = $(this);
				
				// qualquer mudança de seleção deve
				// desmarcar o item pai
				$(".xtra-selecionar-todos").each(function () {
					var $thisPai = $(this);
					if (pertencemAoMesmoGrupo($thisPai, $this)) {
						$thisPai.prop("checked", false);
					}
				});
				
			});
			
			// pré-seleciona se existir ao menos um filho e todos
			// estiverem selecionados
			$(".xtra-selecionar-todos", el).each(function () {
				
				var $this = $(this);
				
				var encontrouUmItem = false;
				var encontrouUmItemDesmarcado = false;
				
				$(".xtra-selecionar-todos-item").each(function () {
					var $thisItem = $(this);
					if (pertencemAoMesmoGrupo($this, $thisItem)) {
						encontrouUmItem = true;
						if (!$thisItem.prop("checked")) {
							encontrouUmItemDesmarcado = true;
						}
					}
				});
				
				if (encontrouUmItem && !encontrouUmItemDesmarcado) {
					$this.prop("checked", true);
				}
				
			});
			
		}
			
	};
	
	return thisObj;
	
}();

/**
 * Instala os eventos responsáveis pelos controles
 * de paginação presentes nas grades pagináveis.
 * Vide o partial comum/_paginacao.ftl para mais detalhes.
 * 
 * Classe ativadora: xtra-paginavel
 * 
 * Onde usar: qualquer elemento de bloco
 * 
 * Requisitos adicionais:
 * 
 * - existência de componente de
 * paginação (vide comum/_paginacao.ftl) dentro do
 * componente principal.
 * 
 * - o data-attribute
 * "url-base-paginacao" deve ser configurado para
 * apontar para a URL base dos serviços que devem ser chamados
 * para sinalizar mudanças de páginas e de tamanho.
 * Nessa URL são concatenados os seguintes sufixos:
 * (a) /numero/{numero}
 * (b) /tamanho/{tamanho}
 * 
 * Funcionalidades opcionais:
 * 
 * - um componente do tipo "select", anotado com a
 * classe "xtra-paginavel-trocador-de-tamanho-de-pagina,
 * funcionará como um modificador de tamanho de página.
 * 
 */
XtraComportamentoPaginavel = function () {
	
	var onPaginaCarregada = function () {
		var $paginavel = $(this);
		$paginavel.trigger("xtra-paginavel-pagina-carregada");
	};
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			$(".xtra-paginavel-trocador-de-pagina", el).click(function () {
				
				var $this = $(this);
				var $paginavel = $this.closest(".xtra-paginavel");
				
				// qual página foi solicitada?
				var pagina = $this.data("numeroDaPagina");
				
				// recarrega o componente com
				// a página solicitada
				var url = $paginavel.data("urlBasePaginacao");
				XtraAjax.load($paginavel, url + "/numero/" + pagina, $.proxy(onPaginaCarregada, $paginavel));
				
			});
			
			$(".xtra-paginavel-trocador-de-tamanho-de-pagina", el).change(function () {
				
				var $this = $(this);
				var $paginavel = $this.closest(".xtra-paginavel");
				
				// qual o novo tamanho?
				var tamanho = $this.val();
				
				// recarrega o componente com
				// a página solicitada
				var url = $paginavel.data("urlBasePaginacao");
				XtraAjax.load($paginavel, url + "/tamanho/" + tamanho, $.proxy(onPaginaCarregada, $paginavel));
				
			});
			
		}
		
	};
	
	return thisObj;
	
}();

/**
 * Faz com que o checkbox armazene o estado de
 * seleção de forma que ele se mantenha selecionado
 * mesmo que, via manipulações de DOM, ele saia e
 * volte para a tela. O exemplo mais comum de uso
 * desse comportamento é no caso de páginas de grade
 * que possuam coluna com checkboxes.
 * 
 * Use o método XtraComportamentoArmazenarSelecao.getSelecoes(grupoDeCheckboxes)
 * para obter um array com a seleção atual para o grupo correspondente.
 * 
 * Dispare o evento "xtra-comportamento-armazenar-selecao-marcacao-atualizada" manualmente sempre que
 * o estado de algum checkbox for modificado manualmente em outro ponto do código.
 * 
 * Classe ativadora: xtra-armazenar-selecao
 * 
 * Onde usar: checkboxes
 * 
 * Requisitos adicionais:
 * - data-attribute "grupo-de-checkboxes"
 * para permitir que vários grupos de checkboxes possam usar essa
 * função na mesma tela.
 * - data-attribute "id-registro" para que o comportamento
 * saiba qual o valor atrelado a cada checkbox.
 * 
 * Funcionalidades opcionais:
 * - componente "xtra-armazenar-selecao-total-de-selecoes". Se existente,
 * o comportamento faz com que a cada mudança de seleção, o texto desse
 * componente seja atualizado para vazio (se não houver nenhuma seleção),
 * ou "X registros selecionados".
 */
XtraComportamentoArmazenarSelecao = function () {

	// mapa que armazena o estado atual
	// das seleções de checkboxes da tela
	var selecoes = {};

	// atualiza o componente opcional
	// do total de seleções
	var atualizaTotalDeSelecoes = function () {
		
		// para cada componente encontrado na tela
		$(".xtra-armazenar-selecao-total-de-selecoes").each(function () {
			
			var $thisComponente = $(this);
			
			// obtém o mapa de seleções desse grupo de checkboxes
			var grupoDeSelecoes = $thisComponente.data("grupoDeCheckboxes");
			var conjuntoDeSelecoes = selecoes[grupoDeSelecoes];
			
			// conta o total de seleções
			var totalDeSelecoes = 0;
			for (var selecao in conjuntoDeSelecoes) {
				totalDeSelecoes++;
			}
			
			// constroí o texto correspondente
			// ao total de seleções encontradas
			var texto;
			if (totalDeSelecoes == 0) {
				texto = "Nenhum registro selecionado";
			} else if (totalDeSelecoes == 1) {
				texto = "1 registro selecionado";
			} else {
				texto = totalDeSelecoes + " registros selecionados";
			}
			
			// atualiza o componente
			$thisComponente.text(texto);
			
		});
		
	};
	
	var thisObj = null;

	thisObj = {
		
		aplica: function (el) {
			
			$(".xtra-armazenar-selecao", el).each(function () {
				
				var $this = $(this); 
				var grupoDeCheckboxes = $this.data("grupoDeCheckboxes");
				
				// recupera o objeto de seleções
				// para o grupo atrelado ao checkbox
				if (selecoes[grupoDeCheckboxes] == null) {
					selecoes[grupoDeCheckboxes] = {};
				}
				var conjuntoDeSelecoes = selecoes[grupoDeCheckboxes];
				
				var valorDaSelecao = $this.data("idRegistro");

				// seleciona o checkbox se o valor estiver
				// presente no mapa de seleções correspondente
				// ao grupo
				if (conjuntoDeSelecoes[valorDaSelecao]) {
					$this.prop("checked", true);
				}
				
				var onMarcacaoAtualizada = function () {
					
					// atualiza o conjunto de seleções
					// com o novo estado do checkbox
					if ($this.is(":checked")) {
						conjuntoDeSelecoes[valorDaSelecao] = true;
					} else {
						delete conjuntoDeSelecoes[valorDaSelecao];
					}
					
					atualizaTotalDeSelecoes();
					
				};
				
				// registra evento chamado no clique
				// do checkbox, para alterar o estado
				// no mapa de seleções correspondente ao grupo
				$this.click(onMarcacaoAtualizada);
				$this.on("xtra-comportamento-armazenar-selecao-marcacao-atualizada", onMarcacaoAtualizada);
				
			});
			
			// permite que os componentes de apresentação
			// de total de seleção sejam atualizados na
			// primeira renderização da tela
			atualizaTotalDeSelecoes();
			
		},
		
		getSelecoes: function (grupoDeCheckboxes) {
			var array = [];
			if (selecoes[grupoDeCheckboxes]) {
				for (var selecao in selecoes[grupoDeCheckboxes]) {
					array.push(selecao);
				}
			}
			return array;
		}
		
	};
	
	return thisObj;
	
}();

/**
 * Dispara um evento customizado a partir
 * de qualquer mudança no respectivo input,
 * sem que o usuário necessite sair do campo.
 * 
 * Classe ativadora: xtra-live-change
 * 
 * Onde usar: campos de texto.
 * 
 * Nome do evento customizado: xtra-live-change
 */
XtraComportamentoLiveChange = function () {
	
	var trigger = function () {
		var $this = $(this);
		var data = $this.data();
		var val = $this.val();
		if (data["ultimoLiveChange"] == null || data["ultimoLiveChange"] != val) {
			$this.trigger("xtra-live-change");
			data.ultimoLiveChange = val;
		}
	};
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			var $el = $(el);
			$(".xtra-live-change")
				.change(trigger)
				.keyup(trigger)
				.on("input", trigger);
			
		}
		
	};
	
	return thisObj;
	
}();

/**
 * Apresenta a mensagem de erro e marca
 * o campo como inválido. Essa apresentação
 * é feita da seguinte forma:
 * 
 * (1) Marcação do elemento de bloco
 * "xtra-container-validacao" com a classe 
 * "xtra-container-validacao-invalido".
 * 
 * (2) Atualização do conteúdo do span
 * "xtra-container-validacao-mensagem" com o
 * texto da mensagem de erro.
 * 
 * (3) Quaisquer mudanças que o usuário fizer
 * no conteúdo do campo irá remover a marcação
 * de inválido.
 * 
 * Classe ativadora: "xtra-container-validacao"
 * 
 * Onde usar: em divs ao redor de campos que serão
 * validados de alguma maneira.
 * 
 * Chame o método "registraErro(campo, mensagem)" para
 * marcar o campo como inválido com a respectiva
 * mensagem.
 */
XtraComportamentoContainerValidacao = function () {
	
	var removeMarcacaoDeInvalido = function () {
		
		var $campo = $(this);
		var $container = $campo.closest(".xtra-container-validacao");
		
		// se não existe container podemos parar por aqui
		if ($container.length == 0) {
			return;
		}
		
		// apenas remove a marcação se o valor
		// efetivamente mudou, se o campo suportar
		// o método "val"
		if ($campo.is("input,select,textarea") && !$campo.is("input[type=checkbox]") && $container.data("valorMarcadoComoInvalido") == $campo.val()) {
			return;
		}
		
		// remove marcação de inválido
		$container.removeClass("xtra-container-validacao-invalido");
		
		// limpa a mensagem de erro
		$container.find(".xtra-container-validacao-mensagem").text("");
		
	}
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			var $el = $(el);
			
			// eventos que removem a marcação de inválido
			$(".xtra-container-validacao input").on("xtra-live-change", removeMarcacaoDeInvalido);
			$(".xtra-container-validacao input, .xtra-container-validacao textarea").on("keypress", removeMarcacaoDeInvalido);
			$(".xtra-container-validacao input, .xtra-container-validacao select").change(removeMarcacaoDeInvalido);
			$(".xtra-container-validacao input").on("xtra-file-upload-mudanca", removeMarcacaoDeInvalido);
			
		},
		
		registraErro: function (campo, mensagem) {
				
			var $campo = $(campo);
			
			var $container = $campo.closest(".xtra-container-validacao");
			if ($container.length > 0) {
				
				// marca o container como inválido
				$container.addClass("xtra-container-validacao-invalido");
				
				// mostra a mensagem de erro no elemento específico
				if (mensagem != null) {
					$mensagem = $container.find(".xtra-container-validacao-mensagem");
					$mensagem.html(" " + mensagem);
					$mensagem.prepend($("<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>"));
				}
				
				// registra o valor atual do campo se houver suporte
				if ($campo.is("input,select,textarea")) {
					$container.data("valorMarcadoComoInvalido", $campo.val());
				}
				
			}
			
		},
		
		notificaMudancaDeValor: function (campo) {
			removeMarcacaoDeInvalido.call($(campo));
		}
		
	};
	
	return thisObj;
	
}();

/**
 * Instala todo o comportamento relacionado
 * às seções de "Endereço". Ao digitar o CEP,
 * tenta carregar as informações de "Tipo de Logradouro",
 * "Logradouro", "UF" e "Município". Além disso,
 * ao mudar a "UF", carrega a lista de municípios dessa UF
 * no campo correspondente.
 * 
 * Classe ativadora: xtra-secao-endereco
 * 
 * Onde usar: não deve ser usada diretamente, veja o partial
 * "endereco/_secao.ftl" no projeto comum para detalhes.
 * Esse comportamento faz parte de uma solução completa
 * (controlador, serviço, partial, javascript).
 */
XtraComportamentoSecaoEndereco = function () {
	
	var comboUF_onChange = function () {
		
		var $this = $(this);
		var $secaoEndereco = $this.closest(".xtra-secao-endereco");
		var $containerMunicipio = $secaoEndereco.find(".xtra-secao-endereco-container-municipio");

		var sufixo = $secaoEndereco.data("sufixo") || "";
		var prefixoDTO = $secaoEndereco.data("prefixoDto") || "";
		XtraAjax.load($containerMunicipio, contextPath + "/app/endereco/municipios?idUF=" + $this.val() + "&sufixo=" + sufixo + "&prefixoDTO=" + prefixoDTO);
		
	};

	var cep_onChange = function () {
		
		var $this = $(this);
		var $secaoEndereco = $this.closest(".xtra-secao-endereco");
		
		var cep = $this.val();
		var sufixo = $secaoEndereco.data("sufixo") || "";
		var prefixoDTO = $secaoEndereco.data("prefixoDto") || "";
		
		// recupera o span que contém os campos dependentes
		var $container = $secaoEndereco.find(".xtra-secao-endereco-container-dados-cep");
		
		// atualiza a área com os campos dependentes
		XtraAjax.load($container, contextPath + "/app/endereco/dados-cep?numero=" + cep + "&sufixo=" + sufixo + "&prefixoDTO=" + prefixoDTO);
		
	};

	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			
			// registra evento disparado quando o usuário muda
			// a seleção de UF (deve recarregar os municípios)
			$(".xtra-secao-endereco .xtra-secao-endereco-combo-uf").change(comboUF_onChange);
			
			// registra evento no campo CEP
			
			$(".xtra-secao-endereco .xtra-cep").on("xtra-live-change", function () {
				var $this = $(this);
				$this.executaComDelay(cep_onChange);
			});
			
		},
		
		/**
		 * Extende o objeto passado no primeiro parâmetro
		 * com os dados do formulário de endereço correspondente
		 * à seção do segundo parâmetro, usando o prefixo do
		 * terceiro parâmetro (opcional) em cada chave.
		 * 
		 * Ex: XtraComportamentoSecaoEndereco.extendeComDadosDoFormulario({}, $secao, "abc.");
		 */
		extendeComDadosDoFormulario: function (obj, secao, prefixo) {
			
			var $secao = $(secao);
			
			// normaliza o prefixo
			if (prefixo == undefined || prefixo == null) {
				prefixo = "";
			}
			
			obj[prefixo + "endereco.cep"] = $secao.find("input[name=cep]").val() || "";
			obj[prefixo + "endereco.idTipoDeLogradouro"] = $secao.find("select[name=tipoDeLogradouro]").val() || "";
			obj[prefixo + "endereco.logradouro"] = $secao.find("input[name=logradouro]").val() || "";
			obj[prefixo + "endereco.numero"] = $secao.find("input[name=numero]").val() || "";
			obj[prefixo + "endereco.complemento"] = $secao.find("input[name=complemento]").val() || "";
			obj[prefixo + "endereco.bairro"] = $secao.find("input[name=bairro]").val() || "";
			obj[prefixo + "endereco.idMunicipio"] = $secao.find("select[name=municipio]").val() || "";
			obj[prefixo + "endereco.idUF"] = $secao.find("select[name=uf]").val() || "";
			
		}
			
	};
	
	return thisObj;
}();

/**
 * Transforma um campo hidden em um componente
 * para upload de arquivo. O upload ocorre em um serviço
 * genérico, e um número inteiro é retornado
 * para o campo hidden original. Caso um valor exista
 * no campo hidden originalmente, o componente já
 * funciona de acordo.
 * 
 * Classe ativadora: xtra-file-upload
 * 
 * Onde utilizar: componentes do tipo input[type=hidden]
 */
XtraComportamentoFileUpload = function () {
	
	var doOnUpload = function ($input, arquivo) {
		
		var $spanContainer = $input.closest(".xtra-file-upload-container");
		
    	// armazena o id e chave de acesso
    	// do arquivo persistido no input hidden
		$input.val(arquivo.idArquivo);
		$input.data("chaveDeAcesso", arquivo.chaveDeAcesso);
		$input.data("descricaoDoTamanho", arquivo.descricaoDoTamanho);
    	
    	// substitui os botões por botões
    	// de download e remoção do upload
    	$spanContainer.addClass("xtra-file-upload-preenchido");
    	
    	// dispara evento de mudança no campo
    	$input.trigger("xtra-file-upload-mudanca", arquivo);
		
	};
	
	var configura = function () {
		
		var $this = $(this);
		
		// cria o span de container
		var $spanContainer = $("<span class=\"xtra-file-upload-container\" />");
		$spanContainer.insertAfter($this);

		// cria o campo de upload
		var $campoDeUpload = $("<span class=\"btn btn-default xtra-file-upload-btn-enviar fileinput-button\"> " +
		    "    <i class=\"glyphicon glyphicon-open\"></i> " +
		    "    <span>Enviar</span> " +
		    "    <input type=\"file\" name=\"arquivo\"> " +
		    "</span>");
		
		// cria os botões de download e remoção
		var $botaoDownload = $("<button class=\"btn btn-default xtra-file-upload-btn-download\" title=\"Clique para visualizar o arquivo anexado\"><i class=\"glyphicon glyphicon-search\"></i></button>");
		var $botaoRemover = $("<button class=\"btn btn-default xtra-file-upload-btn-remover left-buffer\" style=\"color: red;\" title=\"Clique para remover o arquivo anexado\"><i class=\"glyphicon glyphicon-remove\"></i></button>");

		// adiciona os elementos criados no DOM,
		// encapsulando o input original dentro do span
		$this.appendTo($spanContainer);
		$campoDeUpload.appendTo($spanContainer);
		$botaoDownload.appendTo($spanContainer);
		$botaoRemover.appendTo($spanContainer);

		var val = $this.val();
		
		// marca o componente como preenchido se
		// o input hidden estiver com algum valor default
		if (val != "") {
			$spanContainer.addClass("xtra-file-upload-preenchido");
		}
		
		// configura o plugin de fileupload
		$campoDeUpload.find("input[type=file]").fileupload({
			url: contextPath + "/app/arquivos",
	        dataType: "json",
	        done: function (e, data) {
	        	doOnUpload($this, data.result);
	        }
	    });
		
		// instala evento para download do arquivo
		$botaoDownload.click(function () {
			var val = $this.val();
			var chaveDeAcesso = $this.data("chaveDeAcesso") || "chave-de-acesso-nao-preenchida";
			window.open(contextPath + "/app/arquivos/" + val + "?chaveDeAcesso=" + chaveDeAcesso);
		});
		
		// instala evento para remover o arquivo relacionado
		$botaoRemover.click(function () {
			XtraConfirmacao("Deseja realmente remover o arquivo anexado?", function (resposta) {
				if (resposta) {
					$this.val("");
					$this.data("chaveDeAcesso", null);
					$this.data("descricaoDoTamanho", null);
					$spanContainer.removeClass("xtra-file-upload-preenchido");
		        	
		        	// dispara evento de mudança no campo
		        	$this.trigger("xtra-file-upload-mudanca", null);
		        	
				}
			});
		});
		
	};
	
	var thisObj = null;
	
	thisObj = {
			
		aplica: function (el) {
			
			$(".xtra-file-upload", el).each(configura);
			
		},
		
		/**
		 * Essa função deve APENAS ser utilizada dentro
		 * das classes de teste de integração.
		 */
		_preenche: function (el, idArquivo, chaveDeAcesso, descricaoDoTamanho) {
			
			$spanContainer = $(el);
			
			// obtém o campo hidden dentro do container
			var $input = $spanContainer.find("input.xtra-file-upload");
			
			doOnUpload($input, {
				idArquivo: idArquivo,
				chaveDeAcesso: chaveDeAcesso,
				descricaoDoTamanho: descricaoDoTamanho
			});
			
		}
			
	};
	
	return thisObj;
}();


/**
 * Configura, em um formulário, um componente
 * seletor de marca modelo de veículos. O código
 * da marca/modelo atualmente selecionado podem
 * ser passados para o componente através dos
 * data-attributes "codigo-selecionado" e 
 * "nome-do-registro-selecionado".
 * 
 * Classe ativadora: xtra-seletor-marca-modelo
 * 
 * Onde utilizar: spans em qualquer formulário
 */
XtraComportamentoSeletorMarcaModelo = function () {
	
	var PopupSelecaoMarcaModelo = function (opts) {
		
		opts = opts || {
			
			// callback a ser chamado quando
			// a seleção for feita
			onMarcaModeloSelecionada: function (codigo, nome) {}
		
		};
		
		var $div = $("<div></div>");
		$div.appendTo(document.body);
		
		var gradeMarcasModelos_onLoad = function () {
			
			// retorna o botão "Confirmar" para o estado
			// desabilitado, pois a seleção acaba de ser perdida
			$div.find(".btn-confirmar-selecao").prop("disabled", true);
			
		};
		
		function btnConfirmarSelecao_onClick() {
			
			var $radioSelecionado = $div.find("input[name=rdoMarcaModelo]:checked");
			var codigo = $radioSelecionado.val();
			var nome = $radioSelecionado.data("nome-do-registro");
			
			// chama o callback
			// caso tenha sido informado
			opts.onMarcaModeloSelecionada(codigo, nome);
			
			// fecha a popup
			$div.children("div").modal("hide");
			
		}
		
		function btnLimparFiltro_onClick() {
			XtraLimparFormulario($div);
		}
		
		function btnPesquisar_onClick() {
			
			// monta o objeto de filtro de acordo com o formulário
			// preenchido pelo usuário
			var filtro = {
				codigo: $("#filtroPorCodigo", $div).val(),
				descricao: $("#filtroPorDescricao", $div).val()
			};
			
			// envia os valores para o serviço de pesquisa
			// no servidor
			$.post(contextPath + "/app/veiculo/marca-modelo/pesquisar", filtro, function () {
				XtraAjax.load(".grade-marcas-modelos", contextPath + "/app/veiculo/marca-modelo/grade", gradeMarcasModelos_onLoad);
			});
			
			return false;
			
		}
		
		function divPopupSelecaoMarcaModelo_onLoad() {
			
			// instala a ação do botão de atribuição
			$div.find(".btn-confirmar-selecao").click(btnConfirmarSelecao_onClick);
			
			// instala a ação do botão pesquisar
			$div.find(".btn-pesquisar").click(btnPesquisar_onClick);
			
			// instala a ação do botão de limpar filtro
			$div.find(".btn-limpar-filtro").click(btnLimparFiltro_onClick);
			
			// instala evento ao trocar de página na grade
			$div.on("xtra-paginavel-pagina-carregada", ".xtra-paginavel", gradeMarcasModelos_onLoad);
			
			// instala evento ao selecionar um registro na grade,
			// disponibilizar o botão de confirmar seleção
			$div.on("change", "input[name=rdoMarcaModelo]", function () {
				$div.find(".btn-confirmar-selecao").prop("disabled", false);
			});
			
			// mostra a popup
			$div.children("div").modal();
			
		};
		
		var thisObj = null;
		thisObj = {
			
			mostra: function () {
				
				// cria o conteúdo da popup chamando
				// o serviço correspondente no servidor
				var url = contextPath + "/app/veiculo/marca-modelo/popup-selecao";
				XtraAjax.load($div, url, divPopupSelecaoMarcaModelo_onLoad);
				
			}
			
		};
		
		return thisObj;
		
	};
	
	var lupa_onClick = function () {
		
		var $this = $(this);
		var $spanContainer = $this.closest(".xtra-seletor-marca-modelo");
		
		// abre a popup para seleção de marca/modelo
		new PopupSelecaoMarcaModelo({
			onMarcaModeloSelecionada: function (codigo, nome) {
				
				// atualiza os data-attributes e etiqueta
				$spanContainer.data("codigoSelecionado", codigo);
				$spanContainer.data("nomeDoRegistroSelecionado", nome);
				$spanContainer.find(".xtra-seletor-marca-modelo-etiqueta").text(nome);
				
				// notifica a mudança de valor permitindo resetar
				// os destaques de campo inválido
				XtraComportamentoContainerValidacao.notificaMudancaDeValor($spanContainer);
				
			}
		}).mostra();
		
	};
	
	var configura = function () {
		
		var $this = $(this);
		var selecao = $this.data("codigoSelecionado");

		// cria o span com a etiqueta de seleção
		var $etiqueta = $("<span class=\"xtra-seletor-marca-modelo-etiqueta\" />");
		
		// monta o texto inicial da descrição
		if (selecao != null && selecao != "") {
			$etiqueta.text($this.data("nomeDoRegistroSelecionado"));
		} else {
			$etiqueta.text("Clique na lupa para selecionar");
		}

		// cria a lupa para abertura da popup de seleção
		var $lupa = $("<button class=\"btn btn-default\" title=\"Clique para procurar a marca/modelo do veículo\"><i class=\"glyphicon glyphicon-search\"></i></button>");

		// instala o evento de clique na lupa para seleção
		$lupa.click(lupa_onClick);
		
		// insere os elementos no DOM
		$this.append($etiqueta);
		$this.append("<span> </span>");
		$this.append($lupa);
		
	};
	
	var thisObj = null;
	
	thisObj = {
			
		aplica: function (el) {
			
			$(".xtra-seletor-marca-modelo", el).each(configura);
			
		}
			
	};
	
	return thisObj;
}();
