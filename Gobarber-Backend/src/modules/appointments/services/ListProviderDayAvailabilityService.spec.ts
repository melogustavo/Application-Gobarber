// import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'userr',
      date: new Date(2020, 4, 14, 17, 0, 0),
    });

    // Esse date aqui eh um mes a menos para dar o mes que vc quer... entao ai no caso vc ta fazendo para o mes 5
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: '123456',
      date: new Date(2020, 4, 14, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 14, 11, 0, 0).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 14,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 17, available: false },
        { hour: 15, available: false },
        { hour: 10, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
