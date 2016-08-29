package com.github.diegomors.soapclient.api.util;

import java.io.StringWriter;

import javax.xml.soap.SOAPMessage;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

public class SOAPUtil {
    
    public static String SOAPMessageToString(SOAPMessage message) {
        try {
            StringWriter sw = new StringWriter();
            
            TransformerFactory.newInstance().newTransformer().transform(
                    new DOMSource(message.getSOAPPart()),
                    new StreamResult(sw));
            
            return sw.toString();
        } catch (Exception e) {
            return null;
        }        
    }
}
