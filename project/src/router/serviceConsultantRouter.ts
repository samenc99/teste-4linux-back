import {Router} from 'express'
import { ServiceConsultantController } from '../controller/ServiceConsultantController';

const serviceConsultantController = new ServiceConsultantController()
const serviceConsultantRouter = Router()
export default serviceConsultantRouter

serviceConsultantRouter.get('/', serviceConsultantController.getServiceConsultant)