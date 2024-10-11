import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Schedule } from '../../../../models/schedule';
import { RequestValidationError } from '../../../errors/request-validation-errors';

const router = express.Router();

router.post(
    '/api/schedules',
    [
       body('productName')
         .notEmpty()
         .isString()
    ],
    async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array())
        //throw new RequestValidationError(fieldErrors);
    }

    const { companyId, productName, quanity } = req.body;

    const schedule = Schedule.build({ companyId, productName, quanity });
    await schedule.save();

    res.status(201).send(schedule);
  }
);

export { router as createScheduleRouter }