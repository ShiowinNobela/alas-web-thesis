import { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';
import StoreLocationCard from '@/components/cards/StoreLocationCard';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const cardHoverVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

function ContactUs() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    note: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`/api/contact`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Message sent');
      setForm({ firstName: '', lastName: '', email: '', subject: '', note: '' });
    },
    onError: (error) => {
      console.error(error);
      alert('Failed to send message. Please try again later.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  return (
    <motion.section
      className="bg-neutral min-h-screen pb-25"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-25 left-15 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        ></motion.div>
        <motion.div
          className="absolute top-45 right-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-55 left-20 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-red-300 opacity-20 delay-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        ></motion.div>
      </div>

      {/* Contact Page Content */}
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div className="mb-12 text-center" variants={itemVariants}>
          <div className="mb-4 flex items-center justify-center">
            <h1 className="text-content font-heading text-5xl font-semibold">Let&apos;s Talk Spice!</h1>
          </div>
          <p className="text-lighter mx-auto max-w-3xl text-lg">
            Got questions? Need a custom blend? We are here to help you find your perfect heat!
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 gap-14 lg:grid-cols-2" variants={containerVariants}>
          {/* Contact Form */}
          <div>
            <motion.div variants={cardHoverVariants} className="space-y-6">
              <Card className="py-0 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                <CardHeader className="bg-primary flex items-center rounded-t-2xl py-4 text-white">
                  <CardTitle className="text-xl">Drop us a Hot Line!</CardTitle>
                </CardHeader>
                <CardContent className="pb-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name fields */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="text-lighter mb-1 block text-sm font-medium">
                          First Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Enter your first name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="text-lighter mb-1 block text-sm font-medium">
                          Last Name <span className="text-primary">*</span>
                        </label>
                        <Input
                          id="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="text-lighter mb-1 block text-sm font-medium">
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="text-lighter mb-1 block text-sm font-medium">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="What’s this about?"
                      />
                    </div>

                    {/* Note */}
                    <div>
                      <label htmlFor="note" className="text-lighter mb-1 block text-sm font-medium">
                        Message <span className="text-primary">*</span>
                      </label>
                      <Textarea
                        id="note"
                        rows={5}
                        value={form.note}
                        onChange={handleChange}
                        placeholder="Tell us your thoughts..."
                        required
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" className="w-full" variant="CTA" type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Sending...' : 'Contact Us!'}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
              <Card></Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card className="">
                  <CardContent className="space-y-4">
                    <div className="border-primary flex items-center space-x-5 rounded-2xl border-2 border-dashed p-4">
                      <MapPin className="text-primary size-10" />
                      <div>
                        <p className="text-content font-heading">
                          Old Balara, Tandang Sora Avenue Quezon City, Philippines
                        </p>
                        <p className="text-lighter text-sm">Visit us for a walk-in order</p>
                      </div>
                    </div>

                    <div className="border-primary flex items-center space-x-5 rounded-2xl border-2 border-dashed p-4">
                      <Phone className="text-primary size-7" />
                      <div>
                        <p className="text-content font-heading">0995 285 8665</p>
                        <p className="text-lighter text-sm">Call for custom orders & bulk pricing</p>
                      </div>
                    </div>

                    <div className="border-primary flex items-center space-x-5 rounded-2xl border-2 border-dashed p-4">
                      <Mail className="text-primary size-7" />
                      <div>
                        <p className="text-content font-heading">kraffle02@gmail.com</p>
                        <p className="text-lighter text-sm">Email us for collabs and business ideas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Our Walk In Schedule</CardTitle>
                    <CardDescription>If you wanna order in person here is our schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between rounded p-2">
                        <span className="font-medium">Monday - Friday</span>
                        <span className="font-bold text-green-600">9:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between rounded p-2">
                        <span className="font-medium">Saturday</span>
                        <span className="font-bold text-blue-600">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex items-center justify-between rounded p-2">
                        <span className="font-medium">Sunday</span>
                        <span className="font-bold text-purple-600">12:00 PM - 5:00 PM</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} whileHover="hover">
              <motion.div variants={cardHoverVariants}>
                <StoreLocationCard />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.section>
  );
}

export default ContactUs;
