import Database from "../data/Database";
import {DTOtoInputDB, QueryDB, QueryDTO, SchedulingDB, SchedulingDTO, SchedulingOutput} from "../model/Scheduling";
import {CustomError} from "../errors/CustomError";
import validateDate from "../services/validateDate";
import validateEmail from "../services/validateEmail";
import api from "../services/api";

type SchedulingMock = {
  database : any,
  dbServiceConsultant: any,
  verifyHoliday : any
}

export class SchedulingBusiness {
  private database = new Database('agendamento')
  private dbServiceConsultant = new Database('rel_servico_consultor')
  private readonly verifyHoliday : any

  constructor(mock?:SchedulingMock) {
    if(mock){
      this.database = mock.database
      this.dbServiceConsultant = mock.dbServiceConsultant
      this.verifyHoliday = mock.verifyHoliday
    }
    else{
      this.verifyHoliday = this.holiday
    }
  }


  toSchedule = async(dto : SchedulingDTO)=>{
    try {
      if(!dto  || !dto.data || dto.idServico===undefined || dto.idConsultor===undefined || !dto.emailCliente){
        throw new CustomError(400, 'Há entradas ausentes.')
      }
      if(dto.idConsultor==='' || dto.idServico==='' ||
        isNaN(Number(dto.idConsultor)) || isNaN(dto.idServico) ||
        !validateDate(dto.data) || !validateEmail(dto.emailCliente)){
        throw new CustomError(400, 'Há entradas fora do padrão.')
      }

      const [serviceConsultant] = await this.dbServiceConsultant.selectGeneric(
        '*', {id_servico: dto.idServico, id_consultor: dto.idConsultor}
      )
      if(!serviceConsultant){
        throw new CustomError(404, 'Não há um serviço deste associado a este consultor.')
      }

      const verifyHoliday = await this.verifyHoliday(new Date(dto.data))
      if(verifyHoliday===-1){
        throw new CustomError(403, 'Data não pode ser um feriado.')
      }
      else if(verifyHoliday===0){
        throw new CustomError(500, 'Erro ao verificar se a data é feriado ou não,' +
          ' por favor tente novamente mais tarde.')
      }

      await this.database.insertGeneric(DTOtoInputDB(dto))

    }catch (err){
      if(err.sqlMessage?.includes('Duplicate entry')){
        throw new CustomError(403, 'Já há um agendamento para esta data com este consultor.')
      }
      throw new CustomError(
        err.statusCode || 500,
        err.message || 'Erro interno, por favor tente novamente mais tarde.')
    }
  }

  getSchedule = async(dto : QueryDTO):Promise<SchedulingOutput[]>=>{
    try {
      if(!dto || (!dto.data && !dto.idServico && !dto.idConsultor)){
        throw new CustomError(400, 'Ao menos um parâmetro é necessário.')
      }

      const query : QueryDB = {}

      if(dto.data){
        if(validateDate(dto.data)){
          throw new CustomError(400, 'Data inválida.')
        }
        query.data = new Date(dto.data)
      }
      if(dto.idConsultor){
        if(isNaN(Number(dto.idConsultor))){
          throw new CustomError(400, 'idConsultor precisa ser um número.')
        }
        query.id_consultor = Number(dto.idConsultor)
      }
      if(dto.idServico){
        if(isNaN(Number(dto.idServico))){
          throw new CustomError(400, 'idServico precisa ser um número.')
        }
        query.id_servico = Number(dto.idServico)
      }

      const schedulings : SchedulingDB[] = await this.database.selectGeneric(
        ['id', 'data', 'id_consultor', 'id_servico', 'email_cliente'],
        query
      )
      if(schedulings.length===0){
        throw new CustomError(404, 'Não a agendamentos disponíveis para os ' +
          'parâmetros informados.')
      }

      return schedulings.map((scheduling) => {
        return {
          id: scheduling.id,
          idConsultor: scheduling.id_consultor,
          idServico: scheduling.id_servico,
          data: scheduling.data,
          emailCliente: scheduling.email_cliente
        }
      })
    }catch (err){
      throw new CustomError(
        err.statusCode || 500,
        err.message || 'Erro interno, por favor tente novamente mais tarde.'
      )
    }
  }

  private holiday = async(date : Date):Promise<number>=>{
    try{
      const res = await api.get(`/${date.getFullYear().toString()}`)
      for(const obj of res.data){
        if(obj?.date === date.toISOString().slice(0,10))return -1
      }
      return 1
    }catch (err){
      return 0
    }
  }

}