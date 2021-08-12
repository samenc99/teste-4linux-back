import {DatabaseMock} from "./mocks/DatabaseMock";
import {ServiceConsultantMock} from "./mocks/ServiceConsultantMock";
import {verifyHolidayMock} from "./mocks/verifyHolidayMock";
import {SchedulingBusiness} from "../src/business/SchedulingBusiness";
import {QueryDTO, SchedulingDTO} from "../src/model/Scheduling";

describe('Scheduling Business', ()=>{
  const database = new DatabaseMock()
  const dbServiceConsultant = new ServiceConsultantMock()
  const scheduling = new SchedulingBusiness(
    {database, dbServiceConsultant, verifyHoliday: verifyHolidayMock}
  )

  describe('toSchedule', ()=>{
    const schedulingDTO : SchedulingDTO = {
      data : new Date(),
      emailCliente: 'sam@gmail.com',
      idConsultor: 1,
      idServico: 1
    }

    describe('Error: Há entradas ausentes.', ()=>{
      test('- data -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, data : ''}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas ausentes.')
        }
      })
      test('- emailCliente -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, emailCliente:''}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas ausentes.')
        }
      })
      test('- idConsultor -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idConsultor: undefined}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas ausentes.')
        }
      })
      test('- idServico -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idServico : undefined}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas ausentes.')
        }
      })
    })

    describe('Error: Há entradas fora do padrão.',()=>{
      test('- emailCliente -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, emailCliente: 'sam'}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas fora do padrão.')
        }
      })
      test('- data -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, data : '2021-08-32'}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas fora do padrão.')
        }
      })
      test('- idServico -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idServico : ''}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas fora do padrão.')
        }
      })
      test('- idConsultor -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idConsultor: ''}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas fora do padrão.')
        }
      })
    })

    describe('Error: Não há um serviço deste associado a este consultor.', ()=>{
      test('Não há um serviço deste associado a este consultor.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idConsultor: 0}
          )
        }catch (err){
          expect(err.message).toBe('Não há um serviço deste associado a este consultor.')
        }
      })
    })

    describe('Error: data', ()=>{
      test('Data não pode ser um feriado.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, data: '2021-08-11'}
          )
        }catch (err){
          expect(err.message).toBe('Data não pode ser um feriado.')
        }
      })
      test('Erro ao verificar se a data é feriado ou não,' +
        ' por favor tente novamente mais tarde.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO}
          )
        }catch (err){
          expect(err.message).toBe('Erro ao verificar se a data é feriado ou não,' +
            ' por favor tente novamente mais tarde.')
        }
      })
      test('Erro ao verificar se a data é feriado ou não,' +
        ' por favor tente novamente mais tarde.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO}
          )
        }catch (err){
          expect(err.message).toBe('Erro ao verificar se a data é feriado ou não,' +
            ' por favor tente novamente mais tarde.')
        }
      })
    })

    describe('Sucessfull', ()=>{
      test('Sucessfull', async()=>{
        await scheduling.toSchedule(
          {...schedulingDTO, data: '2021-08-14'}
        )
      })
    })
  })

  describe('getSchedule', ()=>{
    const query : QueryDTO = {
      data : '2021-08-12',
      idServico: '1',
      idConsultor: '1'
    }

    describe('Error: query', ()=>{
      test('Ao menos um parâmetro é necessário.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.getSchedule({})
        }catch (err){
          expect(err.message).toBe('Ao menos um parâmetro é necessário.')
        }
      })
      test('Data inválida.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.getSchedule({data: '2021-08-35'})
        }catch (err){
          expect(err.message).toBe('Data inválida.')
        }
      })
      test('idConsultor precisa ser um número.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.getSchedule({idConsultor:'a'})
        }catch (err){
          expect(err.message).toBe('idConsultor precisa ser um número.')
        }
      })
      test('idServico precisa ser um número.', async()=>{
        expect.assertions(1)
        try {
          await scheduling.getSchedule({idServico:'a'})
        }catch (err){
          expect(err.message).toBe('idServico precisa ser um número.')
        }
      })
    });

    describe('Error: Não a agendamentos disponíveis para os' +
      ' parâmetros informados.', ()=>{
      test('Não a agendamentos disponíveis para os' +
      ' parâmetros informados.', async ()=>{
        expect.assertions(1)
        try {
          await scheduling.getSchedule({idConsultor: '0'})
        }catch (err){
          expect(err.message).toBe('Não a agendamentos disponíveis para os' +
          ' parâmetros informados.')
        }
      })
    });

    describe('Successful', ()=>{
      test('Successful', async()=>{
        const res = await scheduling.getSchedule(query)
          expect(res).toEqual([
            {id:1, data:'2021-08-12', idConsultor:1, idServico:1, emailCliente: 'sam@gmail.com'},
            {id:2, data:'2021-08-12', idConsultor:2, idServico:2, emailCliente: 'sam@gmail.com'}
          ])
      })
    })

  })

});