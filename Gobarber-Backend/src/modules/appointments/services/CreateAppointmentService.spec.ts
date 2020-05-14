import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentsService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();

    createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(2021, 1, 1, 10),
      provider_id: '123456',
      user_id: '111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 1, 1, 10);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
      user_id: '1111',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123456',
        user_id: '1111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 11),
        provider_id: '123456',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 7),
        provider_id: '123456',
        user_id: '11111',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2021, 4, 10, 18),
        provider_id: '123456',
        user_id: '11111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
