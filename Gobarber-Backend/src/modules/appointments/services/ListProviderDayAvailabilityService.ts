import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IappointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

// Em interface nao tem como vc declarar ela como um tipo de array, mas vc pode fazer da forma abaixo que vai funcionar
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IappointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      },
    );

    const hourStart = 8;

    // Ele vai retornar um array assim [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const currentDate = new Date(Date.now());

    // Consolidando as informacoes
    const availability = eachHourArray.map((hour) => {
      // Nos appointments que vc buscou la em cima, o typeORM ta trazendo apenas aquilo que existe no banco de dados...
      // Nesse metodo acima do .map vc vai ta passando por cada hora que vc criou na mao o array, e ai tentando achar a hour para o appointment... se nao existir nenhum appointment que seja igual a variavle hour (eh o que vem do map) ai ele retorna false, se existir ele retorna true... e ai no final quando vc der o return vc vai inverter o valor delas, para que quando ele encontrar o horario nos appointments ele considerar como false ja que o horario vai estar ocupado
      // Esse mesmo raciocionio eh o utilizado la no list provider month
      const hasAppointmentInHour = appointments.find(
        (appointment) => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
