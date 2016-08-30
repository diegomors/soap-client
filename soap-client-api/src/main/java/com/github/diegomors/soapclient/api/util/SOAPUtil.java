package com.github.diegomors.soapclient.api.util;

import java.io.StringWriter;

import javax.xml.soap.SOAPMessage;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.JSONObject;
import org.json.XML;

public class SOAPUtil {
    
    public static int PRETTY_PRINT_INDENT_FACTOR = 4;
    
    public static String SOAPMessageToStringXML(SOAPMessage message) {
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
    
    public static String SOAPMessageToStringJSON(SOAPMessage message) {
        try {
            String sw = SOAPUtil.SOAPMessageToStringXML(message);
            
            JSONObject xml2JSON = XML.toJSONObject(sw);
            String jsonFormatted = xml2JSON.toString(PRETTY_PRINT_INDENT_FACTOR);
            
            return jsonFormatted;
        } catch (Exception e) {
            return null;
        }        
    }
}
