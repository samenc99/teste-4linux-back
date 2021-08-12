import {Router} from 'express'
import {SchedullingController} from "../controller/SchedullingController";

const schedullingController = new SchedullingController()
const schedullingRouter = Router()
export default schedullingRouter

schedullingRouter.post('/', schedullingController.toSchedule)
schedullingRouter.get('/', schedullingController.getSchedule)