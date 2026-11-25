import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { ContactData } from '../types';
import { PaperPlaneTilt, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>();

  const onSubmit = async (data: ContactData) => {
    // Simulate real brief network latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#23140E]/10 rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(35,20,14,0.05)]">
      <h3 className="font-heading font-semibold text-xl text-[#23140E] mb-2">
        Send Us a Message
      </h3>
      <p className="text-sm text-[#23140E]/70 mb-6">
        Have a question about our menu, private catering, or special events in Cairo? We respond within a few hours.
      </p>

      {submitted ? (
        <div className="p-6 rounded-xl bg-[#EBF0E8] border border-[#7B8F71]/30 text-center">
          <CheckCircle size={40} weight="fill" className="text-[#7B8F71] mx-auto mb-2" />
          <h4 className="font-heading font-semibold text-lg text-[#23140E]">
            Message Received
          </h4>
          <p className="text-sm text-[#23140E]/80 mt-1">
            Thank you for reaching out! Our team in Zamalek will get back to you shortly.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-[#23140E] text-white hover:bg-[#C88342] transition-colors"
          >
            Send Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Your Name <span className="text-[#C88342]">*</span>
              </label>
              <input
                {...register('name', { required: 'Please enter your name' })}
                placeholder="Layla Mostafa"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.name ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <WarningCircle size={13} /> {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Email Address <span className="text-[#C88342]">*</span>
              </label>
              <input
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="layla@example.com"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.email ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <WarningCircle size={13} /> {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Phone Number (Optional)
              </label>
              <input
                {...register('phone')}
                placeholder="+20 100 ..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#23140E]/15 bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#23140E] mb-1.5">
                Subject <span className="text-[#C88342]">*</span>
              </label>
              <input
                {...register('subject', { required: 'Subject is required' })}
                placeholder="Catering, Private Event, or Feedback"
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                  errors.subject ? 'border-red-400' : 'border-[#23140E]/15'
                }`}
              />
              {errors.subject && (
                <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <WarningCircle size={13} /> {errors.subject.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#23140E] mb-1.5">
              Message <span className="text-[#C88342]">*</span>
            </label>
            <textarea
              {...register('message', {
                required: 'Please write your message',
                minLength: { value: 10, message: 'Minimum 10 characters' },
              })}
              rows={4}
              placeholder="Tell us what you have in mind..."
              className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm text-[#23140E] focus:outline-none focus:ring-2 focus:ring-[#C88342]/40 transition ${
                errors.message ? 'border-red-400' : 'border-[#23140E]/15'
              }`}
            />
            {errors.message && (
              <span className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <WarningCircle size={13} /> {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-heading font-semibold text-sm bg-[#23140E] text-[#FDFBF7] hover:bg-[#C88342] active:scale-98 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-md disabled:opacity-50"
          >
            <PaperPlaneTilt size={16} weight="bold" />
            <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
