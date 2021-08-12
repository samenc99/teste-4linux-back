import {SchedulingBusiness} from "../business/SchedulingBusiness";
import {Request, Response} from "express";

export class SchedullingController{
  private schedullingBusiness = new SchedulingBusiness()

  toSchedule = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.schedullingBusiness.toSchedule(req.body)
      res.status(201).send()
    } catch (err) {
      res.status(err.statusCode).send({message: err.message})
    }
  }

  getSchedule = async (req: Request, res: Response): Promise<any> => {
    try {
      const schedules = await this.schedullingBusiness.getSchedule(req.query)
      res.status(200).send({schedules})
    } catch (err) {
      res.status(err.statusCode).send({message: err.message})
    }
  }

}