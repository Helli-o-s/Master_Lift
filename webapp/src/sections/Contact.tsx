import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

// ── FormSubmit.co ────────────────────────────────────────────────────────────
// No account or API keys needed!
// The first submission will send a one-time activation email to the address below.
// Click "Confirm" in that email once, and all future submissions will be delivered.
const FORMSUBMIT_EMAIL = 'info@masterelevatorbh.com';

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

export const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = async (data: FormData) => {
    setStatus('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:         data.name,
          email:        data.email,
          phone:        data.phone,
          service:      data.service,
          message:      data.message,
          // FormSubmit extras
          _subject:     `New Service Request – ${data.service} from ${data.name}`,
          _captcha:     'false',   // disable captcha (form already has validation)
          _template:    'table',   // nicely formatted email
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

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden content-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading title="Dispatch Request." subtitle="A direct link to our engineering dispatch. Teams are ready to deploy across the Kingdom of Bahrain 24/7." />

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mt-12 lg:mt-16">
          
          {/* Contact Info Col */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-none border border-slate-200 shadow-lg shadow-slate-200/40">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary" />
                Direct Dispatch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">24/7 Hotlines</h4>
                    <a href="tel:+97335081527" className="block text-slate-600 font-medium hover:text-primary transition-colors">+973 35081527</a>
                    <a href="tel:+97339966710" className="block text-slate-600 font-medium hover:text-primary transition-colors">+973 39966710</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Email</h4>
                    <a href="mailto:info@masterelevatorbh.com" className="text-slate-600 hover:text-primary transition-colors break-all">info@masterelevatorbh.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Headquarters</h4>
                    <a href="https://maps.google.com/?q=Kingdom+of+Bahrain" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-primary transition-colors">Kingdom of Bahrain</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Col */}
          <div className="lg:w-2/3 bg-white p-6 sm:p-8 md:p-12 rounded-none border border-slate-200 shadow-xl shadow-slate-200/40">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-secondary">Full Name</label>
                  <input 
                    id="name"
                    {...register("name", { required: true })}
                    className={`text-base px-4 py-3 rounded-md border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-slate-300'} hover:border-slate-400`}
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-secondary">Email Address</label>
                  <input 
                    id="email"
                    type="email"
                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                    className={`text-base px-4 py-3 rounded-md border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-slate-300'} hover:border-slate-400`}
                    placeholder="you@company.com"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-secondary">Phone Number</label>
                  <input 
                    id="phone"
                    type="tel"
                    {...register("phone", { required: true })}
                    className={`text-base px-4 py-3 rounded-md border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-200 ${errors.phone ? 'border-red-500' : 'border-slate-300'} hover:border-slate-400`}
                    placeholder="+973 XXXXXXXX"
                  />
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm font-semibold text-secondary">Service Required</label>
                  <select 
                    id="service"
                    {...register("service", { required: true })}
                    className={`text-base px-4 py-3 rounded-md border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-200 appearance-none ${errors.service ? 'border-red-500' : 'border-slate-300'} hover:border-slate-400`}
                  >
                    <option value="">Select a service...</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="repair">Repair</option>
                    <option value="installation">Installation</option>
                    <option value="modernization">Modernization</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-secondary">Project Details</label>
                <textarea 
                  id="message"
                  rows={4}
                  {...register("message", { required: true })}
                  className={`text-base px-4 py-3 rounded-md border bg-slate-50 focus:bg-white focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 transition-all duration-200 resize-y ${errors.message ? 'border-red-500' : 'border-slate-300'} hover:border-slate-400`}
                  placeholder="How can our engineering team assist you?"
                />
              </div>

              {/* Status banners */}
              {status === 'success' && (
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700">
                  <CheckCircle size={20} className="shrink-0" />
                  <span className="font-medium">Your request has been sent! A Master Elevator representative will contact you shortly.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle size={20} className="shrink-0" />
                  <span className="font-medium">Something went wrong. Please call us directly at <a href="tel:+97335081527" className="underline">+973 35081527</a> or email <a href="mailto:info@masterelevatorbh.com" className="underline">info@masterelevatorbh.com</a>.</span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto"
                icon={Send}
                disabled={status === 'sending'}
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
