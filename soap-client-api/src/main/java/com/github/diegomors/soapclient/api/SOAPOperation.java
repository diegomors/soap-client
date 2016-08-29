package com.github.diegomors.soapclient.api;

import java.io.IOException;
import java.util.Map;

import javax.xml.soap.MessageFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

public abstract class SOAPOperation {
    
    protected SOAPEnvelope envelope;
    protected String URLEndpoint;
    protected String prefixNamespace;
    protected String URINamespace;
    
    public abstract SOAPElement getHeader(Map<String, String> parameters) throws SOAPException;
    public abstract SOAPElement getBody(Map<String, String> parameters) throws SOAPException;    
    
    public void init(String urlEndpoint, String prefixoNamespace, String uriNamespace) throws SOAPException {        
        this.URLEndpoint = urlEndpoint;
        this.prefixNamespace = prefixoNamespace;
        this.URINamespace = uriNamespace;
        
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        SOAPPart soapPart = soapMessage.getSOAPPart();
        
        // SOAP Envelope
        this.envelope = soapPart.getEnvelope();
        this.envelope.addNamespaceDeclaration(this.prefixNamespace, this.URINamespace);
    }    
    
    public SOAPMessage execute(String actionName, Map<String,String> parameters) throws SOAPException, IOException {
        SOAPMessage request = SOAPConector.setRequest(actionName, this.prefixNamespace, this.URINamespace, this.getHeader(parameters), this.getBody(parameters));
        return SOAPConector.sendRequest(request, this.URLEndpoint);
    }
    
    public SOAPMessage execute(String actionName, String xmlRequest) throws SOAPException, IOException {
        SOAPMessage request = SOAPConector.setRequest(actionName, this.URINamespace, xmlRequest);
        return SOAPConector.sendRequest(request, this.URLEndpoint);
    }
}
