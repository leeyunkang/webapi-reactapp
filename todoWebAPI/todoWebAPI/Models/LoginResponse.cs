
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;


namespace todoWebAPI.Models
{
    public class LoginResponse
    {
        public bool Success { get; set; }
        public string ResponseMessage { get; set; }
        public string Username { get; set; }
        public int ErrorCode { get; set; }
        public int UserId { get; set; }
    }
}