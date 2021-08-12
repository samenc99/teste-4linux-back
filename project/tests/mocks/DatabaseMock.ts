export class DatabaseMock {
  public selectGeneric  = async(aliases : string[] | string, where={
    id_consultor: 0
  }) => {
    if(where.id_consultor===0)return []
    return [
      {id:1, data:'2021-08-12', id_consultor:1, id_servico:1, email_cliente: 'sam@gmail.com'},
      {id:2, data:'2021-08-12', id_consultor:2, id_servico:2, email_cliente: 'sam@gmail.com'}
    ]
  }
  public insertGeneric = async(data : {}) =>{
    return
  }
  public deleteGeneric = async(where : {})=>{
    return
  }
  public updateGeneric = async(data : {},where : {})=>{
    return
  }
}