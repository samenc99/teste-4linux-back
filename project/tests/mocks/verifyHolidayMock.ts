export const verifyHolidayMock=(date : Date):number=>{
  const d = new Date()
  if(date.getDate()<d.getDate())return -1
  if(date.getDate()===d.getDate())return 0
  return 1
}