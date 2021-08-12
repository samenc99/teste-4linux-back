export class DatabaseMock {
  public selectGeneric  = async(aliases : string[] | string, where={}) => {
    return ['1','2']
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