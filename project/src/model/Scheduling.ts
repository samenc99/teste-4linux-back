export type SchedulingDTO = {
  data : any,
  idConsultor  : any,
  idServico : any,
  emailCliente : any
}

export type SchedulingInputDB = {
  data : Date,
  id_consultor : number,
  id_servico : number,
  email_cliente : string
}

export type SchedulingDB = {
  id : number,
  data : Date
  id_consultor : number,
  id_servico : number,
  email_cliente : string
}

export type SchedulingOutput  = {
  id : number,
  data : Date,
  idConsultor : number,
  idServico : number,
  emailCliente : string
}

export const DTOtoInputDB = (dto : SchedulingDTO) : SchedulingInputDB=>{
  return {
    email_cliente : dto.emailCliente,
    data : dto.data,
    id_consultor : dto.idConsultor,
    id_servico : dto.idServico
  }
}

export const DBtoOutput = (db : SchedulingDB) : SchedulingOutput =>{
  return {
    emailCliente : db.email_cliente,
    data : db.data,
    id : db.id,
    idConsultor : db.id_consultor,
    idServico : db.id_servico
  }
}

export type QueryDTO = {
  data ?: string,
  idServico ?: string,
  idConsultor ?: string
}

export type QueryDB = {
  data ?: string,
  id_servico ?: number,
  id_consultor? : number
}