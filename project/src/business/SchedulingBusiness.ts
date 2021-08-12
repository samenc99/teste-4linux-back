import Database from "../data/Database";
import {SchedulingDTO, DTOtoInputDB} from "../model/Scheduling";
import {CustomError} from "../errors/CustomError";
import validateDate from "../services/validateDate";
import validateEmail from "../services/validateEmail";
import api from "../services/api";

type SchedulingMock = {
  database : any,
  dbServiceConsultant: any,
  holiday : any
}

export class SchedulingBusiness {
  private database : any
  private dbServiceConsultor : any
  private holiday : any

  constructor(mock?:SchedulingMock) {
    this.database = mock?.database || new Database('agendamento')
    this.dbServiceConsultor = mock?.dbServiceConsultant || new Database('rel_servico_consultor')
    this.holiday = mock?.holiday || this.verifyHoliday
  }


  toSchedule = async(dto : SchedulingDTO)=>{
    try {
      if(!dto  || !dto.data || !dto.idServico || !dto.idConsultor || !dto.emailCliente){
        throw new CustomError(400, 'Há entradas ausentes.')
      }
      if(isNaN(dto.idConsultor) || isNaN(dto.idServico) ||
        !validateDate(dto.data) || !validateEmail(dto.emailCliente)){
        throw new CustomError(400, 'Há entradas fora do padrão.')
      }

      const [serviceConsultant] = await this.dbServiceConsultor.selectGeneric(
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

  private verifyHoliday = async(date : Date):Promise<number>=>{
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