
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace todoWebAPI.Models
{
    public class Response
    {
        public bool Success { get; set; }
        public string ResponseMessage { get; set; }



        public recordTable record { get; set; }
        public List<recordTable> Result { get; set; }
    }
}