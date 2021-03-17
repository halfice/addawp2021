//Rextester.Program.Main is the entry point for your code. Don't change it.
//Microsoft (R) Visual C# Compiler version 2.9.0.63208 (958f2354)

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Your code goes here
            HttpWebRequest Req = (Http  ebRequest)WebRequest.Create(@"https://intstg.rta.ae:11084/LATransactionManagementService");

            //SOAPAction
            //Req.Headers.Add("<soapenv:Header><wsse:Security soapenv:mustUnderstand='1' xmlns:wsse='http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd' xmlns:wsu = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd' >" +
            //"<wsse:UsernameToken wsu: Id = 'UsernameToken - 13'> " +
            //"<wsse:Username>DCASStgUser</wsse:Username> " +
            // "<wsse:Password Type = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText'>Dc@$8tgUs4Hd!2</wsse:Password> " +
            //"<wsse:Nonce EncodingType = 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary' >UB4DSmyTLEwIyvg9NXuvjw==</wsse:Nonce> " +
            //"<wsu:Created >2020-12-22T10:20:08.615Z </wsu:Created></wsse:UsernameToken> " +
            "</wsse:Security><lat:externalUsername>AMBULANCE_USER</lat:externalUsername></soapenv:Header>");
            //Content_type
            //Req.ContentType = "text/xml;charset=\"utf-8\"";

            //Req.Accept = "text/xml";
              //HTTP method
            //Req.Method = "POST";
            //return HttpWebRequest
            return Req;
        }
    }
}