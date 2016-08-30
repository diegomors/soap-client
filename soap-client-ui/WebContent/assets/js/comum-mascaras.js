
/**
 * Este singleton é responsável por instalar
 * e configurar todas as máscaras dos campos
 * do sistema. O método "aplica" é chamado 
 * não somente no load inicial, mas em todas
 * as substituições de DOM.
 */
XtraMascaras = function () {
	
	function aplicaMascaraPlaca(el) {
		$("input.xtra-placa").inputmask({ "mask": "AAA-9999" });
	}
	function aplicaMascaraIE(el) {
		$("input.xtra-ie", el).inputmask({ "mask": "999999999" });
	}
	function aplicaMascaraPeriodo(el) {
		$("input.xtra-periodo", el).inputmask({ "mask": "99/9999" });
	}
	
	function aplicaMascaraCEP(el) {
		$("input.xtra-cep", el).inputmask({ "mask": "99.999-999" });
	}
	
	function aplicaMascaraNumeroInteiro(el) {
		$("input.xtra-numero-inteiro", el).inputmask({ "mask": "9", "repeat": 9, "greedy": false });
		$("input.xtra-numero-inteiro-longo", el).inputmask({ "mask": "9", "repeat": 18, "greedy": false });
	}
	
	function aplicaMascaraNumeroDecimal(el) {
		$("input.xtra-numero-decimal", el).maskMoney({ thousands: ".", decimal: ",", allowZero: false });
	}

	function aplicaMascaraSeletorData(el) {
		var $seletores = $("input.xtra-seletor-data", el);
		$seletores.datepicker({ format: "dd/mm/yyyy", language: "pt-BR", "todayHighlight": true, "autoclose": true });
		$seletores.inputmask("dd/mm/yyyy", { "clearIncomplete" : true, "showMaskOnHover": false, "showMaskOnFocus": false });
	}

	function aplicaMascaraCPFCNPJ(el) {
		$("input.xtra-cpf", el).inputmask({ "mask": "999.999.999-99" });
		$("input.xtra-cnpj", el).inputmask({ "mask": "99.999.999/9999-99" });
		$("input.xtra-cpf-cnpj", el).inputmask({ "mask": [ "999.999.999-99", "99.999.999/9999-99" ] });
	}

	function aplicaMascaraTelefone(el) {
		
		// para cada campo de telefone
		// encontrado no contexto atual
		$(".xtra-telefone", el).each(function () {
			
			var $this = $(this);
			var val = $this.val();
			
			// identifica a máscara inicial
			// com base no valor atual do campo
			var config = { 
				mask: val == null || val.length < 15 ? "(99) 9999-9999[9]" : "(99) 99999-9999",
				greedy: false
			};
			
			// função que ajusta a máscara para
			// 9 dígitos se assim for necessário
			var fnAjustaMascara = function (event) {
			    var target, phone, el;
			    target = (event.currentTarget) ? event.currentTarget : event.srcElement;
			    phone = target.value.replace(/\D/g, '');
			    el = $(target);
			    if(phone.length > 10) {
			    	config.mask = "(99) 99999-9999";
			    	el.inputmask(config);
			    } else {
			    	config.mask = "(99) 9999-9999[9]";
			    	el.inputmask(config);
			    }
			};
			
			// instala o comportamento nos campos
			// marcados com "xtra-telefone"
			$this.inputmask(config).keyup(fnAjustaMascara).blur(fnAjustaMascara).change(fnAjustaMascara);
			
		});
		
	}
	
	var thisObj = null;
	
	thisObj = {
		
		aplica: function (el) {
			aplicaMascaraNumeroInteiro(el);
			aplicaMascaraNumeroDecimal(el);
			aplicaMascaraSeletorData(el);
			aplicaMascaraCPFCNPJ(el);
			aplicaMascaraTelefone(el);
			aplicaMascaraCEP(el);
			aplicaMascaraPlaca(el);
			aplicaMascaraIE(el);
			aplicaMascaraPeriodo(el);
		}
			
	};
	
	return thisObj;
	
}();
