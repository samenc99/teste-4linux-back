export type AgendamentoDTO = {
  data : any,
  idConsultor  : any,
  idServico : any,
  emailCliente : any
}

export type AgendamentoInputDB = {
  data : Date,
  id_consultor : number,
  id_servico : number,
  email_cliente : string
}

export type AgendamentoDB = {
  id : number,
  data : Date
  id_consultor : number,
  id_servico : number,
  email_cliente : string
}

export type AgendamentoOutput  = {
  id : number,
  data : Date,
  idConsultor : number,
  idServico : number,
  emailCliente : string
}

export const DTOtoInputDB = (dto : AgendamentoDTO) : AgendamentoInputDB=>{
  return {
    email_cliente : dto.emailCliente,
    data : dto.data,
    id_consultor : dto.idConsultor,
    id_servico : dto.idServico
  }
}

export const DBtoOutput = (db : AgendamentoDB) : AgendamentoOutput =>{
  return {
    emailCliente : db.email_cliente,
    data : db.data,
    id : db.id,
    idConsultor : db.id_consultor,
    idServico : db.id_servico
  }
}