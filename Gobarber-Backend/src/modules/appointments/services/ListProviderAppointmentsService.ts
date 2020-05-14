import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IappointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IappointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequestDTO): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, day, year, month },
    );

    return appointments;
  }
}

export default ListProviderAppointmentsService;
