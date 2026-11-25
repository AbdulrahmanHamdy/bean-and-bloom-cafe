import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ReservationData } from '../types';
import { CalendarCheck, Users, Clock, CheckCircle, Sparkle } from '@phosphor-icons/react';

export const ReservationForm: React.FC = () => {
  const [confirmed, setConfirmed] = useState<ReservationData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationData>({
    defaultValues: {
      guests: 2,
      zone: 'Indoor Cozy Lounge',
      time: '18:00',
    },
  });

  const onSubmit = async (data: ReservationData) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Reservation booked:', data);
    setConfirmed(data);
    reset();
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#23140E]/10 rounded-2xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(35,20,14,0.06)]">
      {confirmed ? (
        <div className="p-8 rounded-2xl bg-[#EBF0E8] border border-[#7B8F71]/30 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#7B8F71] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle size={32} weight="fill" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-[#23140E]">
            Table Reserved for {confirmed.name}!
          </h3>
          <p className="text-sm text-[#23140E]/80 max-w-md mx-auto">
            We are delighted to welcome you to our {confirmed.zone} on{' '}
            <strong className="text-[#23140E]">{confirmed.date}</strong> at{' '}
            <strong className="text-[#23140E]">{confirmed.time}</strong> for{' '}
            <strong className="text-[#23140E]">{confirmed.guests} guests</strong>.
          </p>
          <div className="p-3.5 bg-white/70 rounded-xl text-xs text-[#23140E]/70 max-w-sm mx-auto">
            A confirmation SMS &amp; WhatsApp note have been sent to {confirmed.phone}.
          </div>
          <button
            onClick={() => setConfirmed(null)}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#23140E] text-white hover:bg-[#C88342] transition-colors shadow-sm"
          >
            Make Another Reservation
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-[#23140E]/10">
            <Sparkle size={18} weight="fill" className="text-[#C88342]" />
            <h3 className="font-heading font-semibold text-lg text-[#23140E]">
              Book Your Table at Bean &amp; Bloom
            </h3>
          </div>

          {/* Date, Time & Guests Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5 flex items-center gap-1.5">
                <CalendarCheck size={14} className="text-[#C88342]" />
                <span>Date <span className="text-[#C88342]">*</span></span>
              </label>
              <input
                type="date"
                {...register('date', { required: 'Please select a date' })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.date ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.date && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5 flex items-center gap-1.5">
                <Clock size={14} className="text-[#C88342]" />
                <span>Time Slot <span className="text-[#C88342]">*</span></span>
              </label>
              <select
                {...register('time', { required: 'Please choose a time slot' })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#23140E]/15 bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition"
              >
                <option value="09:00">09:00 AM (Morning Brew)</option>
                <option value="11:30">11:30 AM (Brunch)</option>
                <option value="14:00">02:00 PM (Afternoon Coffee)</option>
                <option value="16:30">04:30 PM (Pastry Hour)</option>
                <option value="18:30">06:30 PM (Sunset Lounge)</option>
                <option value="20:30">08:30 PM (Evening Desserts)</option>
                <option value="22:00">10:00 PM (Night Delight)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5 flex items-center gap-1.5">
                <Users size={14} className="text-[#C88342]" />
                <span>Guests <span className="text-[#C88342]">*</span></span>
              </label>
              <select
                {...register('guests', { valueAsNumber: true })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#23140E]/15 bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition"
              >
                <option value={1}>1 Guest (Solo Study/Relax)</option>
                <option value={2}>2 Guests (Cozy Pair)</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests (Standard Table)</option>
                <option value={6}>6 Guests (Group)</option>
                <option value={8}>8+ Guests (Celebration Table)</option>
              </select>
            </div>
          </div>

          {/* Seating Zone Preference */}
          <div>
            <label className="block text-xs font-medium text-[#23140E] mb-2">
              Seating Atmosphere Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'Indoor Cozy Lounge', label: 'Indoor Cozy Lounge', desc: 'Soft jazz & warm velvet seating' },
                { id: 'Outdoor Sun Patio', label: 'Outdoor Sun Patio', desc: 'Garden greenery & fresh Zamalek air' },
                { id: 'Barista Counter', label: 'Barista Counter', desc: 'Front-row view of single origin pours' },
              ].map((zone) => (
                <label
                  key={zone.id}
                  className="relative flex flex-col p-3 rounded-xl border border-[#23140E]/15 bg-white cursor-pointer hover:border-[#C88342] transition-colors"
                >
                  <input
                    type="radio"
                    value={zone.id}
                    {...register('zone')}
                    className="absolute top-3 right-3 text-[#C88342] focus:ring-[#C88342]"
                  />
                  <span className="font-heading font-medium text-xs text-[#23140E] pr-5">
                    {zone.label}
                  </span>
                  <span className="text-[11px] text-[#23140E]/60 mt-1">
                    {zone.desc}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Your Full Name <span className="text-[#C88342]">*</span>
              </label>
              <input
                {...register('name', { required: 'Please enter your name' })}
                placeholder="Omar Farouk"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.name ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Phone Number <span className="text-[#C88342]">*</span>
              </label>
              <input
                {...register('phone', { required: 'Phone is needed for confirmation' })}
                placeholder="+20 100 123 4567"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.phone ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Email Address <span className="text-[#C88342]">*</span>
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                placeholder="omar@gmail.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.email ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#23140E] mb-1.5">
              Special Requests (Dietary, Birthday, Window Seat)
            </label>
            <input
              {...register('notes')}
              placeholder="E.g., celebrating an anniversary, preferred quiet corner"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#23140E]/15 bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-heading font-semibold text-sm bg-[#C88342] text-white hover:bg-[#B47132] active:scale-98 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Confirming Table...' : 'Confirm Table Reservation'}
            </button>
            <p className="text-center text-[11px] text-[#23140E]/60 mt-2">
              No reservation fee required • Free cancellation anytime
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
