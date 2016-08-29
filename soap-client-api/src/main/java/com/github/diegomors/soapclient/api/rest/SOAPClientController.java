package com.github.diegomors.soapclient.api.rest;

import javax.xml.soap.SOAPMessage;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.diegomors.soapclient.api.SOAPOperation;
import com.github.diegomors.soapclient.api.SOAPOperationImpl;
import com.github.diegomors.soapclient.api.util.PropriedadesAPI;
import com.github.diegomors.soapclient.api.util.SOAPUtil;

@RestController
@RequestMapping("")
public class SOAPClientController {

    @RequestMapping(value = { "", "/help" }, method = RequestMethod.GET)
    public String help() {
        return PropriedadesAPI.obterPropriedade("configuracao.help.URL");
    }

    @RequestMapping(value = "/request", method = RequestMethod.GET, produces = "text/xml")
    public String consultarPorXML(@RequestParam("endpoint") String URLEndpoint,
            @RequestParam("action") String actionName, @RequestParam("pfx-ns") String prefixNamespace,
            @RequestParam("uri-ns") String URINamespace, @RequestParam("xml") String xml) {
        try {
            SOAPOperation cliente = new SOAPOperationImpl();
            cliente.init(URLEndpoint, prefixNamespace, URINamespace);

            SOAPMessage response = cliente.execute(actionName, xml);

            return SOAPUtil.SOAPMessageToString(response);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
