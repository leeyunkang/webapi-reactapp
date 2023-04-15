using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using todoWebAPI.Models;

namespace todoWebAPI.Controllers
{
    public class LoginController : ApiController
    {
        projectAdbEntities5 db = new projectAdbEntities5();

        [Route("api/Auth/Login")]
        [HttpPost]
        public LoginResponse AuthLogin(LoginModel loginModel)
        {
            LoginResponse response = new LoginResponse();
            userLoginTable userTable = new userLoginTable();

            var auth = db.userLoginTables.FirstOrDefault(m => m.Username == loginModel.Username && m.Password == loginModel.Password);
            if (auth != null && loginModel != null)
            {
                response.Success = true;
                response.ResponseMessage = "Login Successfully";
                response.Username = loginModel.Username;
                response.UserId = auth.UserID;
            }
            else if (auth == null)
            {
                response.Success = false;
                response.ResponseMessage = "Incorrect Username or Password";
                response.ErrorCode = -1;
            }
            else
            {
                response.Success = false;
                response.ResponseMessage = "Some error occurred";
                response.ErrorCode = -100;
            }

            return response;
        }

        [Route("api/Auth/Register")]
        [HttpPost]
        public LoginResponse AddNewUser(LoginModel loginModel)
        {
            LoginResponse response = new LoginResponse();
            userLoginTable userTable = new userLoginTable();

            var exist = db.userLoginTables.FirstOrDefault(m => m.Username == loginModel.Username);

            userTable.Username = loginModel.Username;
            userTable.Password = loginModel.Password;
            userTable.UserID = GenerateUniqueId();

            if (userTable != null && exist == null)
            {
                db.userLoginTables.Add(userTable);
                db.SaveChanges();
                response.Success = true;
                response.ResponseMessage = "User Added";
            }
            else if (exist != null)
            {
                response.Success = false;
                response.ResponseMessage = "Username already exists";
            }
            else
            {
                response.Success = false;
                response.ResponseMessage = "Some error occurred";
            }

            return response;
        }

        private int GenerateUniqueId()
        {
            int maxUserId = db.userLoginTables.Max(m => m.UserID);
            int uniqueId = (maxUserId + 1) % (maxUserId + 2);
            return uniqueId;
        }
    }
}