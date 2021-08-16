import { Response, Request} from "express"
import { ServiceConsultantBusiness } from "../business/ServiceConsultantBusiness"
import { CustomError } from "../errors/CustomError"

export class ServiceConsultantController{

  private serviceConsultantBusiness = new ServiceConsultantBusiness()

  getServiceConsultant = async(req: Request, res: Response)=>{
    try{
      const servicosConsultores = await this.serviceConsultantBusiness.getServiceConsultant()
      res.status(200).send({servicosConsultores})
    }catch(err){
      throw new CustomError(err.statusCode, err.message)
    }
  }
}