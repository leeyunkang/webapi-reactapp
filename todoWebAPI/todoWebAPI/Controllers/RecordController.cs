using Antlr.Runtime;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Drawing.Printing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Services;
using System.Web.Routing;
using todoWebAPI.Models;

namespace todoWebAPI.Controllers
{
    public class RecordController : ApiController
    {
        projectAdbEntities5 db = new projectAdbEntities5();

        public RecordController()
        {
       
            db.Configuration.ProxyCreationEnabled = false;
        }

        [Route("api/Record/AddRecord/{id}")]
        [HttpPost]
        public Response AddRecord(RecordModel recordModel, int id)
        {
            Response response = new Response();
            recordTable record = new recordTable();
            DateTime now = DateTime.Now;

            record.Id = GenerateUniquerecordId();
            record.Title = recordModel.Title;
            record.Detail = recordModel.Detail;
            record.CreatedTime = now;
            record.EndTime = recordModel.EndTime;
            record.Status = recordModel.Status;

            record.UserID = id;

            if (record != null)
            {
                db.recordTables.Add(record);
                db.SaveChanges();
                response.Success = true;
                response.ResponseMessage = "Record Added";
            }
            else
            {
                response.Success = false;
                response.ResponseMessage = "Some error occurred";
            }

            return response;
        }

        [Route("api/Record/UpdateRecord/{id}")]
        [HttpPost]
        public Response UpdateRecord(RecordModel recordModel, int id)
        {
            Response response = new Response();
            recordTable record = db.recordTables.FirstOrDefault(r => r.UserID == id);
            DateTime now = DateTime.Now;
            if (record != null)
            {

                record.Title = recordModel.Title;
                record.Detail = recordModel.Detail;
                record.Status = recordModel.Status;
                record.CreatedTime = recordModel.CreatedTime;
                record.EndTime = now;
                db.SaveChanges();
                response.Success = true;
                response.ResponseMessage = "Record Updated";


            }
            else {

                recordTable newRecord = new recordTable();
                newRecord.Id = id;
                newRecord.Title = recordModel.Title;
                newRecord.Detail = recordModel.Detail;
                newRecord.CreatedTime = now;
                newRecord.EndTime = now;
                newRecord.Status = recordModel.Status;
                newRecord.UserID = id;
                db.recordTables.Add(newRecord);
                db.SaveChanges();
                response.Success = true;
                response.ResponseMessage = "New Record Inserted";

            }

            return response;
        } 

        [Route("api/Record/GetAllRecords")]
        [HttpGet]
        public Response GetRecord()
        {
            Response response = new Response();
            List<recordTable> listRecord = new List<recordTable>();
            listRecord = db.recordTables.ToList();
            response.Success = true;
            response.ResponseMessage = "Success";
            response.Result = listRecord;

            return response;
        }

        [Route("api/Record/GetAllUserRecords/{id}")]
        [HttpPost]
        public Response GetUserRecord(int id)
        {
            
            Response response = new Response();
            List<recordTable> listRecord = new List<recordTable>();
            listRecord = db.recordTables.Where(m => m.UserID == id).ToList();
            response.Success = true;
            response.ResponseMessage = "Success";
            response.Result = listRecord;

            return response;
        }







        private int GenerateUniquerecordId()
        {
            int maxrecordId = db.recordTables.Max(m => m.Id);
            int uniqueId = (maxrecordId + 1) % (maxrecordId + 2);
            return uniqueId;
        }




    }
    }
