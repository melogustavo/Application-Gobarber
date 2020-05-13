// import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 8, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 9, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 10, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 11, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 12, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 13, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 14, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 15, 0, 0),
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 14, 17, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'user',
      user_id: 'useeer',
      date: new Date(2020, 4, 16, 17, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 14, available: false },
        { day: 16, available: true },
        { day: 15, available: true },
      ]),
    );
  });
});
