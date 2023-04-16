export const GET_LIST_RECORD = `
  query record {
    Success
    ResponseMessage
    record
    Result {
        Id
        Title
        Detail
        CreatedTime
        EndTime
        Status
    }
  }
 `;
 export const GET_ALL_RECORDS_API = '/api/Record/GetAllRecords';

