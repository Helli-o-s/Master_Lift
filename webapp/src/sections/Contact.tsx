import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const FORMSUBMIT_EMAIL = 'info@masterelevatorbh.com';

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

// Required field asterisk
const Req = () => (
  <span className="text-primary ml-0.5" aria-hidden="true">*</span>
);

// Field-level error message
const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  ) : null;

export const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ mode: 'onBlur' }); // Validate on blur (UX best practice)
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
          _subject: `New Service Request – ${data.service} from ${data.name}`,
          _captcha: 'false',
          _template: 'table',
        }),
      });
      const json = await res.json();
      if (json.success === 'true' || json.success === true) {
        setStatus('success');
        reset();
      } else {
        throw new Error('FormSubmit returned non-success');
      }
    } catch (err) {
      console.error('FormSubmit error:', err);
      setStatus('error');
    }
  };

  const inputBase =
    'w-full text-base px-4 py-3 border bg-slate-50 focus:bg-white focus:outline-none transition-all duration-200 hover:border-slate-400';
  const inputValid = 'border-slate-300 focus:border-primary/60 focus:ring-1 focus:ring-primary/60';
  const inputError = 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400 bg-red-50/30';

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading
          title="Dispatch Request."
          subtitle="A direct link to our engineering dispatch. Teams are ready to deploy across the Kingdom of Bahrain 24/7."
        />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-12 lg:mt-16">

          {/* Contact Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 border border-slate-200 shadow-lg shadow-slate-200/40">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary" aria-hidden="true" />
                Direct Dispatch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary" aria-hidden="true">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">24/7 Hotlines</h4>
                    <a href="tel:+97335081527" className="block text-slate-600 font-medium hover:text-primary transition-colors">
                      +973 35081527
                    </a>
                    <a href="tel:+97339966710" className="block text-slate-600 font-medium hover:text-primary transition-colors">
                      +973 39966710
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary" aria-hidden="true">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Email</h4>
                    <a
                      href="mailto:info@masterelevatorbh.com"
                      className="text-slate-600 hover:text-primary transition-colors break-all"
                    >
                      info@masterelevatorbh.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary" aria-hidden="true">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Headquarters</h4>
                    <a
                      href="https://maps.google.com/?q=Kingdom+of+Bahrain"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      Kingdom of Bahrain
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-white p-6 sm:p-8 md:p-12 border border-slate-200 shadow-xl shadow-slate-200/40">
            <p className="text-xs text-slate-400 mb-6">
              Fields marked <span className="text-primary font-semibold">*</span> are required.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Service request form"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-sm font-semibold text-secondary mb-1.5">
                    Full Name <Req />
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    {...register('name', { required: 'Full name is required' })}
                    className={`${inputBase} ${errors.name ? inputError : inputValid}`}
                    placeholder="Enter your name"
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-secondary mb-1.5">
                    Email Address <Req />
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    {...register('email', {
                      required: 'Email address is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
                    })}
                    className={`${inputBase} ${errors.email ? inputError : inputValid}`}
                    placeholder="you@company.com"
                  />
                  <FieldError message={errors.email?.message} />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-sm font-semibold text-secondary mb-1.5">
                    Phone Number <Req />
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`${inputBase} ${errors.phone ? inputError : inputValid}`}
                    placeholder="+973 XXXXXXXX"
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                {/* Service */}
                <div className="flex flex-col">
                  <label htmlFor="service" className="text-sm font-semibold text-secondary mb-1.5">
                    Service Required <Req />
                  </label>
                  <select
                    id="service"
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    {...register('service', { required: 'Please select a service' })}
                    className={`${inputBase} appearance-none cursor-pointer ${errors.service ? inputError : inputValid}`}
                  >
                    <option value="">Select a service…</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="repair">Repair</option>
                    <option value="installation">Installation</option>
                    <option value="modernization">Modernization</option>
                    <option value="custom-cab">Custom Cab Interior</option>
                    <option value="general">General Inquiry</option>
                  </select>
                  <FieldError message={errors.service?.message} />
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="text-sm font-semibold text-secondary mb-1.5">
                  Project Details <Req />
                </label>
                <textarea
                  id="message"
                  rows={4}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  {...register('message', { required: 'Please describe your project or issue' })}
                  className={`${inputBase} resize-y ${errors.message ? inputError : inputValid}`}
                  placeholder="How can our engineering team assist you?"
                />
                <FieldError message={errors.message?.message} />
              </div>

              {/* Status banners */}
              {status === 'success' && (
                <div
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700"
                >
                  <CheckCircle size={20} className="shrink-0" aria-hidden="true" />
                  <span className="font-medium">
                    Your request has been sent! A Master Elevator representative will contact you shortly.
                  </span>
                </div>
              )}
              {status === 'error' && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 text-red-700"
                >
                  <AlertCircle size={20} className="shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-medium">
                    Something went wrong. Please call{' '}
                    <a href="tel:+97335081527" className="underline">+973 35081527</a> or email{' '}
                    <a href="mailto:info@masterelevatorbh.com" className="underline">
                      info@masterelevatorbh.com
                    </a>.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className={`w-full md:w-auto min-w-[180px] ${status === 'sending' ? '[&_svg]:animate-spin' : ''}`}
                icon={status === 'sending' ? Loader2 : Send}
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Submit Request'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
