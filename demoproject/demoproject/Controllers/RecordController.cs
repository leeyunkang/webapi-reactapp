using demoproject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace demoproject.Controllers
{
    public class RecordController : ApiController
    {
        Entities db = new Entities();

        public string Post(recordTable record)
        {
            db.recordTables.Add(record);
            db.SaveChanges();
          //  var result = new ApiResponse { Result = record, Message = null, Success = true };
            return "Record Added";
        }

        public IEnumerable<recordTable> Get()
        {
            return db.recordTables.ToList();
        }

        public recordTable Get(int id)
        {
            recordTable record = db.recordTables.Find(id);
            return record;
        }

        public string Put(int id, recordTable record)
        {
            var r_ = db.recordTables.Find(id);
            r_.Title = record.Title;
            r_.Detail = record.Detail;
            r_.CreatedTime = record.CreatedTime;
            r_.EndTime = record.EndTime;
            r_.Status = record.Status;

            db.Entry(r_).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return "Record Updated Success";
        }
    }

    internal class ApiResponse
    {
        public recordTable Result { get; set; }
        public object Message { get; set; }
        public bool Success { get; set; }
    }
}
