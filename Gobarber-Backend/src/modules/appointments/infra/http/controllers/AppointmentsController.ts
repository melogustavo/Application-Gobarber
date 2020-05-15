// import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    // Deixei aqui comentado so pra eu lembrar no futuro... Como vc ta usando o Joi.Date() ele automaticamente converte o que vc mandar no formato date e por isso nao eh necessario mais usar esse parseIso(), na vdd se vc usar vai dar erro
    // const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentsService);

    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    return response.json(appointment);
  }
}
