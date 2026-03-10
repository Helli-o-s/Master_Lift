import { SectionHeading } from '../components/ui/SectionHeading';
import { Button } from '../components/ui/Button';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

type FormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted', data);
    // In a real build, we'd trigger an API or mailto here.
    alert('Thank you for your inquiry. A Master Elevator representative will contact you shortly.');
    reset();
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <SectionHeading title="Request a Service." subtitle="Our engineering team is ready to deploy across Bahrain 24/7." />

        <div className="flex flex-col lg:flex-row gap-16 mt-16">
          
          {/* Contact Info Col */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-3">
                <div className="w-2 h-6 bg-primary rounded-full" />
                Direct Enquiries
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 text-primary rounded-xl">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">24/7 Hotlines</h4>
                    <p className="text-slate-600 font-medium">+973 35081527</p>
                    <p className="text-slate-600 font-medium">+973 39966710</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 text-primary rounded-xl">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Email</h4>
                    <p className="text-slate-600">info@masterelevatorbh.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 text-primary rounded-xl">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Headquarters</h4>
                    <p className="text-slate-600">Kingdom of Bahrain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Col */}
          <div className="lg:w-2/3 bg-white p-8 md:p-12 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-secondary">Full Name</label>
                  <input 
                    id="name"
                    {...register("name", { required: true })}
                    className={`px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.name ? 'border-red-500' : 'border-slate-200'}`}
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
                    className={`px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.email ? 'border-red-500' : 'border-slate-200'}`}
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
                    className={`px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.phone ? 'border-red-500' : 'border-slate-200'}`}
                    placeholder="+973 XXXXXXXX"
                  />
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm font-semibold text-secondary">Service Required</label>
                  <select 
                    id="service"
                    {...register("service", { required: true })}
                    className={`px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none ${errors.service ? 'border-red-500' : 'border-slate-200'}`}
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
                  className={`px-4 py-3 rounded-xl border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-y ${errors.message ? 'border-red-500' : 'border-slate-200'}`}
                  placeholder="How can our engineering team assist you?"
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto" icon={Send}>
                Submit Request
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
