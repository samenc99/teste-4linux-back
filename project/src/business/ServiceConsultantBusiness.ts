import Database from "../data/Database";
import {Request, Response} from 'express';
import {CustomError} from "../errors/CustomError";


export class ServiceConsultantBusiness{
  private database = new Database('rel_servico_consultor')

  getServiceConsultant = async ()=> {
    try {
      const res = await this.database.selectGeneric(
        ['id_servico as idServico', 'id_consultor as idConsultor', 'descricao']
      ).join('servicos', 'rel_servico_consultor.id_servico', 'servicos.id')
      .orderBy('id_servico', 'asc')
      return res
    } catch (err) {
      throw new CustomError(err.statusCode || 500, err.sqlMessage || 'Erro interno, por favor tente novamente mais tarde.')
    }
  }
}