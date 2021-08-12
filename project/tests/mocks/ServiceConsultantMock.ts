export class ServiceConsultantMock{
  public selectGeneric  = async(aliases : string[] | string, where={
    idConsultor: 0
  }) => {
    if(where.idConsultor)return []
    return ['1','2']
  }
}