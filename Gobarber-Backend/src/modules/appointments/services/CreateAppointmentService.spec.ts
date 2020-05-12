import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentsService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123456',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123456',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
