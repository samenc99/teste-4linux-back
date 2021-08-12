import {DatabaseMock} from "./mocks/DatabaseMock";
import {ServiceConsultantMock} from "./mocks/ServiceConsultantMock";
import {verifyHolidayMock} from "./mocks/verifyHolidayMock";
import {SchedulingBusiness} from "../src/business/SchedulingBusiness";
import {SchedulingDTO} from "../src/model/Scheduling";

describe('Scheduling Business', ()=>{
  const database = new DatabaseMock()
  const dbServiceConsultant = new ServiceConsultantMock()
  const scheduling = new SchedulingBusiness(
    {database, dbServiceConsultant, verifyHoliday: verifyHolidayMock}
  )

  describe('toSchedule', ()=>{
    const schedulingDTO : SchedulingDTO = {
      data : '2021-08-12',
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
            {...schedulingDTO, idConsultor: ''}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas ausentes.')
        }
      })
      test('- idServico -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idServico : ''}
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
            {...schedulingDTO, idServico : 'a'}
          )
        }catch (err){
          expect(err.message).toBe('Há entradas fora do padrão.')
        }
      })
      test('- idConsultor -', async()=>{
        expect.assertions(1)
        try {
          await scheduling.toSchedule(
            {...schedulingDTO, idConsultor: 'a'}
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
  })

});