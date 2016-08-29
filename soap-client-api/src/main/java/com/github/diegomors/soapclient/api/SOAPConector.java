package com.github.diegomors.soapclient.api;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.Charset;

import javax.xml.soap.MessageFactory;
import javax.xml.soap.MimeHeaders;
import javax.xml.soap.SOAPBody;
import javax.xml.soap.SOAPConnection;
import javax.xml.soap.SOAPConnectionFactory;
import javax.xml.soap.SOAPElement;
import javax.xml.soap.SOAPEnvelope;
import javax.xml.soap.SOAPException;
import javax.xml.soap.SOAPHeader;
import javax.xml.soap.SOAPMessage;
import javax.xml.soap.SOAPPart;

public class SOAPConector {

    public static SOAPMessage sendRequest(SOAPMessage request, String URLEndpoint) throws UnsupportedOperationException, SOAPException, IOException {       
        // Create SOAP Connection
        SOAPConnection soapConnection = SOAPConnectionFactory.newInstance().createConnection();

        // Send SOAP Message to SOAP Server
        SOAPMessage soapResponse = soapConnection.call(request, URLEndpoint);

        // print SOAP Response
        System.out.print("Response SOAP Message:");
        soapResponse.writeTo(System.out);
        System.out.println();
        
        soapConnection.close();
        
        return soapResponse;
    }
    
    public static SOAPMessage setRequest(String actionName, String prefixNamespace, String URINamespace, SOAPElement headerContent, SOAPElement bodyContent) throws SOAPException, IOException {
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage();
        SOAPPart soapPart = soapMessage.getSOAPPart();

        // SOAP Envelope
        SOAPEnvelope envelope = soapPart.getEnvelope();
        envelope.addNamespaceDeclaration(prefixNamespace, URINamespace);
        
        // SOAP Header
        SOAPHeader soapHeader = envelope.getHeader();              
        soapHeader.addChildElement(headerContent);
        
        // SOAP Body
        SOAPBody soapBody = envelope.getBody();        
        soapBody.addChildElement(bodyContent);          

        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", URINamespace + "/" + actionName);

        soapMessage.saveChanges();

        /* Print the request message */
        System.out.print("Request SOAP Message:");
        soapMessage.writeTo(System.out);
        System.out.println();

        return soapMessage;
    }
    
    public static SOAPMessage setRequest(String actionName, String URINamespace, String xmlRequest) throws SOAPException, IOException {
        MessageFactory messageFactory = MessageFactory.newInstance();
        SOAPMessage soapMessage = messageFactory.createMessage(new MimeHeaders(), new ByteArrayInputStream(xmlRequest.getBytes(Charset.forName("UTF-8"))));
        
        MimeHeaders headers = soapMessage.getMimeHeaders();
        headers.addHeader("SOAPAction", URINamespace + "/" + actionName);
        
        soapMessage.saveChanges();
        
        /* Print the request message */
        System.out.print("Request SOAP Message:");
        soapMessage.writeTo(System.out);
        System.out.println();
        
        return soapMessage;
    }
}
