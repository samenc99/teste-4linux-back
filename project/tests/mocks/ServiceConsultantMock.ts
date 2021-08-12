export class ServiceConsultantMock{
  public selectGeneric  = async(aliases : string[] | string, where={
    id_consultor: 0
  }) => {
    if(where.id_consultor===0)return []
    return ['1','2']
  }
}